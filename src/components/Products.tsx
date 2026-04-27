export default function Products() {
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
          <div className="prod-card reveal reveal-delay-1">
            <div className="prod-icon-wrap">🏭</div>
            <div className="prod-name">AI Factory</div>
            <p className="prod-desc">
              Enterprise-grade LLM training and deployment. Build, fine-tune,
              and serve the world&rsquo;s largest models on dedicated multi-rack B200
              infrastructure with full SLA guarantees and managed MLOps tooling
              already integrated.
            </p>
            <a href="#" className="prod-link">Learn More →</a>
          </div>

          <div className="prod-card reveal reveal-delay-2">
            <div className="prod-icon-wrap">🎮</div>
            <div className="prod-name">GPU Service</div>
            <p className="prod-desc">
              On-demand NVIDIA Blackwell B200 GPUs. AI training, inference,
              and HPC workloads at any scale. Launch a single GPU or a
              256-node cluster — billed per second with no commitments
              or reservations required.
            </p>
            <a href="#" className="prod-link">Learn More →</a>
          </div>

          <div className="prod-card reveal reveal-delay-3">
            <div className="prod-icon-wrap">🤖</div>
            <div className="prod-name">ML Service</div>
            <p className="prod-desc">
              End-to-end managed ML services. From data prep to production —
              we handle the infrastructure, orchestration, and monitoring
              so your team can focus entirely on model development
              and business outcomes.
            </p>
            <a href="#" className="prod-link">Learn More →</a>
          </div>
        </div>
      </div>
    </section>
  );
}
