"use client";

import { useRef } from "react";
import { useInfraCanvas } from "@/hooks/useInfraCanvas";

export default function InfraSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useInfraCanvas(canvasRef);

  return (
    <section className="infra" id="infrastructure">
      <div className="section-inner">
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div className="section-label reveal" style={{ justifyContent: "center" }}>
            Infrastructure
          </div>
          <h2 className="section-title reveal" style={{ textAlign: "center" }}>
            Own-Stack Infrastructure. <span className="g">No Middlemen.</span>
          </h2>
          <p className="section-sub reveal" style={{ margin: "16px auto 0", textAlign: "center" }}>
            NeoCloudz is the dedicated AI cloud platform from DigiPowerX and
            US Data Centers. We own the power, the facility, the servers, and
            the GPUs &mdash; no hyperscaler reselling, no shared-tenancy surprises,
            no mystery hardware.
          </p>
        </div>
        <div className="infra-canvas-wrap reveal">
          <canvas id="infra-canvas" ref={canvasRef} aria-hidden="true"></canvas>
        </div>
      </div>
    </section>
  );
}
