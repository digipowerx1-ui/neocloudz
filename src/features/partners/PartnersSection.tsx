const PARTNERS = [
  { icon: "🟢", text: "NVIDIA — GPU Architecture" },
  { icon: "🖥️", text: "Supermicro — High-Density Servers" },
  { icon: "⚡", text: "DigiPowerX — Energy-Optimized Power" },
  { icon: "🏅", text: "TIA-942 Rated 3 / CERTAC" },
  { icon: "💾", text: "WEKA Storage — NVMe All-Flash" },
  { icon: "🔗", text: "InfiniBand 400G — RDMA Fabric" },
  { icon: "🏢", text: "US Data Centers — Tier III Facilities" },
  { icon: "☸️", text: "Kubernetes — Container Orchestration" },
];

export default function PartnersSection() {
  const items = [...PARTNERS, ...PARTNERS];

  return (
    <section className="partners" id="partners">
      <div className="partners-header">
        <div className="section-label reveal text-center">
          // Technology Partners
        </div>
        <h2 className="section-title reveal text-center">
          Powered by <span className="g">Industry Leaders</span>
        </h2>
        <p className="section-sub reveal text-center mx-auto">
          Every component of the NeoCloudz stack is sourced from best-in-class
          partners &mdash; no compromises, no substitutions, no surprises.
        </p>
      </div>
      <div className="logo-track-wrap">
        <div className="logo-track">
          {items.map((partner, i) => (
            <span key={i} className="logo-pill">
              <span className="logo-pill-icon">{partner.icon}</span>
              {partner.text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
