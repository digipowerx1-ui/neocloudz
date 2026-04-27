const LOGOS = [
  "Acme AI",
  "Quantum Labs",
  "Apex Systems",
  "NovaTech AI",
  "FusionCore",
  "Meridian AI",
  "Helix Data",
  "Orbital ML",
  "CipherAI",
  "Vertex Labs",
  "Nexus Systems",
  "PrismAI",
] as const;

const REPEAT_COUNT = 2;

export default function EnterpriseLogos() {
  return (
    <div className="logos-section">
      <div className="logos-label">Trusted by teams building at scale</div>
      <div className="logos-marquee-wrap">
        <div className="logos-marquee-track">
          {Array.from({ length: REPEAT_COUNT }).flatMap((_, repeatIdx) =>
            LOGOS.map((logo, idx) => (
              <span key={`${repeatIdx}-${idx}`} className="logo-pill">
                {logo}
              </span>
            )),
          )}
        </div>
      </div>
    </div>
  );
}
