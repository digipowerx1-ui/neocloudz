"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowDown, ArrowRight, Cpu, Layers, ShieldCheck, Zap } from "lucide-react";
import { useParticleCanvas } from "@/hooks/useParticleCanvas";

export default function ProductHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useParticleCanvas(canvasRef);

  return (
    <section
      className="hero"
      style={{
        minHeight: "auto",
        paddingTop: "140px",
        paddingBottom: "80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <canvas
        id="particle-canvas"
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      <div className="hero-grid" style={{ zIndex: 2 }} />
      <div className="aurora-1" style={{ zIndex: 2 }} />
      <div className="aurora-2" style={{ zIndex: 2 }} />
      <div className="aurora-3" style={{ zIndex: 2 }} />

      <div
        className="hero-content"
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          maxWidth: 1140,
          margin: "0 auto",
          padding: "0 20px",
        }}
      >
        {/* Top High-Tech Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "9px",
            padding: "6px 16px",
            borderRadius: "9999px",
            background: "rgba(45, 255, 122, 0.08)",
            border: "1px solid rgba(45, 255, 122, 0.3)",
            marginBottom: 24,
            backdropFilter: "blur(8px)",
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              backgroundColor: "var(--green)",
              boxShadow: "0 0 10px var(--green)",
              display: "inline-block",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.08em",
              color: "var(--green)",
              textTransform: "uppercase",
            }}
          >
            ENTERPRISE AI COMPUTE PLATFORM · NVIDIA BLACKWELL
          </span>
        </div>

        {/* Enhanced Headline */}
        <h1
          style={{
            fontSize: "clamp(34px, 4.4vw, 62px)",
            lineHeight: 1.08,
            letterSpacing: "-1.8px",
            marginBottom: 22,
            fontWeight: 800,
          }}
        >
          Next-Generation AI Compute,{" "}
          <br className="hero-br" />
          <span className="g">Engineered for Production Scale.</span>
        </h1>

        {/* Elevated Core Description */}
        <p
          className="hero-sub"
          style={{
            fontSize: "clamp(16px, 1.8vw, 19.5px)",
            color: "#b4c9b6",
            maxWidth: 780,
            margin: "0 auto 36px",
            lineHeight: 1.65,
            fontWeight: 400,
          }}
        >
          From dedicated NVIDIA Blackwell B200 clusters and managed inference (Token Factory)
          to turnkey AI Factories — NeoCloudz delivers 900 GB/s NVLink fabrics, 3.2 Tbps InfiniBand
          interconnects, and sustainable clean power to accelerate your models from training to global scale.
        </p>

        {/* Action CTAs */}
        <div
          className="hero-ctas"
          style={{
            display: "flex",
            gap: 14,
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: 52,
          }}
        >
          <a
            href="#catalog"
            className="btn btn-green btn-lg"
            aria-label="Explore Product Catalog"
            style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
          >
            Explore Product Catalog <ArrowDown size={16} aria-hidden="true" />
          </a>
          <Link
            href="/contact?source=products&cta=request_cluster"
            className="btn btn-outline btn-lg"
            aria-label="Request Private Clusters"
            style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
          >
            Deploy GPU Clusters <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <Link
            href="/contact?source=products&cta=talk_to_architects"
            className="btn btn-outline btn-lg"
            aria-label="Talk to Infrastructure Architects"
            style={{
              borderColor: "rgba(255, 255, 255, 0.15)",
              color: "rgba(255, 255, 255, 0.85)",
            }}
          >
            Talk to Architects
          </Link>
        </div>

        {/* Telemetry Spec Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
            gap: "14px",
            maxWidth: "1040px",
            margin: "0 auto 48px",
            width: "100%",
            textAlign: "left",
          }}
        >
          <div
            style={{
              background: "rgba(10, 18, 12, 0.7)",
              border: "1px solid rgba(45, 255, 122, 0.18)",
              borderRadius: "14px",
              padding: "18px 20px",
              backdropFilter: "blur(12px)",
              display: "flex",
              alignItems: "flex-start",
              gap: 14,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "10px",
                background: "rgba(45, 255, 122, 0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--green)",
                flexShrink: 0,
              }}
            >
              <Cpu size={19} />
            </div>
            <div>
              <div style={{ fontSize: "17px", fontWeight: 700, color: "var(--white)", letterSpacing: "-0.3px" }}>
                B200 &amp; B300
              </div>
              <div style={{ fontSize: "12.5px", color: "var(--muted)", marginTop: 2, lineHeight: 1.4 }}>
                NVIDIA Blackwell with 5th-gen Tensor Cores
              </div>
            </div>
          </div>

          <div
            style={{
              background: "rgba(10, 18, 12, 0.7)",
              border: "1px solid rgba(45, 255, 122, 0.18)",
              borderRadius: "14px",
              padding: "18px 20px",
              backdropFilter: "blur(12px)",
              display: "flex",
              alignItems: "flex-start",
              gap: 14,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "10px",
                background: "rgba(45, 255, 122, 0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--green)",
                flexShrink: 0,
              }}
            >
              <Zap size={19} />
            </div>
            <div>
              <div style={{ fontSize: "17px", fontWeight: 700, color: "var(--white)", letterSpacing: "-0.3px" }}>
                3.2 Tbit/s
              </div>
              <div style={{ fontSize: "12.5px", color: "var(--muted)", marginTop: 2, lineHeight: 1.4 }}>
                Non-blocking Quantum-2 InfiniBand Fabric
              </div>
            </div>
          </div>

          <div
            style={{
              background: "rgba(10, 18, 12, 0.7)",
              border: "1px solid rgba(45, 255, 122, 0.18)",
              borderRadius: "14px",
              padding: "18px 20px",
              backdropFilter: "blur(12px)",
              display: "flex",
              alignItems: "flex-start",
              gap: 14,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "10px",
                background: "rgba(45, 255, 122, 0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--green)",
                flexShrink: 0,
              }}
            >
              <Layers size={19} />
            </div>
            <div>
              <div style={{ fontSize: "17px", fontWeight: 700, color: "var(--white)", letterSpacing: "-0.3px" }}>
                900 GB/s
              </div>
              <div style={{ fontSize: "12.5px", color: "var(--muted)", marginTop: 2, lineHeight: 1.4 }}>
                Full-duplex NVLink chip-to-chip interconnect
              </div>
            </div>
          </div>

          <div
            style={{
              background: "rgba(10, 18, 12, 0.7)",
              border: "1px solid rgba(45, 255, 122, 0.18)",
              borderRadius: "14px",
              padding: "18px 20px",
              backdropFilter: "blur(12px)",
              display: "flex",
              alignItems: "flex-start",
              gap: 14,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "10px",
                background: "rgba(45, 255, 122, 0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--green)",
                flexShrink: 0,
              }}
            >
              <ShieldCheck size={19} />
            </div>
            <div>
              <div style={{ fontSize: "17px", fontWeight: 700, color: "var(--white)", letterSpacing: "-0.3px" }}>
                Sub-1.3 PUE
              </div>
              <div style={{ fontSize: "12.5px", color: "var(--muted)", marginTop: 2, lineHeight: 1.4 }}>
                DigiPowerX clean energy &amp; U.S. Tier III facilities
              </div>
            </div>
          </div>
        </div>

        {/* Visual Showcase Graphic Container */}
        <div
          style={{
            position: "relative",
            maxWidth: "1060px",
            margin: "0 auto",
            borderRadius: "22px",
            padding: "2px",
            background:
              "linear-gradient(180deg, rgba(45, 255, 122, 0.35) 0%, rgba(255, 255, 255, 0.08) 35%, rgba(10, 20, 14, 0.8) 100%)",
            boxShadow:
              "0 25px 80px rgba(0, 0, 0, 0.7), 0 0 50px rgba(45, 255, 122, 0.14)",
          }}
        >
          <div
            style={{
              position: "relative",
              borderRadius: "20px",
              overflow: "hidden",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              background: "#060d08",
            }}
          >
            <Image
              src="/product-hero.png"
              alt="NeoCloudz High-Performance AI Infrastructure Data Center"
              width={1060}
              height={580}
              priority
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "520px",
                objectFit: "cover",
                display: "block",
              }}
            />

            {/* Ambient Bottom Vignette */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, transparent 40%, rgba(5, 12, 7, 0.88) 100%)",
                pointerEvents: "none",
              }}
            />

            {/* Overlay Chips Bar */}
            <div
              style={{
                position: "absolute",
                bottom: "20px",
                left: "20px",
                right: "20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "12px",
                pointerEvents: "none",
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 16px",
                  borderRadius: "9999px",
                  background: "rgba(5, 14, 8, 0.88)",
                  backdropFilter: "blur(14px)",
                  border: "1px solid rgba(45, 255, 122, 0.4)",
                  color: "#d9ffd9",
                  fontSize: "13px",
                  fontWeight: 600,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.6)",
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    backgroundColor: "var(--green)",
                    boxShadow: "0 0 10px var(--green)",
                  }}
                />
                High-Density Multi-Rack Blackwell AI Fabric
              </div>

              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "8px 18px",
                  borderRadius: "9999px",
                  background: "rgba(5, 14, 8, 0.88)",
                  backdropFilter: "blur(14px)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  color: "rgba(255, 255, 255, 0.85)",
                  fontSize: "12.5px",
                  fontWeight: 500,
                }}
              >
                <span>TIA-942 Rated 3</span>
                <span>•</span>
                <span>SOC 2 Type I</span>
                <span>•</span>
                <span style={{ color: "var(--green)", fontWeight: 600 }}>Zero Waitlists</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

