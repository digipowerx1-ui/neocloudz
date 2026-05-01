"use client";

import { useRef } from "react";
import { useParticleCanvas } from "@/hooks/useParticleCanvas";
import { useTypingTerminal } from "@/hooks/useTypingTerminal";
import { useLiveMetrics } from "@/hooks/useLiveMetrics";

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useParticleCanvas(canvasRef);
  const typingText = useTypingTerminal();
  const metrics = useLiveMetrics();

  return (
    <section className="hero">
      <canvas id="particle-canvas" ref={canvasRef}></canvas>
      <div className="hero-grid"></div>
      <div className="aurora-1"></div>
      <div className="aurora-2"></div>
      <div className="aurora-3"></div>

      <div className="hero-content">
        <div className="hero-tag">
          <span className="hero-tag-dot"></span>
          The Future of AI Compute Starts Here
        </div>

        <h1>
          Built for Every Stage of the <span className="g">AI Lifecycle.</span>
        </h1>

        <p className="hero-sub">
          From training frontier models to real-time inference and large-scale
          rendering — NeoCloudz delivers GPU infrastructure purpose-built for
          modern AI and HPC workloads.
        </p>

        {/* <div className="hero-terminal">
          <span className="term-prompt">neocloudz@b200 ~$&nbsp;</span>
          <span id="typing-text">{typingText}</span>
          <span className="term-cursor"></span>
        </div> */}

        <div className="hero-ctas">
          <a href="#solutions" className="btn btn-green btn-lg">
            Request private clusters
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a href="#pricing" className="btn btn-outline btn-lg">
            Launch instances
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* <div className="hero-badges">
          <span className="badge">
            <span className="badge-icon">🚀</span>&nbsp;B200 Blackwell
          </span>
          <span className="badge">
            <span className="badge-icon">⚡</span>&nbsp;&lt;5ms Latency
          </span>
          <span className="badge">
            <span className="badge-icon">🔗</span>&nbsp;400G InfiniBand
          </span>
          <span className="badge">
            <span className="badge-icon">🌿</span>&nbsp;&lt;1.3 PUE
          </span>
        </div> */}

        <div className="hero-metrics">
          <div className="metric-item">
            <span className="metric-val" id="m-jobs">
              {metrics.jobs}
            </span>
            <span className="metric-label">Active Jobs</span>
          </div>
          <div className="metric-item">
            <span className="metric-val" id="m-gpus">
              {metrics.gpus}
            </span>
            <span className="metric-label">GPUs Online</span>
          </div>
          <div className="metric-item">
            <span className="metric-val" id="m-lat">
              {metrics.lat}
            </span>
            <span className="metric-label">Avg Latency</span>
          </div>
          <div className="metric-item">
            <span className="metric-val" id="m-dc">
              {metrics.dc}
            </span>
            <span className="metric-label">Data Centers</span>
          </div>
          <div className="metric-item">
            <span className="metric-val" id="m-up">
              {metrics.up}
            </span>
            <span className="metric-label">Uptime</span>
          </div>
        </div>
      </div>
    </section>
  );
}
