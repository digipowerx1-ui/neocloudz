"use client";

import { useRef } from "react";
import { useInfraCanvas } from "@/hooks/useInfraCanvas";

export default function InfraSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useInfraCanvas(canvasRef);

  return (
    <section className="infra" id="infrastructure">
      <div className="section-inner">
        <div className="section-label reveal">// Infrastructure</div>
        <h2 className="section-title reveal">
          Own-Stack Infrastructure. <span className="g">No Middlemen.</span>
        </h2>
        <p className="section-sub reveal">
          NeoCloudz is the dedicated AI cloud platform from DigiPowerX and
          US Data Centers. We own the power, the facility, the servers, and
          the GPUs &mdash; no hyperscaler reselling, no shared-tenancy surprises,
          no mystery hardware.
        </p>
        <div className="infra-canvas-wrap reveal">
          <canvas id="infra-canvas" ref={canvasRef}></canvas>
        </div>
      </div>
    </section>
  );
}
