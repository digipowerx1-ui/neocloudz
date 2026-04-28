import PageEffects from "@/features/page-effects/PageEffects";
import ProductDetailShell, {
  type ProductDetailData,
} from "@/features/product-detail/ProductDetailShell";

export const metadata = {
  title: "GPU as a Service — NeoCloudz",
  description:
    "On-demand GPUs. No contracts. No guesswork. Cloud GPU and bare metal infrastructure on NVIDIA Blackwell B200, provisioned in minutes.",
};

const DATA: ProductDetailData = {
  eyebrow: "GPU as a Service",
  title: "On-Demand GPUs.",
  titleAccent: "No Contracts. No Guesswork.",
  lede: "Cloud GPU and Bare Metal GPU infrastructure for AI, HPC, and enterprise workloads. Spin up NVIDIA Blackwell B200 in minutes — pay only for what you use.",
  primaryCta: { label: "Launch GPU", href: "/contact" },
  secondaryCta: { label: "View Pricing", href: "/pricing" },

  offeringsLabel: "What We Offer",
  offeringsTitle: "Flexible GPU infrastructure",
  offeringsAccent: "designed for your workload.",
  offeringsSub:
    "Enterprise-grade infrastructure with transparent pricing and no hidden fees.",
  offerings: [
    {
      icon: "☁️",
      title: "Shared Cloud GPUs",
      description:
        "Cost-effective virtualized compute for development, testing, and experimentation. Spin up isolated containers in seconds.",
    },
    {
      icon: "🖥️",
      title: "Dedicated Bare-Metal",
      description:
        "Full hardware isolation with no virtualization overhead for production workloads. Maximum performance and predictability.",
    },
    {
      icon: "📈",
      title: "Flexible Capacity",
      description:
        "Scale from a single GPU to hundreds with short-term or long-term commitments. Pay-as-you-go or reserve for up to 35% off.",
    },
  ],

  featureLabel: "Bare Metal & Virtualized GPUs",
  featureTitle: "Simple deployment.",
  featureAccent: "Provisioned in minutes.",
  featureDescription:
    "Deploy GPUs in minutes through our intuitive platform. Spin up GPU infrastructure instantly via API or dashboard with full programmatic control and comprehensive API docs.",
  featureIcon: "⚡",
  featureBullets: [
    "Redundant power and networking across U.S. Tier III data centers",
    "Secure tenant isolation with dedicated VLANs and private networking",
    "Continuous monitoring & 24/7 support included on every plan",
    "Optional compliance-ready deployments (SOC 2, HIPAA, FedRAMP)",
    "Full API & CLI control with first-class Terraform provider",
  ],
  featureCta: { label: "Read API Docs", href: "/contact" },
  terminalTitle: "neocloudz — gpu-provisioning",
  terminalLines: [
    { line: "$ neocloudz gpu launch --type b200 --mode bare-metal --region us-east", cls: "tl-cmd" },
    { line: "[INFO] Authenticating API key...", cls: "tl-info" },
    { line: "[INFO] Allocating 1x NVIDIA Blackwell B200 (180 GB SXM)", cls: "tl-info" },
    { line: "[INFO] Provisioning Supermicro AI-optimized chassis", cls: "tl-muted" },
    { line: "[INFO] Configuring 3.2 Tbit/s InfiniBand fabric", cls: "tl-info" },
    { line: "[OK]   Instance ready in 47s — i-b200-ax721", cls: "tl-success" },
    { line: "[INFO] SSH: ssh root@b200-ax721.neocloudz.io", cls: "tl-info" },
    { line: "$ ssh root@b200-ax721.neocloudz.io", cls: "tl-cmd" },
    { line: "[METRICS] GPU Util: 0% | VRAM: 192 GB free | Power: 240W idle", cls: "tl-success" },
    { line: "[OK]   Ready for workload — billed by the minute", cls: "tl-success" },
  ],

  pillars: [
    {
      title: "Sustainable Power",
      description:
        "Renewable + natural-gas hybrid energy with sub-1.3 PUE efficiency across DigiPowerX low-carbon facilities.",
    },
    {
      title: "Indie Developers",
      description:
        "Affordable GPU access to build and scale AI-powered applications. Fractional GPUs from $7/hr.",
    },
    {
      title: "Enterprise Teams",
      description:
        "Dedicated bare-metal racks with 99.99% uptime SLA, priority support, and white-glove onboarding.",
    },
    {
      title: "Research Labs",
      description:
        "On-demand JupyterLab environments with pre-installed PyTorch, TensorFlow, JAX, and HuggingFace.",
    },
    {
      title: "Global Coverage",
      description:
        "Low-latency access to high-performance compute, worldwide. U.S.-owned and operated AI infrastructure.",
    },
    {
      title: "Transparent Pricing",
      description:
        "Per-minute billing, $0 egress fees, and volume discounts up to 40% off — no hidden charges, ever.",
    },
  ],

  related: [
    { label: "AI Factory as a Service", href: "/products" },
    { label: "ML as a Service", href: "/products" },
    { label: "All Solutions", href: "/solutions" },
    { label: "Pricing", href: "/pricing" },
  ],
};

export default function GpuAsAServicePage() {
  return (
    <PageEffects>
      <ProductDetailShell data={DATA} />
    </PageEffects>
  );
}
