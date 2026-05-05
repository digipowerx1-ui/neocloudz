import PageEffects from "@/features/page-effects/PageEffects";
import SolutionDetailShell, {
  type SolutionDetailData,
} from "@/features/solution-detail/SolutionDetailShell";

export const metadata = {
  title: "Rendering & Simulation — NeoCloudz",
  description:
    "Accelerate complex visualization and rendering workloads with GPU-accelerated engines on NVIDIA Blackwell B200.",
};

const DATA: SolutionDetailData = {
  eyebrow: "Rendering & Simulation",
  title: "Accelerate Complex",
  titleAccent: "Visualization Workloads.",
  lede: "Power 3D rendering, VFX, animation pipelines, scientific simulations, and digital twins on GPU-accelerated infrastructure with low-latency storage and pay-as-you-go compute.",
  primaryCta: { label: "Start Rendering", href: "/contact" },
  secondaryCta: { label: "View Pricing", href: "/pricing" },
  icon: "🎬",
  cardTitle: "Studio-grade rendering on demand",
  cardDescription:
    "GPU-accelerated rendering engines and low-latency caching deliver predictable throughput for VFX, simulation, and industrial visualization — without infrastructure overhead.",
  idealFor: [
    "3D rendering, VFX, and animation pipelines",
    "Scientific simulations and digital twins",
    "Industrial visualization and CAD workloads",
  ],
  highlights: [
    "GPU-accelerated engines: Blender, Unreal, Omniverse, Houdini",
    "Low-latency data transfer and NVMe storage caching",
    "Pay-as-you-go compute without infrastructure overhead",
    "Frame-perfect render farm orchestration via API",
  ],
  terminalTitle: "neocloudz — render-farm",
  terminalLines: [
    { line: "$ neocloudz render --engine omniverse --frames 1-240 --gpus 32", cls: "tl-cmd" },
    { line: "[INFO] Spinning up 32x B200 render workers...", cls: "tl-info" },
    { line: "[INFO] Mounting asset bucket s3://studio/scene-04", cls: "tl-muted" },
    { line: "[OK]   Workers ready — distributing 240 frames", cls: "tl-success" },
    { line: "[RENDER] Frame 001/240 — 3.2s — RTX denoised", cls: "tl-info" },
    { line: "[RENDER] Frame 050/240 — 2.9s — avg 3.1s/frame", cls: "tl-info" },
    { line: "[RENDER] Frame 120/240 — 2.8s — ETA 5m 30s", cls: "tl-info" },
    { line: "[OK]   Render complete — 240 frames in 12m 04s", cls: "tl-success" },
    { line: "[INFO] Output → s3://studio/scene-04/output/", cls: "tl-success" },
  ],
  related: [
    { label: "AI Model Training", href: "/solutions/ai-model-training" },
    { label: "AI Inference & Deployment", href: "/solutions/ai-inference-deployment" },
    { label: "Research & Experimentation", href: "/solutions/research-experimentation" },
  ],
};

export default function RenderingSimulationPage() {
  return (
    <PageEffects>
      <SolutionDetailShell data={DATA} />
    </PageEffects>
  );
}
