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

        <div className="sol-card reveal mt-16" id="training">
          <div className="sol-info">
            <h3 className="sol-title">AI Training at Scale</h3>
            <p className="sol-desc">
             Leverage high-performance NVIDIA Blackwell infrastructure with NVLink and InfiniBand networking to train large language models, vision transformers, and multimodal systems at scale.
             NeoCloudz provides the compute power and I/O bandwidth required to accelerate time-to-results while maintaining cost efficiency. Future-ready for B300 and next-gen architectures.
            </p>
            <div className="sol-feature-boxes-minimal">
              <div className="sol-f-group">
                <h4>Ideal For:</h4>
                <ul className="sol-f-list">
                  <li>Foundation & frontier-scale model training</li>
                  <li>Fine-tuning large pretrained models</li>
                  <li>Distributed training using PyTorch DDP, DeepSpeed, or JAX</li>
                </ul>
              </div>
              <div className="sol-f-group">
                <h4>Highlights:</h4>
                <ul className="sol-f-list">
                  <li>Multi-node GPU clusters with high-speed interconnect</li>
                  <li>Elastic scaling for multi-GPU experiments</li>
                  <li>Built-in checkpointing and storage integration</li>
                </ul>
              </div>
            </div>
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

        <div className="sol-card reverse reveal" id="inference">
          <div className="sol-info">
            <h3 className="sol-title">Real-Time Inference</h3>
            <p className="sol-desc">
              Deploy high-throughput inference endpoints powered by NVIDIA H200 GPUs.
              Deliver real-time predictions for LLMs, vision, and multimodal applications — all while reducing latency and optimizing GPU utilization.
            </p>
            <div className="sol-feature-boxes-minimal">
              <div className="sol-f-group">
                <h4>Ideal For:</h4>
                <ul className="sol-f-list">
                  <li>Chatbots, copilots, and generative assistants</li>
                  <li>Model inference for NLP, CV, and speech</li>
                  <li>Edge and production inference pipelines</li>
                </ul>
              </div>
              <div className="sol-f-group">
                <h4>Highlights:</h4>
                <ul className="sol-f-list">
                  <li>Optimized for TensorRT, Triton, and ONNX Runtime</li>
                  <li>Auto-scaling infrastructure for dynamic workloads</li>
                  <li>Optional managed Kubernetes for MLOps integration</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="sol-visual">
            <div className="latency-wrap">
              <canvas id="latency-canvas" ref={latencyRef}></canvas>
            </div>
          </div>
        </div>

        <div className="sol-card reveal" id="rendering">
          <div className="sol-info">
            <h3 className="sol-title">Rendering & Simulation</h3>
            <p className="sol-desc">
              Harness the same high-performance GPUs that power AI research to deliver ultra-fast rendering, 3D visualization, and simulation at scale. Perfect for studios, design firms, and research labs requiring compute-intensive graphics workflows.
            </p>
            <div className="sol-feature-boxes-minimal">
              <div className="sol-f-group">
                <h4>Ideal For:</h4>
                <ul className="sol-f-list">
                  <li>3D rendering, VFX, and animation pipelines</li>
                  <li>Scientific simulations and digital twins</li>
                  <li>Industrial visualization and CAD workloads</li>
                </ul>
              </div>
              <div className="sol-f-group">
                <h4>Highlights:</h4>
                <ul className="sol-f-list">
                  <li>GPU-accelerated rendering engines (Blender, Unreal, Omniverse)</li>
                  <li>Low-latency data transfer and storage caching</li>
                  <li>Pay-as-you-go compute without infrastructure overhead</li>
                </ul>
              </div>
            </div>
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

        <div className="sol-card reverse reveal" id="research">
          <div className="sol-info">
            <h3 className="sol-title">Research & Experimentation</h3>
            <p className="sol-desc">
              Empower Innovation with On-Demand GPU Labs. NeoCloudz makes it easy for researchers and educators to explore AI and data science projects without complex setup or infrastructure management. Launch isolated JupyterLab® environments with instant GPU access and pre-installed frameworks.
            </p>
            <div className="sol-feature-boxes-minimal">
              <div className="sol-f-group">
                <h4>Ideal For:</h4>
                <ul className="sol-f-list">
                  <li>Foundation & frontier-scale model training</li>
                  <li>Fine-tuning large pretrained models</li>
                  <li>Distributed training using PyTorch DDP, DeepSpeed, or JAX</li>
                </ul>
              </div>
              <div className="sol-f-group">
                <h4>Highlights:</h4>
                <ul className="sol-f-list">
                  <li>Multi-node GPU clusters with high-speed interconnect</li>
                  <li>Elastic scaling for multi-GPU experiments</li>
                  <li>Built-in checkpointing and storage integration</li>
                </ul>
              </div>
            </div>
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
