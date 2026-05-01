const PILLARS = [
  {
    icon: (
      <svg width="42" height="42" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="var(--green)" />
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="var(--green)" opacity="0.3" strokeWidth="3" filter="blur(2px)" />
        <path d="M12 14l-2 2M14 10l-2 2" stroke="var(--white)" opacity="0.5" />
      </svg>
    ),
    name: "Peak Performance",
    desc: "NVIDIA B200 Blackwell GPUs, InfiniBand 400G interconnect, and WEKA all-flash NVMe storage &mdash; the fastest AI compute stack available anywhere today.",
  },
  {
    icon: (
      <svg width="42" height="42" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="var(--blue)" />
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="var(--blue)" opacity="0.3" strokeWidth="3" filter="blur(2px)" />
        <path d="M9 12l2 2 4-4" stroke="var(--white)" />
      </svg>
    ),
    name: "Enterprise Reliability",
    desc: "Tier III U.S. data centers with N+1 redundant power, precision cooling, and a 99.99% SLA backed by real support engineers, not chatbots.",
  },
  {
    icon: (
      <svg width="42" height="42" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 3l-6.5 6.5M21 3h-6M21 3v6M3 21l6.5-6.5M3 21h6M3 21v-6M21 21l-6.5-6.5M21 21v-6M21 21h-6M3 3l6.5 6.5M3 3v6M3 3h6" stroke="var(--green)" />
        <circle cx="12" cy="12" r="3" stroke="var(--white)" opacity="0.6" />
        <path d="M21 3l-6.5 6.5M21 3h-6M21 3v6M3 21l6.5-6.5M3 21h6M3 21v-6M21 21l-6.5-6.5M21 21v-6M21 21h-6M3 3l6.5 6.5M3 3v6M3 3h6" stroke="var(--green)" opacity="0.3" strokeWidth="3" filter="blur(2px)" />
      </svg>
    ),
    name: "Seamless Scaling",
    desc: "Start with a single GPU. Scale to a multi-rack cluster in seconds. Same API, same tooling, same pricing model &mdash; no migration, no re-architecture required.",
  },
  {
    icon: (
      <svg width="42" height="42" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8a8 8 0 0 1-8 8c-1 0-1 0-2 2Z" stroke="var(--green)" />
        <path d="M12 9v4" stroke="var(--amber)" strokeWidth="2" />
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8a8 8 0 0 1-8 8c-1 0-1 0-2 2Z" stroke="var(--green)" opacity="0.3" strokeWidth="3" filter="blur(2px)" />
      </svg>
    ),
    name: "Sustainable Power",
    desc: "DigiPowerX energy-optimized power delivery keeps PUE below 1.3 &mdash; lower operational carbon footprint without compromising compute density or performance.",
  },
  {
    icon: (
      <svg width="42" height="42" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="var(--white)" />
        <circle cx="12" cy="12" r="3" stroke="var(--green)" />
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="var(--white)" opacity="0.3" strokeWidth="3" filter="blur(2px)" />
      </svg>
    ),
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
