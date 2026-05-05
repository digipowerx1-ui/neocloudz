import Link from "next/link";

export default function ProductsSection() {
  return (
    <section className="products" id="products">
      <div className="section-inner">
        <div className="section-label reveal">// Products</div>
        <h2 className="section-title reveal">
          Three Products. <span className="g">One Platform.</span>
        </h2>
        <p className="section-sub reveal">
          Every NeoCloudz product is built on the same NVIDIA Blackwell B200
          foundation &mdash; differentiated by scale, automation, and control level.
        </p>

        <div className="products-grid">
          <div className="prod-card reveal reveal-delay-1" id="factory">
            <div className="prod-icon mb-4">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 20V9l4-5h12l4 5v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z" />
                <path d="M12 18V9M17 18V9M7 18V9" opacity="0.4" />
                <path d="M2 20V9l4-5h12l4 5v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z" opacity="0.3" strokeWidth="3" filter="blur(2px)" />
              </svg>
            </div>
            <div className="prod-name">AI Factory</div>
            <p className="prod-desc">
              Enterprise-grade LLM training and deployment. Build, fine-tune,
              and serve the world&rsquo;s largest models on dedicated multi-rack B200
              infrastructure with full SLA guarantees and managed MLOps tooling
              already integrated.
            </p>
            <Link href="/contact?source=products&cta=ai_factory" className="prod-link">
              Contact Us
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="prod-card reveal reveal-delay-2" id="gpu">
            <div className="prod-icon mb-4">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="4" width="16" height="16" rx="2" />
                <path d="M9 9h6v6H9z" />
                <path d="M15 2v2M9 2v2M20 15h2M20 9h2M15 20v2M9 20v2M2 15h2M2 9h2" />
                <rect x="4" y="4" width="16" height="16" rx="2" opacity="0.3" strokeWidth="3" filter="blur(2px)" />
              </svg>
            </div>
            <div className="prod-name">GPU Service</div>
            <p className="prod-desc">
              On-demand NVIDIA Blackwell B200 GPUs. AI training, inference,
              and HPC workloads at any scale. Launch a single GPU or a
              256-node cluster — billed per second with no commitments
              or reservations required.
            </p>
            <Link href="/contact?source=products&cta=gpu_service" className="prod-link">
              Contact Us
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="prod-card reveal reveal-delay-3" id="ml">
            <div className="prod-icon mb-4">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 8V4H8" />
                <rect x="4" y="8" width="16" height="12" rx="2" />
                <path d="M2 14h2M20 14h2M15 13v2M9 13v2" />
                <rect x="4" y="8" width="16" height="12" rx="2" opacity="0.3" strokeWidth="3" filter="blur(2px)" />
              </svg>
            </div>
            <div className="prod-name">ML Service</div>
            <p className="prod-desc">
              End-to-end managed ML services. From data prep to production —
              we handle the infrastructure, orchestration, and monitoring
              so your team can focus entirely on model development
              and business outcomes.
            </p>
            <Link href="/contact?source=products&cta=ml_service" className="prod-link">
              Contact Us
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
