const PILLARS = [
  {
    icon: "🚀",
    name: "Peak Performance",
    desc: "NVIDIA B200 Blackwell GPUs, InfiniBand 400G interconnect, and WEKA all-flash NVMe storage &mdash; the fastest AI compute stack available anywhere today.",
  },
  {
    icon: "🏛️",
    name: "Enterprise Reliability",
    desc: "Tier III U.S. data centers with N+1 redundant power, precision cooling, and a 99.99% SLA backed by real support engineers, not chatbots.",
  },
  {
    icon: "📈",
    name: "Seamless Scaling",
    desc: "Start with a single GPU. Scale to a multi-rack cluster in seconds. Same API, same tooling, same pricing model &mdash; no migration, no re-architecture required.",
  },
  {
    icon: "🌿",
    name: "Sustainable Power",
    desc: "DigiPowerX energy-optimized power delivery keeps PUE below 1.3 &mdash; lower operational carbon footprint without compromising compute density or performance.",
  },
  {
    icon: "🔓",
    name: "Transparent Access",
    desc: "Simple per-hour and monthly pricing. No hidden fees, no egress surprises, no legacy hardware buried in your cluster. What you see is exactly what you pay.",
  },
];

export default function WhySection() {
  return (
    <section className="why" id="why">
      <div className="section-inner">
        <div className="section-label reveal">// Why NeoCloudz</div>
        <h2 className="section-title reveal">
          Five Reasons <span className="g">Teams Choose Us</span>
        </h2>
        <p className="section-sub reveal">
          We built NeoCloudz because AI teams deserved better than repurposed
          cloud infrastructure with unpredictable pricing and shared hardware
          degrading your performance.
        </p>

        <div className="pillars">
          {PILLARS.map((pillar, i) => (
            <div
              key={pillar.name}
              className={`pillar reveal reveal-delay-${i + 1}`}
            >
              <span className="pillar-icon">{pillar.icon}</span>
              <div className="pillar-name">{pillar.name}</div>
              <p className="pillar-desc">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
