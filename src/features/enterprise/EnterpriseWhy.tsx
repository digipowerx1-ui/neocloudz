interface FeatureCard {
  icon: string;
  title: string;
  desc: string;
}

const FEATURES: ReadonlyArray<FeatureCard> = [
  {
    icon: "🖥️",
    title: "Dedicated Infrastructure",
    desc: "Your own bare-metal cluster with zero noisy neighbors. Every GPU, every NVLink switch, every InfiniBand port — reserved exclusively for your workloads.",
  },
  {
    icon: "🔒",
    title: "Private Networking",
    desc: "VPC isolation, private InfiniBand fabric, no shared routing. Your traffic never crosses a shared network — air-gapped from day one.",
  },
  {
    icon: "📈",
    title: "SLA-Backed Uptime",
    desc: "99.99% uptime SLA with financial credits for any breach. We put our money where our mouth is — downtime credits automatically applied to your next invoice.",
  },
  {
    icon: "🛡️",
    title: "Compliance Ready",
    desc: "SOC 2 Type II, HIPAA, GDPR, and ISO 27001 support out of the box. Our compliance package includes audit-ready documentation and a dedicated security liaison.",
  },
  {
    icon: "🎯",
    title: "Priority Support",
    desc: "Named account manager, <15min P1 response time, and a dedicated NOC team monitoring your cluster 24/7 — not a ticket queue, a direct line.",
  },
  {
    icon: "📋",
    title: "Custom Contracts",
    desc: "Reserved pricing, flexible payment terms, multi-year discounts, and purchase order support. We work the way enterprise procurement works.",
  },
];

export default function EnterpriseWhy() {
  return (
    <section className="hp-section dark" id="why-enterprise">
      <div className="hp-label reveal" style={{ maxWidth: "1200px", margin: "0 auto 16px" }}>
        Why Enterprise
      </div>
      <div className="hp-h2 reveal" style={{ maxWidth: "1200px", margin: "0 auto 16px" }}>
        Built for Teams That
        <br />
        <span className="g">Can&apos;t Afford Downtime.</span>
      </div>
      <p className="hp-sub reveal" style={{ maxWidth: "1200px", margin: "0 auto 0" }}>
        Everything you need to run mission-critical AI with confidence — dedicated
        hardware, private networking, and white-glove support.
      </p>

      <div className="ent-features-grid" style={{ maxWidth: "1200px", margin: "56px auto 0" }}>
        {FEATURES.map((feature, idx) => (
          <div key={feature.title} className={`ent-card reveal reveal-d${idx + 1}`}>
            <div className="ent-icon">{feature.icon}</div>
            <div className="ent-card-title">{feature.title}</div>
            <div className="ent-card-desc">{feature.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
