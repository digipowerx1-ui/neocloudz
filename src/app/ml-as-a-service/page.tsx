"use client";

import React from "react";
import Link from "next/link";
import { BrainCircuit, Database, Lock, Cpu, Server, Layers, Workflow, Lightbulb, Code, Zap, Rocket, CheckCircle2, ArrowRight } from "lucide-react";
import "../enterprise/enterprise.css";

export default function MlServicePage() {
  return (
    <div className="enterprise-page">
      {/* Hero Section */}
      <section className="hero" id="hero" style={{ minHeight: "85vh" }}>
        <div className="hero-grid" />
        <div className="hero-aurora">
          <div className="aurora-band" style={{ background: "rgba(45,255,122,0.3)", top: "15%", "--adur": "18s", "--adel": "0s" } as React.CSSProperties} />
          <div className="aurora-band" style={{ background: "rgba(77,200,255,0.25)", top: "60%", "--adur": "25s", "--adel": "3s" } as React.CSSProperties} />
        </div>

        <div className="hero-content" style={{ marginTop: "-5vh" }}>
          <div className="hero-terminal-line">
            <span style={{ color: "var(--green-dim)" }}>&gt;</span>
            <span id="hero-typed">init --stack mlops --mode production</span>
            <span className="cursor">|</span>
          </div>

          <h1 className="hero-h1">
            Managed ML Infrastructure
            <br />
            <strong className="g">—Not a Black Box Platform</strong>
          </h1>

          <p className="hero-sub" style={{ maxWidth: "800px" }}>
            We provide the compute, runtime, and operational foundation required to run machine learning workloads reliably in production—without forcing you into proprietary tools.
          </p>

          <div className="hero-cta">
            <Link href="/contact" className="btn-launch">
              Talk to an Architect <ArrowRight size={18} />
            </Link>
            <Link href="/pricing" className="btn-outline">
              Request Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* The Technical Stack Matrix */}
      <section className="hp-section mid">
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="hp-label">TECHNICAL CAPABILITIES</div>
          <h2 className="hp-h2">
            The Technical <strong className="g">Stack Matrix</strong>
          </h2>
          <p className="hp-sub" style={{ marginBottom: "48px" }}>
            We support the industry's most robust machine learning primitives and orchestration layers.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "24px" }}>
            {/* Inference */}
            <div style={{ background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: "16px", padding: "32px", position: "relative" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                <BrainCircuit size={24} color="var(--green)" />
                <h3 style={{ color: "var(--white)", fontWeight: 700, fontSize: "18px" }}>Inference</h3>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                <li style={{ color: "var(--text)", fontSize: "14px", display: "flex", gap: "8px" }}><CheckCircle2 size={16} color="var(--green)" /> NeoCloudz Native</li>
                <li style={{ color: "var(--muted)", fontSize: "14px", display: "flex", gap: "8px" }}><CheckCircle2 size={16} color="var(--blue)" /> Llama</li>
                <li style={{ color: "var(--muted)", fontSize: "14px", display: "flex", gap: "8px" }}><CheckCircle2 size={16} color="var(--blue)" /> S. Phi</li>
                <li style={{ color: "var(--muted)", fontSize: "14px", display: "flex", gap: "8px" }}><CheckCircle2 size={16} color="var(--blue)" /> NVIDIA NIM Microservices</li>
              </ul>
            </div>

            {/* Orchestration */}
            <div style={{ background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: "16px", padding: "32px", position: "relative" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                <Workflow size={24} color="var(--blue)" />
                <h3 style={{ color: "var(--white)", fontWeight: 700, fontSize: "18px" }}>Orchestration</h3>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                <li style={{ color: "var(--muted)", fontSize: "14px", display: "flex", gap: "8px" }}><CheckCircle2 size={16} color="var(--green)" /> SkyPilot</li>
                <li style={{ color: "var(--muted)", fontSize: "14px", display: "flex", gap: "8px" }}><CheckCircle2 size={16} color="var(--green)" /> MLFlow</li>
              </ul>
            </div>

            {/* IaaS */}
            <div style={{ background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: "16px", padding: "32px", position: "relative" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                <Layers size={24} color="var(--amber)" />
                <h3 style={{ color: "var(--white)", fontWeight: 700, fontSize: "18px" }}>IaaS (Infra Layer)</h3>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <h4 style={{ fontSize: "12px", color: "var(--amber)", fontFamily: "var(--font-mono)", textTransform: "uppercase", marginBottom: "8px" }}>Compute</h4>
                  <p style={{ color: "var(--muted)", fontSize: "13px", lineHeight: "1.4" }}>VMs, Containers, Managed Kubernetes</p>
                </div>
                <div>
                  <h4 style={{ fontSize: "12px", color: "var(--amber)", fontFamily: "var(--font-mono)", textTransform: "uppercase", marginBottom: "8px" }}>Storage</h4>
                  <p style={{ color: "var(--muted)", fontSize: "13px", lineHeight: "1.4" }}>Block volumes, Object storage, Shared FS, WEKA</p>
                </div>
                <div>
                  <h4 style={{ fontSize: "12px", color: "var(--amber)", fontFamily: "var(--font-mono)", textTransform: "uppercase", marginBottom: "8px" }}>Networking</h4>
                  <p style={{ color: "var(--muted)", fontSize: "13px", lineHeight: "1.4" }}>NDR/XDR InfiniBand, Load Balancer, VPC Routing</p>
                </div>
              </div>
            </div>

            {/* Hardware */}
            <div style={{ background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: "16px", padding: "32px", position: "relative" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                <Server size={24} color="var(--text)" />
                <h3 style={{ color: "var(--white)", fontWeight: 700, fontSize: "18px" }}>Hardware</h3>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <h4 style={{ fontSize: "12px", color: "var(--white)", fontFamily: "var(--font-mono)", textTransform: "uppercase", marginBottom: "8px" }}>NVIDIA GPUs</h4>
                  <p style={{ color: "var(--green)", fontSize: "13px", lineHeight: "1.4" }}>GB300 NVL72, GB200 NVL72, HGX H200, HGX H100</p>
                </div>
                <div>
                  <h4 style={{ fontSize: "12px", color: "var(--white)", fontFamily: "var(--font-mono)", textTransform: "uppercase", marginBottom: "8px" }}>CPU Servers</h4>
                  <p style={{ color: "var(--muted)", fontSize: "13px", lineHeight: "1.4" }}>Intel & AMD</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section className="hp-section dark border-y border-border">
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="hp-label" style={{ justifyContent: "center" }}>CORE FEATURES</div>
          <h2 className="hp-h2" style={{ textAlign: "center", marginBottom: "56px" }}>
            Built for <strong className="g">Engineers</strong>
          </h2>

          <div className="ent-features-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", marginTop: 0 }}>
            {/* Compute */}
            <div className="ent-card">
              <div className="ent-icon">
                <Cpu size={24} color="var(--green)" />
              </div>
              <h3 className="ent-card-title">GPU & CPU Compute</h3>
              <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
                <div>
                  <strong style={{ color: "var(--text)", fontSize: "14px" }}>Flexible Infrastructure</strong>
                  <p style={{ color: "var(--muted)", fontSize: "13px", marginTop: "4px" }}>Support for NVIDIA H100, A100, and custom compute resources.</p>
                </div>
                <div>
                  <strong style={{ color: "var(--text)", fontSize: "14px" }}>Auto Scaling</strong>
                  <p style={{ color: "var(--muted)", fontSize: "13px", marginTop: "4px" }}>Automatic scaling for training and inference workloads.</p>
                </div>
                <div>
                  <strong style={{ color: "var(--text)", fontSize: "14px" }}>Framework Support</strong>
                  <p style={{ color: "var(--muted)", fontSize: "13px", marginTop: "4px" }}>PyTorch, TensorFlow, ONNX, JAX, and custom environments.</p>
                </div>
              </div>
            </div>

            {/* Runtimes */}
            <div className="ent-card">
              <div className="ent-icon">
                <Database size={24} color="var(--blue)" />
              </div>
              <h3 className="ent-card-title">Managed Runtimes</h3>
              <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
                <div>
                  <strong style={{ color: "var(--text)", fontSize: "14px" }}>Pre-configured Environments</strong>
                  <p style={{ color: "var(--muted)", fontSize: "13px", marginTop: "4px" }}>Optimized runtimes for training and inference workflows.</p>
                </div>
                <div>
                  <strong style={{ color: "var(--text)", fontSize: "14px" }}>Dependency Management</strong>
                  <p style={{ color: "var(--muted)", fontSize: "13px", marginTop: "4px" }}>Automatic handling of libraries and custom dependencies.</p>
                </div>
                <div>
                  <strong style={{ color: "var(--text)", fontSize: "14px" }}>Version Control</strong>
                  <p style={{ color: "var(--muted)", fontSize: "13px", marginTop: "4px" }}>Track and manage runtime versions for reproducibility.</p>
                </div>
              </div>
            </div>

            {/* Security */}
            <div className="ent-card">
              <div className="ent-icon">
                <Lock size={24} color="var(--amber)" />
              </div>
              <h3 className="ent-card-title">Secure & Compliant</h3>
              <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
                <div>
                  <strong style={{ color: "var(--text)", fontSize: "14px" }}>Isolated Environments</strong>
                  <p style={{ color: "var(--muted)", fontSize: "13px", marginTop: "4px" }}>Dedicated compute with network isolation and encryption.</p>
                </div>
                <div>
                  <strong style={{ color: "var(--text)", fontSize: "14px" }}>Compliance Ready</strong>
                  <p style={{ color: "var(--muted)", fontSize: "13px", marginTop: "4px" }}>HIPAA, SOC 2, and enterprise security standards.</p>
                </div>
                <div>
                  <strong style={{ color: "var(--text)", fontSize: "14px" }}>Monitoring & Audit</strong>
                  <p style={{ color: "var(--muted)", fontSize: "13px", marginTop: "4px" }}>Complete visibility and audit trails for all operations.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Supporting Your ML Journey Section */}
      <section className="hp-section mid">
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="hp-label" style={{ justifyContent: "center" }}>THE LIFECYCLE</div>
          <h2 className="hp-h2" style={{ textAlign: "center", marginBottom: "64px" }}>
            Supporting Your <strong className="g">ML Journey</strong>
          </h2>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "32px", position: "relative" }}>
            {/* Connecting line for larger screens */}
            <div className="hidden lg:block absolute top-[40px] left-[10%] right-[10%] h-[2px] bg-border z-0">
              <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-green to-blue w-full opacity-30" />
            </div>

            {[
              { icon: Lightbulb, step: "01", title: "Ideate", desc: "Define business problems, explore available data, and formulate actionable ML use cases to drive innovation." },
              { icon: Code, step: "02", title: "Build", desc: "Create reproducible development environments and seamlessly access compute resources like GPUs." },
              { icon: Zap, step: "03", title: "Train", desc: "Scale your model training effortlessly. Run experiments and optimize hyperparameters fast." },
              { icon: Rocket, step: "04", title: "Deploy", desc: "Streamline the path to production. Deploy trained models as scalable, reliable APIs." }
            ].map((stage, idx) => (
              <div key={idx} style={{ flex: "1 1 220px", position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "var(--surface)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "24px", boxShadow: "0 0 20px rgba(10,15,10,0.8)" }}>
                  <stage.icon size={32} color="var(--green)" />
                </div>
                <div style={{ fontSize: "12px", fontFamily: "var(--font-mono)", color: "var(--blue)", marginBottom: "8px" }}>STEP {stage.step}</div>
                <h3 style={{ color: "var(--white)", fontWeight: 700, fontSize: "20px", marginBottom: "12px" }}>{stage.title}</h3>
                <p style={{ color: "var(--muted)", fontSize: "14px", lineHeight: "1.6" }}>{stage.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Workloads Section */}
      <section className="hp-section dark border-y border-border">
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div className="hp-label" style={{ justifyContent: "center" }}>DEPLOYMENT TIERS</div>
          <h2 className="hp-h2" style={{ textAlign: "center", marginBottom: "48px" }}>
            Supported <strong className="g">Workloads</strong>
          </h2>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "24px" }}>
            <div style={{ flex: "1 1 400px", background: "var(--surface)", border: "1px solid rgba(77,200,255,0.2)", borderRadius: "20px", padding: "40px" }}>
              <h3 style={{ color: "var(--white)", fontSize: "24px", fontWeight: 700, marginBottom: "16px" }}>Provision in Minutes</h3>
              <p style={{ color: "var(--text)", fontSize: "15px", marginBottom: "32px", lineHeight: "1.6" }}>
                Cost-efficient for experimentation and development workloads.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "16px" }}>
                <li style={{ display: "flex", alignItems: "center", gap: "12px", color: "var(--muted)", fontSize: "14px" }}>
                  <CheckCircle2 size={18} color="var(--blue)" /> Fast spin-up and teardown.
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "12px", color: "var(--muted)", fontSize: "14px" }}>
                  <CheckCircle2 size={18} color="var(--blue)" /> Pay-as-you-go pricing.
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "12px", color: "var(--muted)", fontSize: "14px" }}>
                  <CheckCircle2 size={18} color="var(--blue)" /> Ideal for experimentation.
                </li>
              </ul>
            </div>

            <div style={{ flex: "1 1 400px", background: "var(--surface)", border: "1px solid rgba(45,255,122,0.3)", borderRadius: "20px", padding: "40px", boxShadow: "0 0 30px rgba(45,255,122,0.05)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                <h3 style={{ color: "var(--white)", fontSize: "24px", fontWeight: 700 }}>Dedicated Infrastructure</h3>
                <span style={{ fontSize: "11px", background: "rgba(45,255,122,0.1)", color: "var(--green)", padding: "4px 8px", borderRadius: "12px", fontWeight: 700, letterSpacing: "0.05em" }}>ENTERPRISE</span>
              </div>
              <p style={{ color: "var(--text)", fontSize: "15px", marginBottom: "32px", lineHeight: "1.6" }}>
                Physically isolated for production and mission-critical workloads.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "16px" }}>
                <li style={{ display: "flex", alignItems: "center", gap: "12px", color: "var(--muted)", fontSize: "14px" }}>
                  <CheckCircle2 size={18} color="var(--green)" /> Predictable latency & throughput.
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "12px", color: "var(--muted)", fontSize: "14px" }}>
                  <CheckCircle2 size={18} color="var(--green)" /> Isolated compute resources.
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "12px", color: "var(--muted)", fontSize: "14px" }}>
                  <CheckCircle2 size={18} color="var(--green)" /> Enterprise-grade SLAs.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="hp-section mid text-center" style={{ borderTop: "1px solid var(--border)" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2 className="hp-h2 mb-4">Start Building Without the Black Box</h2>
          <p className="hp-sub" style={{ margin: "0 auto 40px", color: "var(--text)" }}>
            Unlock flexible, high-performance ML infrastructure today.
          </p>
          
          <div className="hero-cta" style={{ marginBottom: 0 }}>
            <Link href="/pricing" className="btn-launch">
              View Pricing
            </Link>
            <Link href="/contact" className="btn-outline">
              Talk to an Architect
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
