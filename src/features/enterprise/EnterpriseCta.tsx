"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useWaveformCanvas } from "@/hooks/useWaveformCanvas";

export default function EnterpriseCta() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useWaveformCanvas(canvasRef);

  return (
    <div className="cta-banner">
      <canvas ref={canvasRef} id="wave-canvas" />
      <div className="cta-content">
        <div
          className="hp-label"
          style={{
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          Get Started Today
        </div>

        <h2>
          Ready to Go <br />
          <strong className="g">Enterprise?</strong>
        </h2>

        <p>
          Join the teams running mission-critical AI on NeoCloudz dedicated
          infrastructure.
        </p>

        <div className="cta-row">
          <Link href="/contact" className="btn-launch">
            Request Demo <ArrowRight size={18} />
          </Link>
          <Link href="/contact" className="btn-outline">
            Talk to Sales
          </Link>
        </div>
      </div>
    </div>
  );
}
