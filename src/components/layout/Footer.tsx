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
      { label: "All Solutions", href: "/solution" },
      { label: "AI Model Training", href: "/solution#training" },
      { label: "AI Inference & Deployment", href: "/solution#inference" },
      { label: "Rendering & Simulation", href: "/solution#rendering" },
      { label: "Research & Experimentation", href: "/solution#research" },
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
     
      { label: "Documentation", href: "/contact?source=footer&cta=documentation" },
      { label: "API Reference", href: "/contact?source=footer&cta=api_reference" },
      { label: "Support", href: "/contact?source=footer&cta=support" },
    ],
  },
];

interface Social {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const SOCIALS: Social[] = [
  {
    label: "X (Twitter)",
    href: "https://x.com/Neocloudz",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.73-8.835L2.25 2.25h6.938l4.26 5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/neo-cloudz/?viewAsMember=true",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/neocloudz/",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/people/NeoCloudz/61589451923838/",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.324v-21.35c0-.732-.593-1.325-1.325-1.325z" />
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-top">
        <div className="site-footer-brand">
          <Link href="/" className="site-footer-brand-logo">
            <img src="/images/neocloudz-logo.png" alt="NeoCloudz" style={{ height: '80px', width: 'auto', display: 'block' }} />
          </Link>
          <p>
            The future of Al compute starts here. Powered by DigiPower • U.S. Tier Ill Data Centers TIA-942
Rated 3 • SOC 2 Type I Compliant
          </p>
          <div className="site-footer-social">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="site-fsoc"
                aria-label={s.label}
                title={s.label}
              >
                {s.icon}
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
        <p>© 2026 NeoCloudz Inc. All rights reserved.</p>
        <div className="site-footer-bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Security</a>
        </div>
      </div>
    </footer>
  );
}
