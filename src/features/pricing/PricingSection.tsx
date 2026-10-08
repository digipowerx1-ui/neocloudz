import { HOME_PRICING_TIERS } from "@/lib/pricing-data";

const TIERS = HOME_PRICING_TIERS;

export default function PricingSection() {
  return (
    <section className="pricing" id="pricing">
      <div className="section-inner">
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div className="section-label reveal" style={{ justifyContent: "center" }}>
            Pricing
          </div>
          <h2 className="section-title reveal" style={{ textAlign: "center" }}>
            Simple, Transparent <span className="g">GPU Pricing</span>
          </h2>
          <p className="section-sub reveal" style={{ margin: "16px auto 0", textAlign: "center" }}>
            No hidden fees. No surprise egress charges. No minimum commitments
            on entry plans. Pay for exactly what you use, billed per second.
          </p>
        </div>

        <div className="pricing-grid">
          {TIERS.map((t, i) => (
            <div
              key={t.name}
              className={`price-card reveal reveal-delay-${i + 1}${t.featured ? " featured" : ""
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
                href={`/contact?source=pricing&cta=${t.name.toLowerCase().replace(/ /g, "_")}`}
                className={`btn price-cta btn-${t.ctaVariant}`}
                aria-label={`${t.cta} for ${t.name}`}
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
