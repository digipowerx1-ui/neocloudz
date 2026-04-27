"use client";

import { useRef } from "react";
import { useEnterpriseArchCanvas } from "@/hooks/useEnterpriseArchCanvas";

export default function EnterpriseArchitecture() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEnterpriseArchCanvas(canvasRef);

  return (
    <section className="arch-section" id="architecture">
      <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
        <div className="hp-label reveal" style={{ justifyContent: "center" }}>
          Network Architecture
        </div>
        <div className="hp-h2 reveal" style={{ textAlign: "center" }}>
          Zero-Trust Private Network.
          <br />
          <span className="g">Your Data Never Touches Shared Infrastructure.</span>
        </div>
      </div>
      <div className="arch-canvas-wrap">
        <canvas ref={canvasRef} id="arch-canvas" />
      </div>
      <p className="arch-caption">
        All inter-node traffic runs over your private InfiniBand fabric — no public
        internet, no shared routing.
      </p>
    </section>
  );
}
