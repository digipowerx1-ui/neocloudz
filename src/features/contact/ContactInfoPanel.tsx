"use client";

import { useRef } from "react";
import { useInfoLinesCanvas } from "@/hooks/useInfoLinesCanvas";
import { useLiveContactMetrics } from "@/hooks/useLiveContactMetrics";

interface ContactCard {
  icon: string;
  label: string;
  title: string;
  detail: string;
  link: string;
  cta: string;
}

const CONTACT_CARDS: ReadonlyArray<ContactCard> = [
  {
    icon: "📧",
    label: "Email Support",
    title: "hello@neocloudz.com",
    detail: "General inquiries, billing, and account questions.",
    link: "mailto:hello@neocloudz.com",
    cta: "Send email →",
  },
  {
    icon: "⚡",
    label: "Enterprise Sales",
    title: "enterprise@neocloudz.com",
    detail: "Dedicated clusters, custom contracts, and volume pricing.",
    link: "mailto:enterprise@neocloudz.com",
    cta: "Talk to sales →",
  },
  {
    icon: "🛠️",
    label: "Technical Support",
    title: "support@neocloudz.com",
    detail: "API issues, cluster troubleshooting, and SLA incidents.",
    link: "mailto:support@neocloudz.com",
    cta: "Open a ticket →",
  },
];

const SYSTEM_STATUS = [
  "API Gateway",
  "GPU Provisioning",
  "WEKA Storage",
  "Dashboard",
  "Billing Portal",
] as const;

interface OfficeLocation {
  flag: string;
  city: string;
  detail: string;
  badge: string;
}

const OFFICES: ReadonlyArray<OfficeLocation> = [
  {
    flag: "🇺🇸",
    city: "San Francisco, CA",
    detail: "HQ · 100 Market St",
    badge: "HQ",
  },
  {
    flag: "🇬🇧",
    city: "London, UK",
    detail: "EMEA · 22 Bishopsgate",
    badge: "EMEA",
  },
  {
    flag: "🇸🇬",
    city: "Singapore",
    detail: "APAC · Marina Bay",
    badge: "APAC",
  },
];

export default function ContactInfoPanel() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useInfoLinesCanvas(canvasRef);
  const { responseLabel, resolved } = useLiveContactMetrics();

  return (
    <div className="info-panel">
      <canvas ref={canvasRef} id="info-canvas" />
      <div className="info-content">
        <div className="contact-cards reveal">
          {CONTACT_CARDS.map((card) => (
            <div key={card.label} className="contact-card">
              <div className="card-icon">{card.icon}</div>
              <div className="card-body">
                <div className="card-label">{card.label}</div>
                <div className="card-title">{card.title}</div>
                <div className="card-detail">{card.detail}</div>
                <a href={card.link} className="card-link">
                  {card.cta}
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="live-metrics reveal rd1">
          <div className="live-metric">
            <span className="lm-icon">⚡</span>
            <div>
              <div className="lm-label">Avg Response</div>
              <div className="lm-val" id="resp-live">
                {responseLabel}
              </div>
            </div>
          </div>
          <div className="live-metric">
            <span className="lm-icon">✅</span>
            <div>
              <div className="lm-label">Resolved Today</div>
              <div className="lm-val" id="resolved-live">
                {resolved}
              </div>
            </div>
          </div>
        </div>

        <div className="status-section reveal rd2">
          <div className="status-header">
            <div className="status-title">System Status</div>
            <div className="status-all-good">
              <span className="status-dot" />
              All systems operational
            </div>
          </div>
          <div className="status-rows">
            {SYSTEM_STATUS.map((name) => (
              <div key={name} className="status-row">
                <span className="status-row-name">{name}</span>
                <span className="status-row-val status-green">Operational</span>
              </div>
            ))}
          </div>
        </div>

        <div className="locations-section reveal rd3">
          <div className="locations-title">Global Offices</div>
          <div className="location-items">
            {OFFICES.map((office) => (
              <div key={office.city} className="location-item">
                <span className="loc-flag">{office.flag}</span>
                <div>
                  <div className="loc-city">{office.city}</div>
                  <div className="loc-detail">{office.detail}</div>
                </div>
                <span className="loc-badge">{office.badge}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
