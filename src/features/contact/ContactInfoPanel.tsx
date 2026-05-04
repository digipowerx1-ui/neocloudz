"use client";

import { useLiveContactMetrics } from "@/hooks/useLiveContactMetrics";
import { Mail, Briefcase, Wrench, Zap, Activity } from "lucide-react";

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
    icon: <Mail size={28} color="var(--white)" />,
    label: "Direct Email",
    title: "hello@neocloudz.com",
    detail: "General inquiries, billing, and global account management.",
    link: "mailto:hello@neocloudz.com",
    cta: "Send email →",
    color: "var(--white)"
  },
  {
    icon: <Briefcase size={28} color="var(--green)" />,
    label: "Enterprise Solutions",
    title: "sales@neocloudz.com",
    detail: "Private clusters, custom contracts, and high-performance I/O.",
    link: "mailto:sales@neocloudz.com",
    cta: "Consult with sales →",
    color: "var(--green)"
  },
  {
    icon: <Wrench size={28} color="var(--blue)" />,
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
  const { responseLabel, uptimeLabel } = useLiveContactMetrics();

  return (
    <div className="info-panel" style={{ display: "flex", justifyContent: "center" }}>
      <div className="info-content" style={{ width: "100%", maxWidth: "560px" }}>
        <div className="contact-cards reveal">
          {CONTACT_CARDS.map((card) => (
            <div key={card.label} className="contact-card" style={{
              background: "rgba(255, 255, 255, 0.03)",
              backdropFilter: "blur(12px)",
              border: `1px solid rgba(255,255,255,0.08)`,
              padding: "32px",
              borderRadius: "24px",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
              display: "flex",
              flexDirection: "column"
            }}>
              <div className="card-icon" style={{
                background: `linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))`,
                border: "1px solid rgba(255,255,255,0.1)",
                width: "64px",
                height: "64px",
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `0 0 20px ${card.color}20`,
                marginBottom: "24px"
              }}>{card.icon}</div>
              <div className="card-body">
                <div className="card-label" style={{ color: card.color, opacity: 0.9, fontWeight: 800 }}>{card.label}</div>
                <div className="card-title" style={{ fontSize: "20px", marginBottom: "12px", color: "var(--white)", fontWeight: 700 }}>{card.title}</div>
                <div className="card-detail" style={{ marginBottom: "24px", color: "var(--text)", lineHeight: "1.6" }}>{card.detail}</div>
                <a href={card.link} className="card-link" style={{ color: card.color, display: "inline-flex", alignItems: "center", gap: "6px", fontWeight: 600 }}>
                  {card.cta}
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="live-metrics reveal rd1" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginTop: "24px" }}>
          <div className="live-metric" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", padding: "24px", borderRadius: "20px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", backdropFilter: "blur(12px)" }}>
            <span className="lm-icon" style={{ marginBottom: "16px", display: "flex", alignItems: "center", justifyContent: "center", width: "48px", height: "48px", background: "rgba(45, 255, 122, 0.1)", borderRadius: "12px", border: "1px solid rgba(45, 255, 122, 0.2)" }}>
              <Zap size={24} color="var(--green)" />
            </span>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div className="lm-label" style={{ fontSize: "11px", textTransform: "uppercase", color: "var(--muted)", letterSpacing: "0.1em", textAlign: "center", fontWeight: 700, marginBottom: "4px" }}>Global Response</div>
              <div className="lm-val" style={{ fontSize: "24px", fontWeight: 800, color: "var(--green)", filter: "drop-shadow(0 0 10px rgba(45, 255, 122, 0.3))" }}>
                {responseLabel}
              </div>
            </div>
          </div>
          <div className="live-metric" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", padding: "24px", borderRadius: "20px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", backdropFilter: "blur(12px)" }}>
            <span className="lm-icon" style={{ marginBottom: "16px", display: "flex", alignItems: "center", justifyContent: "center", width: "48px", height: "48px", background: "rgba(255, 255, 255, 0.05)", borderRadius: "12px", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
              <Activity size={24} color="var(--white)" />
            </span>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div className="lm-label" style={{ fontSize: "11px", textTransform: "uppercase", color: "var(--muted)", letterSpacing: "0.1em", textAlign: "center", fontWeight: 700, marginBottom: "4px" }}>System Uptime</div>
              <div className="lm-val" style={{ fontSize: "24px", fontWeight: 800, color: "var(--white)", filter: "drop-shadow(0 0 10px rgba(255, 255, 255, 0.3))" }}>
                {uptimeLabel}
              </div>
            </div>
          </div>
        </div>

        <div className="status-section reveal rd2" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", padding: "32px", borderRadius: "24px", marginTop: "32px", backdropFilter: "blur(12px)" }}>
          <div className="status-header">
            <div className="status-title" style={{ fontSize: "14px", color: "var(--white)", fontWeight: 700, letterSpacing: "0.05em" }}>System Health</div>
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
