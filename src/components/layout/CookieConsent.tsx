"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";

// We deliberately persist the visitor's choice in localStorage rather than a
// cookie. The site currently sets no cookies, and storing a consent preference
// locally keeps that "zero cookies" status genuinely intact. This key is read
// before any future analytics/marketing scripts would be allowed to load.
const CONSENT_KEY = "nc_cookie_consent";

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

  if (!visible) return null;

  return (
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
            We don&apos;t use tracking or advertising cookies. This site only
            stores what&apos;s strictly necessary for it to work, and remembers
            this choice locally in your browser. Read our{" "}
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
            onClick={() => record("rejected")}
          >
            Necessary only
          </button>
          <button
            type="button"
            className="cookie-consent-btn cookie-consent-btn-solid"
            onClick={() => record("accepted")}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
