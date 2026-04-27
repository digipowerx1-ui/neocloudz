"use client";

import { useEffect, type RefObject } from "react";

/* Hero particle network — 90 nodes, 130px connection distance */
export function useHomeParticleCanvas(canvasRef: RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    let W = 0;
    let H = 0;
    const N = 90;
    const G = "45,255,122";
    const B = "77,200,255";

    interface Pt {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      col: string;
      a: number;
    }
    const pts: Pt[] = [];

    function reset(p: Pt) {
      p.x = Math.random() * W;
      p.y = Math.random() * H;
      p.vx = (Math.random() - 0.5) * 0.45;
      p.vy = (Math.random() - 0.5) * 0.45;
      p.r = Math.random() * 1.8 + 0.5;
      p.col = Math.random() > 0.7 ? B : G;
      p.a = Math.random() * 0.5 + 0.2;
    }

    function resize() {
      if (!c) return;
      W = c.width = c.offsetWidth;
      H = c.height = c.offsetHeight;
    }

    resize();
    for (let i = 0; i < N; i++) {
      const p: Pt = { x: 0, y: 0, vx: 0, vy: 0, r: 0, col: G, a: 0 };
      reset(p);
      pts.push(p);
    }

    let raf = 0;
    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 130) {
            const a = (1 - d / 130) * 0.2;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${pts[i].col},${a})`;
            ctx.lineWidth = 0.7;
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }
      pts.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.col},${p.a})`;
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
      });
      raf = requestAnimationFrame(draw);
    }

    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [canvasRef]);
}

/* NVLink interconnect — 8x2 GPU mesh with packet streams */
export function useNvlinkCanvas(canvasRef: RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const W = c.width;
    const H = c.height;
    const COLS = 8;
    const ROWS = 2;
    const GW = 64;
    const GH = 36;
    const GX = 88;
    const GY = 90;
    const sx = (W - (COLS * GW + (COLS - 1) * (GX - GW))) / 2;
    const sy = (H - (ROWS * GH + (ROWS - 1) * (GY - GH))) / 2;

    interface Node {
      x: number;
      y: number;
      gx: number;
      gy: number;
      lbl: string;
      on: boolean;
    }

    const nodes: Node[] = [];
    for (let r = 0; r < ROWS; r++) {
      for (let cc = 0; cc < COLS; cc++) {
        nodes.push({
          x: sx + cc * GX + GW / 2,
          y: sy + r * GY + GH / 2,
          gx: sx + cc * GX,
          gy: sy + r * GY,
          lbl: `G${String(r * COLS + cc).padStart(2, "0")}`,
          on: Math.random() > 0.12,
        });
      }
    }

    interface Pkt {
      a: number;
      b: number;
      t: number;
      spd: number;
      col: string;
      sz: number;
    }
    const colors = ["#2dff7a", "#4dc8ff", "#ffb84d"];
    const pkts: Pkt[] = [];
    for (let i = 0; i < 22; i++) {
      const a = Math.floor(Math.random() * nodes.length);
      let b = a;
      while (b === a) b = Math.floor(Math.random() * nodes.length);
      pkts.push({
        a,
        b,
        t: Math.random(),
        spd: 0.003 + Math.random() * 0.007,
        col: colors[Math.floor(Math.random() * 3)],
        sz: 2.5 + Math.random() * 2,
      });
    }

    let gv = 0;
    let gd = 1;

    function rr(x: number, y: number, w: number, h: number, rad: number) {
      if (!ctx) return;
      ctx.beginPath();
      ctx.moveTo(x + rad, y);
      ctx.lineTo(x + w - rad, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + rad);
      ctx.lineTo(x + w, y + h - rad);
      ctx.quadraticCurveTo(x + w, y + h, x + w - rad, y + h);
      ctx.lineTo(x + rad, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - rad);
      ctx.lineTo(x, y + rad);
      ctx.quadraticCurveTo(x, y, x + rad, y);
      ctx.closePath();
    }

    let raf = 0;
    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);
      gv += 0.01 * gd;
      if (gv > 1 || gv < 0) gd *= -1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d > 200) continue;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(45,255,122,${0.05 + 0.04 * gv})`;
          ctx.lineWidth = 0.8;
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
      pkts.forEach((p) => {
        p.t += p.spd;
        if (p.t >= 1) {
          p.t = 0;
          let b = p.a;
          while (b === p.a) b = Math.floor(Math.random() * nodes.length);
          p.b = b;
          p.col = colors[Math.floor(Math.random() * 3)];
        }
        const nx = nodes[p.a].x + (nodes[p.b].x - nodes[p.a].x) * p.t;
        const ny = nodes[p.a].y + (nodes[p.b].y - nodes[p.a].y) * p.t;
        ctx.beginPath();
        ctx.arc(nx, ny, p.sz * 2, 0, Math.PI * 2);
        ctx.fillStyle = p.col + "18";
        ctx.fill();
        ctx.beginPath();
        ctx.arc(nx, ny, p.sz, 0, Math.PI * 2);
        ctx.fillStyle = p.col;
        ctx.shadowColor = p.col;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      });
      nodes.forEach((n) => {
        const g = ctx.createLinearGradient(n.gx, n.gy, n.gx, n.gy + GH);
        g.addColorStop(0, n.on ? "rgba(45,255,122,.16)" : "rgba(20,26,20,.6)");
        g.addColorStop(1, "rgba(6,10,6,.9)");
        ctx.fillStyle = g;
        ctx.strokeStyle = n.on
          ? `rgba(45,255,122,${0.3 + 0.2 * gv})`
          : "rgba(255,255,255,.05)";
        ctx.lineWidth = 1;
        rr(n.gx, n.gy, GW, GH, 4);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = n.on
          ? `rgba(45,255,122,${0.65 + 0.3 * gv})`
          : "rgba(80,100,80,.4)";
        ctx.font = 'bold 9px "JetBrains Mono",monospace';
        ctx.textAlign = "center";
        ctx.fillText(n.lbl, n.x, n.y + 3);
        ctx.beginPath();
        ctx.arc(n.gx + GW - 7, n.gy + 7, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = n.on ? "#2dff7a" : "rgba(255,77,77,.8)";
        if (n.on) {
          ctx.shadowColor = "#2dff7a";
          ctx.shadowBlur = 7;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      });
      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => {
      cancelAnimationFrame(raf);
    };
  }, [canvasRef]);
}

/* CTA waveform canvas (4 sine layers) */
export function useHomeWaveCanvas(canvasRef: RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    let W = 0;
    let H = 0;
    let t = 0;
    const waves = [
      { amp: 30, fr: 0.008, spd: 1.0, col: "rgba(45,255,122,", lw: 1.5, ph: 0 },
      { amp: 18, fr: 0.014, spd: 1.7, col: "rgba(45,255,122,", lw: 0.8, ph: 2.1 },
      { amp: 42, fr: 0.005, spd: 0.65, col: "rgba(77,200,255,", lw: 1.0, ph: 4.3 },
      { amp: 14, fr: 0.02, spd: 2.2, col: "rgba(255,184,77,", lw: 0.6, ph: 1.0 },
    ];
    function resize() {
      if (!c) return;
      W = c.width = c.offsetWidth;
      H = c.height = c.offsetHeight;
    }
    let raf = 0;
    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);
      t += 0.013;
      waves.forEach((w) => {
        [0.45, 0.08].forEach((alpha, gi) => {
          ctx.beginPath();
          for (let x = 0; x <= W; x += gi ? 4 : 2) {
            const y =
              H / 2 +
              Math.sin(x * w.fr + t * w.spd + w.ph) * w.amp +
              Math.sin(x * w.fr * 1.8 + t * w.spd * 0.55) * (w.amp * 0.35);
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.strokeStyle = w.col + alpha + ")";
          ctx.lineWidth = gi ? w.lw * 7 : w.lw;
          ctx.stroke();
        });
      });
      raf = requestAnimationFrame(draw);
    }
    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [canvasRef]);
}

/* Pricing animated gradient mesh canvas */
export function usePricingMeshCanvas(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  sectionRef: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let W = 0;
    let H = 0;
    function setSize() {
      if (!canvas || !section) return;
      W = section.offsetWidth || 1400;
      H = section.offsetHeight || 700;
      canvas.width = W;
      canvas.height = H;
    }
    setSize();
    window.addEventListener("resize", setSize);
    let t = 0;
    const blobs = [
      { x: 0.15, y: 0.3, r: 380, color: "rgba(45,255,122,", speed: 0.0008, phase: 0 },
      { x: 0.85, y: 0.6, r: 420, color: "rgba(77,200,255,", speed: 0.0006, phase: 1.8 },
      { x: 0.5, y: 0.15, r: 300, color: "rgba(45,255,122,", speed: 0.001, phase: 3.5 },
    ];
    let raf = 0;
    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);
      blobs.forEach((b) => {
        const x = (b.x + Math.sin(t * b.speed + b.phase) * 0.08) * W;
        const y = (b.y + Math.cos(t * b.speed * 1.3 + b.phase) * 0.06) * H;
        const grad = ctx.createRadialGradient(x, y, 0, x, y, b.r);
        grad.addColorStop(0, b.color + "0.07)");
        grad.addColorStop(1, b.color + "0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, W, H);
      });
      ctx.strokeStyle = "rgba(45,255,122,0.025)";
      ctx.lineWidth = 1;
      const gs = 60;
      for (let x = 0; x < W; x += gs) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      for (let y = 0; y < H; y += gs) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }
      t++;
      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", setSize);
    };
  }, [canvasRef, sectionRef]);
}

/* Storage section data flow streams canvas */
export function useDataflowCanvas(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  sectionRef: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resize() {
      if (!canvas || !section) return;
      canvas.width = section.offsetWidth;
      canvas.height = section.offsetHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    interface Stream {
      y: number;
      x: number;
      speed: number;
      len: number;
      color: string;
      alpha: number;
    }
    const streams: Stream[] = Array.from({ length: 12 }, (_, i) => ({
      y: 40 + i * (section.offsetHeight / 12 || 50),
      x: Math.random() * canvas.width,
      speed: 1.5 + Math.random() * 3,
      len: 40 + Math.random() * 120,
      color: Math.random() > 0.5 ? "45,255,122" : "77,200,255",
      alpha: 0.15 + Math.random() * 0.35,
    }));

    let raf = 0;
    function draw() {
      if (!ctx || !canvas || !section) return;
      canvas.height = section.offsetHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      streams.forEach((s) => {
        const grad = ctx.createLinearGradient(s.x - s.len, s.y, s.x, s.y);
        grad.addColorStop(0, `rgba(${s.color},0)`);
        grad.addColorStop(0.6, `rgba(${s.color},${s.alpha})`);
        grad.addColorStop(1, `rgba(${s.color},0)`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(s.x - s.len, s.y);
        ctx.lineTo(s.x, s.y);
        ctx.stroke();
        s.x += s.speed;
        if (s.x - s.len > canvas.width) s.x = -s.len;
      });
      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [canvasRef, sectionRef]);
}
