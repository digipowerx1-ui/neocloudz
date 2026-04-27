"use client";

import { useEffect } from "react";

export default function Hero() {
  useEffect(() => {
    /* ----------------------------------------------------------
       PARTICLE NETWORK CANVAS
       ---------------------------------------------------------- */
    let animId: number;
    (function () {
      const c = document.getElementById('particle-canvas') as HTMLCanvasElement;
      if (!c) return;
      const ctx = c.getContext('2d');
      if (!ctx) return;
      let W: number, H: number;
      const pts: any[] = [];
      const N = 90, G = '45,255,122', B = '77,200,255';

      function resize() {
        if (!c) return;
        W = c.width = c.offsetWidth;
        H = c.height = c.offsetHeight;
      }

      function Pt(this: any) {
        this.reset = function () {
          this.x = Math.random() * W;
          this.y = Math.random() * H;
          this.vx = (Math.random() - .5) * .45;
          this.vy = (Math.random() - .5) * .45;
          this.r = Math.random() * 1.8 + .5;
          this.col = Math.random() > .7 ? B : G;
          this.a = Math.random() * .5 + .2;
        };
        this.reset();
        this.tick = function () {
          this.x += this.vx; this.y += this.vy;
          if (this.x < 0) this.x = W;
          if (this.x > W) this.x = 0;
          if (this.y < 0) this.y = H;
          if (this.y > H) this.y = 0;
        };
      }

      for (let i = 0; i < N; i++) {
        const p = new (Pt as any)();
        pts.push(p);
      }

      function draw() {
        if (!ctx) return;
        ctx.clearRect(0, 0, W, H);
        for (let i = 0; i < pts.length; i++) {
          for (let j = i + 1; j < pts.length; j++) {
            const dx = pts[i].x - pts[j].x;
            const dy = pts[i].y - pts[j].y;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < 130) {
              const a = (1 - d / 130) * .2;
              ctx.beginPath();
              ctx.strokeStyle = `rgba(${pts[i].col},${a})`;
              ctx.lineWidth = .7;
              ctx.moveTo(pts[i].x, pts[i].y);
              ctx.lineTo(pts[j].x, pts[j].y);
              ctx.stroke();
            }
          }
        }
        pts.forEach(p => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.col},${p.a})`;
          ctx.fill();
          p.tick();
        });
        animId = requestAnimationFrame(draw);
      }

      resize();
      draw();
      window.addEventListener('resize', resize);
    })();

    /* ----------------------------------------------------------
       TYPING TERMINAL
       ---------------------------------------------------------- */
    let typeInterval: any;
    (function () {
      const cmds = [
        'ai-training --gpus b200 --nodes 16',
        'inference --latency 5ms --scale auto',
        'prototype --env jupyter --framework pytorch',
        'enterprise --dedicated --sla 99.99'
      ];
      const el = document.getElementById('typing-text');
      if (!el) return;
      let ci = 0, ci2 = 0, typing = true, pause = 0;

      typeInterval = setInterval(() => {
        if (pause > 0) { pause--; return; }
        const cmd = cmds[ci];
        if (typing) {
          el.textContent = cmd.slice(0, ci2 + 1);
          ci2++;
          if (ci2 >= cmd.length) { typing = false; pause = 42; }
        } else {
          el.textContent = cmd.slice(0, ci2 - 1);
          ci2--;
          if (ci2 <= 0) { typing = true; ci = (ci + 1) % cmds.length; pause = 18; }
        }
      }, 45);
    })();

    /* ----------------------------------------------------------
       LIVE METRICS STRIP
       ---------------------------------------------------------- */
    let metricsInterval: any;
    (function () {
      const metrics = [
        { id: 'm-jobs', base: 2847, range: 130, fmt: (v: number) => Math.round(v).toLocaleString() },
        { id: 'm-gpus', base: 16384, range: 256, fmt: (v: number) => Math.round(v).toLocaleString() },
        { id: 'm-lat', base: 4.2, range: 0.9, fmt: (v: number) => v.toFixed(1) + 'ms' },
        { id: 'm-dc', base: 6, range: 0, fmt: (v: number) => String(Math.round(v)) },
        { id: 'm-up', base: 99.99, range: 0, fmt: (v: number) => v.toFixed(2) + '%' }
      ];
      metricsInterval = setInterval(() => {
        metrics.forEach(m => {
          const el = document.getElementById(m.id);
          if (!el) return;
          const val = m.base + (Math.random() - 0.5) * m.range;
          el.textContent = m.fmt(val);
        });
      }, 1800);
    })();

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(typeInterval);
      clearInterval(metricsInterval);
    };
  }, []);

  return (
    <>
      <section className="hero">
        <canvas id="particle-canvas"></canvas>
        <div className="hero-grid"></div>
        <div className="aurora-1"></div>
        <div className="aurora-2"></div>
        <div className="aurora-3"></div>

        <div className="hero-content">
          <div className="hero-tag">
            <span className="hero-tag-dot"></span>
            The Future of AI Compute Starts Here
          </div>

          <h1>GPU Solutions. <span className="g">Built for AI.</span></h1>

          <p className="hero-sub">
            From rapid prototyping to enterprise-scale LLM training &mdash;
            NeoCloudz delivers NVIDIA Blackwell B200 infrastructure
            with zero friction.
          </p>

          <div className="hero-terminal">
            <span className="term-prompt">neocloudz@b200 ~$&nbsp;</span>
            <span id="typing-text"></span><span className="term-cursor"></span>
          </div>

          <div className="hero-ctas">
            <a href="#solutions" className="btn btn-green btn-lg">Explore Solutions ↓</a>
            <a href="#pricing" className="btn btn-outline btn-lg">View Pricing</a>
          </div>

          <div className="hero-badges">
            <span className="badge"><span className="badge-icon">🚀</span>&nbsp;B200 Blackwell</span>
            <span className="badge"><span className="badge-icon">⚡</span>&nbsp;&lt;5ms Latency</span>
            <span className="badge"><span className="badge-icon">🔗</span>&nbsp;400G InfiniBand</span>
            <span className="badge"><span className="badge-icon">🌿</span>&nbsp;&lt;1.3 PUE</span>
          </div>

          <div className="hero-metrics">
            <div className="metric-item">
              <span className="metric-val" id="m-jobs">2,847</span>
              <span className="metric-label">Active Jobs</span>
            </div>
            <div className="metric-item">
              <span className="metric-val" id="m-gpus">16,384</span>
              <span className="metric-label">GPUs Online</span>
            </div>
            <div className="metric-item">
              <span className="metric-val" id="m-lat">4.2ms</span>
              <span className="metric-label">Avg Latency</span>
            </div>
            <div className="metric-item">
              <span className="metric-val" id="m-dc">6</span>
              <span className="metric-label">Data Centers</span>
            </div>
            <div className="metric-item">
              <span className="metric-val" id="m-up">99.99%</span>
              <span className="metric-label">Uptime</span>
            </div>
          </div>
        </div>
      </section>

      <div className="ticker">
        <div className="ticker-track">
          <span className="ticker-item hi">NVIDIA Blackwell B200</span>
          <span className="ticker-item">AI Factory</span>
          <span className="ticker-item">GPU Service</span>
          <span className="ticker-item">ML Service</span>
          <span className="ticker-item hi">InfiniBand 400G</span>
          <span className="ticker-item">&lt;5ms Inference</span>
          <span className="ticker-item">JupyterLab Ready</span>
          <span className="ticker-item hi">TIA-942 Tier III</span>
          <span className="ticker-item">DigiPowerX Power</span>
          <span className="ticker-item">WEKA Storage</span>
          <span className="ticker-item hi">99.99% SLA</span>
          <span className="ticker-item">U.S. Data Centers</span>
          <span className="ticker-item">Supermicro Servers</span>
          <span className="ticker-item hi">CERTAC Certified</span>
          <span className="ticker-item">Kubernetes-Native</span>
          
          <span className="ticker-item hi">NVIDIA Blackwell B200</span>
          <span className="ticker-item">AI Factory</span>
          <span className="ticker-item">GPU Service</span>
          <span className="ticker-item">ML Service</span>
          <span className="ticker-item hi">InfiniBand 400G</span>
          <span className="ticker-item">&lt;5ms Inference</span>
          <span className="ticker-item">JupyterLab Ready</span>
          <span className="ticker-item hi">TIA-942 Tier III</span>
          <span className="ticker-item">DigiPowerX Power</span>
          <span className="ticker-item">WEKA Storage</span>
          <span className="ticker-item hi">99.99% SLA</span>
          <span className="ticker-item">U.S. Data Centers</span>
          <span className="ticker-item">Supermicro Servers</span>
          <span className="ticker-item hi">CERTAC Certified</span>
          <span className="ticker-item">Kubernetes-Native</span>
        </div>
      </div>
    </>
  );
}
