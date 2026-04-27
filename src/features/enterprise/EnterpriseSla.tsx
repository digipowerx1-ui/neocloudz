"use client";

import { useRef } from "react";
import { useSlaCountUp, type SlaCountConfig } from "@/hooks/useSlaCountUp";

const SLA_CONFIGS: ReadonlyArray<SlaCountConfig> = [
  { target: 99.9, decimals: 1, durationMs: 1400 },
  { target: 99.99, decimals: 2, durationMs: 1800 },
  { target: 99.999, decimals: 3, durationMs: 2200 },
];

export default function EnterpriseSla() {
  const sectionRef = useRef<HTMLElement>(null);
  useSlaCountUp(sectionRef, SLA_CONFIGS);

  return (
    <section
      ref={sectionRef}
      className="hp-section mid"
      id="sla"
      style={{ textAlign: "center" }}
    >
      <div
        className="hp-label reveal"
        style={{
          justifyContent: "center",
          maxWidth: "1100px",
          margin: "0 auto 16px",
        }}
      >
        Support &amp; SLA
      </div>
      <div
        className="hp-h2 reveal"
        style={{ textAlign: "center", maxWidth: "1100px", margin: "0 auto 16px" }}
      >
        SLA That Means
        <br />
        <span className="g">Something.</span>
      </div>
      <p
        className="hp-sub reveal"
        style={{ textAlign: "center", margin: "0 auto 0" }}
      >
        Financial credits for any downtime breach. No fine print, no excuses.
      </p>

      <div className="sla-grid">
        <div className="sla-card reveal reveal-d1">
          <div className="sla-tier-name">Standard</div>
          <div className="sla-included">Included with all plans</div>
          <div className="sla-uptime-display">
            <span className="sla-pct" id="sla-pct-0">
              0.0%
            </span>
            <span className="sla-pct-label">Uptime SLA</span>
          </div>
          <div className="sla-resp-bar-wrap">
            <div className="sla-resp-label">
              P1 Response: <span className="sla-resp-val">4 hours</span>
            </div>
            <div className="sla-resp-track">
              <div className="sla-resp-fill" data-width="25" />
            </div>
          </div>
          <ul className="sla-features">
            <li>99.9% uptime SLA</li>
            <li>4hr P1 response</li>
            <li>Email &amp; chat support</li>
            <li>Shared NOC monitoring</li>
            <li>Status page access</li>
          </ul>
        </div>

        <div className="sla-card sla-featured reveal reveal-d2">
          <div className="sla-badge-top">ENTERPRISE</div>
          <div className="sla-tier-name">Enterprise</div>
          <div className="sla-included sla-contact">Contact Sales</div>
          <div className="sla-uptime-display">
            <span className="sla-pct" id="sla-pct-1">
              0.00%
            </span>
            <span className="sla-pct-label">Uptime SLA</span>
          </div>
          <div className="sla-resp-bar-wrap">
            <div className="sla-resp-label">
              P1 Response: <span className="sla-resp-val gv">&lt;15 minutes</span>
            </div>
            <div className="sla-resp-track">
              <div
                className="sla-resp-fill"
                data-width="75"
                style={{
                  background: "linear-gradient(90deg,#1aaa4e,#2dff7a)",
                  boxShadow: "0 0 8px rgba(45,255,122,0.5)",
                }}
              />
            </div>
          </div>
          <ul className="sla-features">
            <li>99.99% uptime SLA</li>
            <li>&lt;15min P1 response</li>
            <li>Named account manager</li>
            <li>Dedicated NOC team</li>
            <li>Phone + Slack support</li>
            <li>Quarterly business reviews</li>
          </ul>
          <a href="#demo" className="sla-btn">
            Request Demo →
          </a>
        </div>

        <div className="sla-card reveal reveal-d3">
          <div className="sla-tier-name">Mission Critical</div>
          <div className="sla-included sla-contact">Custom Pricing</div>
          <div className="sla-uptime-display">
            <span className="sla-pct" id="sla-pct-2">
              0.000%
            </span>
            <span className="sla-pct-label">Uptime SLA</span>
          </div>
          <div className="sla-resp-bar-wrap">
            <div className="sla-resp-label">
              P1 Response: <span className="sla-resp-val av">&lt;5 minutes</span>
            </div>
            <div className="sla-resp-track">
              <div
                className="sla-resp-fill"
                data-width="96"
                style={{
                  background: "linear-gradient(90deg,#b85000,#ffb84d)",
                  boxShadow: "0 0 8px rgba(255,184,77,0.4)",
                }}
              />
            </div>
          </div>
          <ul className="sla-features">
            <li>99.999% uptime SLA</li>
            <li>&lt;5min P1 response</li>
            <li>Dedicated SRE team</li>
            <li>24/7 war room access</li>
            <li>Incident command support</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
