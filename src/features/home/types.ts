export type GpuState = "high" | "med" | "low" | "idle" | "error";

export interface GpuNode {
  id: number;
  util: number;
  vram: number;
  power: number;
  temp: number;
  state: GpuState;
  job: string | null;
}

export interface LogEntry {
  c: string;
  m: string;
}

export interface TimedLogEntry extends LogEntry {
  ts: string;
  key: string;
}

export type LogTab = "logs" | "jobs" | "alerts";
