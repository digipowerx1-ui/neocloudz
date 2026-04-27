const COLUMNS = [
  {
    title: "Products",
    links: [
      "AI Factory",
      "GPU Service",
      "ML Service",
      "JupyterLab",
      "Model Registry",
      "Inference API",
    ],
  },
  {
    title: "Solutions",
    links: [
      "AI Training at Scale",
      "Real-Time Inference",
      "Rapid Prototyping",
      "HPC Workloads",
      "Enterprise AI",
      "Research Computing",
    ],
  },
  {
    title: "Company",
    links: [
      "About NeoCloudz",
      "Infrastructure",
      "Partners",
      "Blog",
      "Careers",
      "Press",
    ],
  },
  {
    title: "Resources",
    links: [
      "Documentation",
      "API Reference",
      "Status Page",
      "Support Center",
      "Pricing",
      "Security",
    ],
  },
];

export default function FooterSection() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-grid">
          <div>
            <div className="footer-brand-logo">
              Neo<span>Cloudz</span>
            </div>
            <p className="footer-brand-desc">
              The dedicated AI cloud platform from DigiPowerX and US Data Centers.
              100% NVIDIA Blackwell B200. 100% U.S.-owned infrastructure.
              Built for the era of large-scale AI.
            </p>
            <div className="footer-socials">
              <a href="#" className="footer-social" title="X / Twitter">
                𝕏
              </a>
              <a href="#" className="footer-social" title="LinkedIn">
                in
              </a>
              <a href="#" className="footer-social" title="GitHub">
                gh
              </a>
              <a href="#" className="footer-social" title="YouTube">
                ▶
              </a>
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <div className="footer-col-title">{col.title}</div>
              <ul className="footer-links">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <div className="footer-copy">
            &copy; 2025 <a href="#">NeoCloudz</a> &mdash; A{" "}
            <a href="#">DigiPowerX</a> +{" "}
            <a href="#">US Data Centers</a> Company. All rights reserved.
            &nbsp;&middot;&nbsp;
            <a href="#">Privacy</a> &middot; <a href="#">Terms</a>
          </div>
          <div className="footer-status">
            <span className="status-dot"></span>
            All systems operational
          </div>
          <div className="footer-meta">
            v2.4.1 &middot; TIA-942 Rated 3 &middot; SOC2 Type II
          </div>
        </div>
      </div>
    </footer>
  );
}
