"use client";

import { useLiveContactMetrics } from "@/hooks/useLiveContactMetrics";
import { Mail, Briefcase, Wrench, Zap, Activity, ShieldCheck, ArrowUpRight } from "lucide-react";

interface DirectChannel {
  icon: React.ReactNode;
  label: string;
  email: string;
  desc: string;
  accent: string;
}

const DIRECT_CHANNELS: ReadonlyArray<DirectChannel> = [
  {
    icon: <Briefcase size={18} color="var(--green)" />,
    label: "Sales & Enterprise Architecture",
    email: "sales@neocloudz.com",
    desc: "Dedicated Blackwell B200 / B300 clusters, volume commitments, and SLA terms.",
    accent: "var(--green)",
  },
  {
    icon: <Wrench size={18} color="var(--blue)" />,
    label: "Engineering & Technical Support",
    email: "support@neocloudz.com",
    desc: "24/7 cluster telemetry, API integration assistance, and latency optimization.",
    accent: "var(--blue)",
  },
  {
    icon: <Mail size={18} color="var(--white)" />,
    label: "General Inquiries & Partnerships",
    email: "hello@neocloudz.com",
    desc: "Global account management, vendor partnerships, billing, and media inquiries.",
    accent: "var(--white)",
  },
];

const INFRA_HIGHLIGHTS = [
  { label: "Blackwell B200 / B300", status: "Available" },
  { label: "WEKA Storage Mesh", status: "Operational" },
  { label: "Token Factory API", status: "Active" },
  { label: "NVLink Interconnect", status: "Active" },
];

export default function ContactInfoPanel() {
  const { responseLabel, uptimeLabel } = useLiveContactMetrics();

  return (
    <aside className="info-panel" aria-label="NeoCloudz Contact & Infrastructure Telemetry">
      <div className="info-content" style={{ width: "100%", display: "flex", flexDirection: "column", gap: "24px" }}>
        
        {/* Card 1: Direct Communication Channels */}
        <div
          className="contact-sidebar-card reveal"
          style={{
            background: "rgba(15, 20, 16, 0.75)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "24px",
            padding: "32px",
            backdropFilter: "blur(16px)",
            boxShadow: "0 16px 40px rgba(0, 0, 0, 0.35)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--green)",
              }}
            >
              Direct Channels
            </span>
            <span style={{ fontSize: "12px", color: "var(--muted)" }}>Direct human response</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {DIRECT_CHANNELS.map((ch) => (
              <a
                key={ch.email}
                href={`mailto:${ch.email}`}
                className="contact-channel-row"
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "14px",
                  padding: "16px",
                  borderRadius: "16px",
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 255, 255, 0.06)",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "10px",
                    background: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {ch.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 700 }}>
                      {ch.label}
                    </div>
                    <ArrowUpRight size={14} color={ch.accent} style={{ opacity: 0.8 }} />
                  </div>
                  <div style={{ fontSize: "15px", fontWeight: 700, color: "var(--white)", marginTop: "2px", marginBottom: "4px" }}>
                    {ch.email}
                  </div>
                  <div style={{ fontSize: "12.5px", color: "var(--text)", opacity: 0.75, lineHeight: 1.5 }}>
                    {ch.desc}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Card 2: Platform Status & Assurance */}
        <div
          className="contact-sidebar-card reveal rd1"
          style={{
            background: "rgba(15, 20, 16, 0.75)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "24px",
            padding: "32px",
            backdropFilter: "blur(16px)",
            boxShadow: "0 16px 40px rgba(0, 0, 0, 0.35)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--muted)",
              }}
            >
              Operational Assurance
            </span>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                color: "var(--green)",
                background: "rgba(45, 255, 122, 0.1)",
                border: "1px solid rgba(45, 255, 122, 0.2)",
                padding: "3px 10px",
                borderRadius: "20px",
                fontWeight: 600,
              }}
            >
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--green)" }} />
              All Systems Operational
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" }}>
            <div
              style={{
                background: "rgba(255, 255, 255, 0.02)",
                border: "1px solid rgba(255, 255, 255, 0.06)",
                borderRadius: "14px",
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                gap: "6px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700 }}>
                <Zap size={14} color="var(--green)" /> Avg Response
              </div>
              <div style={{ fontSize: "22px", fontWeight: 800, color: "var(--green)" }}>
                {responseLabel}
              </div>
            </div>

            <div
              style={{
                background: "rgba(255, 255, 255, 0.02)",
                border: "1px solid rgba(255, 255, 255, 0.06)",
                borderRadius: "14px",
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                gap: "6px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700 }}>
                <Activity size={14} color="var(--white)" /> SLA Uptime
              </div>
              <div style={{ fontSize: "22px", fontWeight: 800, color: "var(--white)" }}>
                {uptimeLabel}
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "16px" }}>
            {INFRA_HIGHLIGHTS.map((item) => (
              <div
                key={item.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "8px 12px",
                  background: "rgba(255, 255, 255, 0.02)",
                  borderRadius: "8px",
                  border: "1px solid rgba(255, 255, 255, 0.04)",
                  fontSize: "12px",
                }}
              >
                <span style={{ color: "var(--text)", opacity: 0.85 }}>{item.label}</span>
                <span style={{ color: "var(--green)", fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: 600 }}>{item.status}</span>
              </div>
            ))}
          </div>

          <div
            style={{
              paddingTop: "14px",
              borderTop: "1px solid rgba(255, 255, 255, 0.06)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "12px",
              color: "var(--muted)",
            }}
          >
            <ShieldCheck size={16} color="var(--green)" style={{ flexShrink: 0 }} />
            <span>Tier III U.S. Facility Hosting · Strict Zero Data Retention</span>
          </div>
        </div>

      </div>
    </aside>
  );
}
