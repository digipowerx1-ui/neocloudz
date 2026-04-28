"use client";

import React from "react";
import Link from "next/link";
import { Code2, Shield, Settings, Briefcase, ArrowRight, MapPin, Clock } from "lucide-react";
import "../enterprise/enterprise.css";

const OPEN_ROLES = [
  {
    title: "Senior AI Infrastructure Engineer",
    department: "Engineering",
    location: "Remote / US",
    type: "Full-time",
  },
  {
    title: "Data Center Operations Manager",
    department: "Operations",
    location: "Texas, US",
    type: "Full-time",
  },
  {
    title: "Security & Compliance Lead",
    department: "Security",
    location: "Remote / US",
    type: "Full-time",
  },
  {
    title: "Network Architect (InfiniBand)",
    department: "Engineering",
    location: "Remote / US",
    type: "Full-time",
  }
];

export default function CareerPage() {
  return (
    <div className="enterprise-page">
      {/* Hero Section */}
      <section className="hero" id="hero" style={{ minHeight: "70vh" }}>
        <div className="hero-grid" />
        <div className="hero-aurora">
          <div className="aurora-band" style={{ background: "rgba(45,255,122,0.4)", top: "25%", "--adur": "18s", "--adel": "0s" } as React.CSSProperties} />
          <div className="aurora-band" style={{ background: "rgba(77,200,255,0.3)", top: "50%", "--adur": "22s", "--adel": "3s" } as React.CSSProperties} />
        </div>

        <div className="hero-content" style={{ marginTop: "-5vh" }}>
          <div className="hero-terminal-line">
            <span style={{ color: "var(--green-dim)" }}>&gt;</span>
            <span id="hero-typed">careers --view open-roles</span>
            <span className="cursor">|</span>
          </div>

          <h1 className="hero-h1">
            Build the Future of
            <br />
            <strong className="g">AI Compute.</strong>
          </h1>

          <p className="hero-sub" style={{ maxWidth: "650px" }}>
            Join a global mission powering the world's data, AI workloads, and next-generation sustainable infrastructure. Whether you innovate, design, build, or support—your skills will shape the next generation of infrastructure.
          </p>

          <div className="hero-cta">
            <a href="#open-roles" className="btn-launch">
              View Open Roles <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* Pathways Section */}
      <section className="hp-section mid">
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="hp-label">OUR DEPARTMENTS</div>
          <h2 className="hp-h2">
            Career <strong className="g">Pathways</strong>
          </h2>
          <p className="hp-sub">
            Find where your expertise meets our mission.
          </p>

          <div className="ent-features-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}>
            <div className="ent-card">
              <div className="ent-icon">
                <Code2 size={24} color="var(--green)" />
              </div>
              <h3 className="ent-card-title">Engineering</h3>
              <p className="ent-card-desc">
                Create scalable systems powering global compute and ultra-fast AI networking.
              </p>
            </div>
            
            <div className="ent-card">
              <div className="ent-icon">
                <Shield size={24} color="var(--blue)" />
              </div>
              <h3 className="ent-card-title">Security</h3>
              <p className="ent-card-desc">
                Design secure, resilient infrastructure that meets rigorous enterprise compliance.
              </p>
            </div>
            
            <div className="ent-card">
              <div className="ent-icon">
                <Settings size={24} color="var(--amber)" />
              </div>
              <h3 className="ent-card-title">Operations</h3>
              <p className="ent-card-desc">
                Ensure mission-critical systems and state-of-the-art cooling run smoothly 24/7.
              </p>
            </div>
            
            <div className="ent-card">
              <div className="ent-icon">
                <Briefcase size={24} color="var(--white)" />
              </div>
              <h3 className="ent-card-title">Corporate</h3>
              <p className="ent-card-desc">
                Lead strategy, operations, and growth initiatives for our global infrastructure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Open Roles Section */}
      <section className="hp-section dark" id="open-roles">
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div className="hp-label" style={{ justifyContent: "center" }}>JOIN THE TEAM</div>
          <h2 className="hp-h2" style={{ textAlign: "center", marginBottom: "48px" }}>
            Open <strong className="g">Positions</strong>
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {OPEN_ROLES.map((role, idx) => (
              <Link 
                key={idx} 
                href="/contact"
                style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "space-between", 
                  padding: "24px 32px", 
                  background: "var(--surface)", 
                  border: "1px solid var(--border)", 
                  borderRadius: "16px",
                  textDecoration: "none",
                  transition: "all 0.2s ease"
                }}
                className="hover:border-green/30 hover:bg-surface2 hover:-translate-y-1"
              >
                <div>
                  <h3 style={{ color: "var(--white)", fontSize: "18px", fontWeight: "600", marginBottom: "12px" }}>
                    {role.title}
                  </h3>
                  <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                    <span style={{ color: "var(--green)", fontFamily: "var(--font-mono)", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em", background: "rgba(45, 255, 122, 0.1)", padding: "4px 10px", borderRadius: "20px" }}>
                      {role.department}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--muted)", fontSize: "13px" }}>
                      <MapPin size={14} /> {role.location}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--muted)", fontSize: "13px" }}>
                      <Clock size={14} /> {role.type}
                    </span>
                  </div>
                </div>
                <div style={{ 
                  width: "40px", 
                  height: "40px", 
                  borderRadius: "50%", 
                  border: "1px solid var(--border)", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  color: "var(--green)" 
                }}>
                  <ArrowRight size={18} />
                </div>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "48px" }}>
            <p style={{ color: "var(--muted)", fontSize: "14px", marginBottom: "16px" }}>
              Don't see a role that fits? We are always looking for exceptional talent.
            </p>
            <Link href="/contact" className="btn-outline" style={{ display: "inline-flex", margin: "0 auto" }}>
              Send Open Application
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
