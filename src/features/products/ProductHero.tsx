"use client";

import { useRef } from "react";
import Link from "next/link";
import { useParticleCanvas } from "@/hooks/useParticleCanvas";

export default function ProductHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useParticleCanvas(canvasRef);

  return (
    <section className="hero" style={{ minHeight: "80vh", paddingBottom: 0, position: "relative" }}>
      <canvas
        id="particle-canvas"
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />


      <div className="hero-grid" style={{ zIndex: 2 }}></div>
      <div className="aurora-1" style={{ zIndex: 2 }}></div>
      <div className="aurora-2" style={{ zIndex: 2 }}></div>
      <div className="aurora-3" style={{ zIndex: 2 }}></div>

      <div className="hero-content" style={{ position: "relative", zIndex: 10, textAlign: "center", maxWidth: 940, margin: "0 auto" }}>
        <div className="hero-tag" style={{ marginBottom: 28 }}>
          <span className="hero-tag-dot"></span>
          Products
        </div>
        <h1 style={{ fontSize: "clamp(32px, 4vw, 58px)", lineHeight: 1.05, letterSpacing: "-1.5px", marginBottom: 24 }}>
          Next-Generation AI Infrastructure,{" "}
          <span className="g">Delivered as a Service.</span>
        </h1>
        <p className="hero-sub" style={{ fontSize: "clamp(16px, 2.2vw, 20px)", color: "var(--text)", maxWidth: 680, margin: "0 auto 36px", lineHeight: 1.68 }}>
         From single GPU instances to enterprise clusters — NeoCloudz gives you the performance and control you need to build the future of AI..
        </p>
        <div className="hero-ctas" style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/contact?source=products&cta=request_private_cluster" className="btn btn-green btn-lg">
            Request Private Clusters ▶
          </Link>
          <Link href="/contact?source=products&cta=contact_sales" className="btn btn-outline btn-lg">
            Contact Sales →
          </Link>
        </div>
      </div>
    </section>
  );
}
