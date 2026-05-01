const STATS = [
  {
    num: "100",
    suffix: "%",
    countAttr: true,
    countfAttr: false,
    label: "U.S.-Owned",
    sub: "100% domestically operated infrastructure",
  },
  {
    num: "Tier III",
    suffix: "",
    countAttr: false,
    countfAttr: false,
    label: "Data Center Certified",
    sub: "N+1 redundancy in both power and cooling",
  },
  {
    num: "1.28",
    prefix: "<",
    countAttr: false,
    countfAttr: true,
    label: "PUE Rating",
    sub: "DigiPowerX energy-optimized facility design",
  },
  {
    num: "TIA-942",
    suffix: "",
    countAttr: false,
    countfAttr: false,
    label: "Rated 3 Certified",
    sub: "CERTAC-validated infrastructure design",
  },
];

export default function DcStatsSection() {
  return (
    <section className="dc-stats" id="datacenter">
      <div className="section-inner">
        <div className="section-label reveal">
          // Data Centers
        </div>
        <h2 className="section-title reveal">
          Built to <span className="g">Last. Built to Scale.</span>
        </h2>
        <p className="section-sub reveal">
          Every NeoCloudz facility meets the highest standards for
          availability, security, and power efficiency.
        </p>
        <div className="dc-grid">
          {STATS.map((s, i) => (
            <div key={s.label} className={`dc-stat reveal reveal-delay-${i + 1}`}>
              <span
                className="dc-num"
                {...(s.countAttr
                  ? { "data-count": s.num, "data-suffix": s.suffix }
                  : {})}
                {...(s.countfAttr
                  ? { "data-countf": s.num, "data-prefix": s.prefix }
                  : {})}
              >
                {s.countfAttr ? "1.0" : s.num + s.suffix}
              </span>
              <div className="dc-label">{s.label}</div>
              <div className="dc-sub">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
