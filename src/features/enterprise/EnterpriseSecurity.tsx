"use client";

import { useRef } from "react";
import { useShieldRing } from "@/hooks/useShieldRing";
import { useCompBadgePop } from "@/hooks/useCompBadgePop";
import { useAuditLogStream, type AuditEntry } from "@/hooks/useAuditLogStream";

interface ComplianceBadge {
  name: string;
  desc: string;
  delay: number;
}

const COMPLIANCE_BADGES: ReadonlyArray<ComplianceBadge> = [
  { name: "SOC 2 Type II", desc: "Annual audit", delay: 0 },
  { name: "HIPAA", desc: "Healthcare ready", delay: 100 },
  { name: "GDPR", desc: "EU data residency", delay: 200 },
  { name: "ISO 27001", desc: "Information security", delay: 300 },
  { name: "PCI DSS", desc: "Payment card scope", delay: 400 },
];

const AUDIT_ENTRIES: ReadonlyArray<AuditEntry> = [
  { c: "green", m: "[SOC2]   Annual audit completed — PASS — zero findings" },
  { c: "", m: "[AUTH]   MFA enforced on all admin accounts (142 users)" },
  { c: "green", m: "[ENCR]   AES-256 at-rest encryption verified on all volumes" },
  { c: "blue", m: "[NET]    VPC flow logs exported to SIEM — 0 anomalies detected" },
  { c: "green", m: "[HIPAA]  PHI isolation boundary check — PASS" },
  { c: "", m: "[IAM]    Privilege access review completed — 14 accounts rotated" },
  { c: "green", m: "[GDPR]   Data residency constraints applied — EU region isolated" },
  { c: "amber", m: "[WARN]   Certificate expiry in 28 days — auto-renewal queued" },
  { c: "green", m: "[ISO]    ISO 27001 control audit checkpoint — all controls green" },
  { c: "", m: "[LOG]    Immutable audit trail synced to cold storage (S3 Glacier)" },
  { c: "green", m: "[PCI]    Cardholder data scope verified — zero PAN exposure" },
  { c: "blue", m: "[SCAN]   Vulnerability scan complete — 0 critical / 2 low (patching)" },
];

export default function EnterpriseSecurity() {
  const sectionRef = useRef<HTMLElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);
  const logRef = useRef<HTMLDivElement>(null);

  useShieldRing(ringRef);
  useCompBadgePop(sectionRef);
  useAuditLogStream(logRef, sectionRef, AUDIT_ENTRIES);

  return (
    <section ref={sectionRef} className="hp-section dark" id="security">
      <div className="security-header" style={{ maxWidth: "1200px", margin: "0 auto 60px", textAlign: "center" }}>
        <div className="hp-label reveal" style={{ justifyContent: "center" }}>Security &amp; Compliance</div>
        <div className="hp-h2 reveal" style={{ textAlign: "center" }}>
          Enterprise-Grade Security.
          <br />
          <span className="g">Not An Afterthought.</span>
        </div>
        <p className="hp-sub reveal" style={{ margin: "0 auto", textAlign: "center" }}>
          Every cluster ships with a comprehensive security posture — hardened OS
          images, encrypted volumes, immutable audit logs, and continuous compliance
          monitoring.
        </p>
      </div>

      <div className="security-grid">
        <div>
          <div className="shield-wrap" style={{ display: "flex", justifyContent: "flex-start", marginBottom: "24px" }}>
            <svg className="shield-svg" viewBox="0 0 80 96" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M40 4L8 18V44C8 64.8 21.6 84.1 40 92C58.4 84.1 72 64.8 72 44V18L40 4Z" stroke="#2dff7a" strokeWidth="2" strokeOpacity="0.4" fill="rgba(45, 255, 122, 0.04)" />
              <circle ref={ringRef} cx="40" cy="48" r="40" stroke="#2dff7a" strokeWidth="1.5" strokeOpacity="0.3" fill="none" />
              <path d="M30 48L37 55L50 40" stroke="#2dff7a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="compliance-badges">
            {COMPLIANCE_BADGES.map((badge) => (
              <div
                key={badge.name}
                className="comp-badge"
                data-delay={badge.delay}
              >
                <div className="comp-check">✓</div>
                <div className="comp-name">{badge.name}</div>
                <div className="comp-desc">{badge.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="audit-terminal">
            <div className="terminal-bar">
              <div className="tbar-dots">
                <div className="tbar-dot red" />
                <div className="tbar-dot amber" />
                <div className="tbar-dot green" />
              </div>
              <div className="tbar-title">
                neocloudz — compliance-audit-log — live
              </div>
              <div className="tbar-status">MONITORING</div>
            </div>
            <div ref={logRef} className="audit-log-body" id="audit-log" />
          </div>
        </div>
      </div>
    </section>
  );
}
