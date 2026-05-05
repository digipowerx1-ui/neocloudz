"use client";

import React from "react";
import Link from "next/link";
import { Server, Cpu, Cloud, Settings, Terminal, Map, Rocket, FlaskConical, Blocks, ArrowRight, ShieldCheck, Activity, Zap } from "lucide-react";
import { HeroParticles } from "@/components/layout/HeroParticles";
import PageEffects from "@/features/page-effects/PageEffects";
import "../enterprise/enterprise.css";

export default function GpuServicePage() {
  return (
    <PageEffects>
      <div className="enterprise-page">
      {/* Hero Section */}
      <section className="hero" id="hero" style={{ minHeight: "85vh" }}>
        <HeroParticles />
        <div className="hero-grid" />
        <div className="hero-aurora">
          <div className="aurora-band" style={{ background: "rgba(45,255,122,0.3)", top: "15%", "--adur": "18s", "--adel": "0s" } as React.CSSProperties} />
          <div className="aurora-band" style={{ background: "rgba(77,200,255,0.25)", top: "60%", "--adur": "25s", "--adel": "3s" } as React.CSSProperties} />
        </div>

        <div className="hero-content" style={{ marginTop: "-5vh" }}>
          <div className="hero-terminal-line">
            <span style={{ color: "var(--green-dim)" }}>&gt;</span>
            <span id="hero-typed">launch --type gpu --compute on-demand</span>
            <span className="cursor">|</span>
          </div>

          <h1 className="hero-h1">
            On-Demand GPUs.
            <br />
            <strong className="g">No Contracts. No Guesswork.</strong>
          </h1>

          <p className="hero-sub" style={{ maxWidth: "750px" }}>
            Spin up high-performance GPUs in minutes. Pay only for what you use. Built for developers, researchers, and AI teams who want control—not cloud complexity.
          </p>

          <div className="hero-cta">
            <Link href="/contact?source=gpu-as-a-service&cta=contact_sales" className="btn-launch">
              Contact Sales <ArrowRight size={18} />
            </Link>
            <Link href="/pricing" className="btn-outline">
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="hp-section mid text-center">
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div className="hp-label" style={{ justifyContent: "center" }}>INFRASTRUCTURE Tiers</div>
          <h2 className="hp-h2">
            What We <strong className="g">Offer</strong>
          </h2>
          <p className="hp-sub" style={{ marginBottom: "48px", textAlign: "center" }}>
            Flexible GPU infrastructure designed for your workload
          </p>

          <div className="ent-features-grid">
            <div className="ent-card" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
                <div className="ent-icon" style={{ margin: 0, background: "rgba(77,200,255,0.1)", border: "1px solid rgba(77,200,255,0.2)" }}>
                  <Cloud size={24} color="var(--blue)" />
                </div>
                <h3 className="ent-card-title" style={{ margin: 0, fontSize: "22px" }}>Shared Cloud GPUs</h3>
              </div>
              <p className="ent-card-desc" style={{ flexGrow: 1 }}>
                Cost-effective virtualized compute for development, testing, and rapid experimentation. Perfect for inference workloads or scaling parallel tasks affordably.
              </p>
              <div style={{ marginTop: "24px", paddingTop: "24px", borderTop: "1px solid var(--border)", width: "100%" }}>
                <span style={{ fontSize: "12px", fontFamily: "var(--font-mono)", color: "var(--blue)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Pricing on request</span>
              </div>
            </div>

            <div className="ent-card" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
                <div className="ent-icon" style={{ margin: 0, background: "rgba(45,255,122,0.1)", border: "1px solid rgba(45,255,122,0.2)" }}>
                  <Server size={24} color="var(--green)" />
                </div>
                <h3 className="ent-card-title" style={{ margin: 0, fontSize: "22px" }}>Dedicated Bare-Metal</h3>
              </div>
              <p className="ent-card-desc" style={{ flexGrow: 1 }}>
                Full hardware isolation with absolutely no virtualization overhead for your heaviest production workloads. Ideal for massive model training and secure deployments. H100, H200, and B300 clusters available.
              </p>
              <div style={{ marginTop: "24px", paddingTop: "24px", borderTop: "1px solid var(--border)", width: "100%" }}>
                <span style={{ fontSize: "12px", fontFamily: "var(--font-mono)", color: "var(--green)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Pricing on request</span>
              </div>
            </div>

            <div className="ent-card" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
                <div className="ent-icon" style={{ margin: 0, background: "rgba(255,184,77,0.1)", border: "1px solid rgba(255,184,77,0.2)" }}>
                  <Blocks size={24} color="var(--amber)" />
                </div>
                <h3 className="ent-card-title" style={{ margin: 0, fontSize: "22px" }}>GPU-as-a-Service</h3>
              </div>
              <p className="ent-card-desc" style={{ flexGrow: 1 }}>
                Fully managed GPU environments with pre-configured software stacks. Instantly deploy your AI workloads without managing the underlying hardware or OS layer.
              </p>
              <div style={{ marginTop: "24px", paddingTop: "24px", borderTop: "1px solid var(--border)", width: "100%" }}>
                <span style={{ fontSize: "12px", fontFamily: "var(--font-mono)", color: "var(--amber)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Pricing on request</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bare Metal & Virtualized GPUs Features */}
      <section className="hp-section dark border-y border-border text-center">
        <div className="gpu-reliability-grid" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ maxWidth: "800px", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div className="hp-label" style={{ justifyContent: "center" }}>RELIABILITY & SCALE</div>
            <h2 className="hp-h2">
              Bare Metal & <strong className="g">Virtualized GPUs</strong>
            </h2>
            <p className="hp-sub" style={{ marginBottom: "32px", textAlign: "center" }}>
              Enterprise-grade infrastructure built for absolute reliability, performance, and security from the ground up.
            </p>
            <ul style={{ display: "flex", flexDirection: "column", gap: "20px", listStyle: "none", padding: 0, width: "100%", alignItems: "center" }}>
              {[
                { icon: Zap, title: "Redundant power and networking", desc: "N+1 architecture ensuring no single point of failure." },
                { icon: ShieldCheck, title: "Secure tenant isolation", desc: "Rigorous boundary enforcement separating your workloads." },
                { icon: Activity, title: "Continuous monitoring & support", desc: "24/7 telemetry and rapid-response enterprise support." },
                { icon: Settings, title: "Compliance-ready deployments", desc: "Optional SOC2 / HIPAA ready setups for enterprise clients." }
              ].map((item, idx) => (
                <li key={idx} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", color: "var(--text)", textAlign: "center" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "var(--surface2)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <item.icon size={20} color="var(--green)" />
                  </div>
                  <div>
                    <h4 style={{ color: "var(--white)", fontWeight: 600, fontSize: "15px", marginBottom: "4px" }}>{item.title}</h4>
                    <p style={{ color: "var(--muted)", fontSize: "14px", lineHeight: "1.4" }}>{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div style={{ width: "100%", maxWidth: "600px", position: "relative", marginTop: "40px" }}>
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "24px", padding: "40px", position: "relative", overflow: "hidden", minHeight: "400px", display: "flex", alignItems: "center", justifyItems: "center" }}>
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green/5 via-transparent to-transparent" />
              <div style={{ width: "100%", border: "1px solid rgba(45,255,122,0.15)", borderRadius: "12px", background: "rgba(10,15,10,0.6)", padding: "20px", position: "relative", zIndex: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border)", paddingBottom: "12px", marginBottom: "16px" }}>
                  <span style={{ fontSize: "12px", color: "var(--muted)", fontFamily: "var(--font-mono)" }}>SERVER_STATUS</span>
                  <span style={{ fontSize: "12px", color: "var(--green)", fontFamily: "var(--font-mono)" }}>ONLINE</span>
                </div>
                {[1, 2, 3].map(i => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "16px", padding: "12px 0", borderBottom: i !== 3 ? "1px solid var(--border)" : "none" }}>
                    <Cpu size={24} color={i === 1 ? "var(--green)" : "var(--muted)"} />
                    <div style={{ flexGrow: 1 }}>
                      <div style={{ height: "6px", background: "var(--surface2)", borderRadius: "3px", width: "100%", overflow: "hidden" }}>
                        <div style={{ height: "100%", background: i === 1 ? "var(--green)" : "var(--blue)", width: `${80 - i * 15}%` }} />
                      </div>
                    </div>
                    <span style={{ fontSize: "13px", fontFamily: "var(--font-mono)", color: "var(--text)" }}>{80 - i * 15}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Deployment Model */}
      <section className="hp-section mid text-center">
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          <div className="hp-label" style={{ justifyContent: "center" }}>WORKFLOW</div>
          <h2 className="hp-h2">
            Simple <strong className="g">Deployment Model</strong>
          </h2>
          <p className="hp-sub" style={{ margin: "0 auto 48px", textAlign: "center" }}>
            Deploy GPUs in minutes with our intuitive platform.
          </p>

          <div className="ent-features-grid">
            <div className="ent-card" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
              <div className="ent-icon" style={{ margin: "0 auto 18px" }}>
                <Rocket size={24} color="var(--blue)" />
              </div>
              <h3 className="ent-card-title">Provision in Minutes</h3>
              <p className="ent-card-desc">
                Spin up GPU infrastructure instantly. Scale vertically or horizontally via our API or dashboard without manual intervention.
              </p>
            </div>

            <div className="ent-card" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
              <div className="ent-icon" style={{ margin: "0 auto 18px" }}>
                <Terminal size={24} color="var(--amber)" />
              </div>
              <h3 className="ent-card-title">API & Dashboard</h3>
              <p className="ent-card-desc">
                Full programmatic control. Manage your fleet, monitor usage, and automate infrastructure entirely with comprehensive API docs.
              </p>
            </div>

            <div className="ent-card" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
              <div className="ent-icon" style={{ margin: "0 auto 18px" }}>
                <Blocks size={24} color="var(--green)" />
              </div>
              <h3 className="ent-card-title">Standard Images</h3>
              <p className="ent-card-desc">
                Get to work immediately. Select from pre-configured OS templates and popular ML framework images ready to deploy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Built for Real Workloads Section */}
      <section className="hp-section dark text-center">
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          <div className="hp-label" style={{ justifyContent: "center" }}>USE CASES</div>
          <h2 className="hp-h2">
            Built for <strong className="g">Real Workloads</strong>
          </h2>
          <p className="hp-sub" style={{ marginBottom: "56px", textAlign: "center" }}>
            Whatever your use case, we have the infrastructure to support it.
          </p>

          <div className="gpu-use-cases-grid">
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "16px", padding: "32px", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
              <FlaskConical size={32} color="var(--green)" style={{ marginBottom: "24px" }} />
              <h3 style={{ color: "var(--white)", fontWeight: 700, fontSize: "20px", marginBottom: "12px" }}>Researchers & Labs</h3>
              <p style={{ color: "var(--muted)", fontSize: "15px", lineHeight: "1.6" }}>
                Train large models and run experiments with enterprise-grade GPU infrastructure. Flexible, scalable compute for research workloads without long-term commitments.
              </p>
            </div>

            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "16px", padding: "32px", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
              <Terminal size={32} color="var(--blue)" style={{ marginBottom: "24px" }} />
              <h3 style={{ color: "var(--white)", fontWeight: 700, fontSize: "20px", marginBottom: "12px" }}>Indie Developers</h3>
              <p style={{ color: "var(--muted)", fontSize: "15px", lineHeight: "1.6" }}>
                Affordable GPU access to build, prototype, and scale AI-powered applications natively without massive upfront investments.
              </p>
            </div>

            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "16px", padding: "32px", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
              <Activity size={32} color="var(--amber)" style={{ marginBottom: "24px" }} />
              <h3 style={{ color: "var(--white)", fontWeight: 700, fontSize: "20px", marginBottom: "12px" }}>Inference & Training</h3>
              <p style={{ color: "var(--muted)", fontSize: "15px", lineHeight: "1.6" }}>
                Optimize costs with dynamic shared GPUs for inference or guarantee peak throughput and scale with dedicated hardware for training pipelines.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Global Infrastructure Section */}
      <section className="hp-section mid text-center" style={{ borderTop: "1px solid var(--border)" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div className="hp-label" style={{ justifyContent: "center" }}>WORLDWIDE FOOTPRINT</div>
          <h2 className="hp-h2">
            Global GPU <strong className="g">Infrastructure</strong>
          </h2>
          <p className="hp-sub" style={{ margin: "0 auto 48px" }}>
            Low-latency access to high-performance compute, worldwide.
          </p>

          <div className="gpu-map-container">
            {/* Immersive Network Map Graphic */}
            <img 
              src="/images/global-network-map.png" 
              alt="Global Network Map" 
              style={{ 
                position: "absolute", 
                inset: 0, 
                width: "100%", 
                height: "100%", 
                objectFit: "cover",
                opacity: 0.8
              }} 
              id="global-map-img"
            />
            
            {/* Data Pulse Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent opacity-60" />
            
            {/* Animated Data Points */}
            <div style={{ position: "absolute", top: "35%", left: "30%", width: "8px", height: "8px", background: "var(--green)", borderRadius: "50%", boxShadow: "0 0 15px var(--green)", animation: "pulse-dot 2s infinite" }} />
            <div style={{ position: "absolute", top: "45%", left: "25%", width: "6px", height: "6px", background: "var(--green)", borderRadius: "50%", boxShadow: "0 0 10px var(--green)", animation: "pulse-dot 2.5s infinite" }} />
            <div style={{ position: "absolute", top: "30%", right: "35%", width: "8px", height: "8px", background: "var(--green)", borderRadius: "50%", boxShadow: "0 0 15px var(--green)", animation: "pulse-dot 3s infinite" }} />
            <div style={{ position: "absolute", bottom: "35%", right: "40%", width: "6px", height: "6px", background: "var(--green)", borderRadius: "50%", boxShadow: "0 0 10px var(--green)", animation: "pulse-dot 2.2s infinite" }} />

            <div style={{ 
              position: "relative", 
              zIndex: 10, 
              color: "var(--white)", 
              fontWeight: 700, 
              fontSize: "18px", 
              background: "rgba(10,15,10,0.85)", 
              padding: "16px 32px", 
              borderRadius: "40px", 
              border: "1px solid rgba(45,255,122,0.25)", 
              backdropFilter: "blur(8px)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
            }}>
              Deploy closest to your users.
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-banner" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="cta-content">
          <h2 className="hp-h2 mb-4">Ready to Build the Next Generation of AI?</h2>
          <p className="hp-sub" style={{ margin: "0 auto 40px", color: "var(--text)" }}>
            Instant access to NVIDIA Blackwell B200 GPUs, U.S.-hosted, Supermicro-optimized, and built for scale.
          </p>

          <div className="cta-row">
            <Link href="/pricing" className="btn-launch">
              View Pricing
            </Link>
            <Link href="/contact?source=gpu-as-a-service&cta=talk_to_an_architect" className="btn-outline">
              Talk to an Architect
            </Link>
          </div>
        </div>
      </section>
    </div>
    </PageEffects>
  );
}








