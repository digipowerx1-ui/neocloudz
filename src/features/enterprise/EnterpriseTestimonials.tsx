interface Testimonial {
  quote: string;
  initials: string;
  name: string;
  role: string;
  avatarBg: string;
}

const TESTIMONIALS: ReadonlyArray<Testimonial> = [
  {
    quote:
      "NeoCloudz gave us a dedicated cluster with 99.99% uptime and our own InfiniBand fabric. Training runs that used to fail on shared infrastructure now complete reliably every time.",
    initials: "SR",
    name: "Sarah R.",
    role: "VP of Infrastructure · Acme AI",
    avatarBg: "linear-gradient(135deg,#2dff7a,#1aaa4e)",
  },
  {
    quote:
      "The dedicated NOC and named account manager made our HIPAA compliance audit straightforward. Having SOC 2 Type II out of the box saved us months of work.",
    initials: "MK",
    name: "Marcus K.",
    role: "CTO · Meridian AI",
    avatarBg: "linear-gradient(135deg,#4dc8ff,#1a5080)",
  },
  {
    quote:
      "From security review to Go Live in 12 days. The migration team handled our complex VPC setup and we were training on 128 B300s before the end of the second week.",
    initials: "JL",
    name: "Jessica L.",
    role: "Head of ML Ops · Vertex Labs",
    avatarBg: "linear-gradient(135deg,#ffb84d,#b85000)",
  },
];

export default function EnterpriseTestimonials() {
  return (
    <section className="hp-section dark" id="testimonials">
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div className="hp-label reveal" style={{ justifyContent: "center" }}>
          Customer Stories
        </div>
        <div className="hp-h2 reveal" style={{ textAlign: "center" }}>
          Trusted by Teams Running
          <br />
          <span className="g">Mission-Critical AI.</span>
        </div>

        <div className="testimonials-grid">
          {TESTIMONIALS.map((t, idx) => (
            <div key={t.name} className={`testi-card reveal reveal-d${idx + 1}`}>
              <div className="testi-quote">{t.quote}</div>
              <div className="testi-author">
                <div
                  className="testi-avatar"
                  style={{ background: t.avatarBg }}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="testi-name">{t.name}</div>
                  <div className="testi-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
