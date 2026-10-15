"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
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
        paddingBottom: "72px",
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
            marginBottom: 0,
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
      </div>
    </section>
  );
}
