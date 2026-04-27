"use client";

import { useRef } from "react";
import { useDcMapCanvas } from "@/hooks/useDcMapCanvas";

export default function ContactDcMapSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useDcMapCanvas(canvasRef);

  return (
    <div className="dc-section">
      <div className="dc-inner">
        <div className="dc-label">Global Infrastructure</div>
        <div className="dc-title">
          Your Cluster, <span>Anywhere.</span>
        </div>
        <div className="dc-sub">
          8 data center regions across 4 continents — pick the one closest to your
          team or your customers.
        </div>
        <div className="dc-canvas-wrap">
          <canvas ref={canvasRef} id="dc-canvas" />
        </div>
      </div>
    </div>
  );
}
