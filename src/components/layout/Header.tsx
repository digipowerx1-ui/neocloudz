"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MessageSquare } from "lucide-react";

interface NavLink {
  label: string;
  href: string;
  /** Path prefixes considered "active" for this link */
  matches: string[];
  subLinks?: { label: string; href: string }[];
}

const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/", matches: ["/"] },
  {
    label: "Products",
    href: "/products",
    matches: ["/products", "/ai-factory-as-a-service", "/gpu-as-a-service", "/ml-as-a-service"],
    subLinks: [
      { label: "AI Factory as a Service", href: "/ai-factory-as-a-service" },
      { label: "GPU as a Service", href: "/gpu-as-a-service" },
      { label: "ML as a Service", href: "/ml-as-a-service" },
    ]
  },
  {
    label: "Solution",
    href: "/solution",
    matches: ["/solution"],
    subLinks: [
      { label: "AI Model Training", href: "/solution#training" },
      { label: "AI Inference & Deployment", href: "/solution#inference" },
      { label: "Rendering & Simulation", href: "/solution#rendering" },
      { label: "Research & Experimentation", href: "/solution#research" },
    ]
  },

  { label: "Pricing", href: "/pricing", matches: ["/pricing"] },
  { label: "Enterprise", href: "/enterprise", matches: ["/enterprise"] },
  {
    label: "Company",
    href: "/about",
    matches: ["/contact", "/about", "/career"],
    subLinks: [
      { label: "About Us", href: "/about" },
      { label: "Career", href: "/career" },
      { label: "Contact Us", href: "/contact" },
    ]
  },
];

function isActive(pathname: string, link: NavLink): boolean {
  if (link.href === "/") return pathname === "/";
  return link.matches.some((m) => pathname === m || pathname.startsWith(m + "/"));
}

export function Header() {
  const pathname = usePathname() || "/";
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <Link href="/" className="site-logo" onClick={() => setMenuOpen(false)}>
        <img src="/images/neocloudz-logo.png" alt="NeoCloudz" style={{ height: '80px', width: 'auto', display: 'block' }} />
      </Link>
      <ul className="site-nav-links">
        {NAV_LINKS.map((link) => {
          const active = isActive(pathname, link);
          return (
            <li key={link.label}>
              {link.subLinks ? (
                <div className="nav-item-dropdown">
                  <Link href={link.href} className={`nav-link-with-arrow${active ? " active" : ""}`}>
                    {link.label}
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                  <div className="dropdown-menu">
                    {link.subLinks.map((sub) => (
                      <Link key={sub.label} href={sub.href} className="dropdown-item">
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link href={link.href} className={active ? "active" : undefined}>
                  {link.label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
      <Link
        href={`/contact?source=${pathname === "/" ? "homepage" : pathname.replace("/", "") || "unknown"}&cta=talk_to_us`}
        className="site-nav-cta"
        style={{ display: "flex", alignItems: "center", gap: "8px" }}
      >
        Talk to Us <MessageSquare size={16} />
      </Link>
      <button
        className="site-nav-toggle"
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((v) => !v)}
      >
        <span />
        <span />
        <span />
      </button>
      {menuOpen && (
        <nav className="site-mobile-nav" onClick={() => setMenuOpen(false)}>
          <ul>
            {NAV_LINKS.map((link) => {
              const active = isActive(pathname, link);
              return (
                <li key={link.label}>
                  <Link href={link.href} className={active ? "active" : undefined}>
                    {link.label}
                  </Link>
                  {link.subLinks && (
                    <ul style={{
                      listStyle: "none",
                      padding: "4px 0 12px 12px",
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                      borderLeft: "1px solid rgba(45, 255, 122, 0.15)",
                      margin: "0 0 8px 16px"
                    }}>
                      {link.subLinks.map((sub) => (
                        <li key={sub.label}>
                          <Link href={sub.href} style={{
                            fontSize: 13,
                            opacity: 0.6,
                            padding: "8px 12px",
                            fontWeight: 500,
                            display: "block"
                          }}>
                            {sub.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}
