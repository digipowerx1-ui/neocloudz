import Link from "next/link";

interface FooterLink {
  label: string;
  href: string;
  badge?: string;
}

interface FooterColumn {
  title: string;
  items: FooterLink[];
}

const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Products",
    items: [
      { label: "B200 On-Demand", href: "#" },
      { label: "B300 On-Demand", href: "#" },
      { label: "GB200 Bare Metal", href: "#" },
      { label: "GB300 Bare Metal", href: "#" },
      { label: "WEKA Storage", href: "#" },
      { label: "Vera Rubin", href: "#", badge: "SOON" },
    ],
  },
  {
    title: "Solutions",
    items: [
      { label: "LLM Training", href: "/solutions" },
      { label: "Inference at Scale", href: "/solutions" },
      { label: "Fine-Tuning", href: "/solutions" },
      { label: "Research Compute", href: "/solutions" },
      { label: "Enterprise", href: "/enterprise" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#", badge: "HIRING" },
      { label: "Status", href: "#" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "Documentation", href: "#" },
      { label: "API Reference", href: "#" },
      { label: "Benchmarks", href: "#" },
      { label: "Pricing Calculator", href: "/pricing" },
      { label: "Support", href: "/contact" },
    ],
  },
];

const SOCIALS: Array<{ label: string; href: string }> = [
  { label: "𝕏", href: "#" },
  { label: "in", href: "#" },
  { label: "gh", href: "#" },
  { label: "dc", href: "#" },
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-top">
        <div className="site-footer-brand">
          <Link href="/" className="site-footer-brand-logo">
            Neo<span>Cloudz</span>
          </Link>
          <p>
            The fastest, most powerful GPU cloud for AI teams. Blackwell on-demand,
            Grace Blackwell bare metal, and WEKA storage — all in one platform.
          </p>
          <div className="site-footer-social">
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} className="site-fsoc">
                {s.label}
              </a>
            ))}
          </div>
        </div>
        {FOOTER_COLUMNS.map((col) => (
          <div className="site-footer-col" key={col.title}>
            <h4>{col.title}</h4>
            <ul>
              {col.items.map((it) => (
                <li key={it.label}>
                  {it.href.startsWith("/") ? (
                    <Link href={it.href}>
                      {it.label}
                      {it.badge ? (
                        <span className="site-badge-new">{it.badge}</span>
                      ) : null}
                    </Link>
                  ) : (
                    <a href={it.href}>
                      {it.label}
                      {it.badge ? (
                        <span className="site-badge-new">{it.badge}</span>
                      ) : null}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="site-footer-bottom">
        <p>© 2025 NeoCloudz Inc. All rights reserved.</p>
        <div className="site-footer-bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Security</a>
        </div>
      </div>
    </footer>
  );
}
