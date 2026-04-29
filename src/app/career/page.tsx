"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { Code2, Shield, Settings, Briefcase, ArrowRight, MapPin, Clock } from "lucide-react";
import { useParticleCanvas } from "@/hooks/useParticleCanvas";
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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useParticleCanvas(canvasRef);

  return (
    <div className="enterprise-page">
      {/* Hero Section */}
      <section className="hero" id="hero" style={{ minHeight: "80vh" }}>
        <canvas ref={canvasRef} id="particle-canvas" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 2, pointerEvents: "none" }} />
        <div className="hero-grid" />
        <div className="hero-aurora">
          <div className="aurora-band" style={{ background: "rgba(45,255,122,0.4)", top: "25%", "--adur": "18s", "--adel": "0s" } as React.CSSProperties} />
          <div className="aurora-band" style={{ background: "rgba(77,200,255,0.3)", top: "50%", "--adur": "22s", "--adel": "3s" } as React.CSSProperties} />
        </div>

        <div className="hero-content" style={{ marginTop: "-2vh", zIndex: 10, position: "relative" }}>
          <div className="hero-terminal-line" style={{ paddingTop: 60 }}>
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
      <section className="hp-section mid" style={{ position: "relative", overflow: "hidden" }}>
        {/* Subtle background matrix lines */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: "linear-gradient(rgba(45, 255, 122, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(45, 255, 122, 0.5) 1px, transparent 1px)", backgroundSize: "100px 100px", pointerEvents: "none" }} />
        
        <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 2 }}>
          <div className="hp-label" style={{ justifyContent: "center" }}>RECRUITMENT PIPELINE</div>
          <h2 className="hp-h2" style={{ textAlign: "center", marginBottom: "12px" }}>
            Career <strong className="g">Pathways</strong>
          </h2>
          <p className="hp-sub" style={{ textAlign: "center", margin: "0 auto 72px", maxWidth: "600px", fontSize: "17px" }}>
            Select a specialized track to begin your integration into the NeoCloudz global infrastructure team.
          </p>

          <div className="ent-features-grid" style={{ gridTemplateColumns: "repeat(2, 1fr)", gap: "32px" }}>
            {[
              { 
                idx: "01", 
                icon: <Code2 size={26} />, 
                title: "Engineering", 
                desc: "Developing the distributed orchestration layers and high-performance compute kernels that manage 10,000+ Blackwell nodes.", 
                color: "var(--green)", 
                tags: ["Rust", "C++", "CUDA", "InfiniBand"],
                status: "ACTIVE" 
              },
              { 
                idx: "02", 
                icon: <Shield size={26} />, 
                title: "Security", 
                desc: "Implementing zero-trust architecture and automated compliance auditing for world-leading AI research labs.", 
                color: "var(--blue)", 
                tags: ["ZTA", "IAM", "SOC2", "Audit"],
                status: "ACTIVE" 
              },
              { 
                idx: "03", 
                icon: <Settings size={26} />, 
                title: "Operations", 
                desc: "Optimizing thermal dynamics and power delivery for the next generation of liquid-cooled GPU clusters.", 
                color: "var(--amber)", 
                tags: ["DCIM", "Thermal", "SRE", "NOC"],
                status: "STANDBY" 
              },
              { 
                idx: "04", 
                icon: <Briefcase size={26} />, 
                title: "Corporate", 
                desc: "Orchestrating global market expansion and building strategic partnerships with top-tier AI developers.", 
                color: "var(--white)", 
                tags: ["Growth", "M&A", "Ops", "Legal"],
                status: "ACTIVE" 
              }
            ].map((dept, i) => (
              <div key={i} className="ent-card" style={{ 
                background: "linear-gradient(180deg, rgba(20,26,20,0.8) 0%, #000 100%)", 
                padding: "40px", 
                borderRadius: "20px",
                border: `1px solid rgba(${dept.color === "var(--green)" ? "45,255,122" : dept.color === "var(--blue)" ? "77,200,255" : dept.color === "var(--amber)" ? "255,184,77" : "255,255,255"}, 0.15)`,
                display: "flex", 
                flexDirection: "column", 
                position: "relative",
                overflow: "hidden"
              }}>


                {/* Card Top Bar */}
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "32px", alignItems: "center" }}>
                  <div className="ent-icon" style={{ 
                    margin: 0, 
                    width: "52px", 
                    height: "52px", 
                    borderRadius: "12px",
                    background: `rgba(${dept.color === "var(--green)" ? "45,255,122" : dept.color === "var(--blue)" ? "77,200,255" : dept.color === "var(--amber)" ? "255,184,77" : "255,255,255"}, 0.08)`, 
                    borderColor: `rgba(${dept.color === "var(--green)" ? "45,255,122" : dept.color === "var(--blue)" ? "77,200,255" : dept.color === "var(--amber)" ? "255,184,77" : "255,255,255"}, 0.2)` 
                  }}>
                    {React.cloneElement(dept.icon as React.ReactElement, { color: dept.color })}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                    <span style={{ fontSize: "9px", fontFamily: "var(--font-mono)", color: "var(--muted)", letterSpacing: "0.2em", marginBottom: "4px" }}>SYSTEM STATUS</span>
                    <span style={{ 
                      fontSize: "10px", 
                      fontFamily: "var(--font-mono)", 
                      color: dept.status === "ACTIVE" ? "var(--green)" : "var(--amber)", 
                      display: "flex", 
                      alignItems: "center", 
                      gap: "6px" 
                    }}>
                      <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: dept.status === "ACTIVE" ? "var(--green)" : "var(--amber)", boxShadow: `0 0 8px ${dept.status === "ACTIVE" ? "var(--green)" : "var(--amber)"}` }} />
                      {dept.status}
                    </span>
                  </div>
                </div>

                <h3 className="ent-card-title" style={{ fontSize: "22px", marginBottom: "16px", fontWeight: "800", color: "#fff" }}>{dept.title}</h3>
                <p className="ent-card-desc" style={{ fontSize: "15px", lineHeight: "1.7", color: "var(--text)", opacity: 0.7, marginBottom: "32px" }}>
                  {dept.desc}
                </p>

                {/* Technical Tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "auto" }}>
                  {dept.tags.map((tag, ti) => (
                    <span key={ti} style={{ 
                      fontSize: "10px", 
                      fontFamily: "var(--font-mono)", 
                      color: dept.color, 
                      padding: "4px 10px", 
                      borderRadius: "4px", 
                      background: `rgba(${dept.color === "var(--green)" ? "45,255,122" : dept.color === "var(--blue)" ? "77,200,255" : dept.color === "var(--amber)" ? "255,184,77" : "255,255,255"}, 0.05)`,
                      border: `1px solid rgba(${dept.color === "var(--green)" ? "45,255,122" : dept.color === "var(--blue)" ? "77,200,255" : dept.color === "var(--amber)" ? "255,184,77" : "255,255,255"}, 0.1)`
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="ent-card-hover-line" style={{ position: "absolute", bottom: 0, left: 0, height: "2px", width: "0%", background: dept.color, transition: "width 0.4s ease" }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Roles Section */}
      <section className="hp-section dark" id="open-roles" style={{ position: "relative", padding: "140px 80px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div className="hp-label" style={{ justifyContent: "center" }}>RECRUITMENT SPECIFICATIONS</div>
          <h2 className="hp-h2" style={{ textAlign: "center", marginBottom: "16px" }}>
            Open <strong className="g">Integrations</strong>
          </h2>
          <p className="hp-sub" style={{ textAlign: "center", margin: "0 auto 80px", maxWidth: "600px", fontSize: "16px" }}>
            Current operational slots within the NeoCloudz ecosystem. Each track requires specific technical compatibility.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {OPEN_ROLES.map((role, idx) => (
              <Link 
                key={idx} 
                href="/contact"
                style={{ 
                  display: "grid", 
                  gridTemplateColumns: "1.2fr 1fr",
                  background: "linear-gradient(90deg, #000 0%, #050805 100%)", 
                  border: "1px solid rgba(255,255,255,0.06)", 
                  borderRadius: "12px",
                  textDecoration: "none",
                  transition: "all 0.4s ease",
                  position: "relative",
                  overflow: "hidden"
                }}
                className="spec-card"
              >
                {/* Left Identity Block */}
                <div style={{ padding: "40px", borderRight: "1px solid rgba(255,255,255,0.06)", position: "relative" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--green)", letterSpacing: "0.15em" }}>SPEC: NC-{7000 + idx}</span>
                    <div style={{ height: "1px", flex: 1, background: "rgba(255,255,255,0.06)" }} />
                  </div>
                  <h3 style={{ color: "#fff", fontSize: "26px", fontWeight: "800", letterSpacing: "-0.02em", marginBottom: "16px" }}>{role.title}</h3>
                  <div style={{ display: "flex", gap: "12px" }}>
                    <span style={{ fontSize: "11px", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{role.department}</span>
                    <span style={{ color: "rgba(255,255,255,0.2)" }}>/</span>
                    <span style={{ fontSize: "11px", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{role.location}</span>
                  </div>
                </div>

                {/* Right Capability Block */}
                <div style={{ padding: "40px", background: "rgba(255,255,255,0.01)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                      <span style={{ fontSize: "9px", fontFamily: "var(--font-mono)", color: "var(--muted)" }}>TECH COMPATIBILITY</span>
                      <span style={{ fontSize: "9px", fontFamily: "var(--font-mono)", color: "var(--green)" }}>98.4%</span>
                    </div>
                    <div style={{ height: "2px", background: "rgba(255,255,255,0.05)", borderRadius: "2px", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: "98.4%", background: "var(--green)", boxShadow: "0 0 10px var(--green)" }} />
                    </div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "32px" }}>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <span style={{ width: "8px", height: "8px", borderRadius: "2px", background: "var(--green)" }} />
                      <span style={{ width: "8px", height: "8px", borderRadius: "2px", background: "rgba(255,255,255,0.1)" }} />
                      <span style={{ width: "8px", height: "8px", borderRadius: "2px", background: "rgba(255,255,255,0.1)" }} />
                    </div>
                    <div className="spec-action" style={{ 
                      color: "var(--white)", 
                      fontSize: "12px", 
                      fontWeight: "800", 
                      display: "flex", 
                      alignItems: "center", 
                      gap: "10px",
                      transition: "all 0.3s ease"
                    }}>
                      VIEW SPECIFICATION <ArrowRight size={16} />
                    </div>
                  </div>
                </div>

                {/* Hover Accent Beam */}
                <div className="spec-beam" style={{ position: "absolute", top: 0, left: 0, height: "100%", width: "2px", background: "var(--green)", opacity: 0, transition: "opacity 0.3s" }} />
              </Link>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "80px" }}>
            <p style={{ color: "var(--muted)", fontSize: "15px", marginBottom: "24px", opacity: 0.7 }}>
              Operational requirements not found? Submit an unsolicited integration packet.
            </p>
            <Link href="/contact" className="btn-outline" style={{ display: "inline-flex", padding: "14px 36px", borderRadius: "8px" }}>
              Submit Open Application
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}




