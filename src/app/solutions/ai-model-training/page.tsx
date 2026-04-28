import PageEffects from "@/features/page-effects/PageEffects";
import SolutionDetailShell, {
  type SolutionDetailData,
} from "@/features/solution-detail/SolutionDetailShell";

export const metadata = {
  title: "AI Model Training — NeoCloudz",
  description:
    "Train large language models, vision transformers, and multimodal systems at scale on NVIDIA Blackwell B200 with InfiniBand 400G fabric.",
};

const DATA: SolutionDetailData = {
  eyebrow: "AI Model Training",
  title: "Train the Models That",
  titleAccent: "Define the Future.",
  lede: "Leverage high-performance NVIDIA Blackwell infrastructure with NVLink and InfiniBand networking to train large language models, vision transformers, and multimodal systems at scale.",
  primaryCta: { label: "Train on Blackwell GPUs", href: "/contact" },
  secondaryCta: { label: "View Pricing", href: "/pricing" },
  icon: "🧠",
  cardTitle: "Foundation-scale training, zero friction",
  cardDescription:
    "NeoCloudz provides the compute power and I/O bandwidth required to accelerate time-to-results while maintaining cost efficiency. Future-ready for B300 and next-gen architectures.",
  idealFor: [
    "Foundation & frontier-scale model training",
    "Fine-tuning large pretrained models",
    "Distributed training using PyTorch DDP, DeepSpeed, or JAX",
  ],
  highlights: [
    "Multi-node GPU clusters with high-speed InfiniBand interconnect",
    "Elastic scaling for multi-GPU experiments — 1 to 128 nodes via API",
    "Built-in checkpointing and WEKA NVMe storage integration",
    "Supermicro liquid-cooled racks with sub-1.3 PUE efficiency",
  ],
  terminalTitle: "neocloudz — llm-training-job",
  terminalLines: [
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
  ],
  related: [
    { label: "AI Inference & Deployment", href: "/solutions/ai-inference-deployment" },
    { label: "Rendering & Simulation", href: "/solutions/rendering-simulation" },
    { label: "Research & Experimentation", href: "/solutions/research-experimentation" },
  ],
};

export default function AiModelTrainingPage() {
  return (
    <PageEffects>
      <SolutionDetailShell data={DATA} />
    </PageEffects>
  );
}
