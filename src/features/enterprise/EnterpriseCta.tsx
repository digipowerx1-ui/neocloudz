"use client";

import { useRef } from "react";
import { useWaveformCanvas } from "@/hooks/useWaveformCanvas";

export default function EnterpriseCta() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useWaveformCanvas(canvasRef);

  return (
    <div className="cta-banner">
      <canvas ref={canvasRef} id="wave-canvas" />
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
      <h2>
        Ready to Go
        <br />
        <span>Enterprise?</span>
      </h2>
      <p>
        Join the teams running mission-critical AI on NeoCloudz dedicated
        infrastructure.
      </p>
      <div className="cta-row">
        <a href="/contact" className="btn-launch">
          Request Demo ▶
        </a>
        <a href="/contact" className="btn-outline">
          Talk to Sales →
        </a>
      </div>
    </div>
  );
}
