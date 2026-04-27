const TIERS = [
  {
    tier: "Starter",
    name: "Pro Plus",
    amount: "$0.99",
    period: "/hr",
    quota: "Up to 160 GPU hours/month",
    desc: "Dual GPU access. Perfect for individual researchers and small experiments on Blackwell hardware.",
    features: [
      "On-demand NVIDIA B200 GPU",
      "JupyterLab included",
      "Community support forum",
      "Pay-as-you-go billing",
    ],
    cta: "Get Started",
    ctaVariant: "outline" as const,
    featured: false,
  },
  {
    tier: "Popular",
    name: "Business",
    amount: "$99",
    period: "/mo",
    quota: "500 GPU hours/month",
    desc: "Multi-GPU clusters for growing teams. Priority queue access and dedicated storage included.",
    features: [
      "Priority queue access",
      "Multi-GPU cluster support",
      "Email support <4hr SLA",
      "Dedicated storage volumes",
    ],
    cta: "Get Started",
    ctaVariant: "green" as const,
    featured: true,
  },
  {
    tier: "Power User",
    name: "Professional",
    amount: "$31.92",
    period: "/hr",
    quota: "Unlimited GPU hours",
    desc: "Multi-GPU with custom model hosting. SLA 99.9% and phone support for serious workloads.",
    features: [
      "Custom model hosting",
      "Multi-GPU configurations",
      "Phone support",
      "99.9% uptime SLA",
    ],
    cta: "Get Started",
    ctaVariant: "outline" as const,
    featured: false,
  },
  {
    tier: "Enterprise",
    name: "Enterprise",
    amount: "$2,500",
    period: "+/mo",
    quota: "Dedicated infrastructure",
    desc: "Bare metal dedicated clusters with 24/7 white-glove support, custom SLA, and compliance certifications.",
    features: [
      "Dedicated bare metal servers",
      "On-premise deployment options",
      "24/7 dedicated support line",
      "Dedicated account manager",
      "Custom SLA negotiation",
      "HIPAA / SOC2 compliance",
    ],
    cta: "Contact Sales",
    ctaVariant: "outline" as const,
    featured: false,
  },
];

export default function PricingSection() {
  return (
    <section className="pricing" id="pricing">
      <div className="section-inner">
        <div className="section-label reveal">// Pricing</div>
        <h2 className="section-title reveal">
          Simple, Transparent <span className="g">GPU Pricing</span>
        </h2>
        <p className="section-sub reveal">
          No hidden fees. No surprise egress charges. No minimum commitments
          on entry plans. Pay for exactly what you use, billed per second.
        </p>

        <div className="pricing-grid">
          {TIERS.map((t, i) => (
            <div
              key={t.name}
              className={`price-card reveal reveal-delay-${i + 1}${
                t.featured ? " featured" : ""
              }`}
            >
              <div className="price-tier">{t.tier}</div>
              <div className="price-name">{t.name}</div>
              <div className="price-amount">
                {t.amount}
                <small>{t.period}</small>
              </div>
              <div className="price-quota">{t.quota}</div>
              <p className="price-desc">{t.desc}</p>
              <div className="price-divider"></div>
              <ul className="price-features">
                {t.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <a
                href="#"
                className={`btn price-cta btn-${t.ctaVariant}`}
              >
                {t.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
