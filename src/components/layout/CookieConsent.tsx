"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import Script from "next/script";

// We deliberately persist the visitor's choice in localStorage rather than a
// cookie, so declining keeps the site cookie-free. Marketing scripts (LinkedIn
// Insight Tag) load only when this key says "accepted".
// v2: re-asks everyone after the LinkedIn tag was added (v1 banner said "no tracking").
const CONSENT_KEY = "nc_cookie_consent_v2";

type ConsentValue = "accepted" | "rejected";

// Minimal external store over localStorage so visibility stays in sync with the
// stored choice (including across tabs) without calling setState in an effect.
let listeners: Array<() => void> = [];

function subscribe(callback: () => void) {
  listeners.push(callback);
  const onStorage = (e: StorageEvent) => {
    if (e.key === CONSENT_KEY) callback();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners = listeners.filter((l) => l !== callback);
    window.removeEventListener("storage", onStorage);
  };
}

// Whether the banner should be shown — true only when no choice is stored yet.
function getSnapshot(): boolean {
  try {
    return window.localStorage.getItem(CONSENT_KEY) === null;
  } catch {
    // localStorage unavailable (private mode / blocked) — still present the
    // disclosure rather than silently hiding it.
    return true;
  }
}

// True only after the visitor clicked "Accept" — gates marketing scripts.
function getAccepted(): boolean {
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    return raw !== null && JSON.parse(raw).value === "accepted";
  } catch {
    return false;
  }
}

// Never render the banner during SSR; this also prevents a hydration mismatch.
function getServerSnapshot(): boolean {
  return false;
}

function record(value: ConsentValue) {
  try {
    window.localStorage.setItem(
      CONSENT_KEY,
      JSON.stringify({ value, ts: new Date().toISOString() })
    );
  } catch {
    /* no-op: choice simply won't persist if storage is blocked */
  }
  listeners.forEach((l) => l());
}

export function CookieConsent() {
  const visible = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const accepted = useSyncExternalStore(
    subscribe,
    getAccepted,
    getServerSnapshot
  );

  return (
    <>
      {/* LinkedIn Insight Tag — only loads after consent. The <noscript> pixel
          is intentionally omitted: without JS we can't check consent. */}
      {accepted && (
        <Script id="linkedin-insight" strategy="afterInteractive">{`
_linkedin_partner_id = "10463508";
window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
window._linkedin_data_partner_ids.push(_linkedin_partner_id);
(function(l) {
if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
window.lintrk.q=[]}
var s = document.getElementsByTagName("script")[0];
var b = document.createElement("script");
b.type = "text/javascript";b.async = true;
b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
s.parentNode.insertBefore(b, s);})(window.lintrk);
`}</Script>
      )}
      {visible && (
        <div
          className="cookie-consent"
          role="dialog"
          aria-live="polite"
          aria-label="Cookie notice"
        >
          <div className="cookie-consent-inner">
            <div className="cookie-consent-copy">
              <div className="cookie-consent-label">
                <span className="cookie-consent-dot" />
                COOKIE_NOTICE
              </div>
              <p>
                We use strictly necessary storage to run this site. If you click
                Accept, we also load the LinkedIn Insight Tag, which sets
                advertising cookies to measure our LinkedIn campaigns.
                &ldquo;Necessary only&rdquo; keeps it off. Read our{" "}
                <Link href="/cookie-policy" className="cookie-consent-link">
                  Cookie Policy
                </Link>{" "}
                to learn more.
              </p>
            </div>
            <div className="cookie-consent-actions">
              <button
                type="button"
                className="cookie-consent-btn cookie-consent-btn-ghost"
                aria-label="Accept necessary cookies only"
                onClick={() => record("rejected")}
              >
                Necessary only
              </button>
              <button
                type="button"
                className="cookie-consent-btn cookie-consent-btn-solid"
                aria-label="Accept all cookies"
                onClick={() => record("accepted")}
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
