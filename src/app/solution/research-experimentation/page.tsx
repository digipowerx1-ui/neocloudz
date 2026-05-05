import PageEffects from "@/features/page-effects/PageEffects";
import SolutionDetailShell, {
  type SolutionDetailData,
} from "@/features/solution-detail/SolutionDetailShell";

export const metadata = {
  title: "Research & Experimentation — NeoCloudz",
  description:
    "On-demand GPU labs for researchers and educators. Launch isolated JupyterLab environments with instant GPU access and pre-installed frameworks.",
};

const DATA: SolutionDetailData = {
  eyebrow: "Research & Experimentation",
  title: "Empower Innovation with",
  titleAccent: "On-Demand GPU Labs.",
  lede: "NeoCloudz makes it easy for researchers and educators to explore AI and data science projects without complex setup or infrastructure management. Launch isolated JupyterLab environments with instant GPU access.",
  primaryCta: { label: "Launch a Research Environment", href: "/contact" },
  secondaryCta: { label: "View Pricing", href: "/pricing" },
  icon: "🔬",
  cardTitle: "Zero-setup labs for AI research",
  cardDescription:
    "Pre-installed frameworks, secure dataset ingestion, and one-click environment cloning — built for academic researchers, R&D teams, and educators.",
  idealFor: [
    "Academic research, R&D, and AI experimentation",
    "Hands-on training and educational workshops",
    "Reproducible benchmarks and ablation studies",
  ],
  highlights: [
    "Instant JupyterLab on B200 — zero cold-start delay",
    "Pre-configured PyTorch, TensorFlow, JAX, HuggingFace",
    "Secure S3-compatible dataset ingestion (AES-256, TLS 1.3)",
    "One-click environment cloning to share with teammates",
  ],
  terminalTitle: "neocloudz — research-lab",
  terminalLines: [
    { line: "$ neocloudz lab start --gpu b200 --image pytorch-2.4-cuda12", cls: "tl-cmd" },
    { line: "[INFO] Provisioning isolated JupyterLab environment...", cls: "tl-info" },
    { line: "[INFO] Attaching B200 GPU (192 GB HBM3e)", cls: "tl-muted" },
    { line: "[INFO] Pre-installing: torch, transformers, jax, datasets", cls: "tl-info" },
    { line: "[OK]   Lab ready — https://lab-ax7.neocloudz.io", cls: "tl-success" },
    { line: "[INFO] Mounted dataset: s3://research/imagenet-1k", cls: "tl-info" },
    { line: "$ python finetune.py --model vit-l --epochs 10", cls: "tl-cmd" },
    { line: "[TRAIN] Epoch 1/10 — Loss: 1.842 — Acc: 64.3%", cls: "tl-info" },
    { line: "[TRAIN] Epoch 5/10 — Loss: 0.418 — Acc: 88.1%", cls: "tl-info" },
    { line: "[OK]   Run complete — clone env? `neocloudz lab clone ax7`", cls: "tl-success" },
  ],
  related: [
    { label: "AI Model Training", href: "/solutions/ai-model-training" },
    { label: "AI Inference & Deployment", href: "/solutions/ai-inference-deployment" },
    { label: "Rendering & Simulation", href: "/solutions/rendering-simulation" },
  ],
};

export default function ResearchExperimentationPage() {
  return (
    <PageEffects>
      <SolutionDetailShell data={DATA} />
    </PageEffects>
  );
}
