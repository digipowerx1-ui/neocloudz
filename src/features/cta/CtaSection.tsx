"use client";

import { useRef } from "react";
import { useWaveformCanvas } from "@/hooks/useWaveformCanvas";

export default function CtaSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useWaveformCanvas(canvasRef);

  return (
    <section className="cta-banner" id="cta">
      <canvas id="wave-canvas" ref={canvasRef}></canvas>
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
          <a href="#" className="btn btn-green btn-lg">
            Launch AI Instance ▶
          </a>
          <a href="#" className="btn btn-outline btn-lg">
            Talk to Sales →
          </a>
        </div>
      </div>
    </section>
  );
}
