/**
 * Centralized GPU Pricing Data
 * ─────────────────────────────
 * Single source of truth for all pricing shown across the NeoCloudz website.
 * Every page that renders pricing cards imports from this file.
 */

/* ── Types ── */

export interface PricingCardSpec {
  label: string;
  value: string;
}

export interface PricingCard {
  /** Internal ID used for keying */
  id: string;
  /** Availability badge text */
  badge: string;
  /** Badge style variant */
  badgeClass: "on-demand" | "bare-metal" | "pre-register";
  /** Card title */
  name: string;
  /** Target audience subtitle */
  sub: string;
  /** Dollar amount to display (e.g. "$3.99") — null for custom / coming-soon */
  price: string | null;
  /** Price suffix (e.g. "/ hour") */
  priceSuffix: string;
  /** Optional prefix shown above price (e.g. "Starting at") */
  pricePrefix?: string;
  /** CTA button label */
  cta: string;
  /** CTA button style */
  ctaClass: "primary" | "outline" | "blue-outline";
  /** Structured spec lines */
  specs: PricingCardSpec[];
  /** Tagline shown below the specs */
  tagline: string;
  /** Is this the featured / highlighted card? */
  featured?: boolean;
  /** On-demand hourly rate in dollars (null = custom) — used by calculator */
  onDemandRate: number | null;
  /** Reserved hourly rate in dollars (null = custom) — used by calculator */
  reservedRate: number | null;
  /** Percentage savings on reserved vs on-demand */
  reservedSavingsPct?: number;
  /** Capacity demand percentage (0-100) for demand bar */
  demandPct: number;
  /** Demand label text */
  demandLabel: string;
  /** Demand label color override */
  demandLabelColor?: string;
  /** Demand bar CSS class */
  demandClass: "high" | "medium";
  /** Custom savings tag for non-standard cards */
  customSavingsTag?: { text: string; color: "blue" | "amber" };
}

/* ── Card Data ── */

export const PRICING_CARDS: PricingCard[] = [
  {
    id: "b200-single",
    badge: "AVAILABLE NOW",
    badgeClass: "on-demand",
    name: "Blackwell B200 – Single Node",
    sub: "For developers, startups, fine-tuning",
    price: "$3.99",
    priceSuffix: "/ hour",
    cta: "Launch Instance",
    ctaClass: "outline",
    specs: [
      { label: "GPU", value: "1× NVIDIA Blackwell B200 (180GB SXM)" },
      { label: "CPU", value: "Intel Emerald Rapids" },
      { label: "vCPU", value: "16" },
      { label: "RAM", value: "224 GB DDR5" },
      { label: "Network", value: "3.2 Tbit/s InfiniBand" },
      { label: "Storage", value: "NVMe (optional add-on)" },
    ],
    tagline: "Powered by Supermicro AI-optimized server",
    onDemandRate: 3.99,
    reservedRate: 3.19,
    reservedSavingsPct: 20,
    demandPct: 72,
    demandLabel: "HIGH",
    demandClass: "high",
  },
  {
    id: "b200-cluster",
    badge: "AVAILABLE NOW",
    badgeClass: "on-demand",
    name: "Blackwell B200 – Multi-Node Cluster",
    sub: "For training LLMs, enterprise AI teams",
    price: "$31.92",
    priceSuffix: "/ hour",
    cta: "Deploy Cluster",
    ctaClass: "primary",
    featured: true,
    specs: [
      { label: "GPU", value: "8× NVIDIA Blackwell B200 (1.4 TB total)" },
      { label: "CPU", value: "Intel Emerald Rapids" },
      { label: "vCPU", value: "128" },
      { label: "RAM", value: "1.7 TB DDR5" },
      { label: "Network", value: "3.2 Tbit/s InfiniBand (full fabric)" },
      { label: "Storage", value: "Managed Kubernetes or Slurm" },
    ],
    tagline: "Ideal for trillion-parameter model training",
    onDemandRate: 31.92,
    reservedRate: 25.54,
    reservedSavingsPct: 20,
    demandPct: 85,
    demandLabel: "VERY HIGH",
    demandLabelColor: "var(--red)",
    demandClass: "high",
  },
  {
    id: "reserved-monthly",
    badge: "VOLUME PRICING",
    badgeClass: "bare-metal",
    name: "Reserved Instance – Monthly Commitment",
    sub: "For cost predictability, large-scale workloads",
    price: "$2,500",
    priceSuffix: "/hour",
    cta: "Talk to Sales",
    ctaClass: "blue-outline",
    specs: [
      { label: "GPU", value: "1–100+ NVIDIA Blackwell B200" },
      { label: "Term", value: "3–12 months" },
      { label: "Savings", value: "Up to 40% off on-demand rate" },
      { label: "Includes", value: "Dedicated capacity, SLA, priority support" },
    ],
    tagline: "TIA-942 Rated 3 • U.S. Tier III Data Centers",
    onDemandRate: null,
    reservedRate: null,
    customSavingsTag: { text: "→ Up to 40% off on-demand", color: "blue" },
    demandPct: 58,
    demandLabel: "MEDIUM",
    demandClass: "medium",
  },
  {
    id: "b200-fractional",
    badge: "AVAILABLE NOW",
    badgeClass: "on-demand",
    name: "Blackwell B200 – Fractional",
    sub: "Ideal for prototyping and small-scale AI",
    price: "$0.99",
    priceSuffix: "/ hour",
    pricePrefix: "Starting at",
    cta: "Launch Instance",
    ctaClass: "outline",
    specs: [
      { label: "GPU", value: "1/4 or 1/2 of NVIDIA Blackwell B200 GPU" },
      { label: "Environment", value: "Shared node with isolated container environment" },
      { label: "Storage", value: "NVMe storage included (optional add-on)" },
      { label: "Use Case", value: "Ideal for prototyping, small-scale training, and experimentation" },
    ],
    tagline: "Powered by Supermicro AI-optimized server",
    onDemandRate: 0.99,
    reservedRate: 0.79,
    reservedSavingsPct: 20,
    demandPct: 44,
    demandLabel: "MEDIUM",
    demandClass: "medium",
  },
  {
    id: "b300-preregister",
    badge: "PRE-REGISTER",
    badgeClass: "pre-register",
    name: "Blackwell B300 Server",
    sub: "Next-gen architecture for future AI workloads",
    price: null,
    priceSuffix: "",
    pricePrefix: "Coming Soon – Q1 2026",
    cta: "Get Early Access",
    ctaClass: "blue-outline",
    specs: [
      { label: "GPU", value: "Next-gen NVIDIA Blackwell B300 (TBD)" },
      { label: "Memory", value: "Ultra-high bandwidth" },
      { label: "Network", value: "6.4 Tbit/s InfiniBand (expected)" },
    ],
    tagline: "Built for the next generation of intelligence",
    onDemandRate: null,
    reservedRate: null,
    customSavingsTag: { text: "✦ Pre-register for early access", color: "amber" },
    demandPct: 91,
    demandLabel: "VERY HIGH",
    demandLabelColor: "var(--red)",
    demandClass: "high",
  },
];

/* ── Simplified view for Home / generic pricing grids ── */

export interface SimplePricingTier {
  tier: string;
  name: string;
  amount: string;
  period: string;
  quota: string;
  desc: string;
  features: string[];
  cta: string;
  ctaVariant: "primary" | "outline";
  featured?: boolean;
}

export const HOME_PRICING_TIERS: SimplePricingTier[] = [
  {
    tier: "STARTER",
    name: "Fractional B200",
    amount: "$0.99",
    period: "/hour",
    quota: "1/4 or 1/2 GPU · Shared node",
    desc: "Ideal for prototyping, small-scale training, and experimentation on Blackwell hardware.",
    features: [
      "1/4 or 1/2 NVIDIA B200 GPU",
      "Isolated container environment",
      "NVMe storage included",
      "Pay-as-you-go billing",
    ],
    cta: "Launch Instance",
    ctaVariant: "outline",
  },
  {
    tier: "SINGLE NODE",
    name: "B200 Single Node",
    amount: "$3.99",
    period: "/hour",
    quota: "1× B200 · 180GB SXM · 16 vCPU",
    desc: "Full single-GPU node for developers, startups, and fine-tuning workloads.",
    features: [
      "1× NVIDIA Blackwell B200 (180GB SXM)",
      "Intel Emerald Rapids · 16 vCPU",
      "224 GB DDR5 RAM",
      "3.2 Tbit/s InfiniBand",
    ],
    cta: "Launch Instance",
    ctaVariant: "outline",
  },
  {
    tier: "MULTI-NODE",
    name: "B200 Cluster",
    amount: "$31.92",
    period: "/hour",
    quota: "8× B200 · 1.4 TB total · 128 vCPU",
    desc: "Multi-node cluster for training LLMs and enterprise-scale AI workloads.",
    features: [
      "8× NVIDIA Blackwell B200 (1.4 TB total)",
      "Intel Emerald Rapids · 128 vCPU",
      "1.7 TB DDR5 RAM",
      "3.2 Tbit/s InfiniBand (full fabric)",
      "Managed Kubernetes or Slurm",
    ],
    cta: "Deploy Cluster",
    ctaVariant: "primary",
    featured: true,
  },
  {
    tier: "RESERVED",
    name: "Reserved Instance",
    amount: "$2,500",
    period: "/hour",
    quota: "1–100+ GPUs · 3–12 month terms",
    desc: "Monthly commitment for cost predictability. Dedicated capacity, SLA, and priority support included.",
    features: [
      "1–100+ NVIDIA Blackwell B200",
      "Up to 40% off on-demand rate",
      "Dedicated capacity & SLA",
      "Priority support included",
      "TIA-942 Rated 3 · U.S. Tier III",
    ],
    cta: "Talk to Sales",
    ctaVariant: "outline",
  },
];

/* ── Calculator GPU rates ── */

export const GPU_RATES: Record<string, number> = {
  b200: 3.99,
  b200cluster: 31.92,
  fractional: 0.99,
};

export const GPU_LABELS: Record<string, string> = {
  b200: "B200 Single Node",
  b200cluster: "B200 8× Cluster",
  fractional: "Fractional B200",
};

/* ── Ticker items (pricing page) ── */

export const PRICING_TICKER_ITEMS: Array<[string, string]> = [
  ["Blackwell B200 Single", "$3.99/hour"],
  ["Blackwell B200 Cluster", "$31.92/hour 8× GPU"],
  ["Fractional GPU", "$0.99/hour"],
  ["Reserved Instance", "From $2,500/hour"],
  ["Volume Pricing", "Up to 40% off"],
  ["No Egress Fees", "$0 always"],
  ["InfiniBand 3.2 Tbit/s", "Every Node"],
  ["B300", "Pre-register Q1 2026"],
  ["Tier III", "U.S.-owned data centers"],
];

/* ── Competitor multipliers (calculator) ── */

export const COMPETITOR_MULT = { aws: 1.5, gcp: 1.35, az: 1.4 };
