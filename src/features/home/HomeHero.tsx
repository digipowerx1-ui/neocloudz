"use client";

import { useEffect, useRef, useState } from "react";
import { useGpuCluster } from "./useGpuCluster";
import { useHomeParticleCanvas } from "./canvases";
import {
  useCyclingStatus,
  useGpuHeatmapPulse,
  useHomeLiveStrip,
  useHomeOrbs,
  useHomeParallax,
  useHomeStars,
  useHomeTypingHeadline,
} from "./effects";
import type { GpuNode, LogTab, TimedLogEntry } from "./types";

const GPU_TT_VAL_CLASS: Record<GpuNode["state"], string> = {
  high: "green",
  med: "amber",
  low: "blue",
  idle: "",
  error: "red",
};

function gpuLabel(g: GpuNode): string {
  if (g.state === "idle") return "—";
  if (g.state === "error") return "ERR";
  return g.util + "%";
}

function tempClass(temp: number): string {
  if (temp > 85) return "red";
  if (temp > 75) return "amber";
  return "green";
}

function GpuGridNode({ g }: { g: GpuNode }) {
  return (
    <div className={`gpu-node util-${g.state}`}>
      <div className="gpu-id">G{String(g.id).padStart(2, "0")}</div>
      <div className="gpu-util">{gpuLabel(g)}</div>
      <div className="gpu-tooltip">
        <div className="tt-row">
          <span className="tt-key">GPU</span>
          <span className="tt-val">Blackwell B200 #{g.id}</span>
        </div>
        <div className="tt-row">
          <span className="tt-key">Util</span>
          <span className={`tt-val ${GPU_TT_VAL_CLASS[g.state]}`}>
            {g.state === "error" ? "ERROR" : g.util + "%"}
          </span>
        </div>
        <div className="tt-row">
          <span className="tt-key">VRAM</span>
          <span className="tt-val">{g.vram} GB / 180 GB</span>
        </div>
        <div className="tt-row">
          <span className="tt-key">Power</span>
          <span className="tt-val">{g.power} W</span>
        </div>
        <div className="tt-row">
          <span className="tt-key">Temp</span>
          <span className={`tt-val ${tempClass(g.temp)}`}>{g.temp}°C</span>
        </div>
        <div className="tt-row">
          <span className="tt-key">Job</span>
          <span className={`tt-val ${g.job ? "green" : ""}`}>{g.job || "none"}</span>
        </div>
      </div>
    </div>
  );
}

interface LogLineProps {
  line: TimedLogEntry;
}

function LogLine({ line }: LogLineProps) {
  if (line.c === "echo") {
    return (
      <div className="log-line">
        <span className="log-time" style={{ color: "var(--green)" }}>{line.ts}</span>
        <span className="log-msg">{line.m}</span>
      </div>
    );
  }
  return (
    <div className="log-line">
      <span className="log-time">{line.ts}</span>
      <span className={`log-msg ${line.c}`}>{line.m}</span>
    </div>
  );
}

export function HomeHero() {
  const heroRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const particleCanvasRef = useRef<HTMLCanvasElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const gpuGridRef = useRef<HTMLDivElement>(null);
  const logOutputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputVal, setInputVal] = useState("");

  const { gpus, metrics, spark, tab, setTab, log, cursorTime, submitCommand } =
    useGpuCluster();
  const status = useCyclingStatus();
  const liveStrip = useHomeLiveStrip();

  useHomeParticleCanvas(particleCanvasRef);
  useHomeOrbs(heroRef);
  useHomeStars(heroRef);
  useHomeParallax(heroRef, gridRef, glowRef);
  useHomeTypingHeadline(headlineRef);
  useGpuHeatmapPulse(gpuGridRef);

  // auto-scroll log on new content
  useEffect(() => {
    const el = logOutputRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [log]);

  function onKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") return;
    submitCommand(inputVal);
    setInputVal("");
  }

  function onTab(next: LogTab) {
    setTab(next);
  }

  return (
    <section className="hero" ref={heroRef}>
      <canvas id="particle-canvas" ref={particleCanvasRef} />
      <div className="hero-grid" ref={gridRef} />
      <div className="hero-glow" ref={glowRef} />

      <div className="terminal-wrap">
        <div className="hero-eyebrow">
          <h1 ref={headlineRef}>
            The Future of AI<br />
            <span>Compute Starts Here.</span>
          </h1>
          <p>
            Powerful cloud infrastructure designed for AI teams. Scale your models, reduce costs, and accelerate innovation.
          </p>
        </div>

        <div className="terminal">
          <div className="terminal-bar">
            <div className="tbar-dots">
              <div className="tbar-dot red" />
              <div className="tbar-dot amber" />
              <div className="tbar-dot green" />
            </div>
            <div className="tbar-title">neocloudz — gpu-cluster-monitor — bash</div>
            <div
              className="tbar-status"
              style={{ opacity: status.visible ? 1 : 0, transition: "opacity .3s" }}
            >
              {status.label}
            </div>
          </div>

          <div className="terminal-body">
            <div className="cluster-panel">
              <div className="panel-header">
                <div className="panel-label">▸ GPU CLUSTER · 64 NODES · BLACKWELL B200</div>
                <div className="cluster-stats">
                  <span className="cstat">
                    <span className="cstat-val">{metrics.active}</span>
                    <span className="cstat-key">active</span>
                  </span>
                  <span className="cstat">
                    <span className="cstat-val">{metrics.avgUtil}</span>
                    <span className="cstat-key">% avg util</span>
                  </span>
                  <span className="cstat">
                    <span className="cstat-val">{metrics.totalPflops}</span>
                    <span className="cstat-key">PetaFLOPs</span>
                  </span>
                </div>
              </div>

              <div className="gpu-grid" ref={gpuGridRef}>
                {gpus.map((g) => (
                  <GpuGridNode key={g.id} g={g} />
                ))}
              </div>

              <div className="metrics-row">
                <div className="metric-box">
                  <div className="metric-key">GPU Util</div>
                  <div className="metric-val green">{metrics.avgUtil}%</div>
                  <div className="metric-sub">avg across 64 GPUs</div>
                </div>
                <div className="metric-box">
                  <div className="metric-key">VRAM Used</div>
                  <div className="metric-val amber">{metrics.avgVram}%</div>
                  <div className="metric-sub">132 / 180 GB avg</div>
                </div>
                <div className="metric-box">
                  <div className="metric-key">Power Draw</div>
                  <div className="metric-val blue">{metrics.avgPower} W</div>
                  <div className="metric-sub">avg · 700W TDP</div>
                </div>
                <div className="metric-box">
                  <div className="metric-key">Temp</div>
                  <div className="metric-val">{metrics.avgTemp}°C</div>
                  <div className="metric-sub">avg · max 83°C</div>
                </div>
              </div>

              <div className="sparkline-row">
                <div>
                  <div className="spark-label">
                    <span className="spark-key">Network I/O (InfiniBand 400G)</span>
                    <span className="spark-pct">{spark.net}%</span>
                  </div>
                  <div className="spark-track">
                    <div className="spark-fill" style={{ width: spark.net + "%" }} />
                    <div className="spark-dot" />
                  </div>
                </div>
                <div>
                  <div className="spark-label">
                    <span className="spark-key">NVLink Bandwidth</span>
                    <span className="spark-pct amber">{spark.nvl}%</span>
                  </div>
                  <div className="spark-track">
                    <div className="spark-fill amber" style={{ width: spark.nvl + "%" }} />
                    <div
                      className="spark-dot"
                      style={{
                        background: "var(--amber)",
                        boxShadow: "0 0 8px var(--amber)",
                        animationDelay: "0.8s",
                      }}
                    />
                  </div>
                </div>
                <div>
                  <div className="spark-label">
                    <span className="spark-key">Storage Throughput</span>
                    <span className="spark-pct blue">{spark.stor}%</span>
                  </div>
                  <div className="spark-track">
                    <div
                      className="spark-fill blue"
                      style={{ width: spark.stor + "%" }}
                    />
                    <div
                      className="spark-dot"
                      style={{
                        background: "var(--blue)",
                        boxShadow: "0 0 8px var(--blue)",
                        animationDelay: "1.6s",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="log-panel">
              <div className="log-tabs">
                <div
                  className={`log-tab${tab === "logs" ? " active" : ""}`}
                  onClick={() => onTab("logs")}
                >
                  System Logs
                </div>
                <div
                  className={`log-tab${tab === "jobs" ? " active" : ""}`}
                  onClick={() => onTab("jobs")}
                >
                  Jobs
                </div>
                <div
                  className={`log-tab${tab === "alerts" ? " active" : ""}`}
                  onClick={() => onTab("alerts")}
                >
                  Alerts <span style={{ color: "var(--amber)" }}>●</span>
                </div>
              </div>

              <div className="log-output" ref={logOutputRef}>
                {log.map((l) => (
                  <LogLine key={l.key} line={l} />
                ))}
                <div className="log-line">
                  <span className="log-time">{cursorTime}</span>
                  <span className="log-msg muted">
                    monitoring<span className="cursor">█</span>
                  </span>
                </div>
              </div>

              <div className="terminal-input-wrap">
                <span className="term-prompt">neo@cluster:~$</span>
                <input
                  ref={inputRef}
                  className="term-input"
                  placeholder="type a command…"
                  autoComplete="off"
                  spellCheck={false}
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={onKey}
                />
              </div>
            </div>
          </div>

          <div className="legend">
            <div className="legend-item">
              <div className="legend-dot green" />
              High Utilization (&gt;70%)
            </div>
            <div className="legend-item">
              <div className="legend-dot amber" />
              Medium (40–70%)
            </div>
            <div className="legend-item">
              <div className="legend-dot blue" />
              Low (&lt;40%)
            </div>
            <div className="legend-item">
              <div className="legend-dot gray" />
              Idle
            </div>
            <div className="legend-item">
              <div className="legend-dot red" />
              Error
            </div>
            <div
              style={{
                marginLeft: "auto",
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                color: "var(--muted)",
              }}
            >
              64× BLACKWELL B200 · NVLink 4.0 · InfiniBand 400G · NeoCloudz
            </div>
          </div>
        </div>

        <div className="hero-cta">
          <a href="/contact?source=homepage&cta=contact_sales" className="btn-launch">
            Contact Sales
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a href="/contact?source=homepage&cta=request_private_cluster" className="btn-outline">
            Request Private Cluster
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        <div className="hero-live-strip">
          <div className="hlm">
            <span className="hlm-val">{liveStrip.gpus.toLocaleString()}</span>
            <span className="hlm-lbl">GPUs Online</span>
          </div>
          <div className="hlm-div" />
          <div className="hlm">
            <span className="hlm-val">{liveStrip.util}%</span>
            <span className="hlm-lbl">Avg Utilization</span>
          </div>
          <div className="hlm-div" />
          <div className="hlm">
            <span className="hlm-val">{liveStrip.jobs}</span>
            <span className="hlm-lbl">Active Jobs</span>
          </div>
          <div className="hlm-div" />
          <div className="hlm">
            <span className="hlm-val">{liveStrip.pflops}</span>
            <span className="hlm-lbl">PetaFLOPs/s</span>
          </div>
          <div className="hlm-div" />
          <div className="hlm">
            <span className="hlm-val">
              {liveStrip.bw}
              <span style={{ fontSize: "14px" }}>GB/s</span>
            </span>
            <span className="hlm-lbl">Network I/O</span>
          </div>
        </div>
      </div>

      <div className="hero-aurora">
        <div
          className="aurora-band"
          style={
            {
              background: "radial-gradient(ellipse,rgba(45,255,122,1),transparent 70%)",
              top: "60%",
              "--adur": "16s",
              "--ad": "0s",
            } as React.CSSProperties
          }
        />
        <div
          className="aurora-band"
          style={
            {
              background: "radial-gradient(ellipse,rgba(77,200,255,1),transparent 70%)",
              top: "55%",
              "--adur": "20s",
              "--ad": "4s",
            } as React.CSSProperties
          }
        />
        <div
          className="aurora-band"
          style={
            {
              background: "radial-gradient(ellipse,rgba(45,255,122,1),transparent 70%)",
              top: "70%",
              "--adur": "13s",
              "--ad": "8s",
            } as React.CSSProperties
          }
        />
      </div>

      <div
        className="metric-badge"
        style={
          { left: "4%", top: "35%", "--dur": "8s", "--delay": "0s", "--rot": "-2deg" } as React.CSSProperties
        }
      >
        <span className="metric-badge-val">
          900<span style={{ fontSize: "11px" }}>GB/s</span>
        </span>
        <span className="metric-badge-lbl">NVLink-C2C BW</span>
      </div>
      <div
        className="metric-badge"
        style={
          { right: "4%", top: "38%", "--dur": "9s", "--delay": "1.5s", "--rot": "2deg" } as React.CSSProperties
        }
      >
        <span className="metric-badge-val">
          &lt;60<span style={{ fontSize: "11px" }}>s</span>
        </span>
        <span className="metric-badge-lbl">Provision Time</span>
      </div>
      <div
        className="metric-badge"
        style={
          { right: "6%", top: "58%", "--dur": "7s", "--delay": "3s", "--rot": "-1deg" } as React.CSSProperties
        }
      >
        <span className="metric-badge-val">400G</span>
        <span className="metric-badge-lbl">InfiniBand</span>
      </div>
    </section>
  );
}
