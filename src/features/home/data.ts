import type { LogEntry } from "./types";

export const GPU_COUNT = 64;

export const LOG_MESSAGES: Record<"logs" | "jobs" | "alerts", LogEntry[]> = {
  logs: [
    { c: "green", m: "[INIT] NeoCloudz cluster scheduler v4.2.1 started" },
    { c: "", m: "[INFO] Node discovery complete — 64/64 GPUs online" },
    { c: "green", m: "[OK]   InfiniBand fabric initialized at 400 Gb/s" },
    { c: "", m: "[INFO] NVLink 4.0 topology validated — all-to-all mesh" },
    { c: "amber", m: "[WARN] GPU-12 temperature spike — throttling to 80%" },
    { c: "green", m: "[OK]   Job job-4821 launched on 16× H100 (GPUs 0–15)" },
    { c: "", m: "[INFO] Checkpoint saved: /mnt/nfs/ckpt/llama3-70b-step-4200" },
    { c: "green", m: "[OK]   Job job-5503 launched — GPUs 16–31 allocated" },
    { c: "", m: "[INFO] NCCL all-reduce bandwidth: 385 GB/s" },
    { c: "blue", m: "[NET]  Ingress: 42.3 GB/s  Egress: 18.7 GB/s" },
    { c: "", m: "[INFO] Auto-scaling: 3 reserved nodes queued for activation" },
    { c: "green", m: "[OK]   Lustre filesystem health: OK (96% throughput)" },
  ],
  jobs: [
    { c: "green", m: "JOB-4821  llama3-70b-finetune       GPUs:0-15   RUNNING  6h12m" },
    { c: "green", m: "JOB-5503  stable-diffusion-xl-train  GPUs:16-31  RUNNING  2h45m" },
    { c: "amber", m: "JOB-5512  mixtral-8x7b-inference     GPUs:32-39  QUEUED   --" },
    { c: "green", m: "JOB-5498  whisper-large-v3-finetune  GPUs:40-47  RUNNING  11h03m" },
    { c: "blue", m: "JOB-5515  vllm-server-deploy         GPUs:48-55  STARTING 0h01m" },
    { c: "muted", m: "JOB-5491  codellama-34b-eval         GPUs:56-63  DONE     ✓" },
    { c: "red", m: "JOB-5510  gpt-neox-20b               GPU:12      FAILED   OOM" },
  ],
  alerts: [
    { c: "red", m: "[CRIT]  GPU-12 memory error — node quarantined" },
    { c: "amber", m: "[WARN]  GPU cluster temp avg 74°C — within nominal range" },
    { c: "amber", m: "[WARN]  NVLink port GPU-23↔GPU-31 degraded — 94% bandwidth" },
    { c: "green", m: "[OK]    Cooling system: all CDU units nominal" },
    { c: "amber", m: "[WARN]  Job JOB-5510 OOM on GPU-12 — rescheduling..." },
    { c: "green", m: "[OK]    Power distribution: 98.2 kW draw / 120 kW capacity" },
    { c: "green", m: "[OK]    Uptime: 99.97% (30-day rolling)" },
  ],
};

export const NVIDIA_SMI_OUTPUT: LogEntry[] = [
  { c: "muted", m: "+-----------------------------------------------------------+" },
  { c: "muted", m: "| NVIDIA-SMI 560.28   Driver 560.28  CUDA 12.6             |" },
  { c: "muted", m: "+-----------------------------------------------------------+" },
  { c: "green", m: "| GPU  Name           Temp  Util  Mem-Usage    Power        |" },
  { c: "", m: "|   0  H100 SXM5      74C   94%   74880MiB/80GB  685W      |" },
  { c: "", m: "|   1  H100 SXM5      71C   89%   71680MiB/80GB  651W      |" },
  { c: "", m: "|   2  H100 SXM5      76C   97%   78080MiB/80GB  698W      |" },
  { c: "amber", m: "|  12  H100 SXM5      95C   ERR   80000MiB/80GB    0W      |" },
  { c: "muted", m: "+-----------------------------------------------------------+" },
];

export const CLUSTER_STATUS_OUTPUT: LogEntry[] = [
  { c: "green", m: "● Cluster: ONLINE" },
  { c: "", m: "  Nodes:    64 total | 58 active | 5 idle | 1 error" },
  { c: "", m: "  Avg Util: 87%    Avg Temp: 74°C    Avg Power: 312W/GPU" },
  { c: "green", m: "  InfiniBand: 400G nominal | NVLink 4.0: mesh healthy" },
  { c: "amber", m: "  Alerts: 2 warnings | 1 critical (GPU-12)" },
];

export const HELP_OUTPUT: LogEntry[] = [
  { c: "green", m: "Available commands:" },
  { c: "blue", m: "  nvidia-smi         — GPU status summary" },
  { c: "blue", m: "  cluster status     — full cluster health" },
  { c: "blue", m: "  jobs list          — active job queue" },
  { c: "blue", m: "  top gpus           — highest utilization GPUs" },
  { c: "blue", m: "  clear              — clear terminal" },
];
