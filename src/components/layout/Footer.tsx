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
      { label: "All Products", href: "/products" },
      { label: "GPU as a Service", href: "/products/gpu-as-a-service" },
      { label: "AI Cloud", href: "/products" },
      { label: "Self-Service AI Clusters", href: "/products" },
      { label: "Managed Kubernetes for AI", href: "/products" },
      { label: "AI Storage", href: "/products" },
    ],
  },
  {
    title: "Solutions",
    items: [
      { label: "AI Model Training", href: "/solutions#training" },
      { label: "AI Inference & Deployment", href: "/solutions#inference" },
      { label: "Rendering & Simulation", href: "/solutions#rendering" },
      { label: "Research & Experimentation", href: "/solutions#research" },
      { label: "Enterprise", href: "/enterprise" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "Pricing", href: "/pricing" },
      { label: "Enterprise", href: "/enterprise" },
      { label: "Contact", href: "/contact?source=footer&cta=contact" },
      { label: "Careers", href: "/contact?source=footer&cta=careers", badge: "HIRING" },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "Pricing Calculator", href: "/pricing" },
      { label: "Blog", href: "/blog" },
      { label: "Documentation", href: "/contact?source=footer&cta=documentation" },
      { label: "API Reference", href: "/contact?source=footer&cta=api_reference" },
      { label: "Support", href: "/contact?source=footer&cta=support" },
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
