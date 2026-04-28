import Link from "next/link";
import PageEffects from "@/features/page-effects/PageEffects";

export const metadata = {
  title: "Products — NeoCloudz",
  description:
    "Next-generation AI infrastructure, delivered as a service — Compute, AI Cloud, Self-Service Clusters, Managed Kubernetes, AI Storage, JupyterLab, and Hardware Platforms.",
};

interface Product {
  eyebrow: string;
  icon: string;
  name: string;
  bullets: string[];
  cta: { label: string; href: string };
}

const PRODUCTS: Product[] = [
  {
    eyebrow: "Compute as a Service",
    icon: "⚙️",
    name: "Elastic Compute for AI and HPC Workloads",
    bullets: [
      "Bare-metal and virtualized GPU instances",
      "Auto-scaling and API-based provisioning",
      "Optimized for TensorFlow, PyTorch, JAX, and custom CUDA workloads",
      "Available in both shared and dedicated configurations",
    ],
    cta: { label: "Deploy Compute Nodes", href: "/products/gpu-as-a-service" },
  },
  {
    eyebrow: "AI Cloud",
    icon: "☁️",
    name: "Fully Managed AI Cloud for Generative and Predictive Models",
    bullets: [
      "Generative AI (LLMs, diffusion models, multimodal architectures)",
      "Fine-tuning and experimentation",
      "MLOps pipelines and production inference",
      "Pre-built environments for HuggingFace, vLLM, and TensorRT",
    ],
    cta: { label: "Deploy AI Cloud", href: "/contact" },
  },
  {
    eyebrow: "Self-Service AI Clusters",
    icon: "🧩",
    name: "Instant Multi-Node Clusters — Built for Scale",
    bullets: [
      "1-click cluster deployment",
      "InfiniBand fabric and distributed storage",
      "Supports PyTorch DDP, Ray, and MPI workloads",
      "Customizable node templates and auto-teardown options",
    ],
    cta: { label: "Create a Cluster", href: "/contact" },
  },
  {
    eyebrow: "Managed Kubernetes for AI",
    icon: "🛠️",
    name: "GPU-Ready Kubernetes, Fully Managed",
    bullets: [
      "NVIDIA GPU operator pre-installed",
      "Auto node scaling and health monitoring",
      "CI/CD integrations for continuous model deployment",
      "Enterprise SLAs and private networking",
    ],
    cta: { label: "About Managed Kubernetes", href: "/contact" },
  },
  {
    eyebrow: "AI Storage",
    icon: "💾",
    name: "High-Throughput Storage Optimized for AI Pipelines",
    bullets: [
      "NVMe-backed distributed architecture",
      "POSIX-compliant, S3-compatible interface",
      "Tiered hot/cold storage with data lifecycle policies",
      "Integrated with AI Cloud and Clusters",
    ],
    cta: { label: "View Storage Options", href: "/contact" },
  },
  {
    eyebrow: "JupyterLab® Applications",
    icon: "📓",
    name: "Notebook Environments, Production-Ready",
    bullets: [
      "Isolated containerized notebooks",
      "Built-in data mounting and secret management",
      "Integration with NeoCloudz AI Cloud APIs",
      "Support for TensorFlow, PyTorch, Hugging Face, and RAPIDS",
    ],
    cta: { label: "Start with JupyterLab", href: "/contact" },
  },
];

const HARDWARE_BULLETS: string[] = [
  "NVIDIA Blackwell GPUs — frontier-scale model training (B200 available now • B300 coming Q1 2026)",
  "NVIDIA H200 GPUs — for inference, fine-tuning, and production workloads",
  "InfiniBand Networking — 400 Gb/s interconnect for distributed training",
  "NVMe Storage Fabric — high-speed, low-latency parallel file system",
];

export default function ProductsPage() {
  return (
    <PageEffects>
      {/* HERO */}
      <section className="hero" style={{ minHeight: "70vh" }}>
        <div className="hero-grid"></div>
        <div className="aurora-1"></div>
        <div className="aurora-2"></div>
        <div className="aurora-3"></div>

        <div className="hero-content">
          <div className="hero-tag">
            <span className="hero-tag-dot"></span>
            Products
          </div>
          <h1>
            Next-Generation AI Infrastructure,{" "}
            <span className="g">Delivered as a Service.</span>
          </h1>
          <p className="hero-sub">
            A purpose-built suite of GPU-powered products covering every stage of the
            AI lifecycle — compute, storage, orchestration, and notebooks.
          </p>
          <div className="hero-ctas">
            <Link href="/contact" className="btn btn-green btn-lg">
              Request Private Clusters ▶
            </Link>
            <Link href="/contact" className="btn btn-outline btn-lg">
              Launch Instances →
            </Link>
          </div>
        </div>
      </section>

      {/* PRODUCT CATALOG */}
      <section className="solutions" id="catalog">
        <div className="section-inner">
          <div className="section-label reveal">// Product Catalog</div>
          <h2 className="section-title reveal">
            One platform. <span className="g">Every workload.</span>
          </h2>
          <p className="section-sub reveal">
            Pick a product to dive deeper, or combine them to build a complete AI
            stack on NVIDIA Blackwell infrastructure.
          </p>

          {PRODUCTS.map((p, i) => (
            <div
              key={p.eyebrow}
              className={`sol-card reveal mt-16${i % 2 === 1 ? " reverse" : ""}`}
            >
              <div className="sol-info">
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    letterSpacing: 3,
                    textTransform: "uppercase",
                    color: "var(--green)",
                    marginBottom: 12,
                  }}
                >
                  {p.eyebrow}
                </div>
                <span className="sol-icon">{p.icon}</span>
                <h3 className="sol-title">{p.name}</h3>
                <ul className="sol-features">
                  {p.bullets.map((b, bi) => (
                    <li key={bi}>{b}</li>
                  ))}
                </ul>
                <div style={{ marginTop: 32 }}>
                  <Link href={p.cta.href} className="btn btn-green">
                    {p.cta.label} →
                  </Link>
                </div>
              </div>
              <div className="sol-visual">
                <div
                  className="prod-card"
                  style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 48,
                    textAlign: "center",
                  }}
                >
                  <div
                    className="prod-icon-wrap"
                    style={{ width: 96, height: 96, fontSize: 44 }}
                  >
                    {p.icon}
                  </div>
                  <div
                    className="prod-name"
                    style={{ fontSize: 18, marginTop: 24 }}
                  >
                    {p.eyebrow}
                  </div>
                  <p className="prod-desc" style={{ marginBottom: 0 }}>
                    {p.name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HARDWARE PLATFORMS */}
      <section className="solutions" id="hardware" style={{ paddingTop: 0 }}>
        <div className="section-inner">
          <div className="section-label reveal">// Hardware Platforms</div>
          <h2 className="section-title reveal">
            Powered by the World&rsquo;s{" "}
            <span className="g">Most Advanced GPUs.</span>
          </h2>

          <div className="sol-card reveal mt-16">
            <div className="sol-info">
              <span className="sol-icon">🛰️</span>
              <p className="sol-desc">
                NeoCloudz runs on the latest NVIDIA Blackwell and H200 platforms with
                full InfiniBand fabric and NVMe storage — engineered end-to-end for
                training, inference, and production AI.
              </p>
              <ul className="sol-features">
                {HARDWARE_BULLETS.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
              <div style={{ marginTop: 32 }}>
                <Link href="/contact" className="btn btn-green">
                  Explore Hardware →
                </Link>
              </div>
            </div>
            <div className="sol-visual">
              <div
                className="prod-card"
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  padding: 36,
                }}
              >
                <div className="prod-name">NVIDIA Blackwell B200</div>
                <p className="prod-desc">
                  192 GB HBM3e · SXM5 · 9 PFLOPS · Available now
                </p>
                <div className="prod-name">NVIDIA H200</div>
                <p className="prod-desc">
                  141 GB HBM3e · Optimized for inference and fine-tuning
                </p>
                <div className="prod-name">InfiniBand 400G NDR</div>
                <p className="prod-desc">
                  3.2 Tbit/s per node · Full fabric topology
                </p>
                <div className="prod-name">NVMe Storage Fabric</div>
                <p className="prod-desc">
                  Sub-10μs latency · 1.4 TB/s throughput
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-banner" id="cta">
        <div className="cta-content">
          <h2>
            Your AI Infrastructure <span className="g">Starts Here.</span>
          </h2>
          <p>
            Request private clusters or launch on-demand AI instances on NVIDIA
            Blackwell B200 in under 60 seconds.
          </p>
          <div className="cta-btns">
            <Link href="/contact" className="btn btn-green btn-lg">
              Request Private Clusters ▶
            </Link>
            <Link href="/contact" className="btn btn-outline btn-lg">
              Launch AI Instances →
            </Link>
          </div>
        </div>
      </section>
    </PageEffects>
  );
}
