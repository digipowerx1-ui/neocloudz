interface FaqItem {
  q: string;
  a: string;
}

const FAQS: ReadonlyArray<FaqItem> = [
  {
    q: "What does \"dedicated infrastructure\" actually mean?",
    a: "Dedicated infrastructure means your GPUs, InfiniBand switches, NVLink fabric, and storage are exclusively reserved for your organization — not shared with any other customer at any time. There are no hypervisors, no noisy neighbors, and no resource contention. You get bare-metal access with full hardware visibility and root-level control.",
  },
  {
    q: "How does NeoCloudz handle compliance certifications?",
    a: "NeoCloudz maintains SOC 2 Type II, HIPAA, GDPR, and ISO 27001 compliance at the infrastructure level. Upon signing an Enterprise agreement, you receive access to our Trust Center with audit reports, penetration test results, and a shared responsibility matrix. A dedicated security liaison is assigned to assist with your organization's internal compliance audits.",
  },
  {
    q: "What happens if NeoCloudz misses the SLA?",
    a: "SLA breaches trigger automatic service credits applied to your next invoice — no claim required, no negotiation. Enterprise customers receive 10% credit per 0.01% downtime below 99.99%. Mission Critical customers receive 25% credit per incident. Credits are calculated monthly and detailed in your billing dashboard.",
  },
  {
    q: "How long does the migration process take?",
    a: "Our standard Enterprise onboarding is 15 business days from contract signature to production Go Live. This includes a security architecture review (Days 1–2), VPC and network configuration (Days 3–4), bare-metal cluster provisioning (Days 5–7), integration testing and runbook creation (Days 8–14), and final production cutover (Day 15). Accelerated onboarding is available for qualifying customers.",
  },
  {
    q: "Can we negotiate custom contract terms and multi-year pricing?",
    a: "Yes. All Enterprise agreements are fully negotiable. We support purchase order invoicing, multi-year committed use discounts (up to 40% vs on-demand), custom payment terms, and committed capacity reservations. Contracts can be structured as monthly, quarterly, or annual billing cycles. Contact our enterprise sales team to begin a custom quote.",
  },
];

export default function EnterpriseFaq() {
  return (
    <section className="hp-section mid" id="faq">
      <div className="faq-grid" style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div className="faq-sidebar">
          <div
            className="hp-label"
            style={{ justifyContent: "flex-start", marginBottom: "16px" }}
          >
            FAQ
          </div>
          <h2>
            Enterprise
            <br />
            Questions.
          </h2>
          <p style={{ marginTop: "14px" }}>
            Everything you need to know about running mission-critical AI on
            dedicated infrastructure.
          </p>
        </div>
        <div className="faq-list" id="faq-list">
          {FAQS.map((faq) => (
            <div key={faq.q} className="faq-item">
              <div className="faq-q">
                {faq.q}
                <span className="faq-arrow">+</span>
              </div>
              <div className="faq-a">{faq.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
