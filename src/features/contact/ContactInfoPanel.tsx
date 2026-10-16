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
      <div className="contact-sidebar-container">
        
        {/* Card 1: Direct Communication Channels */}
        <div className="contact-sidebar-card reveal">
          <div className="contact-card-header">
            <span className="contact-card-tag">Direct Channels</span>
            <span className="contact-card-subtitle">Direct human response</span>
          </div>

          <div className="contact-channels-list">
            {DIRECT_CHANNELS.map((ch) => (
              <a
                key={ch.email}
                href={`mailto:${ch.email}`}
                className="contact-channel-row"
              >
                <div className="contact-channel-icon-wrap">
                  {ch.icon}
                </div>
                <div className="contact-channel-body">
                  <div className="contact-channel-top">
                    <span className="contact-channel-label">{ch.label}</span>
                    <ArrowUpRight size={14} className="contact-channel-arrow" style={{ color: ch.accent }} />
                  </div>
                  <div className="contact-channel-email">{ch.email}</div>
                  <div className="contact-channel-desc">{ch.desc}</div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Card 2: Platform Status & Assurance */}
        <div className="contact-sidebar-card reveal rd1">
          <div className="contact-card-header">
            <span className="contact-card-tag muted">Operational Assurance</span>
            <div className="contact-assurance-badge">
              <span className="contact-assurance-dot" />
              All Systems Operational
            </div>
          </div>

          <div className="contact-metrics-grid">
            <div className="contact-metric-tile">
              <div className="contact-metric-label">
                <Zap size={13} color="var(--green)" /> Avg Response
              </div>
              <div className="contact-metric-value green">
                {responseLabel}
              </div>
            </div>

            <div className="contact-metric-tile">
              <div className="contact-metric-label">
                <Activity size={13} color="var(--white)" /> SLA Uptime
              </div>
              <div className="contact-metric-value white">
                {uptimeLabel}
              </div>
            </div>
          </div>

          <div className="contact-infra-grid">
            {INFRA_HIGHLIGHTS.map((item) => (
              <div key={item.label} className="contact-infra-item">
                <span className="contact-infra-name">{item.label}</span>
                <span className="contact-infra-status">
                  <span className="contact-status-dot-sm" />
                  {item.status}
                </span>
              </div>
            ))}
          </div>

          <div className="contact-security-footer">
            <ShieldCheck size={16} color="var(--green)" className="contact-security-icon" />
            <span>Tier III U.S. Facility Hosting · Strict Zero Data Retention</span>
          </div>
        </div>

      </div>
    </aside>
  );
}
