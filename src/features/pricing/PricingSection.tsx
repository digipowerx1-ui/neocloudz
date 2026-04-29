import { HOME_PRICING_TIERS } from "@/lib/pricing-data";

const TIERS = HOME_PRICING_TIERS;

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
                href="/contact"
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
