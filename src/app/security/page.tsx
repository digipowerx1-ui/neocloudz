import type { Metadata } from "next";
import Link from "next/link";
import "../legal.css";

export const metadata: Metadata = {
  title: "Security — NeoCloudz",
  description:
    "How NeoCloudz protects its infrastructure, data, and customers.",
};

const LAST_UPDATED = "June 13, 2026";

export default function SecurityPage() {
  return (
    <main className="legal-page">
      <div className="legal-shell">
        <header className="legal-header">
          <div className="legal-label">
            <span className="legal-dot" />
            TRUST // SECURITY
          </div>
          <h1>Security</h1>
          <p className="legal-updated">Last updated: {LAST_UPDATED}</p>
        </header>

        <section className="legal-section">
          <div className="legal-callout">
            <strong>Our commitment:</strong> Security is foundational to how we
            build and operate AI infrastructure. We design our facilities,
            networks, and applications to protect the confidentiality,
            integrity, and availability of the systems and data entrusted to us.
          </div>
        </section>

        <section className="legal-section">
          <h2>Infrastructure security</h2>
          <p>
            Our compute runs in U.S.-based, Tier III data centers built for
            enterprise-grade resilience.
          </p>
          <ul className="legal-list">
            <li>
              <strong>Certified facilities.</strong> TIA-942 Rated 3 data centers
              with controlled physical access and 24/7 monitoring.
            </li>
            <li>
              <strong>Redundancy.</strong> N+1 redundant power and cooling
              designed for high operational continuity.
            </li>
            <li>
              <strong>Network isolation.</strong> Private interconnects and
              high-throughput InfiniBand networking for enterprise workloads.
            </li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>Data protection</h2>
          <ul className="legal-list">
            <li>
              <strong>Encryption in transit.</strong> Traffic to and from our
              services is protected using industry-standard TLS encryption.
            </li>
            <li>
              <strong>Encryption at rest.</strong> Sensitive data is protected
              using strong encryption standards such as AES-256.
            </li>
            <li>
              <strong>Access control.</strong> Access to systems and data follows
              the principle of least privilege and is restricted to authorized
              personnel.
            </li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>Application and website security</h2>
          <p>
            This website is delivered over HTTPS through a managed hosting
            platform. It does not use tracking or advertising cookies — see our{" "}
            <Link href="/cookie-policy" className="legal-link">
              Cookie Policy
            </Link>
            . Information you submit through our forms is handled in accordance
            with our{" "}
            <Link href="/privacy-policy" className="legal-link">
              Privacy Policy
            </Link>
            .
          </p>
        </section>

        <section className="legal-section">
          <h2>Compliance</h2>
          <p>
            NeoCloudz maintains a security and compliance program aligned with
            recognized industry standards, including SOC 2. We continually review
            and strengthen our controls as our platform evolves. For details about
            our current certifications and attestations, please contact us.
          </p>
        </section>

        <section className="legal-section">
          <h2>Reporting a vulnerability</h2>
          <p>
            We value the work of the security community. If you believe you have
            found a security vulnerability in our website or services, we
            encourage you to report it to us responsibly so we can investigate and
            address it. Please do not publicly disclose the issue until we have had
            a reasonable opportunity to respond.
          </p>
          <p>
            To report a security concern, please{" "}
            <Link href="/contact?source=security&cta=report_vulnerability" className="legal-link">
              contact our team
            </Link>
            .
          </p>
        </section>

        <section className="legal-section">
          <h2>Questions</h2>
          <p>
            For questions about our security practices, please{" "}
            <Link href="/contact?source=security&cta=contact" className="legal-link">
              get in touch
            </Link>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
