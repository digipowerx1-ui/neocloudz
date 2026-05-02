import Link from "next/link";
import PageEffects from "@/features/page-effects/PageEffects";
import ProductHero from "@/features/products/ProductHero";
import ProductLottieVisual from "@/features/products/ProductLottieVisual";

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
  image?: string;
  video?: string;
  lottie?: "bigDataCenter" | "dataCenter" | "gpu" | "node" | "serverRack" | "storage" | "vps";
  id?: string;
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
    lottie: "vps",
    id: "gpu"
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
    lottie: "dataCenter",
    id: "ml"
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
    lottie: "node",
    id: "factory"
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
    lottie: "serverRack",
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
    lottie: "storage",
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
    lottie: "bigDataCenter",
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
      <ProductHero />

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
              id={p.id}
              className={`sol-card reveal mt-16${i % 2 === 0 ? " reverse" : ""}${p.lottie ? " product-lottie-row" : ""}`}
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
                  className={`prod-card${p.lottie ? " product-lottie-card" : ""}`}
                  style={{
                    minHeight: p.lottie ? undefined : 340,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 0,
                    textAlign: "center",
                    overflow: p.lottie ? "visible" : "hidden",
                    position: "relative",
                  }}
                >
                  {p.lottie ? (
                    <ProductLottieVisual label={`${p.name} animation`} type={p.lottie} />
                  ) : p.video ? (
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        position: "absolute",
                        inset: 0,
                      }}
                    >
                      <source src={p.video} type="video/mp4" />
                    </video>
                  ) : p.image ? (
                    <img
                      src={p.image}
                      alt={p.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        position: "absolute",
                        inset: 0,
                      }}
                    />
                  ) : null}
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

          <div className="sol-card product-lottie-row reveal mt-16">
            <div className="sol-info">
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
                className="prod-card product-lottie-card"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 0,
                  overflow: "visible",
                  position: "relative",
                }}
              >
                <ProductLottieVisual label="NVIDIA Blackwell GPU animation" type="gpu" />
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
