"use client";

import { Mail, Zap, Settings, ShieldCheck, Activity, Database, Globe } from "lucide-react";
import { useLiveContactMetrics } from "@/hooks/useLiveContactMetrics";

interface ContactCard {
  icon: React.ReactNode;
  label: string;
  title: string;
  detail: string;
  link: string;
  cta: string;
  color: string;
}

const CONTACT_CARDS: ReadonlyArray<ContactCard> = [
  {
    icon: <Mail size={24} />,
    label: "Direct Email",
    title: "hello@neocloudz.com",
    detail: "General inquiries, billing, and global account management.",
    link: "mailto:hello@neocloudz.com",
    cta: "Send email →",
    color: "var(--white)"
  },
  {
    icon: <Zap size={24} />,
    label: "Enterprise Solutions",
    title: "sales@neocloudz.com",
    detail: "Private clusters, custom contracts, and high-performance I/O.",
    link: "mailto:sales@neocloudz.com",
    cta: "Consult with sales →",
    color: "var(--green)"
  },
  {
    icon: <Settings size={24} />,
    label: "SLA Support",
    title: "support@neocloudz.com",
    detail: "Infrastructure troubleshooting, API assistance, and uptime logs.",
    link: "mailto:support@neocloudz.com",
    cta: "Contact engineering →",
    color: "var(--blue)"
  },
];

const SYSTEM_STATUS = [
  { name: "Global API", status: "Operational", color: "var(--green)" },
  { name: "GPU Provisioning", status: "Operational", color: "var(--green)" },
  { name: "WEKA Mesh", status: "Operational", color: "var(--green)" },
  { name: "Node Telemetry", status: "Active", color: "var(--green)" },
] as const;

export default function ContactInfoPanel() {
  const { responseLabel, resolved } = useLiveContactMetrics();

  return (
    <div className="info-panel">
      <div className="info-content">
        <div className="contact-cards reveal">
          {CONTACT_CARDS.map((card) => (
            <div key={card.label} className="contact-card" style={{ 
              background: "linear-gradient(180deg, rgba(20,26,20,0.8) 0%, #000 100%)",
              border: `1px solid rgba(255,255,255,0.06)`,
              padding: "32px"
            }}>
              <div className="card-icon" style={{ 
                background: `rgba(255,255,255,0.03)`,
                border: "1px solid rgba(255,255,255,0.08)",
                fontSize: "24px"
              }}>{card.icon}</div>
              <div className="card-body">
                <div className="card-label" style={{ color: card.color, opacity: 0.8 }}>{card.label}</div>
                <div className="card-title" style={{ fontSize: "18px", marginBottom: "8px" }}>{card.title}</div>
                <div className="card-detail" style={{ marginBottom: "20px", opacity: 0.6 }}>{card.detail}</div>
                <a href={card.link} className="card-link" style={{ color: card.color }}>
                  {card.cta}
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="live-metrics reveal rd1" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div className="live-metric" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)", padding: "24px", borderRadius: "16px" }}>
            <span className="lm-icon" style={{ marginBottom: "12px", display: "block" }}>
              <Activity size={24} color="var(--green)" />
            </span>
            <div>
              <div className="lm-label" style={{ fontSize: "10px", textTransform: "uppercase", color: "var(--muted)", letterSpacing: "0.1em" }}>Global Response</div>
              <div className="lm-val" style={{ fontSize: "20px", fontWeight: 700, color: "var(--green)" }}>
                {responseLabel}
              </div>
            </div>
          </div>
          <div className="live-metric" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)", padding: "24px", borderRadius: "16px" }}>
            <span className="lm-icon" style={{ marginBottom: "12px", display: "block" }}>
              <ShieldCheck size={24} color="var(--white)" />
            </span>
            <div>
              <div className="lm-label" style={{ fontSize: "10px", textTransform: "uppercase", color: "var(--muted)", letterSpacing: "0.1em" }}>Resolved Today</div>
              <div className="lm-val" style={{ fontSize: "20px", fontWeight: 700, color: "var(--white)" }}>
                {resolved}
              </div>
            </div>
          </div>
        </div>

        <div className="status-section reveal rd2" style={{ background: "rgba(10,15,10,0.5)", border: "1px solid var(--border)", padding: "32px", borderRadius: "20px" }}>
          <div className="status-header">
            <div className="status-title">System Health</div>
            <div className="status-all-good">
              <span className="status-dot" />
              Operational
            </div>
          </div>
          <div className="status-rows">
            {SYSTEM_STATUS.map((item) => (
              <div key={item.name} className="status-row" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                <span className="status-row-name" style={{ fontSize: "14px", color: "var(--text)" }}>{item.name}</span>
                <span className="status-row-val status-green" style={{ fontSize: "10px" }}>{item.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
