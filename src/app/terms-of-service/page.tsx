import type { Metadata } from "next";
import Link from "next/link";
import "../legal.css";

export const metadata: Metadata = {
  title: "Terms of Service — NeoCloudz",
  description:
    "The terms and conditions that govern your use of the NeoCloudz website.",
};

const LAST_UPDATED = "June 13, 2026";

export default function TermsOfServicePage() {
  return (
    <main className="legal-page">
      <div className="legal-shell">
        <header className="legal-header">
          <div className="legal-label">
            <span className="legal-dot" />
            LEGAL // TERMS_OF_SERVICE
          </div>
          <h1>Terms of Service</h1>
          <p className="legal-updated">Last updated: {LAST_UPDATED}</p>
        </header>

        <section className="legal-section">
          <div className="legal-callout">
            <strong>In short:</strong> These terms govern your use of the
            NeoCloudz website. Our paid GPU and cloud services are covered by
            separate customer agreements, not by these terms.
          </div>
        </section>

        <section className="legal-section">
          <h2>1. Acceptance of terms</h2>
          <p>
            These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and
            use of the NeoCloudz website (the &ldquo;Site&rdquo;). By accessing or
            using the Site, you agree to be bound by these Terms. If you do not
            agree, please do not use the Site.
          </p>
        </section>

        <section className="legal-section">
          <h2>2. About NeoCloudz</h2>
          <p>
            NeoCloudz provides GPU and AI compute infrastructure. This Site is an
            informational and marketing resource. Any use of our compute,
            hosting, or related services is governed by the separate written
            agreement entered into between you (or your organization) and
            NeoCloudz, which controls in the event of any conflict with these
            Terms with respect to those services.
          </p>
        </section>

        <section className="legal-section">
          <h2>3. Use of the Site</h2>
          <p>
            You may use the Site only for lawful purposes and in accordance with
            these Terms. You agree not to:
          </p>
          <ul className="legal-list">
            <li>Use the Site in any way that violates applicable law or regulation.</li>
            <li>
              Attempt to gain unauthorized access to, interfere with, or disrupt
              the Site, its servers, or connected networks.
            </li>
            <li>
              Introduce malware, or scrape, harvest, or collect data from the Site
              by automated means without our permission.
            </li>
            <li>
              Use the Site to transmit unsolicited communications or for
              fraudulent or misleading purposes.
            </li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>4. Intellectual property</h2>
          <p>
            The Site and its contents — including text, graphics, logos, and
            design — are owned by NeoCloudz or its licensors and are protected by
            intellectual property laws. We grant you a limited, non-exclusive,
            non-transferable license to access and view the Site for your personal
            or internal business use. You may not reproduce, distribute, modify,
            or create derivative works without our prior written consent.
          </p>
        </section>

        <section className="legal-section">
          <h2>5. Submissions</h2>
          <p>
            If you submit information through our forms or otherwise contact us,
            you represent that the information is accurate and that you have the
            right to provide it. We handle the personal information you submit in
            accordance with our{" "}
            <Link href="/privacy-policy" className="legal-link">
              Privacy Policy
            </Link>
            .
          </p>
        </section>

        <section className="legal-section">
          <h2>6. Third-party links</h2>
          <p>
            The Site may contain links to third-party websites or resources. We
            provide these links for convenience only and are not responsible for
            the content, products, or practices of any third-party site. Your use
            of third-party sites is at your own risk and subject to their terms.
          </p>
        </section>

        <section className="legal-section">
          <h2>7. Disclaimers</h2>
          <p>
            The Site is provided on an &ldquo;as is&rdquo; and &ldquo;as
            available&rdquo; basis without warranties of any kind, whether express
            or implied, including warranties of merchantability, fitness for a
            particular purpose, and non-infringement. We do not warrant that the
            Site will be uninterrupted, error-free, or free of harmful components,
            or that the information on it is accurate or complete.
          </p>
        </section>

        <section className="legal-section">
          <h2>8. Limitation of liability</h2>
          <p>
            To the fullest extent permitted by law, NeoCloudz and its affiliates
            will not be liable for any indirect, incidental, special,
            consequential, or punitive damages, or any loss of profits or data,
            arising out of or related to your use of (or inability to use) the
            Site, even if we have been advised of the possibility of such damages.
          </p>
        </section>

        <section className="legal-section">
          <h2>9. Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless NeoCloudz and its affiliates,
            officers, and employees from any claims, liabilities, damages, and
            expenses arising out of your use of the Site or your violation of
            these Terms.
          </p>
        </section>

        <section className="legal-section">
          <h2>10. Governing law</h2>
          <p>
            These Terms are governed by the laws of the United States and the
            State in which NeoCloudz is established, without regard to conflict of
            laws principles. Any disputes arising under these Terms will be subject
            to the exclusive jurisdiction of the courts located there.
          </p>
        </section>

        <section className="legal-section">
          <h2>11. Changes to these terms</h2>
          <p>
            We may update these Terms from time to time. Changes are effective when
            posted, with the revised &ldquo;Last updated&rdquo; date shown above.
            Your continued use of the Site after changes take effect constitutes
            acceptance of the updated Terms.
          </p>
        </section>

        <section className="legal-section">
          <h2>12. Contact us</h2>
          <p>
            If you have questions about these Terms, please{" "}
            <Link href="/contact?source=terms_of_service&cta=contact" className="legal-link">
              get in touch
            </Link>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
