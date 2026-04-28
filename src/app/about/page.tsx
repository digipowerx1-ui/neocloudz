"use client";

import React from "react";
import Link from "next/link";
import { Server, Zap, ShieldCheck, Droplet, Globe, Leaf, ArrowRight, CheckCircle2 } from "lucide-react";
import "../enterprise/enterprise.css";

export default function AboutPage() {
  return (
    <div className="enterprise-page">
      {/* Hero Section */}
      <section className="hero" id="hero">
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
            <Link href="/contact-us" className="btn-launch">
              Launch AI Instances →
            </Link>
            <Link href="/contact-us" className="btn-outline">
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

      {/* Our Mission Section */}
      <section className="hp-section dark" style={{ paddingBottom: "40px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <div className="hp-label" style={{ justifyContent: "center" }}>OUR MISSION</div>
          <h2 className="hp-h2">
            Making Power <strong className="g">Accessible</strong>
          </h2>
          <p className="hp-sub" style={{ margin: "0 auto", fontSize: "18px", color: "var(--white)" }}>
            Artificial intelligence is transforming every industry — but training and deploying next-generation models requires immense computational power. NeoCloudz was founded to make that power accessible, transparent, and sustainable, combining cutting-edge NVIDIA Blackwell infrastructure and H200 GPUs with U.S.-based infrastructure and renewable energy.
          </p>
          <p className="hp-sub" style={{ margin: "32px auto 0", fontSize: "15px" }}>
            All NeoCloudz compute infrastructure is hosted within Tier III, TIA-942 Rated 3 data centers operated by U.S. Data Centers. These facilities deliver enterprise-grade performance, redundancy, and security — optimized for AI and HPC workloads.
          </p>
        </div>
      </section>

      {/* Reliability & Infrastructure Section */}
      <section className="hp-section mid">
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="hp-label">RELIABILITY</div>
          <h2 className="hp-h2">
            Rock-Solid <strong className="g">Infrastructure</strong>
          </h2>
          <p className="hp-sub">
            Engineered from the ground up for massive scale and continuous uptime.
          </p>

          <div className="ent-features-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}>
            <div className="ent-card">
              <div className="ent-icon">
                <Zap size={24} color="var(--amber)" />
              </div>
              <h3 className="ent-card-title">Power Infrastructure</h3>
              <p className="ent-card-desc mb-4" style={{ color: "var(--amber)", fontSize: "12px", fontFamily: "var(--font-mono)", textTransform: "uppercase" }}>
                Powered by DigiPowerX
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                {[
                  "Vertically integrated clean energy sources",
                  "Mix of renewable and low-carbon natural gas generation",
                  "Designed for 24/7 clean energy matching",
                  "Carbon-neutral compute ready"
                ].map((item, idx) => (
                  <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "14px", color: "var(--muted)", lineHeight: "1.5" }}>
                    <CheckCircle2 size={18} color="var(--green)" style={{ flexShrink: 0, marginTop: "2px" }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="ent-card">
              <div className="ent-icon">
                <ShieldCheck size={24} color="var(--blue)" />
              </div>
              <h3 className="ent-card-title">Ideal For Enterprise</h3>
              <p className="ent-card-desc mb-4" style={{ color: "var(--blue)", fontSize: "12px", fontFamily: "var(--font-mono)", textTransform: "uppercase" }}>
                Uncompromising Performance
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                {[
                  "< 1.3 Power Usage Effectiveness (PUE) for energy efficiency",
                  "N+1 redundant power and cooling systems",
                  "400 Gbps InfiniBand networking for distributed training",
                  "Private interconnects available for enterprise clients",
                  "24/7 monitoring and physical access control"
                ].map((item, idx) => (
                  <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "14px", color: "var(--muted)", lineHeight: "1.5" }}>
                    <CheckCircle2 size={18} color="var(--green)" style={{ flexShrink: 0, marginTop: "2px" }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="hp-section dark">
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="hp-label">SUSTAINABILITY</div>
          <h2 className="hp-h2">
            Sustainable Compute <br />
            <strong className="g">Without Compromise</strong>
          </h2>
          <p className="hp-sub">
            We believe that the future of artificial intelligence must be environmentally responsible. NeoCloudz infrastructure is engineered to minimize ecological impact while delivering maximum computing performance.
          </p>

          <div className="ent-features-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}>
            <div className="ent-card">
              <div className="ent-icon">
                <Leaf size={24} color="var(--green)" />
              </div>
              <h3 className="ent-card-title">Powered by DigiPowerX</h3>
              <p className="ent-card-desc">
                Utilizing a proprietary renewable and low-carbon energy mix.
              </p>
            </div>
            
            <div className="ent-card">
              <div className="ent-icon">
                <Globe size={24} color="var(--green)" />
              </div>
              <h3 className="ent-card-title">Carbon-Neutral Options</h3>
              <p className="ent-card-desc">
                Renewable energy credits and carbon-neutral compute options available.
              </p>
            </div>
            
            <div className="ent-card">
              <div className="ent-icon">
                <Droplet size={24} color="var(--blue)" />
              </div>
              <h3 className="ent-card-title">Water Conservation</h3>
              <p className="ent-card-desc">
                Advanced cooling systems reduce water use by over 90%.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="hp-section mid text-center" style={{ display: "flex", flexDirection: "column", alignItems: "center", borderBottom: "1px solid var(--border)" }}>
        <h2 className="hp-h2 mb-8">Build with the Power of NeoCloudz</h2>
        
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "24px", marginBottom: "48px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "30px", padding: "10px 24px" }}>
            <Zap size={16} color="var(--amber)" />
            <span style={{ color: "var(--white)", fontWeight: 600, fontSize: "14px" }}>No waitlists.</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "30px", padding: "10px 24px" }}>
            <Server size={16} color="var(--blue)" />
            <span style={{ color: "var(--white)", fontWeight: 600, fontSize: "14px" }}>No hardware limits.</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "30px", padding: "10px 24px" }}>
            <Globe size={16} color="var(--green)" />
            <span style={{ color: "var(--white)", fontWeight: 600, fontSize: "14px" }}>Just performance, transparency, and scale.</span>
          </div>
        </div>
        
        <div className="hero-cta" style={{ marginBottom: 0 }}>
          <Link href="/contact-us" className="btn-launch">
            Launch AI Instances
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
