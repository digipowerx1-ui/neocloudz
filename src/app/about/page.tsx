"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { Server, Zap, ShieldCheck, Droplet, Globe, Leaf, ArrowRight, CheckCircle2 } from "lucide-react";
import "../enterprise/enterprise.css";
import { useHomeParticleCanvas } from "@/features/home/canvases";

export default function AboutPage() {
  const particleCanvasRef = useRef<HTMLCanvasElement>(null);
  useHomeParticleCanvas(particleCanvasRef);
  return (
    <div className="enterprise-page">
      {/* Hero Section */}
      <section className="hero" id="hero">
        <canvas id="particle-canvas" ref={particleCanvasRef} />
        <div className="hero-grid" />
        <div className="hero-aurora">
          <div className="aurora-band" style={{ background: "rgba(45,255,122,0.4)", top: "15%", "--adur": "16s", "--adel": "0s" } as React.CSSProperties} />
          <div className="aurora-band" style={{ background: "rgba(77,200,255,0.3)", top: "45%", "--adur": "20s", "--adel": "5s" } as React.CSSProperties} />
          <div className="aurora-band" style={{ background: "rgba(45,255,122,0.25)", top: "70%", "--adur": "13s", "--adel": "9s" } as React.CSSProperties} />
        </div>

        {/* Abstract Floating Stats */}
        <div className="stat-badge" style={{ left: "5%", top: "34%", "--dur": "8s", "--del": "0s", "--rot": "-2deg" } as React.CSSProperties}>
          🌍 U.S.-Owned
        </div>
        <div className="stat-badge" style={{ right: "5%", top: "32%", "--dur": "9s", "--del": "1.8s", "--rot": "1.5deg" } as React.CSSProperties}>
          ⚡ 24/7 Clean Energy
        </div>

        <div className="hero-content">
          <div className="hero-terminal-line">
            <span style={{ color: "var(--green-dim)" }}>&gt;</span>
            <span id="hero-typed">about --vision "AI Infrastructure"</span>
            <span className="cursor">|</span>
          </div>

          <h1 className="hero-h1">
            Powering the Next Generation of
            <br />
            <strong className="g">AI Infrastructure.</strong>
          </h1>

          <p className="hero-sub" style={{ maxWidth: "700px" }}>
            NeoCloudz is the dedicated AI compute platform from DigiPowerX and U.S. Data Centers, purpose-built to deliver sustainable, high-performance GPU infrastructure for modern AI workloads. Our mission: to enable enterprises, researchers, and innovators to build and scale artificial intelligence responsibly, efficiently, and without barriers.
          </p>

          <div className="hero-cta">
            <Link href="/contact" className="btn-launch">
              Launch AI Instances →
            </Link>
            <Link href="/contact" className="btn-outline">
              Request Private Clusters
            </Link>
          </div>

          <div className="hero-live-strip mt-12">
            <div className="hlm">
              <span className="hlm-val">400G</span>
              <span className="hlm-lbl">InfiniBand</span>
            </div>
            <div className="hlm-div" />
            <div className="hlm">
              <span className="hlm-val">24/7</span>
              <span className="hlm-lbl">Monitoring</span>
            </div>
            <div className="hlm-div" />
            <div className="hlm">
              <span className="hlm-val">&gt;90<span style={{ fontSize: "12px" }}>%</span></span>
              <span className="hlm-lbl">Water Saved</span>
            </div>
            <div className="hlm-div" />
            <div className="hlm">
              <span className="hlm-val">&lt;1.3</span>
              <span className="hlm-lbl">PUE</span>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission Section - Redesigned as Technical Vision Console */}
      <section className="hp-section dark" style={{ padding: "140px 0" }}>
        <div className="section-inner" style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="mission-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }}>

            <div className="mission-vision">
              <div className="hp-label">OUR MISSION</div>
              <h2 className="hp-h2" style={{ textAlign: "left", marginBottom: "32px" }}>
                Democratizing <br />
                <span className="g">High-Performance AI.</span>
              </h2>

              <div className="vision-brief" style={{
                background: "rgba(255,255,255,0.02)",
                borderLeft: "2px solid var(--green)",
                padding: "24px 32px",
                marginBottom: "40px"
              }}>
                <p style={{ fontSize: "18px", color: "var(--white)", lineHeight: "1.6", margin: 0 }}>
                  NeoCloudz was founded to bridge the gap between foundation model complexity and infrastructure accessibility. We provide the raw compute power necessary to solve humanity's most complex challenges.
                </p>
              </div>

              <div className="vision-specs" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                <div className="vision-spec-item">
                  <div style={{ color: "var(--green)", fontFamily: "var(--font-mono)", fontSize: "10px", marginBottom: "8px" }}>OBJECTIVE_01</div>
                  <div style={{ color: "var(--white)", fontWeight: 600 }}>Zero-Barrier Scaling</div>
                </div>
                <div className="vision-spec-item">
                  <div style={{ color: "var(--blue)", fontFamily: "var(--font-mono)", fontSize: "10px", marginBottom: "8px" }}>OBJECTIVE_02</div>
                  <div style={{ color: "var(--white)", fontWeight: 600 }}>Ethical Infrastructure</div>
                </div>
                <div className="vision-spec-item">
                  <div style={{ color: "var(--amber)", fontFamily: "var(--font-mono)", fontSize: "10px", marginBottom: "8px" }}>OBJECTIVE_03</div>
                  <div style={{ color: "var(--white)", fontWeight: 600 }}>Full Transparency</div>
                </div>
                <div className="vision-spec-item">
                  <div style={{ color: "var(--green)", fontFamily: "var(--font-mono)", fontSize: "10px", marginBottom: "8px" }}>OBJECTIVE_04</div>
                  <div style={{ color: "var(--white)", fontWeight: 600 }}>Sustainable Compute</div>
                </div>
              </div>
            </div>

            <div className="mission-console" style={{
              background: "#050805",
              border: "1px solid rgba(45, 255, 122, 0.15)",
              borderRadius: "16px",
              padding: "40px",
              position: "relative",
              overflow: "hidden"
            }}>
              <div style={{ position: "absolute", top: 0, right: 0, padding: "12px 20px", background: "rgba(45, 255, 122, 0.1)", color: "var(--green)", fontSize: "10px", fontFamily: "var(--font-mono)", borderRadius: "0 0 0 12px" }}>
                DIRECTIVE_ACTIVE
              </div>

              <div className="console-text" style={{ fontFamily: "var(--font-mono)", fontSize: "14px", lineHeight: "1.8" }}>
                <p style={{ color: "var(--green-dim)", marginBottom: "24px" }}>[SYSTEM_BRIEF_START]</p>
                <p style={{ color: "var(--text)", marginBottom: "20px" }}>
                  Artificial intelligence is transforming every industry — but training and deploying next-generation models requires immense computational power.
                </p>
                <p style={{ color: "var(--text)", marginBottom: "20px" }}>
                  NeoCloudz combines cutting-edge <span style={{ color: "var(--green)" }}>NVIDIA Blackwell</span> infrastructure with U.S.-based facilities and renewable energy.
                </p>
                <p style={{ color: "var(--text)", marginBottom: "32px" }}>
                  Our Tier III, TIA-942 Rated 3 data centers deliver enterprise-grade performance, redundancy, and security — optimized for AI and HPC workloads.
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", color: "var(--green)" }}>
                  <span style={{ width: "8px", height: "8px", background: "var(--green)", borderRadius: "50%", boxShadow: "0 0 10px var(--green)" }}></span>
                  MISSION_CRITICAL_ESTABLISHED
                </div>
              </div>

              {/* Decorative scanline */}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(transparent 50%, rgba(0,0,0,0.1) 50%)", backgroundSize: "100% 4px", pointerEvents: "none", opacity: 0.3 }}></div>
            </div>

          </div>
        </div>
      </section>

      {/* Reliability & Infrastructure Section - Redesigned as Technical Architecture Grid */}
      <section className="hp-section mid" style={{ padding: "140px 0", background: "radial-gradient(circle at 50% -20%, rgba(45,255,122,0.05) 0%, transparent 50%)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "80px" }}>
            <div className="hp-label" style={{ justifyContent: "center" }}>RELIABILITY</div>
            <h2 className="hp-h2" style={{ fontSize: "clamp(32px, 4vw, 48px)" }}>
              Tier III <span className="g">Hardware Architecture.</span>
            </h2>
            <p className="hp-sub" style={{ margin: "0 auto" }}>
              Engineered from the ground up for massive scale, zero-latency training, and 99.99% operational continuity.
            </p>
          </div>

          <div className="architecture-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }}>

            {/* Power Infrastructure Module */}
            <div className="arch-card" style={{
              background: "linear-gradient(145deg, rgba(8,12,8,0.9) 0%, rgba(2,5,2,0.95) 100%)",
              border: "1px solid rgba(255,184,77,0.1)",
              borderRadius: "24px",
              padding: "48px",
              position: "relative",
              overflow: "hidden",
              transition: "all 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
              backdropFilter: "blur(10px)"
            }}>
              {/* Corner Accents */}
              <div style={{ position: "absolute", top: "20px", left: "20px", width: "12px", height: "12px", borderTop: "2px solid rgba(255,184,77,0.3)", borderLeft: "2px solid rgba(255,184,77,0.3)" }}></div>
              <div style={{ position: "absolute", bottom: "20px", right: "20px", width: "12px", height: "12px", borderBottom: "2px solid rgba(255,184,77,0.3)", borderRight: "2px solid rgba(255,184,77,0.3)" }}></div>

              {/* Radial Glow */}
              <div style={{ position: "absolute", top: "-10%", right: "-10%", width: "200px", height: "200px", background: "radial-gradient(circle, rgba(255,184,77,0.05) 0%, transparent 70%)", pointerEvents: "none" }}></div>

              <div style={{ marginBottom: "40px", position: "relative", zIndex: 2 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                  <div style={{ width: "8px", height: "2px", background: "var(--amber)" }}></div>
                  <div style={{ color: "var(--amber)", fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.2em", fontWeight: 700 }}>MODULE_01 // PW_CORE</div>
                </div>
                <h3 style={{ color: "var(--white)", fontSize: "28px", fontWeight: 800, letterSpacing: "-0.02em", margin: 0 }}>Clean Energy Core</h3>
              </div>

              <div style={{ marginBottom: "40px", position: "relative", zIndex: 2 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                  <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px", fontFamily: "var(--font-mono)" }}>SYSTEM_HEALTH</span>
                  <span style={{ color: "var(--amber)", fontSize: "11px", fontFamily: "var(--font-mono)" }}>NOMINAL 100%</span>
                </div>
                <div style={{ height: "6px", background: "rgba(255,255,255,0.03)", borderRadius: "100px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <div style={{ height: "100%", width: "100%", background: "linear-gradient(90deg, #b37e2d, #ffb84d)", boxShadow: "0 0 15px rgba(255,184,77,0.3)" }}></div>
                </div>
              </div>

              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "20px", position: "relative", zIndex: 2 }}>
                {[
                  "Vertically integrated clean energy sources",
                  "Redundant low-carbon natural gas generation",
                  "24/7 clean energy matching algorithms",
                  "Carbon-neutral compute optimized"
                ].map((item, idx) => (
                  <li key={idx} style={{ display: "flex", alignItems: "center", gap: "16px", fontSize: "15px", color: "rgba(200,212,200,0.5)", transition: "color 0.3s" }}>
                    <div style={{ width: "6px", height: "6px", border: "1px solid var(--amber)", transform: "rotate(45deg)" }}></div>
                    {item}
                  </li>
                ))}
              </ul>

              {/* Background Micro-Grid */}
              <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "20px 20px", pointerEvents: "none", opacity: 0.5 }}></div>
            </div>

            {/* Enterprise Reliability Module */}
            <div className="arch-card" style={{
              background: "linear-gradient(145deg, rgba(8,12,8,0.9) 0%, rgba(2,5,2,0.95) 100%)",
              border: "1px solid rgba(77,200,255,0.1)",
              borderRadius: "24px",
              padding: "48px",
              position: "relative",
              overflow: "hidden",
              transition: "all 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
              backdropFilter: "blur(10px)"
            }}>
              {/* Corner Accents */}
              <div style={{ position: "absolute", top: "20px", left: "20px", width: "12px", height: "12px", borderTop: "2px solid rgba(77,200,255,0.3)", borderLeft: "2px solid rgba(77,200,255,0.3)" }}></div>
              <div style={{ position: "absolute", bottom: "20px", right: "20px", width: "12px", height: "12px", borderBottom: "2px solid rgba(77,200,255,0.3)", borderRight: "2px solid rgba(77,200,255,0.3)" }}></div>

              {/* Radial Glow */}
              <div style={{ position: "absolute", top: "-10%", right: "-10%", width: "200px", height: "200px", background: "radial-gradient(circle, rgba(77,200,255,0.05) 0%, transparent 70%)", pointerEvents: "none" }}></div>

              <div style={{ marginBottom: "40px", position: "relative", zIndex: 2 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                  <div style={{ width: "8px", height: "2px", background: "var(--blue)" }}></div>
                  <div style={{ color: "var(--blue)", fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.2em", fontWeight: 700 }}>MODULE_02 // UP_PERSIST</div>
                </div>
                <h3 style={{ color: "var(--white)", fontSize: "28px", fontWeight: 800, letterSpacing: "-0.02em", margin: 0 }}>Enterprise Persistence</h3>
              </div>

              <div style={{ marginBottom: "40px", position: "relative", zIndex: 2 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                  <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px", fontFamily: "var(--font-mono)" }}>SYSTEM_AVAILABILITY</span>
                  <span style={{ color: "var(--blue)", fontSize: "11px", fontFamily: "var(--font-mono)" }}>99.99% ONLINE</span>
                </div>
                <div style={{ height: "6px", background: "rgba(255,255,255,0.03)", borderRadius: "100px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <div style={{ height: "100%", width: "99.99%", background: "linear-gradient(90deg, #3281a8, #4dc8ff)", boxShadow: "0 0 15px rgba(77,200,255,0.3)" }}></div>
                </div>
              </div>

              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "20px", position: "relative", zIndex: 2 }}>
                {[
                  "N+1 redundant power and cooling systems",
                  "400 Gbps InfiniBand RDMA networking",
                  "Private interconnects for enterprise security",
                  "TIA-942 Rated 3 facility certification"
                ].map((item, idx) => (
                  <li key={idx} style={{ display: "flex", alignItems: "center", gap: "16px", fontSize: "15px", color: "rgba(200,212,200,0.5)", transition: "color 0.3s" }}>
                    <div style={{ width: "6px", height: "6px", border: "1px solid var(--blue)", transform: "rotate(45deg)" }}></div>
                    {item}
                  </li>
                ))}
              </ul>

              {/* Background Micro-Grid */}
              <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "20px 20px", pointerEvents: "none", opacity: 0.5 }}></div>
            </div>

          </div>
        </div>
      </section>

      {/* Sustainability Section - Redesigned as Bio-Digital Monitoring Hub */}
      <section className="hp-section dark" style={{ padding: "140px 0", position: "relative" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center", marginBottom: "80px" }}>
            <div>
              <div className="hp-label">SUSTAINABILITY</div>
              <h2 className="hp-h2" style={{ textAlign: "left", marginBottom: "24px" }}>
                Bio-Digital <br />
                <span className="g">Optimization.</span>
              </h2>
              <p className="hp-sub" style={{ margin: 0, textAlign: "left" }}>
                We engineer our infrastructure to minimize ecological footprint while maximizing computational density. Every watt is accounted for in our zero-waste energy lifecycle.
              </p>
            </div>

            <div style={{ background: "rgba(45,255,122,0.02)", border: "1px solid rgba(45,255,122,0.1)", borderRadius: "24px", padding: "40px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }}>
              <div className="impact-stat">
                <div style={{ color: "var(--green)", fontFamily: "var(--font-mono)", fontSize: "28px", fontWeight: 800 }}>&lt;1.3</div>
                <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Target PUE</div>
              </div>
              <div className="impact-stat">
                <div style={{ color: "var(--blue)", fontFamily: "var(--font-mono)", fontSize: "28px", fontWeight: 800 }}>90%</div>
                <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Water Saved</div>
              </div>
              <div className="impact-stat">
                <div style={{ color: "var(--amber)", fontFamily: "var(--font-mono)", fontSize: "28px", fontWeight: 800 }}>24/7</div>
                <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Clean Energy</div>
              </div>
              <div className="impact-stat">
                <div style={{ color: "var(--green)", fontFamily: "var(--font-mono)", fontSize: "28px", fontWeight: 800 }}>NET_0</div>
                <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Carbon Goal</div>
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>

            {/* Card 01 */}
            <div className="eco-card" style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.05)",
              borderRadius: "20px",
              padding: "40px",
              transition: "all 0.4s ease",
              position: "relative",
              overflow: "hidden"
            }}>
              <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "2px", background: "linear-gradient(90deg, transparent, var(--green), transparent)" }}></div>
              <div style={{ marginBottom: "24px" }}>
                <Leaf size={32} color="var(--green)" />
              </div>
              <h3 style={{ color: "var(--white)", fontSize: "20px", marginBottom: "16px" }}>Energy Lifecycle</h3>
              <p style={{ color: "rgba(200,212,200,0.6)", fontSize: "14px", lineHeight: "1.6" }}>
                Utilizing a proprietary renewable and low-carbon energy mix sourced from DigiPowerX generation assets.
              </p>
            </div>

            {/* Card 02 */}
            <div className="eco-card" style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.05)",
              borderRadius: "20px",
              padding: "40px",
              transition: "all 0.4s ease",
              position: "relative",
              overflow: "hidden"
            }}>
              <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "2px", background: "linear-gradient(90deg, transparent, var(--blue), transparent)" }}></div>
              <div style={{ marginBottom: "24px" }}>
                <Droplet size={32} color="var(--blue)" />
              </div>
              <h3 style={{ color: "var(--white)", fontSize: "20px", marginBottom: "16px" }}>Thermal Dynamics</h3>
              <p style={{ color: "rgba(200,212,200,0.6)", fontSize: "14px", lineHeight: "1.6" }}>
                Advanced closed-loop cooling architectures that virtually eliminate water consumption in high-density clusters.
              </p>
            </div>

            {/* Card 03 */}
            <div className="eco-card" style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.05)",
              borderRadius: "20px",
              padding: "40px",
              transition: "all 0.4s ease",
              position: "relative",
              overflow: "hidden"
            }}>
              <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "2px", background: "linear-gradient(90deg, transparent, var(--amber), transparent)" }}></div>
              <div style={{ marginBottom: "24px" }}>
                <Globe size={32} color="var(--amber)" />
              </div>
              <h3 style={{ color: "var(--white)", fontSize: "20px", marginBottom: "16px" }}>Ethical Sourcing</h3>
              <p style={{ color: "rgba(200,212,200,0.6)", fontSize: "14px", lineHeight: "1.6" }}>
                Every facility is verified for environmental compliance and operates on 100% transparent carbon accounting.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section - Advanced Deployment Hub */}
      <section className="hp-section" style={{ 
        padding: "160px 0", 
        background: "#050805",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Animated Background Beams */}
        <div style={{ position: "absolute", top: 0, left: "20%", width: "1px", height: "100%", background: "linear-gradient(to bottom, transparent, var(--green), transparent)", opacity: 0.1, animation: "beamMove 8s infinite linear" }}></div>
        <div style={{ position: "absolute", top: 0, left: "80%", width: "1px", height: "100%", background: "linear-gradient(to bottom, transparent, var(--blue), transparent)", opacity: 0.1, animation: "beamMove 12s infinite linear reverse" }}></div>

        <div className="section-inner" style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 10 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "100px", alignItems: "center" }}>
            
            {/* Left: Action Center */}
            <div style={{ textAlign: "left" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: "rgba(45,255,122,0.1)", border: "1px solid rgba(45,255,122,0.2)", borderRadius: "4px", padding: "6px 14px", marginBottom: "32px" }}>
                <div style={{ width: "6px", height: "6px", background: "#2dff7a", borderRadius: "50%", animation: "pulse 2s infinite" }}></div>
                <span style={{ color: "var(--green)", fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em" }}>HUB_STATUS: STANDBY</span>
              </div>

              <h2 className="hp-h2" style={{ textAlign: "left", fontSize: "clamp(40px, 5vw, 64px)", lineHeight: 1, marginBottom: "40px" }}>
                Deploy at the <br />
                <span className="g">Speed of Thought.</span>
              </h2>

              <p style={{ color: "rgba(200,212,200,0.6)", fontSize: "18px", lineHeight: "1.6", marginBottom: "48px", maxWidth: "500px" }}>
                Join the elite teams building foundation models on the world's most efficient AI infrastructure. Zero waitlists, infinite scale.
              </p>

              <div className="hero-cta" style={{ justifyContent: "flex-start", marginBottom: "0" }}>
                <Link href="/contact" className="btn-launch" style={{ padding: "20px 48px", fontSize: "18px", borderRadius: "8px", boxShadow: "0 10px 30px rgba(45, 255, 122, 0.2)" }}>
                  Initialize Infrastructure
                  <ArrowRight size={20} />
                </Link>
              </div>
            </div>

            {/* Right: Deployment Log Terminal */}
            <div style={{ 
              background: "rgba(0,0,0,0.4)", 
              border: "1px solid rgba(255,255,255,0.08)", 
              borderRadius: "16px",
              padding: "32px",
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              color: "rgba(45,255,122,0.7)",
              position: "relative",
              height: "360px",
              display: "flex",
              flexDirection: "column",
              backdropFilter: "blur(12px)"
            }}>
              {/* Corner Accents */}
              <div style={{ position: "absolute", top: "12px", right: "12px", display: "flex", gap: "6px" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "rgba(255,255,255,0.1)" }}></div>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "rgba(255,255,255,0.1)" }}></div>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--green)", opacity: 0.5 }}></div>
              </div>

              <div style={{ marginBottom: "20px", color: "var(--white)", opacity: 0.3 }}>[DEPLOYMENT_LOG_FEED]</div>
              
              <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column", gap: "10px" }}>
                <div style={{ color: "var(--blue)" }}>&gt; Initializing Blackwell Cluster B_01...</div>
                <div style={{ color: "var(--green)" }}>&gt; Locating optimized US-EAST node...</div>
                <div style={{ color: "var(--white)", opacity: 0.5 }}>&gt; Thermal dynamics: NOMINAL [32°C]</div>
                <div style={{ color: "var(--amber)" }}>&gt; Net throughput: 800Gbps verified.</div>
                <div style={{ color: "var(--green)" }}>&gt; Security handshake complete (AES-256)</div>
                <div style={{ color: "var(--white)" }}>&gt; Cluster state: READY_FOR_TRAINING</div>
                <div className="cursor" style={{ width: "8px", height: "15px", background: "var(--green)", marginTop: "4px" }}></div>
              </div>

              <div style={{ marginTop: "20px", paddingTop: "20px", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "space-between" }}>
                <span>SEQ_ID: 9928-AX</span>
                <span style={{ color: "var(--blue)" }}>REGION: US_SOUTH_1</span>
              </div>
            </div>

          </div>
        </div>

        {/* CSS for animations */}
        <style jsx>{`
          @keyframes beamMove {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100%); }
          }
          @keyframes pulse {
            0% { opacity: 0.4; }
            50% { opacity: 1; }
            100% { opacity: 0.4; }
          }
        `}</style>
      </section>
    </div>
  );
}
