import Link from "next/link";

const NAV_LINKS = [
  { label: "Products", href: "/" },
  { label: "Solution", href: "/" },
  { label: "Pricing", href: "/" },
];

export default function EnterpriseNavbar() {
  return (
    <nav className="ent-nav">
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
            Enterprise
          </a>
        </li>
        <li>
          <Link href="/contact">Company</Link>
        </li>
      </ul>
      <a href="#" className="nav-cta">
        Launch AI Instances ▶
      </a>
    </nav>
  );
}
