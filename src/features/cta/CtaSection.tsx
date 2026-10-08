"use client";

import { useRef } from "react";
import Link from "next/link";
import { useWaveformCanvas } from "@/hooks/useWaveformCanvas";

interface CtaSectionProps {
  source?: string;
}

export default function CtaSection({ source = "page" }: CtaSectionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useWaveformCanvas(canvasRef);

  return (
    <section className="cta-banner" id="cta">
      <canvas id="wave-canvas" ref={canvasRef} aria-hidden="true" />
      <div
        className="hp-label"
        style={{
          justifyContent: "center",
          marginBottom: "20px",
          position: "relative",
          zIndex: 2,
        }}
      >
        Get Started Today
      </div>
      <h2 className="cta-banner-h2" style={{ position: "relative", zIndex: 2 }}>
        The Fastest Path to<br />
        <span className="g">Blackwell Compute.</span>
      </h2>
      <p className="cta-banner-p" style={{ position: "relative", zIndex: 2 }}>
        Deploy a B200 in 60 seconds. Scale to a Grace Blackwell bare-metal cluster
        when you&apos;re ready. No sales calls required.
      </p>
      <div className="cta-row" style={{ position: "relative", zIndex: 2 }}>
        <Link
          href={`/contact?source=${source}&cta=contact_sales`}
          className="btn-launch"
          aria-label="Contact Sales to request Blackwell clusters"
        >
          Contact Sales
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </Link>
        <Link
          href={`/contact?source=${source}&cta=talk_to_sales`}
          className="btn-outline"
          aria-label="Talk to Sales regarding private clusters"
        >
          Talk to Sales
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </Link>
      </div>
    </section>
  );
}
