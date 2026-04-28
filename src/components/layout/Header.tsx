"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface NavLink {
  label: string;
  href: string;
  /** Path prefixes considered "active" for this link */
  matches: string[];
}

const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/", matches: ["/"] },
  { label: "Products", href: "/products", matches: ["/products"] },
  { label: "Solution", href: "/solutions", matches: ["/solutions"] },
  { label: "Pricing", href: "/pricing", matches: ["/pricing"] },
  { label: "Enterprise", href: "/enterprise", matches: ["/enterprise"] },
  { label: "Contact Us", href: "/contact", matches: ["/contact"] },
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
        Neo<span>Cloudz</span>
      </Link>
      <ul className="site-nav-links">
        {NAV_LINKS.map((link) => {
          const active = isActive(pathname, link);
          return (
            <li key={link.label}>
              <Link href={link.href} className={active ? "active" : undefined}>
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
      <Link href="/contact" className="site-nav-cta">
        Launch AI Instances ▶
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
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}
