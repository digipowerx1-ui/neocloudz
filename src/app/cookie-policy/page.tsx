import type { Metadata } from "next";
import Link from "next/link";
import "../legal.css";

export const metadata: Metadata = {
  title: "Cookie Policy — NeoCloudz",
  description:
    "How NeoCloudz uses cookies and similar technologies. We do not use tracking or advertising cookies.",
};

const LAST_UPDATED = "June 13, 2026";

export default function CookiePolicyPage() {
  return (
    <main className="legal-page">
      <div className="legal-shell">
        <header className="legal-header">
          <div className="legal-label">
            <span className="legal-dot" />
            LEGAL // COOKIE_POLICY
          </div>
          <h1>Cookie Policy</h1>
          <p className="legal-updated">Last updated: {LAST_UPDATED}</p>
        </header>

        <section className="legal-section">
          <div className="legal-callout">
            <strong>In short:</strong> NeoCloudz does not use tracking,
            analytics, or advertising cookies. We don&apos;t profile you, and we
            don&apos;t sell or share your browsing data with advertisers.
          </div>
        </section>

        <section className="legal-section">
          <h2>1. What are cookies?</h2>
          <p>
            Cookies are small text files that a website can place on your device
            to store information — for example, to keep you signed in or to
            remember your preferences. Similar technologies, such as
            <em> local storage</em>, can store information in your browser in a
            comparable way. This policy uses &ldquo;cookies&rdquo; to refer to
            both, where relevant.
          </p>
        </section>

        <section className="legal-section">
          <h2>2. Do we use cookies?</h2>
          <p>
            We aim to keep this website as privacy-respecting as possible. As of
            the date above:
          </p>
          <ul className="legal-list">
            <li>
              We do <strong>not</strong> use analytics cookies (for example,
              Google Analytics).
            </li>
            <li>
              We do <strong>not</strong> use advertising, marketing, or
              retargeting cookies or pixels.
            </li>
            <li>
              We do <strong>not</strong> use social-media tracking pixels.
            </li>
            <li>
              We do <strong>not</strong> require an account to browse the site,
              so we don&apos;t set login or session cookies for visitors.
            </li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>3. Strictly necessary storage</h2>
          <p>
            If you respond to our cookie notice, we save your choice in your
            browser&apos;s <em>local storage</em> (not a cookie) so we
            don&apos;t show the notice again on every visit. This information
            stays on your device, is not sent to us or any third party, and is
            used only to remember your preference. It is considered strictly
            necessary and does not require consent.
          </p>
        </section>

        <section className="legal-section">
          <h2>4. Third-party services we rely on</h2>
          <p>
            Our website is delivered using a small number of third-party service
            providers. These providers do not place tracking cookies on your
            device through our site, but it&apos;s useful to know they are
            involved:
          </p>
          <ul className="legal-list">
            <li>
              <strong>Hosting (Vercel).</strong> Our site is hosted on Vercel.
              Vercel may use strictly necessary, functional cookies for security
              and to deliver the site reliably. We have not enabled Vercel&apos;s
              analytics or visitor-tracking features.
            </li>
            <li>
              <strong>Content management (Strapi).</strong> Our blog content and
              contact-form submissions are managed through a headless content
              system (Strapi). Page content is loaded by our servers and
              delivered to you as standard web pages, so this system does not set
              cookies in your browser.
            </li>
            <li>
              <strong>Fonts (Google Fonts).</strong> We load typefaces from
              Google Fonts. This does not set cookies, although your IP address
              is shared with Google in order to deliver the fonts.
            </li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>5. Links to other sites</h2>
          <p>
            Our pages may link to external websites, including our social-media
            profiles. Once you follow a link and leave our site, this policy no
            longer applies. Those websites set their own cookies and have their
            own privacy and cookie policies, which we encourage you to review.
          </p>
        </section>

        <section className="legal-section">
          <h2>6. Managing cookies</h2>
          <p>
            Because we don&apos;t set tracking cookies, there&apos;s nothing you
            need to opt out of for advertising or analytics. You can still
            control cookies and local storage at any time through your
            browser&apos;s settings, including clearing existing data or blocking
            it for specific sites. Clearing your browser data will remove your
            saved cookie-notice preference, and the notice will appear again on
            your next visit.
          </p>
        </section>

        <section className="legal-section">
          <h2>7. Changes to this policy</h2>
          <p>
            If we introduce cookies in the future — for example, analytics to
            understand how the site is used — we will update this policy and,
            where required, present a consent banner so you can make a choice
            before any non-essential cookies are set. Please check this page
            periodically for updates.
          </p>
        </section>

        <section className="legal-section">
          <h2>8. Contact us</h2>
          <p>
            If you have questions about this Cookie Policy or our use of cookies,
            please{" "}
            <Link href="/contact?source=cookie_policy&cta=contact" className="legal-link">
              get in touch
            </Link>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
