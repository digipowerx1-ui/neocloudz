import Link from "next/link";

const NAV_LINKS = [
  { label: "Products", href: "/" },
  { label: "Solution", href: "/" },
  { label: "Pricing", href: "/" },
  { label: "Enterprise", href: "/enterprise" },
];

export default function ContactNavbar() {
  return (
    <nav className="contact-nav">
      <Link href="/" className="nav-logo">
        Neo<span>Cloudz</span>
      </Link>
      <ul className="nav-links">
        {NAV_LINKS.map((link) => (
          <li key={link.label}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
        <li>
          <a href="#" className="active">
            Company
          </a>
        </li>
      </ul>
      <a href="#" className="nav-cta">
        Launch AI Instances ▶
      </a>
    </nav>
  );
}
