import type { Metadata } from "next";
import Link from "next/link";
import "../legal.css";

export const metadata: Metadata = {
  title: "Privacy Policy — NeoCloudz",
  description:
    "How NeoCloudz collects, uses, and protects your personal information.",
};

const LAST_UPDATED = "June 13, 2026";

export default function PrivacyPolicyPage() {
  return (
    <main className="legal-page">
      <div className="legal-shell">
        <header className="legal-header">
          <div className="legal-label">
            <span className="legal-dot" />
            LEGAL // PRIVACY_POLICY
          </div>
          <h1>Privacy Policy</h1>
          <p className="legal-updated">Last updated: {LAST_UPDATED}</p>
        </header>

        <section className="legal-section">
          <div className="legal-callout">
            <strong>In short:</strong> We collect only the information you give
            us (mainly through our contact form) plus basic technical data
            needed to run the site securely. We don&apos;t use tracking cookies,
            and we never sell your personal information.
          </div>
        </section>

        <section className="legal-section">
          <h2>1. Introduction</h2>
          <p>
            This Privacy Policy explains how NeoCloudz (&ldquo;NeoCloudz,&rdquo;
            &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) collects,
            uses, and protects information in connection with this website. It
            applies to the NeoCloudz marketing website. Our GPU and cloud
            infrastructure services, where used by customers, are governed by the
            separate agreements entered into for those services.
          </p>
        </section>

        <section className="legal-section">
          <h2>2. Information we collect</h2>
          <h3>Information you provide to us</h3>
          <p>
            When you submit our contact or inquiry forms, we collect the details
            you choose to provide, which may include your name, work email
            address, company, your area of interest, an indicative budget range,
            and the contents of your message.
          </p>
          <h3>Information collected automatically</h3>
          <p>
            When you visit the site, our hosting and infrastructure providers
            process limited technical data needed to deliver and secure the site,
            such as your IP address, browser type, and the pages you request.
            This site does not use analytics or advertising cookies — see our{" "}
            <Link href="/cookie-policy" className="legal-link">
              Cookie Policy
            </Link>{" "}
            for details.
          </p>
        </section>

        <section className="legal-section">
          <h2>3. How we use your information</h2>
          <ul className="legal-list">
            <li>To respond to your inquiries and provide the information you request.</li>
            <li>To communicate with you about our products, services, and your requests.</li>
            <li>To operate, maintain, secure, and improve our website.</li>
            <li>To comply with legal obligations and enforce our terms.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>4. How we share information</h2>
          <p>
            We do not sell your personal information. We share it only as needed
            with trusted service providers who help us operate the site and
            communicate with you, and only for those purposes. These include:
          </p>
          <ul className="legal-list">
            <li>
              <strong>Hosting (Vercel).</strong> Delivers and secures the
              website.
            </li>
            <li>
              <strong>Content management (Strapi).</strong> Stores our published
              content and the messages submitted through our forms.
            </li>
            <li>
              <strong>Fonts (Google Fonts).</strong> Delivers the typefaces used
              on the site; your IP address is shared with Google to load them.
            </li>
          </ul>
          <p>
            We may also disclose information where required by law, to protect our
            rights and safety, or in connection with a corporate transaction such
            as a merger or acquisition.
          </p>
        </section>

        <section className="legal-section">
          <h2>5. Data retention</h2>
          <p>
            We keep personal information only for as long as needed to fulfill the
            purposes described in this policy, including to respond to your
            inquiry and for legitimate business or legal reasons, after which it
            is deleted or anonymized.
          </p>
        </section>

        <section className="legal-section">
          <h2>6. Your rights and choices</h2>
          <p>
            Depending on where you live, you may have rights over your personal
            information — including the right to access, correct, delete, or
            request a copy of it, and to object to or restrict certain
            processing. Residents of California and similar jurisdictions have the
            right to opt out of the &ldquo;sale&rdquo; or &ldquo;sharing&rdquo; of
            personal information; we do not sell or share personal information for
            cross-context behavioral advertising. To exercise any right, please{" "}
            <Link href="/contact?source=privacy_policy&cta=contact" className="legal-link">
              contact us
            </Link>
            .
          </p>
        </section>

        <section className="legal-section">
          <h2>7. International visitors</h2>
          <p>
            We are based in the United States, and our service providers may
            process data in the United States and other countries. If you access
            the site from outside the U.S., you understand your information may be
            transferred to and processed in a country with different data
            protection laws than your own.
          </p>
        </section>

        <section className="legal-section">
          <h2>8. Children&apos;s privacy</h2>
          <p>
            This website is intended for businesses and professionals and is not
            directed to children. We do not knowingly collect personal
            information from children. If you believe a child has provided us
            information, please contact us so we can remove it.
          </p>
        </section>

        <section className="legal-section">
          <h2>9. Security</h2>
          <p>
            We take reasonable measures to protect your information. To learn
            more about how we secure our infrastructure, see our{" "}
            <Link href="/security" className="legal-link">
              Security
            </Link>{" "}
            page.
          </p>
        </section>

        <section className="legal-section">
          <h2>10. Changes to this policy</h2>
          <p>
            We may update this Privacy Policy from time to time. When we do, we
            will revise the &ldquo;Last updated&rdquo; date above. We encourage
            you to review this page periodically.
          </p>
        </section>

        <section className="legal-section">
          <h2>11. Contact us</h2>
          <p>
            If you have questions about this Privacy Policy or how we handle your
            information, please{" "}
            <Link href="/contact?source=privacy_policy&cta=contact" className="legal-link">
              get in touch
            </Link>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
