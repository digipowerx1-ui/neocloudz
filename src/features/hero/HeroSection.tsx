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
          GPU Solutions. <span className="g">Built for AI.</span>
        </h1>

        <p className="hero-sub">
          From rapid prototyping to enterprise-scale LLM training &mdash;
          NeoCloudz delivers NVIDIA Blackwell B200 infrastructure
          with zero friction.
        </p>

        <div className="hero-terminal">
          <span className="term-prompt">neocloudz@b200 ~$&nbsp;</span>
          <span id="typing-text">{typingText}</span>
          <span className="term-cursor"></span>
        </div>

        <div className="hero-ctas">
          <a href="#solutions" className="btn btn-green btn-lg">
            Explore Solutions ↓
          </a>
          <a href="#pricing" className="btn btn-outline btn-lg">
            View Pricing
          </a>
        </div>

        <div className="hero-badges">
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
        </div>

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
