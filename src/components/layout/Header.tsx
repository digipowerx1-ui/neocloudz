"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useSyncExternalStore } from "react";
import { MessageSquare, Moon, Sun } from "lucide-react";

const SIGN_IN_URL = "https://console.neocloudz.com/authentication/signin";
const SIGN_UP_URL = "https://console.neocloudz.com/authentication/signup";
import { AnnouncementBanner } from "./AnnouncementBanner";

interface SubLink {
  label: string;
  href: string;
  badge?: string;
}

interface NavLink {
  label: string;
  href: string;
  /** Path prefixes considered "active" for this link */
  matches: string[];
  subLinks?: SubLink[];
}

const NAV_LINKS: NavLink[] = [
  {
    label: "Products",
    href: "/products",
    matches: [
      "/products",
      "/token-factory",
      "/ai-factory-as-a-service",
      "/gpu-as-a-service",
      "/ml-as-a-service",
    ],
    subLinks: [
      { label: "Token Factory", href: "/token-factory", badge: "Early Access" },
      { label: "AI Factory as a Service", href: "/ai-factory-as-a-service" },
      { label: "GPU as a Service", href: "/gpu-as-a-service" },
      { label: "ML as a Service", href: "/ml-as-a-service" },
      { label: "Managed Kubernetes", href: "/products#k8s" },
      { label: "AI Storage", href: "/products#storage" },
    ],
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
    ],
  },

  { label: "Pricing", href: "/pricing", matches: ["/pricing"] },
  { label: "Enterprise", href: "/enterprise", matches: ["/enterprise"] },
  {
    label: "Company",
    href: "/about",
    matches: ["/contact", "/about", "/career"],
    subLinks: [
      { label: "About Us", href: "/about#overview" },
      { label: "Career", href: "/career" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
];

function isActive(pathname: string, link: NavLink): boolean {
  if (link.href === "/") return pathname === "/";
  return link.matches.some((m) => pathname === m || pathname.startsWith(m + "/"));
}

function subscribeTheme(cb: () => void) {
  window.addEventListener("themechange", cb);
  return () => window.removeEventListener("themechange", cb);
}

function ThemeToggle() {
  const theme = useSyncExternalStore(
    subscribeTheme,
    () => (document.documentElement.dataset.theme === "light" ? "light" : "dark"),
    () => "dark",
  );
  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch {}
    window.dispatchEvent(new Event("themechange"));
  };
  return (
    <button
      type="button"
      className="site-theme-toggle"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
    >
      {theme === "dark" ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
    </button>
  );
}

export function Header() {
  const pathname = usePathname() || "/";
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="site-header-wrapper">
      <AnnouncementBanner />
      <header className="site-header">
        <Link
          href="/"
          className="site-logo"
          aria-label="NeoCloudz Home"
          onClick={() => setMenuOpen(false)}
        >
          <img
            src="/Asset%201.png"
            alt="NeoCloudz - High-Performance AI Cloud"
            style={{ height: "45px", width: "auto", display: "block" }}
          />
        </Link>
        <ul className="site-nav-links">
          {NAV_LINKS.map((link) => {
            const active = isActive(pathname, link);
            return (
              <li key={link.label}>
                {link.subLinks ? (
                  <div className="nav-item-dropdown">
                    <Link
                      href={link.href}
                      className={`nav-link-with-arrow${active ? " active" : ""}`}
                    >
                      {link.label}
                      <svg
                        width="10"
                        height="6"
                        viewBox="0 0 10 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          d="M1 1L5 5L9 1"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                    <div className="dropdown-menu">
                      {link.subLinks.map((sub) => (
                        <Link key={sub.label} href={sub.href} className="dropdown-item">
                          <span>{sub.label}</span>
                          {sub.badge ? (
                            <span className="nav-dropdown-badge">{sub.badge}</span>
                          ) : null}
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
        <div className="site-header-actions">
          <a href={SIGN_IN_URL} className="site-nav-signin">
            Sign In
          </a>
          <a href={SIGN_UP_URL} className="site-nav-signup">
            Sign Up
          </a>
          <ThemeToggle />
          <Link
            href={`/contact?source=${pathname === "/" ? "homepage" : pathname.replace("/", "") || "unknown"
              }&cta=talk_to_us`}
            className="site-nav-cta"
            aria-label="Talk to Us via Contact Sales"
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
          >
            Talk to Us <MessageSquare size={16} aria-hidden="true" />
          </Link>
        </div>
        <button
          className="site-nav-toggle"
          aria-label="Toggle navigation menu"
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
                      <ul
                        style={{
                          listStyle: "none",
                          padding: "4px 0 12px 12px",
                          display: "flex",
                          flexDirection: "column",
                          gap: 2,
                          borderLeft: "1px solid rgba(var(--green-rgb), 0.15)",
                          margin: "0 0 8px 16px",
                        }}
                      >
                        {link.subLinks.map((sub) => (
                          <li key={sub.label}>
                            <Link
                              href={sub.href}
                              style={{
                                fontSize: 13,
                                opacity: 0.8,
                                padding: "8px 12px",
                                fontWeight: 500,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                              }}
                            >
                              <span>{sub.label}</span>
                              {sub.badge ? (
                                <span className="nav-dropdown-badge">{sub.badge}</span>
                              ) : null}
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
    </div>
  );
}
