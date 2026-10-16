"use client";

import { useRef } from "react";
import { useDcMapCanvas } from "@/hooks/useDcMapCanvas";

export default function ContactDcMapSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useDcMapCanvas(canvasRef);

  return (
    <div className="dc-section">
      <div className="dc-inner">
        <div className="dc-header">
          <div className="hp-label text-center">Global Infrastructure</div>
          <h2 className="dc-title">
            Your Cluster, <span>Anywhere.</span>
          </h2>
          <p className="dc-sub">
            8 data center regions across 4 continents
            <br className="dc-sub-break" />
            pick the one closest to your team or your customers.
          </p>
        </div>
        <div className="dc-canvas-wrap">
          <canvas ref={canvasRef} id="dc-canvas" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}


