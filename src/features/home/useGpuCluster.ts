"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  CLUSTER_STATUS_OUTPUT,
  GPU_COUNT,
  HELP_OUTPUT,
  LOG_MESSAGES,
  NVIDIA_SMI_OUTPUT,
} from "./data";
import type { GpuNode, GpuState, LogEntry, LogTab, TimedLogEntry } from "./types";

const MAX_LOG_LINES = 40;

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randFloat(min: number, max: number, decimals = 1): string {
  return (Math.random() * (max - min) + min).toFixed(decimals);
}

function nowTs(): string {
  const now = new Date();
  return [now.getHours(), now.getMinutes(), now.getSeconds()]
    .map((n) => String(n).padStart(2, "0"))
    .join(":");
}

function tsForIndex(i: number): string {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, "0");
  const m = String(now.getMinutes()).padStart(2, "0");
  const s = String((now.getSeconds() + i * 3) % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

function generateInitialGpus(): GpuNode[] {
  const arr: GpuNode[] = [];
  for (let i = 0; i < GPU_COUNT; i++) {
    const r = Math.random();
    let state: GpuState;
    let util: number;
    let vram: number;
    let power: number;
    let temp: number;
    if (i === 12) {
      state = "error";
      util = 0;
      vram = 80;
      power = 0;
      temp = 95;
    } else if (r < 0.65) {
      state = "high";
      util = randInt(75, 99);
      vram = randInt(65, 80);
      power = randInt(620, 700);
      temp = randInt(68, 85);
    } else if (r < 0.8) {
      state = "med";
      util = randInt(40, 74);
      vram = randInt(35, 64);
      power = randInt(350, 619);
      temp = randInt(55, 67);
    } else if (r < 0.92) {
      state = "low";
      util = randInt(5, 39);
      vram = randInt(10, 34);
      power = randInt(100, 349);
      temp = randInt(40, 54);
    } else {
      state = "idle";
      util = 0;
      vram = randInt(2, 9);
      power = randInt(60, 99);
      temp = randInt(36, 39);
    }
    arr.push({
      id: i,
      util,
      vram,
      power,
      temp,
      state,
      job: state === "idle" ? null : `job-${randInt(1000, 9999)}`,
    });
  }
  return arr;
}

interface SparkValues {
  net: number;
  nvl: number;
  stor: number;
}

interface ClusterMetrics {
  active: number;
  avgUtil: number;
  avgVram: number;
  avgPower: number;
  avgTemp: number;
  totalPflops: string;
}

function computeMetrics(gpus: GpuNode[]): ClusterMetrics {
  const active = gpus.filter((g) => g.state !== "idle" && g.state !== "error");
  const avgUtil = active.length
    ? Math.round(active.reduce((a, g) => a + g.util, 0) / active.length)
    : 0;
  const avgVram = Math.round(gpus.reduce((a, g) => a + g.vram, 0) / GPU_COUNT);
  const avgPower = Math.round(gpus.reduce((a, g) => a + g.power, 0) / GPU_COUNT);
  const avgTemp = Math.round(gpus.reduce((a, g) => a + g.temp, 0) / GPU_COUNT);
  const totalPflops = ((active.length * 1979) / 1000).toFixed(1);
  return {
    active: active.length,
    avgUtil,
    avgVram,
    avgPower,
    avgTemp,
    totalPflops,
  };
}

interface UseGpuClusterResult {
  gpus: GpuNode[];
  metrics: ClusterMetrics;
  spark: SparkValues;
  tab: LogTab;
  setTab: (tab: LogTab) => void;
  log: TimedLogEntry[];
  cursorTime: string;
  submitCommand: (raw: string) => void;
}

let lineKeyCounter = 0;
function nextKey(): string {
  lineKeyCounter += 1;
  return `${lineKeyCounter}`;
}

function buildTabLog(tab: LogTab): TimedLogEntry[] {
  return LOG_MESSAGES[tab].map((line, i) => ({
    ...line,
    ts: tsForIndex(i),
    key: nextKey(),
  }));
}

const PLACEHOLDER_GPUS: GpuNode[] = Array.from({ length: GPU_COUNT }, (_, i) => ({
  id: i,
  util: 0,
  vram: 0,
  power: 0,
  temp: 0,
  state: "idle" as GpuState,
  job: null,
}));

export function useGpuCluster(): UseGpuClusterResult {
  const [gpus, setGpus] = useState<GpuNode[]>(PLACEHOLDER_GPUS);
  const [spark, setSpark] = useState<SparkValues>({ net: 94, nvl: 71, stor: 58 });
  const [tab, setTabState] = useState<LogTab>("logs");
  const [log, setLog] = useState<TimedLogEntry[]>([]);
  const [cursorTime, setCursorTime] = useState("--:--:--");

  const gpusRef = useRef<GpuNode[]>(PLACEHOLDER_GPUS);

  // Initial population happens once on client only (avoids hydration mismatches).
  useEffect(() => {
    const id = window.setTimeout(() => {
      const initial = generateInitialGpus();
      gpusRef.current = initial;
      setGpus(initial);
      setLog(buildTabLog("logs"));
      setCursorTime(nowTs());
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  // Live cursor clock
  useEffect(() => {
    const id = window.setInterval(() => setCursorTime(nowTs()), 1000);
    return () => window.clearInterval(id);
  }, []);

  // Tab switch rebuilds log
  const setTab = useCallback((next: LogTab) => {
    setTabState(next);
    setLog(buildTabLog(next));
  }, []);

  // Live update loop
  useEffect(() => {
    const id = window.setInterval(() => {
      setGpus((prev) => {
        const next = prev.map((g) => {
          if (g.state === "error") return g;
          return {
            ...g,
            util: Math.min(100, Math.max(0, g.util + randInt(-3, 3))),
            temp: Math.min(95, Math.max(36, g.temp + randInt(-1, 1))),
            power: Math.min(700, Math.max(60, g.power + randInt(-10, 10))),
          };
        });
        gpusRef.current = next;
        return next;
      });
      setSpark({
        net: randInt(88, 99),
        nvl: randInt(60, 82),
        stor: randInt(48, 68),
      });
      if (Math.random() < 0.4) {
        const liveMsgs: LogEntry[] = [
          { c: "", m: "[INFO] Checkpoint written: step " + randInt(4000, 9999) },
          { c: "green", m: "[OK]   Throughput: " + randFloat(2.1, 3.8) + " samples/sec" },
          { c: "blue", m: "[NET]  Bandwidth peak: " + randInt(360, 400) + " Gb/s" },
          {
            c: "",
            m:
              "[INFO] Memory fragmentation cleared on GPUs " +
              randInt(0, 63) +
              "-" +
              randInt(0, 63),
          },
          { c: "amber", m: "[WARN] Thermal headroom reduced on GPU-" + randInt(1, 63) },
          { c: "green", m: "[OK]   NCCL AllReduce latency: " + randFloat(0.1, 0.5) + "ms" },
          { c: "blue", m: "[SCHED] New job queued: job-" + randInt(5500, 5999) },
        ];
        const pick = liveMsgs[randInt(0, liveMsgs.length - 1)];
        const entry: TimedLogEntry = { ...pick, ts: nowTs(), key: nextKey() };
        setLog((prev) => {
          const next = [...prev, entry];
          if (next.length > MAX_LOG_LINES) next.splice(0, next.length - MAX_LOG_LINES);
          return next;
        });
      }
    }, 1800);
    return () => window.clearInterval(id);
  }, []);

  const submitCommand = useCallback((raw: string) => {
    const val = raw.trim().toLowerCase();
    if (!val) return;
    const echo: TimedLogEntry = { c: "echo", m: val, ts: "❯", key: nextKey() };
    let lines: LogEntry[] = [];
    if (val === "help") lines = HELP_OUTPUT;
    else if (val === "nvidia-smi") lines = NVIDIA_SMI_OUTPUT;
    else if (val === "cluster status") lines = CLUSTER_STATUS_OUTPUT;
    else if (val === "jobs list") lines = LOG_MESSAGES.jobs;
    else if (val === "top gpus") {
      lines = gpusRef.current
        .filter((g) => g.state === "high")
        .sort((a, b) => b.util - a.util)
        .slice(0, 5)
        .map((g) => ({
          c: "green",
          m: `GPU-${String(g.id).padStart(2, "0")}  ${g.util}% util  ${g.vram}GB VRAM  ${g.temp}°C  ${g.power}W`,
        }));
    } else if (val === "clear") {
      setLog([]);
      return;
    } else {
      lines = [{ c: "red", m: `command not found: ${val} — type 'help'` }];
    }

    const result: TimedLogEntry[] = lines.map((line) => ({
      ...line,
      ts: "  ",
      key: nextKey(),
    }));

    setLog((prev) => {
      const next = [...prev, echo, ...result];
      if (next.length > MAX_LOG_LINES) next.splice(0, next.length - MAX_LOG_LINES);
      return next;
    });
  }, []);

  const metrics = useMemo(() => computeMetrics(gpus), [gpus]);

  return { gpus, metrics, spark, tab, setTab, log, cursorTime, submitCommand };
}
