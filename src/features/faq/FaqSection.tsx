const FAQS = [
  {
    q: "What GPU hardware does NeoCloudz use?",
    a: "NeoCloudz runs exclusively on NVIDIA Blackwell B200 GPUs — the latest generation delivering up to 9&times; faster inference and 3&times; more training performance than the previous H100 generation. All B200 nodes are interconnected via InfiniBand 400G fabric and paired with WEKA all-flash NVMe storage for maximum throughput. We do not mix GPU generations or use legacy hardware in any cluster.",
  },
  {
    q: "How quickly can I start training?",
    a: "GPU instances are typically available within 60 seconds of your launch request for Pro Plus and Business tiers. For Professional and Enterprise multi-rack clusters, provisioning typically takes 2&ndash;5 minutes depending on cluster size and current demand. JupyterLab environments are always ready instantly upon login — no provisioning wait required. Enterprise customers can reserve capacity windows in advance for zero-wait access.",
  },
  {
    q: "What&rsquo;s the difference between GPU Service and AI Factory?",
    a: "GPU Service gives you raw on-demand access to NVIDIA B200 instances — you bring your own code, frameworks, and orchestration. AI Factory is an end-to-end managed platform for enterprise LLM training and deployment, including managed distributed training, model registry, serving infrastructure, and MLOps tooling. GPU Service is for teams who want full infrastructure control; AI Factory is for teams who want managed outcomes with less ops overhead.",
  },
  {
    q: "Do you support Kubernetes for inference?",
    a: "Yes &mdash; NeoCloudz provides first-class Kubernetes support for inference deployments. We offer pre-built Helm charts, GPU device plugin integration, and horizontal pod autoscaling configs optimized for B200 workloads. Our managed Kubernetes option (Professional and Enterprise plans) handles cluster management entirely, so you focus on model deployment rather than infrastructure operations. We support standard Kubernetes manifests and are compatible with all major model serving frameworks including vLLM, TGI, and Triton.",
  },
  {
    q: "How does NeoCloudz pricing compare to hyperscalers?",
    a: "NeoCloudz is typically 40&ndash;70% more cost-efficient than hyperscaler GPU instances for equivalent compute — because we own the hardware, the facility, and the power infrastructure directly. Hyperscalers amortize significant overhead (global sales, marketing, multi-tenant reservation systems, and egress fees) into their GPU pricing. Our per-second billing, zero egress fees on same-datacenter transfers, and no capacity reservation requirements make the actual total cost meaningfully lower for production AI workloads.",
  },
];

export default function FaqSection() {
  return (
    <section className="faq" id="faq">
      <div className="section-inner">
        <div className="section-label reveal text-center">// FAQ</div>
        <h2 className="section-title reveal text-center">
          Common <span className="g">Questions</span>
        </h2>
        <p className="section-sub reveal text-center mx-auto">
          Everything you need to know about NeoCloudz GPU solutions
          before you launch your first job.
        </p>

        <div className="faq-list">
          {FAQS.map((faq) => (
            <div key={faq.q} className="faq-item reveal">
              <div className="faq-q">
                {faq.q}
                <span className="faq-q-icon">+</span>
              </div>
              <div className="faq-a">{faq.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
