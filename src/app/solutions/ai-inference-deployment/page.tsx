import PageEffects from "@/features/page-effects/PageEffects";
import SolutionDetailShell, {
  type SolutionDetailData,
} from "@/features/solution-detail/SolutionDetailShell";

export const metadata = {
  title: "AI Inference & Deployment — NeoCloudz",
  description:
    "Deploy high-throughput inference endpoints powered by NVIDIA H200 GPUs. Real-time predictions for LLMs, vision, and multimodal applications.",
};

const DATA: SolutionDetailData = {
  eyebrow: "AI Inference & Deployment",
  title: "Serve Models at",
  titleAccent: "Lightning Speed.",
  lede: "Deploy high-throughput inference endpoints powered by NVIDIA H200 GPUs. Deliver real-time predictions for LLMs, vision, and multimodal applications — all while reducing latency and optimizing GPU utilization.",
  primaryCta: { label: "Deploy Inference", href: "/contact" },
  secondaryCta: { label: "View Pricing", href: "/pricing" },
  icon: "⚡",
  cardTitle: "Sub-5ms p99 inference, production-ready",
  cardDescription:
    "Optimized for TensorRT, Triton, and ONNX Runtime with auto-scaling infrastructure for dynamic workloads. Optional managed Kubernetes for full MLOps integration.",
  idealFor: [
    "Chatbots, copilots, and generative assistants",
    "Model inference for NLP, CV, and speech",
    "Edge and production inference pipelines",
  ],
  highlights: [
    "Optimized runtimes: TensorRT, Triton, ONNX Runtime, vLLM",
    "Auto-scaling endpoints — scale to zero idle, burst in <60s",
    "Optional managed Kubernetes for MLOps integration",
    "Real-time observability via Prometheus + Grafana",
  ],
  terminalTitle: "neocloudz — inference-deploy",
  terminalLines: [
    { line: "$ neocloudz deploy --model llama-3.1-70b --gpu h200 --replicas 4", cls: "tl-cmd" },
    { line: "[INFO] Pulling model weights from registry...", cls: "tl-info" },
    { line: "[INFO] Building TensorRT engine for H200...", cls: "tl-muted" },
    { line: "[OK]   Engine compiled in 47s — FP8 quantization enabled", cls: "tl-success" },
    { line: "[INFO] Provisioning 4x H200 inference replicas...", cls: "tl-info" },
    { line: "[INFO] Configuring autoscaler (min: 1, max: 16)", cls: "tl-info" },
    { line: "[OK]   Endpoint live: https://api.neocloudz.io/v1/llama-70b", cls: "tl-success" },
    { line: "$ curl -X POST $ENDPOINT --data '{\"prompt\": \"Hello\"}'", cls: "tl-cmd" },
    { line: "[METRICS] p50: 2.1ms | p99: 4.6ms | RPS: 1,840", cls: "tl-success" },
    { line: "[METRICS] GPU Util: 92% | Tokens/sec: 18,400", cls: "tl-info" },
  ],
  related: [
    { label: "AI Model Training", href: "/solutions/ai-model-training" },
    { label: "Rendering & Simulation", href: "/solutions/rendering-simulation" },
    { label: "Research & Experimentation", href: "/solutions/research-experimentation" },
  ],
};

export default function AiInferenceDeploymentPage() {
  return (
    <PageEffects>
      <SolutionDetailShell data={DATA} />
    </PageEffects>
  );
}
