"use client";

import { useRef } from "react";
import { useLatencyGauge } from "@/hooks/useLatencyGauge";
import { useTrainingTerminal } from "@/hooks/useTrainingTerminal";

const TERMINAL_LINES = [
  { line: "$ neocloudz launch --gpus b200 --nodes 16 --job llm-train", cls: "tl-cmd" },
  { line: "[INFO] Allocating 16x NVIDIA B200 across 2 racks...", cls: "tl-info" },
  { line: "[INFO] InfiniBand 400G fabric topology validated", cls: "tl-muted" },
  { line: "[INFO] Mounting WEKA NVMe volume at /mnt/checkpoints", cls: "tl-info" },
  { line: "[OK]   Cluster ready — 16 nodes, 128 B200 GPUs total", cls: "tl-success" },
  { line: "$ torchrun --nproc_per_node=8 --nnodes=16 train.py", cls: "tl-cmd" },
  { line: "[NCCL] Initializing all-reduce ring over IB 400G...", cls: "tl-info" },
  { line: "[NCCL] Ring initialized. Bandwidth: 398.4 GB/s", cls: "tl-success" },
  { line: "[TRAIN] Epoch 1/50 — Step 100/5000 — Loss: 2.847", cls: "tl-info" },
  { line: "[TRAIN] Epoch 1/50 — Step 200/5000 — Loss: 2.614", cls: "tl-info" },
  { line: "[CKPT]  Checkpoint saved → /mnt/checkpoints/step-200.pt", cls: "tl-warn" },
  { line: "[INFO] GPU Util: 97.4% | Throughput: 142 k tok/s", cls: "tl-success" },
];

const CODE_LINES = [
  { content: "# NeoCloudz JupyterLab — B200 GPU Environment", cls: "code-cm" },
  { content: "import torch", cls: "code-kw" },
  { content: "from transformers import AutoModelForCausalLM, AutoTokenizer", cls: "code-kw" },
  { content: "", cls: "" },
  { content: "# Load from NeoCloudz model registry", cls: "code-cm" },
  { content: 'model_id = "meta-llama/Llama-3.1-70B-Instruct"', cls: "code-fn" },
  { content: "tokenizer = AutoTokenizer.from_pretrained(model_id)", cls: "code-fn" },
  { content: "model = AutoModelForCausalLM.from_pretrained(", cls: "code-fn" },
  { content: "    model_id,", cls: "code-fn" },
  { content: "    torch_dtype=torch.bfloat16,", cls: "code-fn" },
  { content: '    device_map="auto"', cls: "code-fn" },
  { content: ")", cls: "code-fn" },
  { content: "", cls: "" },
  { content: "# Run inference — sub-5ms p99 on B200", cls: "code-cm" },
  { content: "inputs = tokenizer(", cls: "code-fn" },
  { content: '    "Explain NVIDIA Blackwell B200 in one sentence:",', cls: "code-fn" },
  { content: '    return_tensors="pt"', cls: "code-fn" },
  { content: ').to("cuda")', cls: "code-fn" },
  { content: "", cls: "" },
  { content: "output = model.generate(**inputs, max_new_tokens=128)", cls: "code-fn" },
  { content: "print(tokenizer.decode(output[0], skip_special_tokens=True))", cls: "code-fn" },
  { content: "", cls: "" },
  { content: "# GPU: NVIDIA B200 | VRAM: 192 GB HBM3e | Latency: 4.1ms", cls: "tl-success" },
];

export default function SolutionsSection() {
  const latencyRef = useRef<HTMLCanvasElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  useLatencyGauge(latencyRef);
  useTrainingTerminal(terminalRef);

  return (
    <section className="solutions" id="solutions">
      <div className="section-inner">
        <div className="section-label reveal">// Solutions</div>
        <h2 className="section-title reveal">
          End-to-End AI <span className="g">Compute Pathways</span>
        </h2>
        <p className="section-sub reveal">
          Purpose-built infrastructure for every stage of the AI lifecycle —
          from first experiment to full production deployment at scale.
        </p>

        <div className="sol-card reveal mt-16" id="card-train">
          <div className="sol-info">
            <span className="sol-icon">🧠</span>
            <h3 className="sol-title">AI Training at Scale</h3>
            <p className="sol-desc">
              Harness the full power of NVIDIA Blackwell B200 GPUs connected via
              InfiniBand 400G fabric for distributed training that actually scales.
              Purpose-built clusters with Supermicro thermal-optimized hardware
              and WEKA NVMe storage ensure your training runs hit peak throughput —
              every time, at any node count.
            </p>
            <ul className="sol-features">
              <li>InfiniBand 400G-connected B200 GPU clusters for maximum
                  all-reduce performance across 128+ nodes</li>
              <li>Supermicro high-density server design with precision thermal
                  management and liquid cooling</li>
              <li>NVMe-backed WEKA storage enabling sub-second checkpoint
                  saving and instant resumption</li>
              <li>Auto-scaling multi-node clusters — from 1 to 128 nodes
                  via a single API call with zero reconfiguration</li>
            </ul>
          </div>
          <div className="sol-visual">
            <div className="term-window">
              <div className="term-bar">
                <span className="term-dot term-dot-r"></span>
                <span className="term-dot term-dot-y"></span>
                <span className="term-dot term-dot-g"></span>
                <span className="term-title">neocloudz — ai-training-job-01</span>
              </div>
              <div className="term-body" ref={terminalRef}>
                {TERMINAL_LINES.map((tl, i) => (
                  <span key={i} className={`term-line ${tl.cls}`} data-line={i}>
                    {tl.line}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="sol-card reverse reveal">
          <div className="sol-info">
            <span className="sol-icon">⚡</span>
            <h3 className="sol-title">Real-Time Inference</h3>
            <p className="sol-desc">
              Sub-5ms p99 latency for production inference workloads.
              Deploy your models on dedicated B200 GPU instances behind
              NeoCloudz&rsquo;s Kubernetes-native serving layer —
              complete with autoscaling, health checks, and real-time
              monitoring dashboards built in from day one.
            </p>
            <ul className="sol-features">
              <li>&lt;5ms p99 end-to-end inference latency measured on live
                  B200 hardware under production load</li>
              <li>Kubernetes-ready deployment with pre-built Helm charts,
                  device plugins, and HPA configs included</li>
              <li>Real-time monitoring and alerting via integrated
                  Prometheus + Grafana observability stack</li>
              <li>Auto-scaling inference endpoints — scale to zero when idle,
                  burst capacity available in under 60 seconds</li>
            </ul>
          </div>
          <div className="sol-visual">
            <div className="latency-wrap">
              <canvas id="latency-canvas" ref={latencyRef}></canvas>
            </div>
          </div>
        </div>

        <div className="sol-card reveal">
          <div className="sol-info">
            <span className="sol-icon">🔬</span>
            <h3 className="sol-title">Rapid Prototyping</h3>
            <p className="sol-desc">
              Go from idea to running experiment in under 60 seconds.
              NeoCloudz JupyterLab environments come pre-configured with
              PyTorch, TensorFlow, CUDA, and all major AI libraries —
              no setup, no waiting, no DevOps overhead.
              One-click clone to replicate environments across your team instantly.
            </p>
            <ul className="sol-features">
              <li>Instant JupyterLab environments on B200 GPUs with
                  zero cold-start delay — login and start training immediately</li>
              <li>Pre-configured PyTorch, TensorFlow, JAX, and
                  HuggingFace Transformers environments included</li>
              <li>Secure dataset ingestion via S3-compatible API with
                  AES-256 encryption at rest and TLS 1.3 in transit</li>
              <li>One-click environment cloning — share exact GPU
                  compute environments with teammates in seconds</li>
            </ul>
          </div>
          <div className="sol-visual">
            <div className="term-window code-window">
              <div className="term-bar">
                <span className="term-dot term-dot-r"></span>
                <span className="term-dot term-dot-y"></span>
                <span className="term-dot term-dot-g"></span>
                <span className="term-title">prototype.ipynb — JupyterLab / NeoCloudz B200</span>
              </div>
              <div className="term-body">
                {CODE_LINES.map((cl, i) => (
                  <span key={i} className="block">
                    {cl.cls ? (
                      <span className={cl.cls}>{cl.content}</span>
                    ) : (
                      <span>&nbsp;</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
