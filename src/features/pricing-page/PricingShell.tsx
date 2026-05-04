"use client";

import { useEffect, useRef, useState } from "react";
import {
  usePricingCardSparklines,
  usePricingCtaBurst,
  usePricingDemandBars,
  usePricingFeatureReveal,
  usePricingHeroGlow,
  usePricingHeroParallax,
  usePricingHoverSpotlight,
  usePricingLiveStrip,
  usePricingMatrix,

  usePricingParticleCanvas,
  usePricingScrollBar,
  usePricingScrollReveal,
  usePricingStars,
  usePricingTyping,
  usePricingWaveCanvas,
} from "./hooks";
import {
  PRICING_CARDS,
  PRICING_TICKER_ITEMS,
  GPU_RATES,
  GPU_LABELS,
  COMPETITOR_MULT,
} from "@/lib/pricing-data";

/* ── Plan Toggle + Cards ── */
type Plan = "ondemand" | "reserved";

interface CardData {
  badge: string;
  badgeClass: "on-demand" | "bare-metal";
  name: string;
  sub: string;
  /** ondemand price in $/hr; if null this card is custom-priced */
  onPrice: number | null;
  /** reserved price (12-mo). If null reserved view shows same value or is N/A */
  resPrice: number | null;
  resSavingsPct?: number;
  customSavingsTag?: { text: string; color: "blue" | "amber" };
  demandPct: number;
  demandLabel: string;
  demandLabelColor?: string;
  demandClass: "high" | "medium";
  features: { text: string; custom?: boolean }[];
  price: string | null;
  cta: string;
  ctaClass: "primary" | "outline" | "blue-outline";
  featured?: boolean;
}

const CARDS: CardData[] = PRICING_CARDS.map((pc) => ({
  badge: pc.badge,
  badgeClass: pc.badgeClass === "pre-register" ? "bare-metal" as const : pc.badgeClass,
  name: pc.name,
  sub: pc.sub,
  onPrice: pc.onDemandRate,
  resPrice: pc.reservedRate,
  resSavingsPct: pc.reservedSavingsPct,
  demandPct: pc.demandPct,
  demandLabel: pc.demandLabel,
  demandLabelColor: pc.demandLabelColor,
  demandClass: pc.demandClass,
  features: pc.specs.map((s) => ({
    text: `${s.label}: ${s.value}`,
    custom: pc.onDemandRate === null ? true : undefined,
  })),
  price: pc.price,
  cta: pc.cta,
  ctaClass: pc.ctaClass,
  featured: pc.featured,
  customSavingsTag: pc.customSavingsTag,
}));

const TICKER_ITEMS = PRICING_TICKER_ITEMS;

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

const FAQS = [
  {
    q: "How exactly is billing calculated?",
    a: "You're billed per minute of GPU usage, rounded up to the nearest minute. There's a 1-minute minimum per session. Pricing is fixed — no surge pricing, no spot instance interruptions on reserved instances. Your invoice shows exact GPU-hours consumed at your contracted rate.",
  },
  {
    q: "Are there any hidden fees or egress charges?",
    a: "No. NeoCloudz charges $0 for all data egress — inbound and outbound — forever. What you see in the pricing table is exactly what you pay. We don't charge for InfiniBand usage, NVMe storage, or API calls to our control plane.",
  },
  {
    q: "What's the difference between On-Demand and Reserved?",
    a: "On-Demand GPUs are available immediately at the listed hourly rate with no commitment. Reserved instances are pre-purchased for 1, 3, or 12-month terms at a discount (up to 35% off). Reserved instances also guarantee priority availability during high-demand periods when on-demand capacity may be limited.",
  },
  {
    q: "Can I get a volume discount for large deployments?",
    a: "Yes — for clusters of 32+ GPUs or dedicated bare-metal racks, contact our sales team for custom pricing. We regularly work with research institutions, AI labs, and enterprises on multi-rack deployments with custom SLAs, dedicated networking, and white-glove onboarding. Volume commitments of 1–100+ GPUs for 3–12 months can save up to 40%.",
  },
  {
    q: "Is there a free trial or credits program?",
    a: "We offer $500 in free compute credits for new accounts to evaluate our platform. No credit card required for the trial. For academic researchers and non-profits, we have a dedicated program providing extended access — reach out via our contact page with your institution details.",
  },
];

const TIERS = [
  { name: "1 Month", price: 25, save: "Up to 10% off", term: "Flexible short-term production workloads" },
  { name: "3 Months", price: 22, save: "Up to 20% off", term: "Ideal for ongoing training and deployment" },
  { name: "12 Months", price: 18, save: "Up to 35% off ✦", term: "Maximum savings for stable workloads" },
];

const TIER_POSITIONS = [0, 50, 100];

interface MatrixRow {
  label: string;
  values: React.ReactNode[];
}
interface MatrixGroup {
  header: string;
  rows: MatrixRow[];
}

const MATRIX: MatrixGroup[] = [
  {
    header: "⚡ Feature",
    rows: [
      { label: "GPU Architecture", values: ["100% NVIDIA Blackwell & H200", "B200 / H200 / H100", "H100 / L40S"] },
      { label: "Power Infrastructure", values: ["DigiPowerX low-carbon", "Cloud vendor mix", "Standard grid"] },
      { label: "PUE Efficiency", values: ["< 1.3", "~1.4", "~1.5+"] },
      { label: "Sustainability", values: ["Renewable + natural gas hybrid", "Limited public data", "No public data"] },
      { label: "Data Centers", values: ["Tier III, U.S.-owned", "EU-based", "U.S.-based"] },
      { label: "SLAs", values: ["99.99% uptime", "99.9%", "99.9%"] },
    ],
  },
];

function fmtCurrency(n: number): string {
  return "$" + Math.round(n).toLocaleString();
}

// GPU_RATES, GPU_LABELS, and COMPETITOR_MULT are imported from @/lib/pricing-data

export function PricingShell() {
  const rootRef = useRef<HTMLDivElement>(null);
  const scrollBarRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const heroGridRef = useRef<HTMLDivElement>(null);
  const particleRef = useRef<HTMLCanvasElement>(null);
  const typingRef = useRef<HTMLSpanElement>(null);
  const pricingSectionRef = useRef<HTMLDivElement>(null);

  const matrixRef = useRef<HTMLTableElement>(null);
  const ctaCanvasRef = useRef<HTMLCanvasElement>(null);
  const ctaLaunchRef = useRef<HTMLAnchorElement>(null);
  const tierTimelineRef = useRef<HTMLDivElement>(null);
  const tierLineRef = useRef<HTMLDivElement>(null);

  const [plan, setPlan] = useState<Plan>("ondemand");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Calculator state
  const [gpuType, setGpuType] = useState<keyof typeof GPU_RATES>("b200");
  const [numGpus, setNumGpus] = useState(8);
  const [hours, setHours] = useState(12);
  const [days, setDays] = useState(22);

  // Tier
  const [activeTier, setActiveTier] = useState(0);
  const [tierParticleLeft, setTierParticleLeft] = useState("0%");

  // Page-level
  usePricingScrollBar(scrollBarRef);
  usePricingScrollReveal(rootRef);

  // Hero
  usePricingParticleCanvas(particleRef);
  usePricingTyping(typingRef);
  usePricingStars(heroRef);
  usePricingHeroGlow(heroRef);
  usePricingHeroParallax(heroRef, heroGridRef);
  const liveStrip = usePricingLiveStrip();

  // Pricing cards

  usePricingDemandBars(pricingSectionRef);
  usePricingFeatureReveal(pricingSectionRef);
  usePricingHoverSpotlight(pricingSectionRef);
  usePricingCardSparklines(pricingSectionRef);

  // Matrix
  usePricingMatrix(matrixRef);

  // CTA
  usePricingWaveCanvas(ctaCanvasRef);
  usePricingCtaBurst(ctaLaunchRef);

  // Calculator computed values
  const neoMonthly = (GPU_RATES[gpuType] || 0) * numGpus * hours * days;
  const awsMonthly = Math.round(neoMonthly * COMPETITOR_MULT.aws);
  const gcpMonthly = Math.round(neoMonthly * COMPETITOR_MULT.gcp);
  const azMonthly = Math.round(neoMonthly * COMPETITOR_MULT.az);
  const maxMonthly = Math.max(neoMonthly, awsMonthly, gcpMonthly, azMonthly) || 1;
  const calcSavings = awsMonthly - neoMonthly;
  const calcSavePct = awsMonthly > 0 ? Math.round((calcSavings / awsMonthly) * 100) : 0;

  // Animated total
  const [animatedTotal, setAnimatedTotal] = useState(neoMonthly);
  useEffect(() => {
    let raf = 0;
    let current = animatedTotal;
    function step() {
      const target = neoMonthly;
      const diff = target - current;
      current += diff * 0.12;
      if (Math.abs(diff) < 1) current = target;
      setAnimatedTotal(current);
      if (Math.abs(target - current) > 0.5) raf = requestAnimationFrame(step);
    }
    step();
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [neoMonthly]);

  // Tier auto-step on intersect
  useEffect(() => {
    const timeline = tierTimelineRef.current;
    if (!timeline) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        let step = 0;
        const id = window.setInterval(() => {
          setActiveTier(step);
          step++;
          if (step > 2) {
            window.clearInterval(id);
            setActiveTier(2);
          }
        }, 600);
        obs.unobserve(entries[0].target);
      },
      { threshold: 0.4 },
    );
    obs.observe(timeline);
    return () => obs.disconnect();
  }, []);

  // Pill slider position
  const pillContainerRef = useRef<HTMLDivElement>(null);
  const pillSliderRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const cont = pillContainerRef.current;
    const slider = pillSliderRef.current;
    if (!cont || !slider) return;
    const target = cont.querySelector<HTMLButtonElement>(`.plan-pill[data-plan="${plan}"]`);
    if (!target) return;
    slider.style.width = target.offsetWidth + "px";
    slider.style.left = target.offsetLeft + "px";
  }, [plan]);

  // Tier particle pixel position derived from line width on tier change / resize
  useEffect(() => {
    function recompute() {
      const line = tierLineRef.current;
      if (!line) return;
      const offset = (TIER_POSITIONS[activeTier] / 100) * line.offsetWidth;
      setTierParticleLeft(offset + "px");
    }
    recompute();
    window.addEventListener("resize", recompute);
    return () => window.removeEventListener("resize", recompute);
  }, [activeTier]);

  const planLabel = GPU_LABELS[gpuType];
  const totalPeriodLabel = `estimated monthly spend · ${numGpus}× ${planLabel} · ${hours}h/day · ${days} days`;

  return (
    <div className="pricing-page" ref={rootRef}>
      <div className="pricing-scroll-bar" ref={scrollBarRef} />

      {/* HERO */}
      <section className="hero" id="hero" ref={heroRef}>
        <canvas id="particle-canvas" ref={particleRef} />
        <div className="hero-grid-overlay" ref={heroGridRef} />
        <div className="hero-aurora">
          <div
            className="aurora-band"
            style={
              {
                background: "radial-gradient(ellipse,rgba(45,255,122,1),transparent 70%)",
                top: "55%",
                "--adur": "16s",
                "--ad": "0s",
              } as React.CSSProperties
            }
          />
          <div
            className="aurora-band"
            style={
              {
                background: "radial-gradient(ellipse,rgba(0,0,0,1),transparent 70%)",
                top: "60%",
                "--adur": "20s",
                "--ad": "5s",
              } as React.CSSProperties
            }
          />
          <div
            className="aurora-band"
            style={
              {
                background: "radial-gradient(ellipse,rgba(45,255,122,1),transparent 70%)",
                top: "70%",
                "--adur": "13s",
                "--ad": "9s",
              } as React.CSSProperties
            }
          />
        </div>

        <div className="hero-content">
          {/* <div className="hero-eyebrow">GPU Cloud Pricing</div>
          <div className="hero-terminal-line">
            <span ref={typingRef}>&gt; neocloudz pricing --model blackwell</span>
            <span className="cursor" />
          </div> */}
          <h1 className="hero-h1">
            Simple, Transparent<br />
            <span className="g">GPU Pricing</span> Scale<br />
            Without Surprises.
          </h1>
          <p className="hero-sub">
            Competitive pricing for NVIDIA GPUs. Access improved cost savings with a
            commitment of hundreds of units for at least 3 months.
          </p>
          <div className="hero-cta-row" style={{ display: "flex", gap: 16, marginTop: 28, flexWrap: "wrap", justifyContent: "center", marginBottom: 40 }}>
            <a href="/contact" className="btn-launch">
              Launch AI Instances
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a href="/contact" className="btn-outline-cta">
              Request Custom Quote
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          <div className="hero-live-strip">
            <div className="hlm">
              <span className="hlm-val">{liveStrip.gpus.toLocaleString()}</span>
              <span className="hlm-lbl">GPUs Online</span>
            </div>
            <div className="hlm-div" />
            <div className="hlm">
              <span className="hlm-val">{liveStrip.savings}%</span>
              <span className="hlm-lbl">Avg vs AWS p5</span>
            </div>
            <div className="hlm-div" />
            <div className="hlm">
              <span className="hlm-val">99.99%</span>
              <span className="hlm-lbl">Uptime SLA</span>
            </div>
            <div className="hlm-div" />
            <div className="hlm">
              <span className="hlm-val">&lt;60s</span>
              <span className="hlm-lbl">Deploy Time</span>
            </div>
            <div className="hlm-div" />
            <div className="hlm">
              <span className="hlm-val">$0</span>
              <span className="hlm-lbl">Egress Fees</span>
            </div>
          </div>
        </div>

      </section>

      {/* TICKER */}
      <div className="ticker-wrap">
        <div className="ticker-track">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((it, i) => (
            <span className="ticker-item" key={i}>
              <span className="dot" />
              <span className="bright">{it[0]}</span> {it[1]}
            </span>
          ))}
        </div>
      </div>

      {/* PLAN TOGGLE */}
      <div className="plan-toggle-section">
        <div className="plan-toggle-label">Billing plan</div>
        <div className="plan-toggle-pills" ref={pillContainerRef}>
          <div className="pill-slider" ref={pillSliderRef} style={{ width: 140 }} />
          <button
            type="button"
            className={`plan-pill${plan === "ondemand" ? " active" : ""}`}
            data-plan="ondemand"
            onClick={() => setPlan("ondemand")}
          >
            On-Demand
          </button>
          <button
            type="button"
            className={`plan-pill${plan === "reserved" ? " active" : ""}`}
            data-plan="reserved"
            onClick={() => setPlan("reserved")}
          >
            Reserved (12-mo)
          </button>
        </div>
        <div
          className="plan-savings-badge"
          style={{ opacity: plan === "reserved" ? 1 : 0 }}
        >
          ✦ Save up to 35% with 12-month commitment
        </div>
      </div>

      {/* PRICING CARDS */}
      <div className="pricing-section" ref={pricingSectionRef}>

        <div className="pricing-grid">
          {CARDS.map((c, ci) => {
            const showReserved = plan === "reserved" && c.onPrice !== null;
            const displayPrice =
              c.onPrice === null
                ? "Custom"
                : "$" + (showReserved && c.resPrice !== null ? c.resPrice : c.onPrice);
            const isCustom = c.onPrice === null;
            return (
              <div
                key={ci}
                className={`price-card reveal${c.featured ? " featured" : ""}`}
              >
                <div className="beam" />
                <div className={`price-tier-badge ${c.badgeClass}`}>
                  <span className="live-dot" />
                  {c.badge}
                </div>
                <div className="price-gpu-name">{c.name}</div>
                <div className="price-gpu-sub">{c.sub}</div>
                <div className="price-amount-wrap">
                  <div className="price-amount" style={{ fontSize: "28px" }}>
                    Pricing on request
                  </div>
                </div>
                <div className="price-period">
                  Available for short-term and long-term reservation
                </div>

                {c.customSavingsTag ? (
                  <div
                    className="price-savings-tag"
                    style={
                      c.customSavingsTag.color === "blue"
                        ? {
                          color: "var(--blue)",
                          background: "#000",
                          borderColor: "rgba(77,200,255,.25)",
                          opacity: 1,
                        }
                        : {
                          color: "var(--amber)",
                          background: "rgba(255,184,77,.1)",
                          borderColor: "rgba(255,184,77,.25)",
                          opacity: 1,
                        }
                    }
                  >
                    {c.customSavingsTag.text}
                  </div>
                ) : (
                  <div
                    className={`price-savings-tag${showReserved ? " show" : ""}`}
                  >
                    ↓ Save {c.resSavingsPct}% vs on-demand
                  </div>
                )}

                <div className="demand-bar-wrap">
                  <div className="demand-label">
                    <span>Capacity demand</span>
                    <span style={c.demandLabelColor ? { color: c.demandLabelColor } : undefined}>
                      {c.demandLabel}
                    </span>
                  </div>
                  <div className="demand-track">
                    <div
                      className={`demand-fill ${c.demandClass}`}
                      data-w={`${c.demandPct}%`}
                    />
                  </div>
                </div>

                <canvas className="price-sparkline" width={200} height={36} />

                <ul className="price-features">
                  {c.features.map((f, fi) => (
                    <li
                      key={fi}
                      className={`price-feature${f.custom ? " custom-icon" : ""}`}
                    >
                      {f.text}
                    </li>
                  ))}
                </ul>
                <a href="/contact" className={`price-btn ${c.ctaClass}`}>
                  {c.cta}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            );
          })}
        </div>
      </div>

      <div className="anim-divider" />

      {/* CALCULATOR */}
      <section className="calc-section" id="calculator">
        <div className="calc-header" style={{ marginBottom: 60 }}>
          <div className="hp-label reveal">Cost Calculator</div>
          <div className="hp-h2 reveal">
            Estimate Your<br />
            <span className="g">Monthly Spend.</span>
          </div>
          <p className="hp-sub reveal">
            Configure your workload and see exactly what you&#39;ll pay. Compare
            against major cloud providers in real time.
          </p>
        </div>

        <div className="calc-grid">
          <div>

            <div className="calc-terminal reveal">
              <div className="calc-term-bar">
                <div className="calc-dot" style={{ background: "#ff5f57" }} />
                <div className="calc-dot" style={{ background: "#febc2e" }} />
                <div className="calc-dot" style={{ background: "#28c840" }} />
                <div className="calc-term-title">neocloudz — cost-estimator</div>
              </div>
              <div className="calc-body">
                <div className="calc-label">GPU Type</div>
                <div className="gpu-selector">
                  {(Object.keys(GPU_RATES) as Array<keyof typeof GPU_RATES>).map((g) => (
                    <button
                      type="button"
                      key={g}
                      className={`gpu-sel-btn${gpuType === g ? " active" : ""}`}
                      onClick={() => setGpuType(g)}
                    >
                      {GPU_LABELS[g]} · {GPU_RATES[g] === 0 ? "Custom" : `$${GPU_RATES[g]}/hr`}
                    </button>
                  ))}
                </div>

                <div className="calc-label">Number of GPUs</div>
                <div className="calc-slider-wrap">
                  <div className="calc-slider-row">
                    <span className="calc-slider-name">GPUs</span>
                    <span className="calc-slider-val">{numGpus}</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={512}
                    step={1}
                    value={numGpus}
                    onChange={(e) => setNumGpus(parseInt(e.target.value, 10))}
                  />
                </div>

                <div className="calc-label">Hours per day</div>
                <div className="calc-slider-wrap">
                  <div className="calc-slider-row">
                    <span className="calc-slider-name">Hours</span>
                    <span className="calc-slider-val">{hours}</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={24}
                    step={1}
                    value={hours}
                    onChange={(e) => setHours(parseInt(e.target.value, 10))}
                  />
                </div>

                <div className="calc-label">Days per month</div>
                <div className="calc-slider-wrap">
                  <div className="calc-slider-row">
                    <span className="calc-slider-name">Days</span>
                    <span className="calc-slider-val">{days}</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={31}
                    step={1}
                    value={days}
                    onChange={(e) => setDays(parseInt(e.target.value, 10))}
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="calc-result reveal">
              <div className="calc-result-header">
                <div className="calc-prompt">$ neocloudz estimate --format monthly</div>
                <div className="calc-total">{fmtCurrency(animatedTotal)}</div>
                <div className="calc-total-period">{totalPeriodLabel}</div>
              </div>
              <div className="calc-compare">
                <div className="calc-compare-title">── vs. major cloud providers ──</div>
                <div className="compare-bar-row">
                  <div className="compare-bar-label-row">
                    <span className="compare-bar-name">NeoCloudz {planLabel}</span>
                    <span className="compare-bar-val">{fmtCurrency(neoMonthly)}</span>
                  </div>
                  <div className="compare-track">
                    <div
                      className="compare-fill neo"
                      style={{ width: (neoMonthly / maxMonthly) * 100 + "%" }}
                    />
                  </div>
                </div>
                <div className="compare-bar-row">
                  <div className="compare-bar-label-row">
                    <span className="compare-bar-name">AWS p5.48xlarge</span>
                    <span className="compare-bar-val">{fmtCurrency(awsMonthly)}</span>
                  </div>
                  <div className="compare-track">
                    <div
                      className="compare-fill aws"
                      style={{ width: (awsMonthly / maxMonthly) * 100 + "%" }}
                    />
                  </div>
                </div>
                <div className="compare-bar-row">
                  <div className="compare-bar-label-row">
                    <span className="compare-bar-name">GCP A3 Ultra</span>
                    <span className="compare-bar-val">{fmtCurrency(gcpMonthly)}</span>
                  </div>
                  <div className="compare-track">
                    <div
                      className="compare-fill gcp"
                      style={{ width: (gcpMonthly / maxMonthly) * 100 + "%" }}
                    />
                  </div>
                </div>
                <div className="compare-bar-row">
                  <div className="compare-bar-label-row">
                    <span className="compare-bar-name">Azure NDmv5</span>
                    <span className="compare-bar-val">{fmtCurrency(azMonthly)}</span>
                  </div>
                  <div className="compare-track">
                    <div
                      className="compare-fill az"
                      style={{ width: (azMonthly / maxMonthly) * 100 + "%" }}
                    />
                  </div>
                </div>
                <div className="calc-savings-callout">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="mr-2 inline-block align-middle" style={{ marginTop: '-2px' }}>
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                  You save <span>{fmtCurrency(calcSavings)}</span> per month vs AWS ·{" "}
                  <span>{calcSavePct}%</span> cheaper
                </div>
              </div>
            </div>

            <div className="calc-notes reveal">
              <span className="calc-notes-title">// Pricing notes</span>
              <br />
              · Billed per minute, rounded up to nearest minute
              <br />
              · No setup fees or cancellation penalties
              <br />
              · Reserved pricing available for 1, 3, 12-month terms
              <br />
              · Egress: $0.00/GB — always free
              <br />
              · NVMe storage: included with fractional instances
            </div>
          </div>
        </div>
      </section>

      <div className="anim-divider" />

      {/* COMMITMENT TIERS */}
      <section className="tiers-section" id="tiers">
        <div className="hp-label reveal">Commitment Tiers</div>
        <div className="hp-h2 reveal">
          More Commitment,<br />
          <span className="g">More Savings.</span>
        </div>
        <p className="hp-sub reveal">
          Lock in compute at reduced rates. Reserved instances guarantee availability
          during high-demand periods.
        </p>

        <div className="tier-timeline reveal" ref={tierTimelineRef}>
          <div className="tier-line" ref={tierLineRef}>
            <div
              className="tier-line-fill"
              style={{ width: TIER_POSITIONS[activeTier] + "%" }}
            />
            <div id="tier-particle" style={{ left: tierParticleLeft }} />
          </div>
          <div className="tier-nodes">
            {TIERS.map((t, i) => (
              <div className="tier-node" key={i}>
                <div className="tier-dot-wrap">
                  <div
                    className={`tier-dot${i === activeTier ? " active" : i < activeTier ? " passed" : ""
                      }`}
                    onClick={() => setActiveTier(i)}
                  />
                </div>
                <div className={`tier-card${i === activeTier ? " active" : ""}`}>
                  <div className="tier-name">{t.name}</div>
                  <div className="tier-price">
                    ${t.price}
                    <span style={{ fontSize: 14, color: "var(--muted)" }}>/hr</span>
                  </div>
                  <div
                    className="tier-save"
                    style={i === 3 ? { color: "var(--green)" } : undefined}
                  >
                    {t.save}
                  </div>
                  <div className="tier-term">{t.term}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="anim-divider" />

      {/* FEATURE MATRIX */}
      <section className="matrix-section" id="matrix">
        <div className="hp-label reveal">Platform Comparison</div>
        <div className="hp-h2 reveal">
          Why Choose<br />
          <span className="g">NeoCloudz.</span>
        </div>
        <p className="hp-sub reveal">
          All instances run on Supermicro AI-optimized servers in U.S. Tier III data centers.
        </p>

        <table className="matrix-table reveal" ref={matrixRef}>
          <thead>
            <tr>
              <th style={{ width: "32%" }}>Feature</th>
              <th className="featured-col">NeoCloudz</th>
              <th>Cloud Vendor</th>
              <th>Other Provider</th>
            </tr>
          </thead>
          <tbody>
            {MATRIX.flatMap((g, gi) => [
              <tr className="matrix-section-header" key={`h-${gi}`}>
                <td colSpan={4}>{g.header}</td>
              </tr>,
              ...g.rows.map((r, ri) => (
                <tr className="matrix-row" key={`r-${gi}-${ri}`}>
                  <td data-label="Feature">{r.label}</td>
                  <td className="featured-col" data-label="NeoCloudz">{r.values[0]}</td>
                  <td data-label="Cloud Vendor">{r.values[1]}</td>
                  <td data-label="Other Provider">{r.values[2]}</td>
                </tr>
              )),
            ])}
          </tbody>
        </table>
      </section>

      {/* LOGOS */}
      <div className="logos-section reveal">
        <div className="logos-label">Trusted by leading AI teams</div>
        <div className="logos-track-wrap">
          <div className="logos-scroll">
            {[...LOGO_NAMES, ...LOGO_NAMES].map((n, i) => (
              <span className="logo-item" key={i}>
                {n}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <section className="faq-section" id="faq">
        <div className="faq-grid">
          <div className="faq-sidebar reveal">
            <div className="hp-label">FAQ</div>
            <h2>
              Billing<br />
              Questions.
            </h2>
          </div>
          <div className="faq-list">
            {FAQS.map((f, i) => (
              <div
                className={`faq-item reveal${openFaq === i ? " open" : ""}`}
                key={i}
              >
                <button
                  type="button"
                  className="faq-q"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  {f.q}
                </button>
                <div className="faq-a">
                  <p>{f.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="cta-banner">
        <canvas id="wave-canvas" ref={ctaCanvasRef} />
        <div className="cta-inner">
          <div
            className="hp-label"
            style={{ justifyContent: "center", marginBottom: 20 }}
          >
            Ready to Scale Your AI Infrastructure?
          </div>
          <h2>
            Request Private Clusters<br />
            <span>or Launch AI Instances.</span>
          </h2>
          <p>
            Deploy a B200 in 60 seconds. No sales calls. No contracts. Cancel anytime.
          </p>
          <div className="cta-row">
            <a href="/contact" className="btn-launch" ref={ctaLaunchRef}>
              Request Private Clusters
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a href="/contact" className="btn-outline-cta">
              Launch AI Instances
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>

    </div>
  );
}
