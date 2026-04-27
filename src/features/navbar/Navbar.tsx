export default function Navbar() {
  return (
    <nav>
      <div className="nav-inner">
        <a href="#" className="nav-logo">
          Neo<span>Cloudz</span>
        </a>
        <div className="nav-links">
          <a href="#">Home</a>
          <a href="#" className="active">
            Solution
          </a>
          <a href="#">Products</a>
          <a href="#">Infrastructure</a>
          <a href="#">Pricing</a>
          <a href="#">About</a>
          <a href="#">Docs</a>
        </div>
        <div className="nav-actions">
          <a href="#" className="btn btn-outline btn-sm">
            Login
          </a>
          <a href="#" className="btn btn-green btn-sm">
            Get Started
          </a>
        </div>
      </div>
    </nav>
  );
}
