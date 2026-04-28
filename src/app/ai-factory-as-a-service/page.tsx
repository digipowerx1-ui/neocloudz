"use client";

import React from "react";
import Link from "next/link";
import { Server, Cpu, Layers, Activity, Lock, Users, Zap, Box, ArrowRight, CheckCircle2, Factory, Settings, ShieldCheck } from "lucide-react";
import "../enterprise/enterprise.css";

export default function AiFactoryPage() {
  return (
    <div className="enterprise-page">
      {/* Hero Section */}
      <section className="hero" id="hero" style={{ minHeight: "85vh" }}>
        <div className="hero-grid" />
        <div className="hero-aurora">
          <div className="aurora-band" style={{ background: "rgba(45,255,122,0.3)", top: "20%", "--adur": "15s", "--adel": "0s" } as React.CSSProperties} />
          <div className="aurora-band" style={{ background: "rgba(77,200,255,0.25)", top: "50%", "--adur": "20s", "--adel": "4s" } as React.CSSProperties} />
        </div>

        <div className="hero-content" style={{ marginTop: "-5vh" }}>
          <div className="hero-terminal-line">
            <span style={{ color: "var(--green-dim)" }}>&gt;</span>
            <span id="hero-typed">deploy --service ai-factory --mode hybrid</span>
            <span className="cursor">|</span>
          </div>

          <h1 className="hero-h1">
            Bring your own silicon.
            <br />
            <strong className="g">We run the AI factory.</strong>
          </h1>

          <p className="hero-sub" style={{ maxWidth: "750px" }}>
            Deploy dedicated, containerized AI compute pods when you need them on-prem, colocation, or edge locations while NeoCloudz handles the full lifecycle: design, deployment, operations, and SLA-backed reliability.
          </p>
          
          <div style={{ display: "flex", justifyContent: "center", gap: "24px", marginBottom: "36px", flexWrap: "wrap" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--text)", fontSize: "14px" }}>
              <CheckCircle2 size={18} color="var(--green)" /> Dedicated infrastructure
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--text)", fontSize: "14px" }}>
              <CheckCircle2 size={18} color="var(--green)" /> Zero operational burden
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--text)", fontSize: "14px" }}>
              <CheckCircle2 size={18} color="var(--green)" /> Predictable performance
            </span>
          </div>

          <div className="hero-cta">
            <Link href="/contact" className="btn-launch">
              Talk to an Architect <ArrowRight size={18} />
            </Link>
            <Link href="/contact" className="btn-outline">
              Request a Pod Design
            </Link>
          </div>
        </div>
      </section>

      {/* What Is Pod as a Service */}
      <section className="hp-section mid">
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="hp-label">HYBRID INFRASTRUCTURE</div>
          <h2 className="hp-h2">
            What is <strong className="g">Pod-as-a-Service?</strong>
          </h2>
          <p className="hp-sub" style={{ maxWidth: "800px", marginBottom: "48px" }}>
            Pod-as-a-Service is a hybrid AI infrastructure model that lets enterprises deploy self-contained, containerized AI data center pods, while NeoCloudz manages everything required to operate them at production scale.
          </p>

          <div className="ent-features-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}>
            <div className="ent-card">
              <div className="ent-icon">
                <Box size={24} color="var(--green)" />
              </div>
              <h3 className="ent-card-title">Modular Unit</h3>
              <p className="ent-card-desc">
                Each pod is a modular AI factory (power, cooling, networking, compute, and control plane) delivered as a single, deployable unit.
              </p>
            </div>
            
            <div className="ent-card">
              <div className="ent-icon">
                <Lock size={24} color="var(--blue)" />
              </div>
              <h3 className="ent-card-title">Total Control</h3>
              <p className="ent-card-desc">
                You maintain strict physical ownership and data control, meeting rigorous enterprise data residency and sovereignty requirements.
              </p>
            </div>
            
            <div className="ent-card">
              <div className="ent-icon">
                <Settings size={24} color="var(--amber)" />
              </div>
              <h3 className="ent-card-title">Managed Operations</h3>
              <p className="ent-card-desc">
                NeoCloudz runs all complex operations, telemetry monitoring, patching, hardware upgrades, and enterprise-grade support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who It’s For Section */}
      <section className="hp-section dark border-y border-border">
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginBottom: "56px" }}>
            <div className="hp-label" style={{ justifyContent: "center" }}>BUILT FOR SCALE</div>
            <h2 className="hp-h2">
              Who It's <strong className="g">For</strong>
            </h2>
            <p className="hp-sub">
              Built for organizations needing dedicated AI infrastructure without the burden of running a full data center.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
            {[
              { icon: Users, title: "Enterprise AI/ML Teams", desc: "For teams with strict data residency and air-gap needs." },
              { icon: Lock, title: "Financial Services & Healthcare", desc: "Optimized for highly regulated, sensitive workloads." },
              { icon: Activity, title: "Media, Gaming & Simulation", desc: "Delivering ultra-low latency for demanding renders." },
              { icon: Zap, title: "Telecom, Energy & Industrial", desc: "Deploy rugged Edge computing solutions anywhere." },
              { icon: ShieldCheck, title: "Government & National Labs", desc: "Purpose-built for sovereign AI stacks and defense." }
            ].map((item, idx) => (
              <div key={idx} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "16px", padding: "24px", display: "flex", alignItems: "flex-start", gap: "16px" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "rgba(45, 255, 122, 0.05)", border: "1px solid rgba(45, 255, 122, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <item.icon size={20} color="var(--green)" />
                </div>
                <div>
                  <h4 style={{ color: "var(--white)", fontWeight: 600, fontSize: "16px", marginBottom: "8px" }}>{item.title}</h4>
                  <p style={{ color: "var(--muted)", fontSize: "14px", lineHeight: "1.5" }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Pod Architecture */}
      <section className="hp-section mid">
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "64px", alignItems: "center" }}>
          <div style={{ flex: "1 1 400px" }}>
            <div className="hp-label">TECHNICAL SPECIFICATIONS</div>
            <h2 className="hp-h2">
              The Pod <strong className="g">Architecture</strong>
            </h2>
            <p className="hp-sub" style={{ marginBottom: "32px" }}>
              Repeatable, scalable building blocks engineered for ultimate flexibility and massive parallel compute.
            </p>
            <ul style={{ display: "flex", flexDirection: "column", gap: "16px", listStyle: "none", padding: 0 }}>
              {[
                "High-density GPU / accelerator racks",
                "Integrated power distribution and backup",
                "Advanced air or liquid cooling systems",
                "High-speed network fabric (400G+ ready)",
                "Secure out-of-band management",
                "NeoCloudz control plane and telemetry"
              ].map((spec, idx) => (
                <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "12px", color: "var(--text)" }}>
                  <Server size={20} color="var(--blue)" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span style={{ fontSize: "15px" }}>{spec}</span>
                </li>
              ))}
            </ul>
            <p style={{ marginTop: "32px", fontSize: "14px", color: "var(--green)", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Scalability: Single pod to multi-pod super-clusters
            </p>
          </div>

          <div style={{ flex: "1 1 400px", position: "relative" }}>
            {/* Visual Graphic representing Pod Architecture */}
            <div style={{ background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: "24px", padding: "40px", position: "relative", overflow: "hidden", minHeight: "400px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue/10 via-transparent to-transparent" />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", position: "relative", zIndex: 10 }}>
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} style={{ width: "120px", height: "160px", background: "rgba(10, 15, 10, 0.8)", border: "1px solid rgba(77, 200, 255, 0.3)", borderRadius: "12px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "12px", boxShadow: "0 0 30px rgba(77, 200, 255, 0.1)" }}>
                    <Layers size={32} color="var(--blue)" />
                    <div style={{ width: "60%", height: "4px", background: "var(--blue)", borderRadius: "2px", opacity: 0.5 }} />
                    <div style={{ width: "40%", height: "4px", background: "var(--blue)", borderRadius: "2px", opacity: 0.3 }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Multi-Silicon by Design */}
      <section className="hp-section dark">
        <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
          <div className="hp-label" style={{ justifyContent: "center" }}>HARDWARE AGNOSTIC</div>
          <h2 className="hp-h2">
            Multi-Silicon <strong className="g">by Design</strong>
          </h2>
          <p className="hp-sub" style={{ margin: "0 auto 48px" }}>
            Not GPU-only. Pods are designed around the silicon that best fits your specific workloads.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "16px" }}>
            {[
              { name: "NVIDIA GPUs", detail: "H100, B200, NVL72, future Blackwell" },
              { name: "Groq", detail: "For ultra-low-latency inference" },
              { name: "SambaNova Systems", detail: "For large-scale training" },
              { name: "Cerebras", detail: "Wafer-scale engines" },
              { name: "Custom ASICs", detail: "Partner or custom silicon" }
            ].map((chip, idx) => (
              <div key={idx} style={{ background: "var(--surface2)", border: "1px solid rgba(45, 255, 122, 0.2)", borderRadius: "12px", padding: "20px 32px", minWidth: "200px", flex: "1 1 auto" }}>
                <Cpu size={28} color="var(--green)" style={{ margin: "0 auto 12px" }} />
                <h4 style={{ color: "var(--white)", fontWeight: 700, fontSize: "16px", marginBottom: "4px" }}>{chip.name}</h4>
                <p style={{ color: "var(--muted)", fontSize: "13px" }}>{chip.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Turnkey Deployment Section */}
      <section className="hp-section mid">
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="hp-label">MANAGED SERVICES</div>
          <h2 className="hp-h2">
            Turnkey Deployment & <strong className="g">Operations</strong>
          </h2>
          <p className="hp-sub" style={{ marginBottom: "48px" }}>
            Focus on models, not hardware. NeoCloudz handles the entire infrastructure lifecycle.
          </p>

          <div className="ent-features-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", marginTop: 0 }}>
            {[
              "Site readiness (power, cooling, network, compliance)",
              "Pod delivery, installation, and commissioning",
              "Burn-in testing and production validation",
              "Secure tenant and project isolation",
              "Real-time telemetry and utilization analytics",
              "Patch orchestration and rolling upgrades",
              "24/7 monitoring and incident response"
            ].map((service, idx) => (
              <div key={idx} className="ent-card" style={{ padding: "24px" }}>
                <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                  <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "rgba(45, 255, 122, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Factory size={16} color="var(--green)" />
                  </div>
                  <p style={{ color: "var(--text)", fontSize: "15px", lineHeight: "1.5", margin: 0 }}>{service}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="hp-section dark text-center" style={{ borderTop: "1px solid var(--border)" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2 className="hp-h2 mb-4">Ready to Build the Next Generation of AI?</h2>
          <p className="hp-sub" style={{ margin: "0 auto 40px", color: "var(--text)" }}>
            Instant access to NVIDIA Blackwell B200 GPUs, U.S.-hosted, Supermicro-optimized, and built for scale.
          </p>
          
          <div className="hero-cta" style={{ marginBottom: 0 }}>
            <Link href="/contact" className="btn-launch">
              Request Private Clusters
            </Link>
            <Link href="/contact" className="btn-outline">
              Launch AI Instances
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
