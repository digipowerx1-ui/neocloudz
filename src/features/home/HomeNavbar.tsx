import Link from "next/link";

export function HomeNavbar() {
  return (
    <nav>
      <Link href="/" className="nav-logo">
        Neo<span>Cloudz</span>
      </Link>
      <ul className="nav-links">
        <li><a href="#">Products</a></li>
        <li><a href="#">Solution</a></li>
        <li><a href="#">Pricing</a></li>
        <li><Link href="/enterprise">Enterprise</Link></li>
        <li><Link href="/contact">Company</Link></li>
      </ul>
      <a href="#" className="nav-cta">Launch AI Instances ▶</a>
    </nav>
  );
}
