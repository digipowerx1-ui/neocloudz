const TESTIMONIALS = [
  {
    text: "We migrated our LLM fine-tuning pipeline from a major hyperscaler to NeoCloudz in a weekend. Training runs that used to take 14 hours now complete in under 6 — same dataset, same model architecture. The InfiniBand fabric makes all the difference for multi-node all-reduce operations at this scale.",
    initials: "SK",
    name: "Sarah K.",
    role: "ML Engineer, Series B AI Startup",
    gradient: "from-green to-green-dim",
  },
  {
    text: "Inference latency went from 38ms to 4.1ms p99 after deploying on NeoCloudz B200 instances. Our product team thought we&rsquo;d rewritten the model — we just moved the hardware. The Kubernetes-native deployment made the whole migration completely painless for our ops team.",
    initials: "MR",
    name: "Marcus R.",
    role: "CTO, AI-Powered SaaS Platform",
    gradient: "from-blue to-blue-dim",
  },
  {
    text: "Prototyping a new architecture used to mean waiting days for a cluster reservation. On NeoCloudz I&rsquo;m running experiments in JupyterLab on a B200 within 60 seconds of login. The one-click environment cloning feature alone has saved our team dozens of engineering hours every single sprint.",
    initials: "JP",
    name: "Jenna P.",
    role: "Research Scientist, AI Lab",
    gradient: "from-amber to-amber-dim",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="testimonials" id="testimonials">
      <div className="section-inner">
        <div className="section-label reveal">// What Teams Say</div>
        <h2 className="section-title reveal">
          Trusted by <span className="g">AI Teams Worldwide</span>
        </h2>
        <p className="section-sub reveal">
          From research labs to Series C startups &mdash; teams that run on
          NeoCloudz don&rsquo;t go back to shared hyperscaler infrastructure.
        </p>

        <div className="testi-grid">
          {TESTIMONIALS.map((t, i) => (
            <div key={t.initials} className={`testi-card reveal reveal-delay-${i + 1}`}>
              <div className="testi-quote">&ldquo;</div>
              <p className="testi-text">{t.text}</p>
              <div className="testi-author">
                <div className={`testi-avatar bg-gradient-to-br ${t.gradient}`}>
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
