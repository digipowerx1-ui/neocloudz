"use client";

import { useRef } from "react";
import { useWaveformCanvas } from "@/hooks/useWaveformCanvas";

export default function CtaSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useWaveformCanvas(canvasRef);

  return (
    <section className="cta-banner" id="cta">
      <canvas id="wave-canvas" ref={canvasRef} aria-hidden="true"></canvas>
      <div className="cta-content">
        <h2>
          Start Building on <span className="g">Blackwell.</span>
        </h2>
        <p>
          Join hundreds of AI teams running training, inference, and prototyping
          on NeoCloudz dedicated infrastructure. No commitments on entry plans.
          No legacy hardware. Just B200 performance from day one.
        </p>
        <div className="cta-btns">
          <a href="/contact" className="btn btn-green btn-lg" aria-label="Contact Sales to start building on Blackwell">
            Contact Sales
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="ml-2" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a href="/contact" className="btn btn-outline btn-lg" aria-label="Talk to Sales regarding cluster deployment">
            Talk to Sales
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="ml-2" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
