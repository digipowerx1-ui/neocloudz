"use client";

import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    /* ----------------------------------------------------------
       SCROLL PROGRESS BAR
       ---------------------------------------------------------- */
    const handleScroll = () => {
      const scrollBar = document.getElementById('scroll-bar');
      if (scrollBar) {
        const p = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        scrollBar.style.width = p + '%';
      }
    };
    window.addEventListener('scroll', handleScroll);

    /* ----------------------------------------------------------
       PARTICLE NETWORK CANVAS
       ---------------------------------------------------------- */
    (function () {
      const c = document.getElementById('particle-canvas') as HTMLCanvasElement;
      if (!c) return;
      const ctx = c.getContext('2d');
      if (!ctx) return;
      let W: number, H: number;
      const pts: any[] = [];
      const N = 90, G = '45,255,122', B = '77,200,255';
      let animId: number;

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

    /* ----------------------------------------------------------
       WAVEFORM CANVAS
       ---------------------------------------------------------- */
    (function () {
      const c = document.getElementById('wave-canvas') as HTMLCanvasElement;
      if (!c) return;
      const ctx = c.getContext('2d');
      if (!ctx) return;
      let W: number, H: number, t = 0;
      const waves = [
        { amp: 30, fr: .008, spd: 1.0, col: 'rgba(45,255,122,', lw: 1.5, ph: 0 },
        { amp: 18, fr: .014, spd: 1.7, col: 'rgba(45,255,122,', lw: .8, ph: 2.1 },
        { amp: 42, fr: .005, spd: .65, col: 'rgba(77,200,255,', lw: 1.0, ph: 4.3 },
        { amp: 14, fr: .020, spd: 2.2, col: 'rgba(255,184,77,', lw: .6, ph: 1.0 },
      ];

      function resize() {
        if (!c) return;
        W = c.width = c.offsetWidth;
        H = c.height = c.offsetHeight;
      }

      function draw() {
        if (!ctx) return;
        ctx.clearRect(0, 0, W, H);
        t += .013;
        waves.forEach(w => {
          [.45, .08].forEach((alpha, gi) => {
            ctx.beginPath();
            for (let x = 0; x <= W; x += gi ? 4 : 2) {
              const y = H / 2
                + Math.sin(x * w.fr + t * w.spd + w.ph) * w.amp
                + Math.sin(x * w.fr * 1.8 + t * w.spd * .55) * (w.amp * .35);
              x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
            }
            ctx.strokeStyle = w.col + alpha + ')';
            ctx.lineWidth = gi ? w.lw * 7 : w.lw;
            ctx.stroke();
          });
        });
        requestAnimationFrame(draw);
      }

      resize();
      draw();
      window.addEventListener('resize', resize);
    })();

    /* ----------------------------------------------------------
       INFRA CANVAS
       ---------------------------------------------------------- */
    (function () {
      const c = document.getElementById('infra-canvas') as HTMLCanvasElement;
      if (!c) return;
      const ctx = c.getContext('2d');
      if (!ctx) return;
      let W: number, H: number;

      const nodes = [
        { label: 'DigiPowerX', sub: 'Energy-Optimized\nPower', icon: '⚡' },
        { label: 'U.S. Data Center', sub: 'Tier III / TIA-942\nRated 3', icon: '🏛️' },
        { label: 'Supermicro', sub: 'High-Density\nServers', icon: '🖥️' },
        { label: 'NVIDIA B200', sub: 'Blackwell\nGPU Cluster', icon: '🎮' },
        { label: 'Your Workload', sub: 'AI Training &\nInference', icon: '🚀' }
      ];

      let packets: any[] = [];
      let animT = 0;

      function setSize() {
        if (!c) return;
        W = c.width = c.offsetWidth;
        H = c.height = c.offsetHeight;
      }

      function initPackets() {
        packets = [];
        for (let i = 0; i < 8; i++) {
          packets.push({
            seg: Math.floor(Math.random() * 4),
            t: Math.random(),
            speed: 0.003 + Math.random() * 0.003,
            col: Math.random() > 0.5 ? '45,255,122' : '77,200,255'
          });
        }
      }

      function getNodePos(i: number) {
        const pad = 80;
        const segW = (W - pad * 2) / (nodes.length - 1);
        return { x: pad + i * segW, y: H / 2 };
      }

      function roundRect(ct: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
        ct.moveTo(x + r, y);
        ct.lineTo(x + w - r, y);
        ct.quadraticCurveTo(x + w, y, x + w, y + r);
        ct.lineTo(x + w, y + h - r);
        ct.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        ct.lineTo(x + r, y + h);
        ct.quadraticCurveTo(x, y + h, x, y + h - r);
        ct.lineTo(x, y + r);
        ct.quadraticCurveTo(x, y, x + r, y);
      }

      function draw() {
        if (!W || !H || !ctx) { requestAnimationFrame(draw); return; }
        ctx.clearRect(0, 0, W, H);
        animT += 0.016;

        ctx.setLineDash([6, 6]);
        ctx.lineDashOffset = -(animT * 18);
        for (let i = 0; i < nodes.length - 1; i++) {
          const a = getNodePos(i);
          const b = getNodePos(i + 1);
          ctx.beginPath();
          ctx.moveTo(a.x + 54, a.y);
          ctx.lineTo(b.x - 54, b.y);
          ctx.strokeStyle = 'rgba(45,255,122,0.18)';
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
        ctx.setLineDash([]);
        ctx.lineDashOffset = 0;

        nodes.forEach((n, i) => {
          const pos = getNodePos(i);
          const nW = 104, nH = 72;

          const pr = 58 + Math.sin(animT * 1.8 + i * 1.2) * 6;
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, pr, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(45,255,122,0.07)';
          ctx.lineWidth = 1;
          ctx.stroke();

          ctx.beginPath();
          roundRect(ctx, pos.x - nW / 2, pos.y - nH / 2, nW, nH, 10);
          ctx.fillStyle = 'rgba(15,20,16,0.96)';
          ctx.fill();
          ctx.strokeStyle = i === 3
            ? 'rgba(45,255,122,0.55)'
            : 'rgba(45,255,122,0.22)';
          ctx.lineWidth = i === 3 ? 1.5 : 1;
          ctx.stroke();

          ctx.font = '20px serif';
          ctx.textAlign = 'center';
          ctx.fillText(n.icon, pos.x, pos.y - 10);

          ctx.font = '600 10px Inter, sans-serif';
          ctx.fillStyle = '#f0f5f0';
          ctx.fillText(n.label, pos.x, pos.y + 7);

          ctx.font = '9px Inter, sans-serif';
          ctx.fillStyle = '#4a5a4a';
          n.sub.split('\n').forEach((line, li) => {
            ctx.fillText(line, pos.x, pos.y + 18 + li * 11);
          });
        });

        packets.forEach(p => {
          p.t += p.speed;
          if (p.t >= 1) { p.t = 0; p.seg = (p.seg + 1) % 4; }
          const a = getNodePos(p.seg);
          const b = getNodePos(p.seg + 1);
          const sx = a.x + 54;
          const ex = b.x - 54;
          const px = sx + (ex - sx) * p.t;
          const py = a.y;
          ctx.beginPath();
          ctx.arc(px, py, 9, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.col},0.12)`;
          ctx.fill();
          ctx.beginPath();
          ctx.arc(px, py, 4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.col},0.92)`;
          ctx.fill();
        });

        requestAnimationFrame(draw);
      }

      setSize();
      initPackets();
      draw();
      window.addEventListener('resize', setSize);
    })();

    /* ----------------------------------------------------------
       LATENCY GAUGE CANVAS
       ---------------------------------------------------------- */
    (function () {
      const c = document.getElementById('latency-canvas') as HTMLCanvasElement;
      if (!c) return;
      const ctx = c.getContext('2d');
      if (!ctx) return;
      let W: number, H: number, needleAngle = Math.PI, targetAngle = Math.PI, animating = false;

      function setSize() {
        if (!c) return;
        W = c.width = c.offsetWidth;
        H = c.height = c.offsetHeight;
      }

      function deg(d: number) { return d * Math.PI / 180; }

      function draw() {
        if (!W || !H || !ctx) return;
        ctx.clearRect(0, 0, W, H);
        const cx = W / 2;
        const cy = H * 0.62;
        const r = Math.min(W, H) * 0.42;

        ctx.beginPath();
        ctx.arc(cx, cy, r, Math.PI, 0, false);
        ctx.strokeStyle = 'rgba(255,255,255,0.05)';
        ctx.lineWidth = 28;
        ctx.lineCap = 'butt';
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(cx, cy, r, Math.PI, Math.PI + deg(60), false);
        ctx.strokeStyle = '#2dff7a';
        ctx.lineWidth = 28;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(cx, cy, r, Math.PI + deg(60), Math.PI + deg(120), false);
        ctx.strokeStyle = '#ffb84d';
        ctx.lineWidth = 28;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(cx, cy, r, Math.PI + deg(120), 0, false);
        ctx.strokeStyle = '#ff4d55';
        ctx.lineWidth = 28;
        ctx.stroke();

        ctx.font = '600 10px JetBrains Mono, monospace';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#2dff7a';
        ctx.fillText('< 5ms', cx - r * 0.64, cy - r * 0.05);
        ctx.fillStyle = '#ffb84d';
        ctx.fillText('5-10ms', cx + 2, cy - r * 0.8);
        ctx.fillStyle = '#ff4d55';
        ctx.fillText('10ms+', cx + r * 0.64, cy - r * 0.05);

        for (let d = 0; d <= 180; d += 18) {
          const rad = Math.PI + deg(d);
          ctx.beginPath();
          ctx.moveTo(cx + (r - 20) * Math.cos(rad), cy + (r - 20) * Math.sin(rad));
          ctx.lineTo(cx + (r + 8) * Math.cos(rad), cy + (r + 8) * Math.sin(rad));
          ctx.strokeStyle = 'rgba(255,255,255,0.14)';
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        const nLen = r * 0.82;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(
          cx + nLen * Math.cos(needleAngle),
          cy + nLen * Math.sin(needleAngle)
        );
        ctx.strokeStyle = '#f0f5f0';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(cx, cy, 10, 0, Math.PI * 2);
        ctx.fillStyle = '#f0f5f0';
        ctx.fill();

        const msVal = ((needleAngle - Math.PI) / Math.PI * 20).toFixed(1);
        ctx.font = '700 36px JetBrains Mono, monospace';
        ctx.fillStyle = '#2dff7a';
        ctx.textAlign = 'center';
        ctx.fillText(msVal + 'ms', cx, cy + r * 0.38);
        ctx.font = '500 12px Inter, sans-serif';
        ctx.fillStyle = '#4a5a4a';
        ctx.fillText('p99 inference latency', cx, cy + r * 0.54);
      }

      function animateNeedle() {
        if (Math.abs(needleAngle - targetAngle) < 0.003) {
          needleAngle = targetAngle;
          animating = false;
          draw();
          return;
        }
        needleAngle += (targetAngle - needleAngle) * 0.04;
        draw();
        requestAnimationFrame(animateNeedle);
      }

      setSize();
      draw();

      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting && !animating) {
            animating = true;
            targetAngle = Math.PI + deg(43.2);
            animateNeedle();
          }
        });
      }, { threshold: 0.4 });

      obs.observe(c);
      window.addEventListener('resize', () => { setSize(); draw(); });
    })();

    /* ----------------------------------------------------------
       TRAINING TERMINAL STREAMER
       ---------------------------------------------------------- */
    (function () {
      const terminal = document.getElementById('train-terminal');
      if (!terminal) return;
      const lines = terminal.querySelectorAll('.term-line');
      let running = false;
      let streamTimeout: any;

      function runStream() {
        if (running) return;
        running = true;
        lines.forEach(l => l.classList.remove('show'));

        lines.forEach((line, i) => {
          setTimeout(() => { line.classList.add('show'); }, i * 100);
        });

        streamTimeout = setTimeout(() => {
          running = false;
          runStream();
        }, lines.length * 100 + 3000);
      }

      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            runStream();
            obs.unobserve(e.target);
          }
        });
      }, { threshold: 0.3 });

      obs.observe(terminal);
    })();

    /* ----------------------------------------------------------
       SCROLL REVEAL
       ---------------------------------------------------------- */
    (function () {
      const els = document.querySelectorAll('.reveal');
      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) e.target.classList.add('visible');
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
      els.forEach(el => obs.observe(el));
    })();

    /* ----------------------------------------------------------
       FAQ ACCORDION
       ---------------------------------------------------------- */
    (function () {
      const qs = document.querySelectorAll('.faq-q');
      const handleFaqClick = (e: Event) => {
        const q = e.currentTarget as HTMLElement;
        const item = q.closest('.faq-item');
        if (!item) return;
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
      };
      qs.forEach(q => q.addEventListener('click', handleFaqClick));
      return () => {
        qs.forEach(q => q.removeEventListener('click', handleFaqClick));
      };
    })();

    /* ----------------------------------------------------------
       COUNT-UP ANIMATION
       ---------------------------------------------------------- */
    (function () {
      const stats = document.querySelectorAll<HTMLElement>('[data-count],[data-countf]');
      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;

          if (el.dataset.count) {
            const target = parseInt(el.dataset.count, 10);
            const suffix = el.dataset.suffix || '';
            let cur = 0;
            const step = target / 60;
            const iv = setInterval(() => {
              cur += step;
              if (cur >= target) { cur = target; clearInterval(iv); }
              el.textContent = Math.round(cur) + suffix;
            }, 16);
          }

          if (el.dataset.countf) {
            const target = parseFloat(el.dataset.countf);
            const prefix = el.dataset.prefix || '';
            let cur = 1.0;
            const step = (target - 1.0) / 80;
            const iv = setInterval(() => {
              cur += step;
              if (cur >= target) { cur = target; clearInterval(iv); }
              el.textContent = prefix + cur.toFixed(2);
            }, 16);
          }

          obs.unobserve(el);
        });
      }, { threshold: 0.5 });

      stats.forEach(s => obs.observe(s));
    })();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(typeInterval);
      clearInterval(metricsInterval);
    };
  }, []);

  return (
    <>
      <div id="scroll-bar"></div>

      <nav>
        <div className="nav-inner">
          <a href="#" className="nav-logo">Neo<span>Cloudz</span></a>
          <div className="nav-links">
            <a href="#">Home</a>
            <a href="#" className="active">Solution</a>
            <a href="#">Products</a>
            <a href="#">Infrastructure</a>
            <a href="#">Pricing</a>
            <a href="#">About</a>
            <a href="#">Docs</a>
          </div>
          <div className="nav-actions">
            <a href="#" className="btn btn-outline btn-sm">Login</a>
            <a href="#" className="btn btn-green btn-sm">Get Started</a>
          </div>
        </div>
      </nav>

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

      <section className="solutions" id="solutions">
        <div className="section-inner">
          <div className="section-label reveal">// Solutions</div>
          <h2 className="section-title reveal">
            End-to-End AI <span className="g">Compute Pathways</span>
          </h2>
          <p className="section-sub reveal">
            Purpose-built infrastructure for every stage of the AI lifecycle —
            from first experiment to full production deployment at scale.
          </p>

          <div className="sol-card reveal" id="card-train" style={{ marginTop: '64px' }}>
            <div className="sol-info">
              <span className="sol-icon">🧠</span>
              <h3 className="sol-title">AI Training at Scale</h3>
              <p className="sol-desc">
                Harness the full power of NVIDIA Blackwell B200 GPUs connected via
                InfiniBand 400G fabric for distributed training that actually scales.
                Purpose-built clusters with Supermicro thermal-optimized hardware
                and WEKA NVMe storage ensure your training runs hit peak throughput —
                every time, at any node count.
              </p>
              <ul className="sol-features">
                <li>InfiniBand 400G-connected B200 GPU clusters for maximum
                    all-reduce performance across 128+ nodes</li>
                <li>Supermicro high-density server design with precision thermal
                    management and liquid cooling</li>
                <li>NVMe-backed WEKA storage enabling sub-second checkpoint
                    saving and instant resumption</li>
                <li>Auto-scaling multi-node clusters — from 1 to 128 nodes
                    via a single API call with zero reconfiguration</li>
              </ul>
            </div>
            <div className="sol-visual">
              <div className="term-window">
                <div className="term-bar">
                  <span className="term-dot term-dot-r"></span>
                  <span className="term-dot term-dot-y"></span>
                  <span className="term-dot term-dot-g"></span>
                  <span className="term-title">neocloudz — ai-training-job-01</span>
                </div>
                <div className="term-body" id="train-terminal">
                  <span className="term-line tl-cmd" data-line="0">$ neocloudz launch --gpus b200 --nodes 16 --job llm-train</span>
                  <span className="term-line tl-info" data-line="1">[INFO] Allocating 16x NVIDIA B200 across 2 racks...</span>
                  <span className="term-line tl-muted" data-line="2">[INFO] InfiniBand 400G fabric topology validated</span>
                  <span className="term-line tl-info" data-line="3">[INFO] Mounting WEKA NVMe volume at /mnt/checkpoints</span>
                  <span className="term-line tl-success" data-line="4">[OK]   Cluster ready — 16 nodes, 128 B200 GPUs total</span>
                  <span className="term-line tl-cmd" data-line="5">$ torchrun --nproc_per_node=8 --nnodes=16 train.py</span>
                  <span className="term-line tl-info" data-line="6">[NCCL] Initializing all-reduce ring over IB 400G...</span>
                  <span className="term-line tl-success" data-line="7">[NCCL] Ring initialized. Bandwidth: 398.4 GB/s</span>
                  <span className="term-line tl-info" data-line="8">[TRAIN] Epoch 1/50 — Step 100/5000 — Loss: 2.847</span>
                  <span className="term-line tl-info" data-line="9">[TRAIN] Epoch 1/50 — Step 200/5000 — Loss: 2.614</span>
                  <span className="term-line tl-warn" data-line="10">[CKPT]  Checkpoint saved → /mnt/checkpoints/step-200.pt</span>
                  <span className="term-line tl-success" data-line="11">[INFO] GPU Util: 97.4% | Throughput: 142 k tok/s</span>
                </div>
              </div>
            </div>
          </div>

          <div className="sol-card reverse reveal">
            <div className="sol-info">
              <span className="sol-icon">⚡</span>
              <h3 className="sol-title">Real-Time Inference</h3>
              <p className="sol-desc">
                Sub-5ms p99 latency for production inference workloads.
                Deploy your models on dedicated B200 GPU instances behind
                NeoCloudz&rsquo;s Kubernetes-native serving layer —
                complete with autoscaling, health checks, and real-time
                monitoring dashboards built in from day one.
              </p>
              <ul className="sol-features">
                <li>&lt;5ms p99 end-to-end inference latency measured on live
                    B200 hardware under production load</li>
                <li>Kubernetes-ready deployment with pre-built Helm charts,
                    device plugins, and HPA configs included</li>
                <li>Real-time monitoring and alerting via integrated
                    Prometheus + Grafana observability stack</li>
                <li>Auto-scaling inference endpoints — scale to zero when idle,
                    burst capacity available in under 60 seconds</li>
              </ul>
            </div>
            <div className="sol-visual">
              <div className="latency-wrap">
                <canvas id="latency-canvas"></canvas>
              </div>
            </div>
          </div>

          <div className="sol-card reveal">
            <div className="sol-info">
              <span className="sol-icon">🔬</span>
              <h3 className="sol-title">Rapid Prototyping</h3>
              <p className="sol-desc">
                Go from idea to running experiment in under 60 seconds.
                NeoCloudz JupyterLab environments come pre-configured with
                PyTorch, TensorFlow, CUDA, and all major AI libraries —
                no setup, no waiting, no DevOps overhead.
                One-click clone to replicate environments across your team instantly.
              </p>
              <ul className="sol-features">
                <li>Instant JupyterLab environments on B200 GPUs with
                    zero cold-start delay — login and start training immediately</li>
                <li>Pre-configured PyTorch, TensorFlow, JAX, and
                    HuggingFace Transformers environments included</li>
                <li>Secure dataset ingestion via S3-compatible API with
                    AES-256 encryption at rest and TLS 1.3 in transit</li>
                <li>One-click environment cloning — share exact GPU
                    compute environments with teammates in seconds</li>
              </ul>
            </div>
            <div className="sol-visual">
              <div className="term-window code-window">
                <div className="term-bar">
                  <span className="term-dot term-dot-r"></span>
                  <span className="term-dot term-dot-y"></span>
                  <span className="term-dot term-dot-g"></span>
                  <span className="term-title">prototype.ipynb — JupyterLab / NeoCloudz B200</span>
                </div>
                <div className="term-body">
                  <span style={{ display: 'block' }}><span className="code-cm"># NeoCloudz JupyterLab — B200 GPU Environment</span></span>
                  <span style={{ display: 'block' }}><span className="code-kw">import</span> <span className="code-fn">torch</span></span>
                  <span style={{ display: 'block' }}><span className="code-kw">from</span> <span className="code-fn">transformers</span> <span className="code-kw">import</span> <span className="code-cls">AutoModelForCausalLM</span>, <span className="code-cls">AutoTokenizer</span></span>
                  <span style={{ display: 'block' }}>&nbsp;</span>
                  <span style={{ display: 'block' }}><span className="code-cm"># Load from NeoCloudz model registry</span></span>
                  <span style={{ display: 'block' }}><span className="code-fn">model_id</span> = <span className="code-str">"meta-llama/Llama-3.1-70B-Instruct"</span></span>
                  <span style={{ display: 'block' }}><span className="code-fn">tokenizer</span> = <span className="code-cls">AutoTokenizer</span>.<span className="code-fn">from_pretrained</span>(<span className="code-fn">model_id</span>)</span>
                  <span style={{ display: 'block' }}><span className="code-fn">model</span> = <span className="code-cls">AutoModelForCausalLM</span>.<span className="code-fn">from_pretrained</span>(</span>
                  <span style={{ display: 'block' }}>&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-fn">model_id</span>,</span>
                  <span style={{ display: 'block' }}>&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-fn">torch_dtype</span>=<span className="code-fn">torch</span>.<span className="code-cls">bfloat16</span>,</span>
                  <span style={{ display: 'block' }}>&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-fn">device_map</span>=<span className="code-str">"auto"</span></span>
                  <span style={{ display: 'block' }}>)</span>
                  <span style={{ display: 'block' }}>&nbsp;</span>
                  <span style={{ display: 'block' }}><span className="code-cm"># Run inference — sub-5ms p99 on B200</span></span>
                  <span style={{ display: 'block' }}><span className="code-fn">inputs</span> = <span className="code-fn">tokenizer</span>(</span>
                  <span style={{ display: 'block' }}>&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-str">"Explain NVIDIA Blackwell B200 in one sentence:"</span>,</span>
                  <span style={{ display: 'block' }}>&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-fn">return_tensors</span>=<span className="code-str">"pt"</span></span>
                  <span style={{ display: 'block' }}>).<span className="code-fn">to</span>(<span className="code-str">"cuda"</span>)</span>
                  <span style={{ display: 'block' }}>&nbsp;</span>
                  <span style={{ display: 'block' }}><span className="code-fn">output</span> = <span className="code-fn">model</span>.<span className="code-fn">generate</span>(**<span className="code-fn">inputs</span>, <span className="code-fn">max_new_tokens</span>=<span className="code-num">128</span>)</span>
                  <span style={{ display: 'block' }}><span className="code-fn">print</span>(<span className="code-fn">tokenizer</span>.<span className="code-fn">decode</span>(<span className="code-fn">output</span>[<span className="code-num">0</span>], <span className="code-fn">skip_special_tokens</span>=<span className="code-cls">True</span>))</span>
                  <span style={{ display: 'block' }}>&nbsp;</span>
                  <span style={{ display: 'block' }}><span className="tl-success"># GPU: NVIDIA B200 | VRAM: 192 GB HBM3e | Latency: 4.1ms</span></span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <section className="products" id="products">
        <div className="section-inner">
          <div className="section-label reveal">// Products</div>
          <h2 className="section-title reveal">
            Three Products. <span className="g">One Platform.</span>
          </h2>
          <p className="section-sub reveal">
            Every NeoCloudz product is built on the same NVIDIA Blackwell B200
            foundation &mdash; differentiated by scale, automation, and control level.
          </p>

          <div className="products-grid">
            <div className="prod-card reveal reveal-delay-1">
              <div className="prod-icon-wrap">🏭</div>
              <div className="prod-name">AI Factory</div>
              <p className="prod-desc">
                Enterprise-grade LLM training and deployment. Build, fine-tune,
                and serve the world&rsquo;s largest models on dedicated multi-rack B200
                infrastructure with full SLA guarantees and managed MLOps tooling
                already integrated.
              </p>
              <a href="#" className="prod-link">Learn More →</a>
            </div>

            <div className="prod-card reveal reveal-delay-2">
              <div className="prod-icon-wrap">🎮</div>
              <div className="prod-name">GPU Service</div>
              <p className="prod-desc">
                On-demand NVIDIA Blackwell B200 GPUs. AI training, inference,
                and HPC workloads at any scale. Launch a single GPU or a
                256-node cluster — billed per second with no commitments
                or reservations required.
              </p>
              <a href="#" className="prod-link">Learn More →</a>
            </div>

            <div className="prod-card reveal reveal-delay-3">
              <div className="prod-icon-wrap">🤖</div>
              <div className="prod-name">ML Service</div>
              <p className="prod-desc">
                End-to-end managed ML services. From data prep to production —
                we handle the infrastructure, orchestration, and monitoring
                so your team can focus entirely on model development
                and business outcomes.
              </p>
              <a href="#" className="prod-link">Learn More →</a>
            </div>
          </div>
        </div>
      </section>

      <section className="why" id="why">
        <div className="section-inner">
          <div className="section-label reveal">// Why NeoCloudz</div>
          <h2 className="section-title reveal">
            Five Reasons <span className="g">Teams Choose Us</span>
          </h2>
          <p className="section-sub reveal">
            We built NeoCloudz because AI teams deserved better than repurposed
            cloud infrastructure with unpredictable pricing and shared hardware
            degrading your performance.
          </p>

          <div className="pillars">
            <div className="pillar reveal reveal-delay-1">
              <span className="pillar-icon">🚀</span>
              <div className="pillar-name">Peak Performance</div>
              <p className="pillar-desc">
                NVIDIA B200 Blackwell GPUs, InfiniBand 400G interconnect,
                and WEKA all-flash NVMe storage &mdash; the fastest
                AI compute stack available anywhere today.
              </p>
            </div>
            <div className="pillar reveal reveal-delay-2">
              <span className="pillar-icon">🏛️</span>
              <div className="pillar-name">Enterprise Reliability</div>
              <p className="pillar-desc">
                Tier III U.S. data centers with N+1 redundant power,
                precision cooling, and a 99.99% SLA backed by real
                support engineers, not chatbots.
              </p>
            </div>
            <div className="pillar reveal reveal-delay-3">
              <span className="pillar-icon">📈</span>
              <div className="pillar-name">Seamless Scaling</div>
              <p className="pillar-desc">
                Start with a single GPU. Scale to a multi-rack cluster
                in seconds. Same API, same tooling, same pricing model
                &mdash; no migration, no re-architecture required.
              </p>
            </div>
            <div className="pillar reveal reveal-delay-4">
              <span className="pillar-icon">🌿</span>
              <div className="pillar-name">Sustainable Power</div>
              <p className="pillar-desc">
                DigiPowerX energy-optimized power delivery keeps PUE
                below 1.3 &mdash; lower operational carbon footprint
                without compromising compute density or performance.
              </p>
            </div>
            <div className="pillar reveal reveal-delay-5">
              <span className="pillar-icon">🔓</span>
              <div className="pillar-name">Transparent Access</div>
              <p className="pillar-desc">
                Simple per-hour and monthly pricing. No hidden fees,
                no egress surprises, no legacy hardware buried
                in your cluster. What you see is exactly what you pay.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="partners" id="partners">
        <div className="partners-header">
          <div className="section-label reveal" style={{ textAlign: 'center' }}>// Technology Partners</div>
          <h2 className="section-title reveal" style={{ textAlign: 'center' }}>
            Powered by <span className="g">Industry Leaders</span>
          </h2>
          <p className="section-sub reveal" style={{ textAlign: 'center', margin: '0 auto' }}>
            Every component of the NeoCloudz stack is sourced from best-in-class
            partners &mdash; no compromises, no substitutions, no surprises.
          </p>
        </div>
        <div className="logo-track-wrap">
          <div className="logo-track">
            <span className="logo-pill"><span className="logo-pill-icon">🟢</span>NVIDIA &mdash; GPU Architecture</span>
            <span className="logo-pill"><span className="logo-pill-icon">🖥️</span>Supermicro &mdash; High-Density Servers</span>
            <span className="logo-pill"><span className="logo-pill-icon">⚡</span>DigiPowerX &mdash; Energy-Optimized Power</span>
            <span className="logo-pill"><span className="logo-pill-icon">🏅</span>TIA-942 Rated 3 / CERTAC</span>
            <span className="logo-pill"><span className="logo-pill-icon">💾</span>WEKA Storage &mdash; NVMe All-Flash</span>
            <span className="logo-pill"><span className="logo-pill-icon">🔗</span>InfiniBand 400G &mdash; RDMA Fabric</span>
            <span className="logo-pill"><span className="logo-pill-icon">🏢</span>US Data Centers &mdash; Tier III Facilities</span>
            <span className="logo-pill"><span className="logo-pill-icon">☸️</span>Kubernetes &mdash; Container Orchestration</span>
            
            <span className="logo-pill"><span className="logo-pill-icon">🟢</span>NVIDIA &mdash; GPU Architecture</span>
            <span className="logo-pill"><span className="logo-pill-icon">🖥️</span>Supermicro &mdash; High-Density Servers</span>
            <span className="logo-pill"><span className="logo-pill-icon">⚡</span>DigiPowerX &mdash; Energy-Optimized Power</span>
            <span className="logo-pill"><span className="logo-pill-icon">🏅</span>TIA-942 Rated 3 / CERTAC</span>
            <span className="logo-pill"><span className="logo-pill-icon">💾</span>WEKA Storage &mdash; NVMe All-Flash</span>
            <span className="logo-pill"><span className="logo-pill-icon">🔗</span>InfiniBand 400G &mdash; RDMA Fabric</span>
            <span className="logo-pill"><span className="logo-pill-icon">🏢</span>US Data Centers &mdash; Tier III Facilities</span>
            <span className="logo-pill"><span className="logo-pill-icon">☸️</span>Kubernetes &mdash; Container Orchestration</span>
          </div>
        </div>
      </section>

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
            <canvas id="infra-canvas"></canvas>
          </div>
        </div>
      </section>

      <section className="pricing" id="pricing">
        <div className="section-inner">
          <div className="section-label reveal">// Pricing</div>
          <h2 className="section-title reveal">
            Simple, Transparent <span className="g">GPU Pricing</span>
          </h2>
          <p className="section-sub reveal">
            No hidden fees. No surprise egress charges. No minimum commitments
            on entry plans. Pay for exactly what you use, billed per second.
          </p>

          <div className="pricing-grid">
            <div className="price-card reveal reveal-delay-1">
              <div className="price-tier">Starter</div>
              <div className="price-name">Pro Plus</div>
              <div className="price-amount">$0.99<small>/hr</small></div>
              <div className="price-quota">Up to 160 GPU hours/month</div>
              <p className="price-desc">
                Dual GPU access. Perfect for individual researchers and
                small experiments on Blackwell hardware.
              </p>
              <div className="price-divider"></div>
              <ul className="price-features">
                <li>On-demand NVIDIA B200 GPU</li>
                <li>JupyterLab included</li>
                <li>Community support forum</li>
                <li>Pay-as-you-go billing</li>
              </ul>
              <a href="#" className="btn btn-outline price-cta">Get Started</a>
            </div>

            <div className="price-card featured reveal reveal-delay-2">
              <div className="price-tier">Popular</div>
              <div className="price-name">Business</div>
              <div className="price-amount">$99<small>/mo</small></div>
              <div className="price-quota">500 GPU hours/month</div>
              <p className="price-desc">
                Multi-GPU clusters for growing teams.
                Priority queue access and dedicated storage included.
              </p>
              <div className="price-divider"></div>
              <ul className="price-features">
                <li>Priority queue access</li>
                <li>Multi-GPU cluster support</li>
                <li>Email support &lt;4hr SLA</li>
                <li>Dedicated storage volumes</li>
              </ul>
              <a href="#" className="btn btn-green price-cta">Get Started</a>
            </div>

            <div className="price-card reveal reveal-delay-3">
              <div className="price-tier">Power User</div>
              <div className="price-name">Professional</div>
              <div className="price-amount">$31.92<small>/hr</small></div>
              <div className="price-quota">Unlimited GPU hours</div>
              <p className="price-desc">
                Multi-GPU with custom model hosting.
                SLA 99.9% and phone support for serious workloads.
              </p>
              <div className="price-divider"></div>
              <ul className="price-features">
                <li>Custom model hosting</li>
                <li>Multi-GPU configurations</li>
                <li>Phone support</li>
                <li>99.9% uptime SLA</li>
              </ul>
              <a href="#" className="btn btn-outline price-cta">Get Started</a>
            </div>

            <div className="price-card reveal reveal-delay-4">
              <div className="price-tier">Enterprise</div>
              <div className="price-name">Enterprise</div>
              <div className="price-amount">$2,500<small>+/mo</small></div>
              <div className="price-quota">Dedicated infrastructure</div>
              <p className="price-desc">
                Bare metal dedicated clusters with 24/7 white-glove support,
                custom SLA, and compliance certifications.
              </p>
              <div className="price-divider"></div>
              <ul className="price-features">
                <li>Dedicated bare metal servers</li>
                <li>On-premise deployment options</li>
                <li>24/7 dedicated support line</li>
                <li>Dedicated account manager</li>
                <li>Custom SLA negotiation</li>
                <li>HIPAA / SOC2 compliance</li>
              </ul>
              <a href="#" className="btn btn-outline price-cta">Contact Sales</a>
            </div>
          </div>
        </div>
      </section>

      <section className="dc-stats" id="datacenter">
        <div className="section-inner">
          <div className="section-label reveal" style={{ textAlign: 'center' }}>// Data Centers</div>
          <h2 className="section-title reveal" style={{ textAlign: 'center' }}>
            Built to <span className="g">Last. Built to Scale.</span>
          </h2>
          <p className="section-sub reveal" style={{ textAlign: 'center', margin: '0 auto' }}>
            Every NeoCloudz facility meets the highest standards for
            availability, security, and power efficiency.
          </p>
          <div className="dc-grid">
            <div className="dc-stat reveal reveal-delay-1">
              <span className="dc-num" data-count="100" data-suffix="%">0%</span>
              <div className="dc-label">U.S.-Owned</div>
              <div className="dc-sub">100% domestically operated<br />infrastructure</div>
            </div>
            <div className="dc-stat reveal reveal-delay-2">
              <span className="dc-num">Tier III</span>
              <div className="dc-label">Data Center Certified</div>
              <div className="dc-sub">N+1 redundancy in both<br />power and cooling</div>
            </div>
            <div className="dc-stat reveal reveal-delay-3">
              <span className="dc-num" data-countf="1.28" data-prefix="<">1.0</span>
              <div className="dc-label">PUE Rating</div>
              <div className="dc-sub">DigiPowerX energy-optimized<br />facility design</div>
            </div>
            <div className="dc-stat reveal reveal-delay-4">
              <span className="dc-num">TIA-942</span>
              <div className="dc-label">Rated 3 Certified</div>
              <div className="dc-sub">CERTAC-validated<br />infrastructure design</div>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials" id="testimonials">
        <div className="section-inner">
          <div className="section-label reveal">// What Teams Say</div>
          <h2 className="section-title reveal">
            Trusted by <span className="g">AI Teams Worldwide</span>
          </h2>
          <p className="section-sub reveal">
            From research labs to Series C startups &mdash; teams that run on
            NeoCloudz don&rsquo;t go back to shared hyperscaler infrastructure.
          </p>

          <div className="testi-grid">
            <div className="testi-card reveal reveal-delay-1">
              <div className="testi-quote">&ldquo;</div>
              <p className="testi-text">
                We migrated our LLM fine-tuning pipeline from a major hyperscaler
                to NeoCloudz in a weekend. Training runs that used to take 14 hours
                now complete in under 6 — same dataset, same model architecture.
                The InfiniBand fabric makes all the difference for multi-node
                all-reduce operations at this scale.
              </p>
              <div className="testi-author">
                <div className="testi-avatar" style={{ background: 'linear-gradient(135deg,#2dff7a,#1aaa4e)' }}>SK</div>
                <div>
                  <div className="testi-name">Sarah K.</div>
                  <div className="testi-role">ML Engineer, Series B AI Startup</div>
                </div>
              </div>
            </div>

            <div className="testi-card reveal reveal-delay-2">
              <div className="testi-quote">&ldquo;</div>
              <p className="testi-text">
                Inference latency went from 38ms to 4.1ms p99 after deploying
                on NeoCloudz B200 instances. Our product team thought we&rsquo;d
                rewritten the model — we just moved the hardware.
                The Kubernetes-native deployment made the whole migration
                completely painless for our ops team.
              </p>
              <div className="testi-author">
                <div className="testi-avatar" style={{ background: 'linear-gradient(135deg,#4dc8ff,#1a7aaa)' }}>MR</div>
                <div>
                  <div className="testi-name">Marcus R.</div>
                  <div className="testi-role">CTO, AI-Powered SaaS Platform</div>
                </div>
              </div>
            </div>

            <div className="testi-card reveal reveal-delay-3">
              <div className="testi-quote">&ldquo;</div>
              <p className="testi-text">
                Prototyping a new architecture used to mean waiting days for a
                cluster reservation. On NeoCloudz I&rsquo;m running experiments in
                JupyterLab on a B200 within 60 seconds of login. The one-click
                environment cloning feature alone has saved our team dozens of
                engineering hours every single sprint.
              </p>
              <div className="testi-author">
                <div className="testi-avatar" style={{ background: 'linear-gradient(135deg,#ffb84d,#aa7a1a)' }}>JP</div>
                <div>
                  <div className="testi-name">Jenna P.</div>
                  <div className="testi-role">Research Scientist, AI Lab</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="faq" id="faq">
        <div className="section-inner">
          <div className="section-label reveal" style={{ textAlign: 'center' }}>// FAQ</div>
          <h2 className="section-title reveal" style={{ textAlign: 'center' }}>
            Common <span className="g">Questions</span>
          </h2>
          <p className="section-sub reveal" style={{ textAlign: 'center', margin: '0 auto' }}>
            Everything you need to know about NeoCloudz GPU solutions
            before you launch your first job.
          </p>

          <div className="faq-list">
            <div className="faq-item reveal">
              <div className="faq-q">
                What GPU hardware does NeoCloudz use?
                <span className="faq-q-icon">+</span>
              </div>
              <div className="faq-a">
                NeoCloudz runs exclusively on NVIDIA Blackwell B200 GPUs — the
                latest generation delivering up to 9&times; faster inference and
                3&times; more training performance than the previous H100 generation.
                All B200 nodes are interconnected via InfiniBand 400G fabric and
                paired with WEKA all-flash NVMe storage for maximum throughput.
                We do not mix GPU generations or use legacy hardware in any cluster.
              </div>
            </div>

            <div className="faq-item reveal">
              <div className="faq-q">
                How quickly can I start training?
                <span className="faq-q-icon">+</span>
              </div>
              <div className="faq-a">
                GPU instances are typically available within 60 seconds of your
                launch request for Pro Plus and Business tiers. For Professional
                and Enterprise multi-rack clusters, provisioning typically takes
                2&ndash;5 minutes depending on cluster size and current demand.
                JupyterLab environments are always ready instantly upon login —
                no provisioning wait required. Enterprise customers can reserve
                capacity windows in advance for zero-wait access.
              </div>
            </div>

            <div className="faq-item reveal">
              <div className="faq-q">
                What&rsquo;s the difference between GPU Service and AI Factory?
                <span className="faq-q-icon">+</span>
              </div>
              <div className="faq-a">
                GPU Service gives you raw on-demand access to NVIDIA B200 instances —
                you bring your own code, frameworks, and orchestration.
                AI Factory is an end-to-end managed platform for enterprise LLM
                training and deployment, including managed distributed training,
                model registry, serving infrastructure, and MLOps tooling.
                GPU Service is for teams who want full infrastructure control;
                AI Factory is for teams who want managed outcomes with less ops overhead.
              </div>
            </div>

            <div className="faq-item reveal">
              <div className="faq-q">
                Do you support Kubernetes for inference?
                <span className="faq-q-icon">+</span>
              </div>
              <div className="faq-a">
                Yes &mdash; NeoCloudz provides first-class Kubernetes support for
                inference deployments. We offer pre-built Helm charts, GPU device
                plugin integration, and horizontal pod autoscaling configs optimized
                for B200 workloads. Our managed Kubernetes option (Professional and
                Enterprise plans) handles cluster management entirely, so you focus
                on model deployment rather than infrastructure operations.
                We support standard Kubernetes manifests and are compatible with
                all major model serving frameworks including vLLM, TGI, and Triton.
              </div>
            </div>

            <div className="faq-item reveal">
              <div className="faq-q">
                How does NeoCloudz pricing compare to hyperscalers?
                <span className="faq-q-icon">+</span>
              </div>
              <div className="faq-a">
                NeoCloudz is typically 40&ndash;70% more cost-efficient than
                hyperscaler GPU instances for equivalent compute — because we own
                the hardware, the facility, and the power infrastructure directly.
                Hyperscalers amortize significant overhead (global sales, marketing,
                multi-tenant reservation systems, and egress fees) into their GPU pricing.
                Our per-second billing, zero egress fees on same-datacenter transfers,
                and no capacity reservation requirements make the actual total cost
                meaningfully lower for production AI workloads.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-banner" id="cta">
        <canvas id="wave-canvas"></canvas>
        <div className="cta-content">
          <h2>Start Building on <span className="g">Blackwell.</span></h2>
          <p>
            Join hundreds of AI teams running training, inference, and prototyping
            on NeoCloudz dedicated infrastructure. No commitments on entry plans.
            No legacy hardware. Just B200 performance from day one.
          </p>
          <div className="cta-btns">
            <a href="#" className="btn btn-green btn-lg">Launch AI Instance ▶</a>
            <a href="#" className="btn btn-outline btn-lg">Talk to Sales →</a>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-inner">
          <div className="footer-grid">
            <div>
              <div className="footer-brand-logo">Neo<span>Cloudz</span></div>
              <p className="footer-brand-desc">
                The dedicated AI cloud platform from DigiPowerX and US Data Centers.
                100% NVIDIA Blackwell B200. 100% U.S.-owned infrastructure.
                Built for the era of large-scale AI.
              </p>
              <div className="footer-socials">
                <a href="#" className="footer-social" title="X / Twitter">𝕏</a>
                <a href="#" className="footer-social" title="LinkedIn">in</a>
                <a href="#" className="footer-social" title="GitHub">gh</a>
                <a href="#" className="footer-social" title="YouTube">▶</a>
              </div>
            </div>

            <div>
              <div className="footer-col-title">Products</div>
              <ul className="footer-links">
                <li><a href="#">AI Factory</a></li>
                <li><a href="#">GPU Service</a></li>
                <li><a href="#">ML Service</a></li>
                <li><a href="#">JupyterLab</a></li>
                <li><a href="#">Model Registry</a></li>
                <li><a href="#">Inference API</a></li>
              </ul>
            </div>

            <div>
              <div className="footer-col-title">Solutions</div>
              <ul className="footer-links">
                <li><a href="#">AI Training at Scale</a></li>
                <li><a href="#">Real-Time Inference</a></li>
                <li><a href="#">Rapid Prototyping</a></li>
                <li><a href="#">HPC Workloads</a></li>
                <li><a href="#">Enterprise AI</a></li>
                <li><a href="#">Research Computing</a></li>
              </ul>
            </div>

            <div>
              <div className="footer-col-title">Company</div>
              <ul className="footer-links">
                <li><a href="#">About NeoCloudz</a></li>
                <li><a href="#">Infrastructure</a></li>
                <li><a href="#">Partners</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Press</a></li>
              </ul>
            </div>

            <div>
              <div className="footer-col-title">Resources</div>
              <ul className="footer-links">
                <li><a href="#">Documentation</a></li>
                <li><a href="#">API Reference</a></li>
                <li><a href="#">Status Page</a></li>
                <li><a href="#">Support Center</a></li>
                <li><a href="#">Pricing</a></li>
                <li><a href="#">Security</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-copy">
              &copy; 2025
              <a href="#">NeoCloudz</a> &mdash;
              A <a href="#">DigiPowerX</a> + <a href="#">US Data Centers</a>
              Company. All rights reserved.
              &nbsp;&middot;&nbsp;
              <a href="#">Privacy</a> &middot; <a href="#">Terms</a>
            </div>
            <div className="footer-status">
              <span className="status-dot"></span>
              All systems operational
            </div>
            <div className="footer-meta">v2.4.1 &middot; TIA-942 Rated 3 &middot; SOC2 Type II</div>
          </div>
        </div>
      </footer>
    </>
  );
}
