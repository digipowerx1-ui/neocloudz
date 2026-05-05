import Link from "next/link";

interface FooterColumn {
  title: string;
  items: ReadonlyArray<{ label: string; badge?: string }>;
}

const COLUMNS: ReadonlyArray<FooterColumn> = [
  {
    title: "Products",
    items: [
      { label: "B200 On-Demand" },
      { label: "B300 On-Demand" },
      { label: "GB200 Bare Metal" },
      { label: "GB300 Bare Metal" },
      { label: "WEKA Storage" },
      { label: "Vera Rubin", badge: "SOON" },
    ],
  },
  {
    title: "Solutions",
    items: [
      { label: "LLM Training" },
      { label: "Inference at Scale" },
      { label: "Fine-Tuning" },
      { label: "Research Compute" },
      { label: "Enterprise" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About" },
      { label: "Blog" },
      { label: "Careers", badge: "HIRING" },
      { label: "Status" },
      { label: "Contact" },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "Documentation" },
      { label: "API Reference" },
      { label: "Benchmarks" },
      { label: "Pricing Calculator" },
      { label: "Support" },
    ],
  },
];

const SOCIALS = [
  { label: "𝕏", href: "https://x.com/Neocloudz" },
  { label: "in", href: "#" },
  { label: "ig", href: "https://www.instagram.com/neocloudz/" },
  { label: "dc", href: "#" },
] as const;

export default function EnterpriseFooter() {
  return (
    <footer className="ent-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <Link href="/" className="footer-brand-logo">
            <img src="/images/neocloudz-logo.png" alt="NeoCloudz" style={{ height: '80px', width: 'auto', display: 'block' }} />
          </Link>
          <p>
            The fastest, most powerful GPU cloud for AI teams. Blackwell on-demand,
            Grace Blackwell bare metal, and WEKA storage — all in one platform.
          </p>
          <div className="footer-social">
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} className="fsoc" target="_blank" rel="noreferrer">
                {s.label}
              </a>
            ))}
          </div>
        </div>
        {COLUMNS.map((col) => (
          <div key={col.title} className="footer-col">
            <h4>{col.title}</h4>
            <ul>
              {col.items.map((item) => (
                <li key={item.label}>
                  <a href="#">
                    {item.label}
                    {item.badge ? (
                      <span className="badge-new">{item.badge}</span>
                    ) : null}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="footer-bottom">
        <p>© 2026 NeoCloudz Inc. All rights reserved.</p>
        <div className="footer-bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Security</a>
        </div>
      </div>
    </footer>
  );
}
