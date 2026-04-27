export default function WhyNeoCloudz() {
  return (
    <section className="why" id="why">
      <div className="section-inner">
        <div className="section-label reveal">{"// Why NeoCloudz"}</div>
        <h2 className="section-title reveal">
          Five Reasons <span className="g">Teams Choose Us</span>
        </h2>
        <p className="section-sub reveal">
          We built NeoCloudz because AI teams deserved better than repurposed
          cloud infrastructure with unpredictable pricing and shared hardware
          degrading your performance.
        </p>

        <div className="pillars">
          <div className="pillar reveal reveal-delay-1">
            <span className="pillar-icon">🚀</span>
            <div className="pillar-name">Peak Performance</div>
            <p className="pillar-desc">
              NVIDIA B200 Blackwell GPUs, InfiniBand 400G interconnect,
              and WEKA all-flash NVMe storage &mdash; the fastest
              AI compute stack available anywhere today.
            </p>
          </div>
          <div className="pillar reveal reveal-delay-2">
            <span className="pillar-icon">🏛️</span>
            <div className="pillar-name">Enterprise Reliability</div>
            <p className="pillar-desc">
              Tier III U.S. data centers with N+1 redundant power,
              precision cooling, and a 99.99% SLA backed by real
              support engineers, not chatbots.
            </p>
          </div>
          <div className="pillar reveal reveal-delay-3">
            <span className="pillar-icon">📈</span>
            <div className="pillar-name">Seamless Scaling</div>
            <p className="pillar-desc">
              Start with a single GPU. Scale to a multi-rack cluster
              in seconds. Same API, same tooling, same pricing model
              &mdash; no migration, no re-architecture required.
            </p>
          </div>
          <div className="pillar reveal reveal-delay-4">
            <span className="pillar-icon">🌿</span>
            <div className="pillar-name">Sustainable Power</div>
            <p className="pillar-desc">
              DigiPowerX energy-optimized power delivery keeps PUE
              below 1.3 &mdash; lower operational carbon footprint
              without compromising compute density or performance.
            </p>
          </div>
          <div className="pillar reveal reveal-delay-5">
            <span className="pillar-icon">🔓</span>
            <div className="pillar-name">Transparent Access</div>
            <p className="pillar-desc">
              Simple per-hour and monthly pricing. No hidden fees,
              no egress surprises, no legacy hardware buried
              in your cluster. What you see is exactly what you pay.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
