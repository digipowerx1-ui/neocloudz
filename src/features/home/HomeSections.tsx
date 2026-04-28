"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  useDataflowCanvas,
  useHomeWaveCanvas,
  useNvlinkCanvas,

} from "./canvases";
import {
  useBenchBars,
  useCtaParticleBurst,
  useGpuCatalogSparklines,
  usePricingSpotlight,
  useStatCountUpAndRings,
  useStatRingPulse,
  useStorageBandwidthBars,
} from "./effects";
import { useRackSlots } from "./useRackSlots";

const TICKER_ITEMS: Array<[string, string]> = [
  ["NVIDIA B200", "On-Demand"],
  ["Grace Blackwell GB200", "Bare Metal"],
  ["WEKA Storage", "<10μs Latency"],
  ["InfiniBand 400G", "Fabric"],
  ["NVLink 4.0", "900 GB/s"],
  ["99.99%", "Uptime SLA"],
  ["Vera Rubin", "Coming 2025"],
  ["B300", "On-Demand"],
  ["Grace Blackwell GB300", "Bare Metal"],
  ["Instant Provisioning", "<60s"],
];

export function HomeTicker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="ticker-wrap">
      <div className="ticker-track">
        {items.map((it, i) => (
          <span key={i} className="ticker-item">
            <span className="dot" />
            <span className="bright">{it[0]}</span> {it[1]}
          </span>
        ))}
      </div>
    </div>
  );
}

export function HomeGpuCatalog() {
  const ref = useRef<HTMLElement>(null);
  useGpuCatalogSparklines(ref);
  return (
    <section className="hp-section dark" id="gpus" ref={ref}>
      <div className="hp-label reveal">GPU Catalog</div>
      <div className="hp-h2">
        The World&#39;s Most Powerful<br />
        <span className="g">AI Compute — On Demand.</span>
      </div>
      <p className="hp-sub">
        Rent single GPUs, full nodes, or entire bare-metal clusters. Provision in
        under 60 seconds with full root access and no shared-tenancy noise.
      </p>

      <div className="gpu-catalog">
        <div className="gpu-cat-card blackwell">
          <div className="gpu-cat-badge live">Available Now</div>
          <div className="gpu-cat-name">Blackwell</div>
          <div className="gpu-cat-series">NVIDIA B200 &amp; B300 · On-Demand &amp; Reserved</div>
          <div className="gpu-cat-specs">
            <div className="spec-line"><span className="spec-k">GPU Memory</span><span className="spec-v g">192 GB HBM3e</span></div>
            <div className="spec-line"><span className="spec-k">FP8 Tensor</span><span className="spec-v">9 PetaFLOPs / GPU</span></div>
            <div className="spec-line"><span className="spec-k">NVLink BW</span><span className="spec-v">1.8 TB/s (B300)</span></div>
            <div className="spec-line"><span className="spec-k">Max Cluster</span><span className="spec-v">512 GPUs</span></div>
            <div className="spec-line"><span className="spec-k">Networking</span><span className="spec-v">InfiniBand 400G</span></div>
            <div className="spec-line"><span className="spec-k">Access</span><span className="spec-v g">On-Demand · Reserved</span></div>
          </div>
          <a href="#" className="gpu-cat-cta">Deploy Now →</a>
          <div className="beam" />
        </div>

        <div className="gpu-cat-card grace">
          <div className="gpu-cat-badge live">Available Now</div>
          <div className="gpu-cat-name">Grace Blackwell</div>
          <div className="gpu-cat-series">NVIDIA GB200 &amp; GB300 · Bare Metal</div>
          <div className="gpu-cat-specs">
            <div className="spec-line"><span className="spec-k">Config</span><span className="spec-v b">72× GPU NVL72 Rack</span></div>
            <div className="spec-line"><span className="spec-k">GPU Memory</span><span className="spec-v">192 GB HBM3e / GPU</span></div>
            <div className="spec-line"><span className="spec-k">CPU+GPU BW</span><span className="spec-v b">900 GB/s NVLink-C2C</span></div>
            <div className="spec-line"><span className="spec-k">Total Rack Mem</span><span className="spec-v">13.8 TB unified</span></div>
            <div className="spec-line"><span className="spec-k">Networking</span><span className="spec-v">InfiniBand NDR 400G</span></div>
            <div className="spec-line"><span className="spec-k">Access</span><span className="spec-v b">Bare Metal · Dedicated</span></div>
          </div>
          <a href="#" className="gpu-cat-cta">Request Cluster →</a>
          <div className="beam" />
        </div>

        <div className="gpu-cat-card vera">
          <div className="vera-overlay" />
          <div className="gpu-cat-badge soon">Coming 2025</div>
          <div className="gpu-cat-name" style={{ color: "rgba(240,245,240,0.4)" }}>
            Vera Rubin
          </div>
          <div className="gpu-cat-series">NVIDIA Rubin &amp; Rubin Ultra</div>
          <div className="gpu-cat-specs">
            <div className="spec-line"><span className="spec-k">GPU Memory</span><span className="spec-v" style={{ color: "var(--muted)" }}>288 GB HBM4 (est.)</span></div>
            <div className="spec-line"><span className="spec-k">FP4 Tensor</span><span className="spec-v" style={{ color: "var(--muted)" }}>~3.6× B200 perf</span></div>
            <div className="spec-line"><span className="spec-k">NVLink Gen</span><span className="spec-v" style={{ color: "var(--muted)" }}>NVLink 5.0</span></div>
            <div className="spec-line"><span className="spec-k">Config</span><span className="spec-v" style={{ color: "var(--muted)" }}>NVL144 Rack</span></div>
            <div className="spec-line"><span className="spec-k">Networking</span><span className="spec-v" style={{ color: "var(--muted)" }}>InfiniBand 800G</span></div>
            <div className="spec-line"><span className="spec-k">Access</span><span className="spec-v" style={{ color: "var(--amber)" }}>Join Waitlist</span></div>
          </div>
          <a href="#" className="gpu-cat-cta">Join Waitlist →</a>
        </div>
      </div>
    </section>
  );
}

export function HomeNvlink() {
  const ref = useRef<HTMLCanvasElement>(null);
  useNvlinkCanvas(ref);
  return (
    <div className="nvlink-section reveal">
      <div className="hp-label" style={{ justifyContent: "center" }}>
        NVLink 4.0 · All-to-All Mesh
      </div>
      <div className="hp-h2" style={{ fontSize: "clamp(24px,2.5vw,38px)" }}>
        Every GPU Talks to Every GPU.<br />
        <span className="g">At 900 GB/s.</span>
      </div>
      <canvas id="nvlink-canvas" ref={ref} width={960} height={260} />
    </div>
  );
}

const LOGO_NAMES = [
  "Mistral AI",
  "Cohere",
  "Together AI",
  "Replicate",
  "Modal",
  "Weights & Biases",
  "Hugging Face",
  "LlamaIndex",
];

export function HomeLogos() {
  return (
    <div className="logos-section">
      <div className="logos-label">Trusted by AI teams at</div>
      <div className="logos-row">
        {LOGO_NAMES.map((n) => (
          <div key={n} className="logo-pill">
            {n}
          </div>
        ))}
      </div>
    </div>
  );
}

interface BenchBar {
  pct: number;
  label: string;
  variant: "neo" | "comp1" | "comp2";
}

const BENCH_ROWS: Array<{ name: string; bars: BenchBar[] }> = [
  {
    name: "LLM Training Throughput",
    bars: [
      { pct: 97, label: "980 TFLOPS", variant: "neo" },
      { pct: 71, label: "714 TFLOPS", variant: "comp1" },
      { pct: 58, label: "584 TFLOPS", variant: "comp2" },
    ],
  },
  {
    name: "Storage I/O Throughput",
    bars: [
      { pct: 100, label: "1.4 TB/s", variant: "neo" },
      { pct: 45, label: "630 GB/s", variant: "comp1" },
      { pct: 29, label: "400 GB/s", variant: "comp2" },
    ],
  },
  {
    name: "Inter-node Network BW",
    bars: [
      { pct: 100, label: "400G IB", variant: "neo" },
      { pct: 62, label: "200G IB", variant: "comp1" },
      { pct: 38, label: "25G ETH", variant: "comp2" },
    ],
  },
  {
    name: "Time-to-First-GPU",
    bars: [
      { pct: 100, label: "<60s", variant: "neo" },
      { pct: 25, label: "~4 min", variant: "comp1" },
      { pct: 8, label: "~12 min", variant: "comp2" },
    ],
  },
  {
    name: "Peak GPU Utilization",
    bars: [
      { pct: 97, label: "97%", variant: "neo" },
      { pct: 81, label: "81%", variant: "comp1" },
      { pct: 72, label: "72%", variant: "comp2" },
    ],
  },
];

export function HomeBenchmark() {
  const ref = useRef<HTMLDivElement>(null);
  useBenchBars(ref);
  return (
    <div className="bench-section" ref={ref}>
      <div className="bench-grid">
        <div className="bench-intro">
          <div className="hp-label">Performance</div>
          <div className="hp-h2" style={{ fontSize: "clamp(26px,2.8vw,42px)" }}>
            Fastest Bare-Metal<br />
            <span className="g">On the Planet.</span>
          </div>
          <p className="hp-sub" style={{ fontSize: "15px", marginTop: "12px" }}>
            Benchmark results across leading workloads. NeoCloudz consistently
            outperforms shared-cloud competitors on raw GPU throughput, storage I/O,
            and network bandwidth.
          </p>
          <div className="bench-legend">
            <div className="bench-leg-item">
              <div
                className="bench-leg-dot"
                style={{ background: "linear-gradient(90deg,#1aaa4e,#2dff7a)" }}
              />
              NeoCloudz B300
            </div>
            <div className="bench-leg-item">
              <div
                className="bench-leg-dot"
                style={{ background: "linear-gradient(90deg,#1a3060,#4dc8ff)" }}
              />
              CoreWeave
            </div>
            <div className="bench-leg-item">
              <div
                className="bench-leg-dot"
                style={{ background: "linear-gradient(90deg,#30201a,#ff8c4d)" }}
              />
              AWS p5
            </div>
          </div>
        </div>

        <div className="bench-bars">
          {BENCH_ROWS.map((row, ri) => (
            <div className="bench-row" key={ri}>
              <div className="bench-label-row">
                <span className="bench-name">{row.name}</span>
                <span className="bench-val" />
              </div>
              {row.bars.map((bar, bi) => (
                <div
                  className="bench-track"
                  key={bi}
                  style={bi === 0 ? undefined : { marginTop: "3px" }}
                >
                  <div
                    className={`bench-fill ${bar.variant}`}
                    data-pct={bar.pct}
                    data-label={bar.label}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="anim-divider" style={{ marginTop: "60px" }} />
    </div>
  );
}

export function HomeRack() {
  const frontRef = useRef<HTMLDivElement>(null);
  useRackSlots(frontRef);
  return (
    <div className="rack-section-row">
      <div className="rack-visual">
        <div className="rack-body">
          <div className="rack-face rack-front" ref={frontRef} />
          <div className="rack-face rack-right" />
          <div className="rack-face rack-top" />
        </div>
        <div className="rack-glow" />
        <div className="rack-badge">H100 SXM5 × 8</div>
      </div>
      <div style={{ maxWidth: "400px" }}>
        <div className="hp-label">AI-Ready Infrastructure</div>
        <div className="hp-h2" style={{ fontSize: "clamp(24px,2.5vw,38px)" }}>
          NVL72 Rack.<br />
          <span className="g">Fully Dedicated.</span>
        </div>
        <p className="hp-sub" style={{ fontSize: "15px", marginTop: "12px" }}>
          72 Grace Blackwell GPUs in one rack. 13.8 TB unified HBM3e memory pool.
          900 GB/s NVLink-C2C fabric. Zero multi-tenancy — every cycle is yours.
        </p>
        <div className="rack-stats">
          <div className="rack-stat">
            <div className="rack-stat-val g">72</div>
            <div className="rack-stat-lbl">GPUs / rack</div>
          </div>
          <div className="rack-stat">
            <div className="rack-stat-val b">13.8TB</div>
            <div className="rack-stat-lbl">unified mem</div>
          </div>
          <div className="rack-stat">
            <div className="rack-stat-val a">900</div>
            <div className="rack-stat-lbl">GB/s C2C BW</div>
          </div>
          <div className="rack-stat">
            <div className="rack-stat-val g">400G</div>
            <div className="rack-stat-lbl">InfiniBand</div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface PriceCard {
  name: string;
  sub: string;
  amount: string;
  amountSize?: string;
  period: string;
  features: string[];
  cta: string;
  ctaVariant: "primary" | "outline";
  featured?: boolean;
}

const PRICE_CARDS: PriceCard[] = [
  {
    name: "NVIDIA B200",
    sub: "192 GB HBM3e · On-Demand",
    amount: "$28",
    period: "per GPU · billed by the minute",
    features: [
      "Full GPU isolation",
      "InfiniBand 400G fabric",
      "NVMe local scratch storage",
      "SSH + Jupyter access",
      "No minimum commitment",
    ],
    cta: "Deploy B200 →",
    ctaVariant: "outline",
  },
  {
    name: "NVIDIA B300",
    sub: "192 GB HBM3e · On-Demand",
    amount: "$36",
    period: "per GPU · billed by the minute",
    features: [
      "1.8 TB/s NVLink bandwidth",
      "InfiniBand 400G fabric",
      "WEKA storage integration",
      "Full root bare-metal access",
      "Priority support SLA",
    ],
    cta: "Deploy B300 →",
    ctaVariant: "primary",
    featured: true,
  },
  {
    name: "Grace Blackwell GB200",
    sub: "NVL72 Rack · Bare Metal",
    amount: "Custom",
    amountSize: "28px",
    period: "72-GPU rack · reserved",
    features: [
      "Dedicated NVL72 rack",
      "900 GB/s NVLink-C2C",
      "13.8 TB unified memory",
      "WEKA distributed storage",
      "24/7 dedicated support",
    ],
    cta: "Contact Sales →",
    ctaVariant: "outline",
  },
  {
    name: "Grace Blackwell GB300",
    sub: "NVL72 Rack · Bare Metal",
    amount: "Custom",
    amountSize: "28px",
    period: "72-GPU rack · reserved",
    features: [
      "Next-gen NVL72 rack",
      "Enhanced NVLink-C2C BW",
      "HBM3e Pro memory",
      "WEKA distributed storage",
      "Dedicated infra engineer",
    ],
    cta: "Contact Sales →",
    ctaVariant: "outline",
  },
];

export function HomePricing() {
  const sectionRef = useRef<HTMLElement>(null);


  usePricingSpotlight(sectionRef);
  return (
    <section className="hp-section mid" id="pricing" ref={sectionRef}>

      <div className="hp-label">Pricing</div>
      <div className="hp-h2">
        Simple, <span className="g">Transparent Pricing.</span>
      </div>
      <p className="hp-sub">
        No hidden fees. No egress charges. Pay only for the compute you use — by the
        hour or lock in savings with reserved instances.
      </p>

      <div className="pricing-grid">
        {PRICE_CARDS.map((card, i) => (
          <div
            key={i}
            className={`price-card${card.featured ? " featured" : ""}`}
          >
            <div className="price-gpu-name">{card.name}</div>
            <div className="price-gpu-sub">{card.sub}</div>
            <div
              className="price-amount"
              style={card.amountSize ? { fontSize: card.amountSize } : undefined}
            >
              {card.amount}
              {card.amount.startsWith("$") ? (
                <span className="price-amount-suffix">/hr</span>
              ) : null}
            </div>
            <div className="price-period">{card.period}</div>
            <ul className="price-features">
              {card.features.map((f, fi) => (
                <li className="price-feature" key={fi}>
                  {f}
                </li>
              ))}
            </ul>
            <a href="#" className={`price-btn ${card.ctaVariant}`}>
              {card.cta}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

const WHY_ITEMS = [
  {
    icon: "⚡",
    title: "Instant Provisioning",
    desc: "Spin up a B200 or Grace Blackwell cluster in under 60 seconds. No ticketing, no wait lists, no procurement cycles — just compute, immediately.",
  },
  {
    icon: "🔒",
    title: "True Bare Metal. No Hypervisor.",
    desc: "Grace Blackwell clusters ship with full bare-metal access. No virtualization overhead, no noisy neighbors — your workloads get 100% of the hardware.",
  },
  {
    icon: "📡",
    title: "Ultra-Low Latency Fabric",
    desc: "Every cluster connects via InfiniBand 400G with sub-microsecond MPI latency. NCCL all-reduce at line rate — critical for large-model distributed training.",
  },
  {
    icon: "💾",
    title: "WEKA Storage — Built In",
    desc: "WEKA parallel filesystem delivers <10μs latency at full GPU bandwidth. No storage bottlenecks during training — checkpoints, datasets, and model weights move at wire speed.",
  },
  {
    icon: "📈",
    title: "Scale From 1 GPU to 1,000",
    desc: "Start with a single on-demand B200, grow to a full Grace Blackwell cluster without re-architecting your stack. Same API, same credentials, same team.",
  },
];

interface StatCardData {
  initial: string;
  ringPct: number;
  ringStroke: string;
  ringPctText: string;
  ringPctColor?: string;
  label: string;
}

const STAT_CARDS: StatCardData[] = [
  {
    initial: "<60s",
    ringPct: 98,
    ringStroke: "var(--green)",
    ringPctText: "98%",
    label: "Average time from signup to first GPU online",
  },
  {
    initial: "99.99%",
    ringPct: 99.99,
    ringStroke: "var(--blue)",
    ringPctText: "100%",
    ringPctColor: "var(--blue)",
    label: "Uptime SLA across all GPU clusters",
  },
  {
    initial: "400G",
    ringPct: 85,
    ringStroke: "var(--amber)",
    ringPctText: "85%",
    ringPctColor: "var(--amber)",
    label: "InfiniBand fabric across every cluster node",
  },
  {
    initial: "<10μs",
    ringPct: 96,
    ringStroke: "var(--green)",
    ringPctText: "96%",
    label: "WEKA storage latency at full GPU bandwidth",
  },
];

export function HomeWhy() {
  const ref = useRef<HTMLElement>(null);
  useStatCountUpAndRings(ref);
  useStatRingPulse(ref);
  return (
    <section className="hp-section dark" id="why" ref={ref}>
      <div className="hp-label">Why NeoCloudz</div>
      <div className="hp-h2">
        Built for Teams That<br />
        <span className="g">Can&#39;t Afford to Wait.</span>
      </div>

      <div className="why-grid">
        <div className="why-features">
          {WHY_ITEMS.map((it, i) => (
            <div className="why-item" key={i}>
              <div className="why-icon">{it.icon}</div>
              <div>
                <div className="why-title">{it.title}</div>
                <div className="why-desc">{it.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="why-stats">
          {STAT_CARDS.map((sc, i) => (
            <div className="stat-card" key={i}>
              <div className="ring-wrap">
                <svg className="ring-svg" viewBox="0 0 52 52">
                  <circle className="ring-track" cx={26} cy={26} r={22} />
                  <circle
                    className="ring-fill"
                    cx={26}
                    cy={26}
                    r={22}
                    stroke={sc.ringStroke}
                    data-pct={sc.ringPct}
                  />
                </svg>
                <div
                  className="ring-pct"
                  style={sc.ringPctColor ? { color: sc.ringPctColor } : undefined}
                >
                  {sc.ringPctText}
                </div>
              </div>
              <div className="stat-num">{sc.initial}</div>
              <div className="stat-label">{sc.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const STORAGE_FEATURES = [
  {
    icon: "⚡",
    title: "Sub-10μs Latency at Scale",
    desc: "WEKA delivers <10μs p99 latency across all cluster clients simultaneously — no degradation at scale. Your training throughput is never storage-bound.",
  },
  {
    icon: "📦",
    title: "1.4 TB/s Aggregate Throughput",
    desc: "Parallel access across all storage nodes means B200 and Grace Blackwell clusters can load multi-terabyte datasets and write checkpoints without slowing down.",
  },
  {
    icon: "🔗",
    title: "POSIX, NFS & S3 Compatible",
    desc: "Mount WEKA like a local filesystem, access via NFS from any node, or use the S3-compatible API for object storage workflows. No code changes required.",
  },
  {
    icon: "🛡️",
    title: "Persistent Across Sessions",
    desc: "Unlike ephemeral NVMe scratch, WEKA volumes persist between cluster launches. Your checkpoints survive node restarts, reconfigurations, and cluster terminations.",
  },
];

export function HomeStorage() {
  const sectionRef = useRef<HTMLElement>(null);
  const dataflowRef = useRef<HTMLCanvasElement>(null);
  const stBodyRef = useRef<HTMLDivElement>(null);
  useDataflowCanvas(dataflowRef, sectionRef);
  useStorageBandwidthBars(stBodyRef);
  return (
    <section className="hp-section mid" id="storage" ref={sectionRef}>
      <canvas id="dataflow-canvas" ref={dataflowRef} />
      <div className="hp-label">WEKA Storage</div>
      <div className="hp-h2">
        Storage That Keeps Up<br />
        <span className="g">With Blackwell.</span>
      </div>
      <p className="hp-sub">
        Checkpoints, datasets, and model weights need to move at GPU speed. WEKA&#39;s
        parallel filesystem is the only storage that doesn&#39;t become the bottleneck.
      </p>

      <div className="storage-grid">
        <div className="storage-terminal">
          <div className="st-bar">
            <span className="dot" />
            weka filesystem status
          </div>
          <div className="st-body" ref={stBodyRef}>
            <div className="st-line"><span className="m">$</span> weka status</div>
            <div className="st-line"><span className="g">✓</span> NeoCloudz WEKA Cluster <span className="g">HEALTHY</span></div>
            <div className="st-line">&nbsp;</div>
            <div className="st-line"><span className="m">Cluster Name :</span> <span className="g">neo-weka-us-east1</span></div>
            <div className="st-line"><span className="m">Capacity     :</span> <span className="b">4.8 PB usable</span></div>
            <div className="st-line"><span className="m">Throughput   :</span> <span className="g">1.4 TB/s aggregate</span></div>
            <div className="st-line"><span className="m">Latency      :</span> <span className="g">8.2 μs (p99)</span></div>
            <div className="st-line"><span className="m">IOPS         :</span> <span className="b">42M read / 18M write</span></div>
            <div className="st-line"><span className="m">Nodes        :</span> 24 storage · 512 GPU clients</div>
            <div className="st-line"><span className="m">Protocol     :</span> POSIX · NFS · S3</div>
            <div className="st-line">&nbsp;</div>
            <div className="st-line"><span className="m">$</span> weka fs list</div>
            <div className="st-line"><span className="g">training-data</span>    2.1 PB  <span className="g">active</span></div>
            <div className="st-line"><span className="g">checkpoints</span>      1.2 PB  <span className="g">active</span></div>
            <div className="st-line"><span className="g">model-weights</span>    0.8 PB  <span className="g">active</span></div>
            <div className="st-line"><span className="a">scratch</span>          0.7 PB  <span className="a">ephemeral</span></div>
            <div className="st-line">&nbsp;</div>
            <div className="st-line"><span className="m">$</span> <span className="cursor">█</span></div>
          </div>
        </div>

        <div className="storage-features">
          {STORAGE_FEATURES.map((f, i) => (
            <div className="sf-item" key={i}>
              <div className="sf-icon">{f.icon}</div>
              <div>
                <div className="sf-title">{f.title}</div>
                <div className="sf-desc">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const FAQS = [
  {
    q: "What's the difference between On-Demand and Bare Metal?",
    a: "On-demand instances (B200, B300) are provisioned in seconds and billed by the minute — ideal for experimentation, inference, and burst training. Bare metal (Grace Blackwell GB200/GB300) gives you a dedicated NVL72 rack with full hardware access, no virtualization, and maximum NVLink bandwidth — designed for large-scale model training and fine-tuning that runs continuously.",
  },
  {
    q: "How fast can I get access to a GPU?",
    a: "On-demand B200 and B300 instances typically provision in under 60 seconds from the moment you click Deploy. Grace Blackwell bare-metal clusters are provisioned within 4 hours for pre-qualified accounts. Sign up and complete KYC once, then deploy instantly every time after.",
  },
  {
    q: "What is WEKA storage and do I need it?",
    a: "WEKA is a high-performance parallel filesystem that delivers sub-10μs latency and over 1 TB/s aggregate throughput. It's essential for large-model training where datasets don't fit in GPU memory and checkpoints need to be written frequently. It's included with all bare-metal Grace Blackwell clusters and available as an add-on for on-demand instances.",
  },
  {
    q: "Can I run multi-node distributed training?",
    a: "Yes. All NeoCloudz clusters are connected via InfiniBand 400G with RDMA support. NCCL and MPI work out of the box. Grace Blackwell clusters ship pre-configured for PyTorch DDP, DeepSpeed, and Megatron-LM distributed training across up to 512 GPUs with zero tuning required.",
  },
  {
    q: "When will Vera Rubin be available?",
    a: "NVIDIA is expected to begin Vera Rubin (Rubin / Rubin Ultra) shipments in late 2025. NeoCloudz is on the allocation list and will offer both on-demand and bare-metal Vera Rubin instances. Join our waitlist to be first in line and lock in early-access pricing.",
  },
  {
    q: "Is there a free trial?",
    a: "New accounts receive $500 in free credits upon verification — enough to run a B200 instance for approximately 18 hours. No credit card required to sign up. Credits expire 30 days after account creation.",
  },
];

export function HomeFaq() {
  return (
    <section className="hp-section dark" id="faq">
      <div className="faq-grid">
        <div className="faq-sidebar">
          <div className="hp-label">FAQ</div>
          <h2>
            Common<br />
            Questions.
          </h2>
          <p>Everything you need to know before deploying your first cluster.</p>
        </div>
        <div className="faq-list" id="faq-list">
          {FAQS.map((it, i) => (
            <div className="faq-item" key={i}>
              <div className="faq-q">
                {it.q}
                <span className="faq-arrow">+</span>
              </div>
              <div className="faq-a">{it.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomeCta() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const launchBtnRef = useRef<HTMLAnchorElement>(null);
  useHomeWaveCanvas(canvasRef);
  useCtaParticleBurst(launchBtnRef);
  return (
    <div className="cta-banner">
      <canvas id="wave-canvas" ref={canvasRef} />
      <div
        className="hp-label"
        style={{
          justifyContent: "center",
          marginBottom: "20px",
          position: "relative",
          zIndex: 2,
        }}
      >
        Get Started Today
      </div>
      <h2 style={{ position: "relative", zIndex: 2 }}>
        The Fastest Path to<br />
        <span>Blackwell Compute.</span>
      </h2>
      <p style={{ position: "relative", zIndex: 2 }}>
        Deploy a B200 in 60 seconds. Scale to a Grace Blackwell bare-metal cluster
        when you&#39;re ready. No sales calls required.
      </p>
      <div className="cta-row" style={{ position: "relative", zIndex: 2 }}>
        <a href="https://neocloudz.com" className="btn-launch" ref={launchBtnRef}>
          Launch AI Instances ▶
        </a>
        <a href="https://neocloudz.com" className="btn-outline">
          Talk to Sales →
        </a>
      </div>
    </div>
  );
}

interface FooterCol {
  title: string;
  items: Array<{ label: string; badge?: string }>;
}

const FOOTER_COLS: FooterCol[] = [
  {
    title: "Products",
    items: [
      { label: "B200 On-Demand" },
      { label: "B300 On-Demand" },
      { label: "GB200 Bare Metal" },
      { label: "GB300 Bare Metal" },
      { label: "WEKA Storage" },
      { label: "Vera Rubin", badge: "SOON" },
    ],
  },
  {
    title: "Solutions",
    items: [
      { label: "LLM Training" },
      { label: "Inference at Scale" },
      { label: "Fine-Tuning" },
      { label: "Research Compute" },
      { label: "Enterprise" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About" },
      { label: "Blog" },
      { label: "Careers", badge: "HIRING" },
      { label: "Status" },
      { label: "Contact" },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "Documentation" },
      { label: "API Reference" },
      { label: "Benchmarks" },
      { label: "Pricing Calculator" },
      { label: "Support" },
    ],
  },
];

export function HomeFooter() {
  return (
    <footer>
      <div className="footer-top">
        <div className="footer-brand">
          <Link
            href="/"
            style={{
              fontFamily: "'Inter',sans-serif",
              fontSize: "20px",
              fontWeight: 800,
              color: "var(--white)",
              textDecoration: "none",
              letterSpacing: "-0.5px",
            }}
          >
            Neo<span style={{ color: "var(--green)" }}>Cloudz</span>
          </Link>
          <p>
            The fastest, most powerful GPU cloud for AI teams. Blackwell on-demand,
            Grace Blackwell bare metal, and WEKA storage — all in one platform.
          </p>
          <div className="footer-social">
            <a href="#" className="fsoc">𝕏</a>
            <a href="#" className="fsoc">in</a>
            <a href="#" className="fsoc">gh</a>
            <a href="#" className="fsoc">dc</a>
          </div>
        </div>
        {FOOTER_COLS.map((col) => (
          <div className="footer-col" key={col.title}>
            <h4>{col.title}</h4>
            <ul>
              {col.items.map((it) => (
                <li key={it.label}>
                  <a href="#">
                    {it.label}{" "}
                    {it.badge ? <span className="badge-new">{it.badge}</span> : null}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="footer-bottom">
        <p>© 2025 NeoCloudz Inc. All rights reserved.</p>
        <div className="footer-bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Security</a>
        </div>
      </div>
    </footer>
  );
}
