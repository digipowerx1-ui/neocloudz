import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  col: string;
  a: number;
  reset: () => void;
  tick: () => void;
}

const N = 90;
const G = "45,255,122";
const B = "77,200,255";
const CONNECT_DIST = 130;

function createParticle(W: number, H: number): Particle {
  const p: Partial<Particle> = {};
  p.reset = () => {
    p.x = Math.random() * W;
    p.y = Math.random() * H;
    p.vx = (Math.random() - 0.5) * 0.45;
    p.vy = (Math.random() - 0.5) * 0.45;
    p.r = Math.random() * 1.8 + 0.5;
    p.col = Math.random() > 0.7 ? B : G;
    p.a = Math.random() * 0.5 + 0.2;
  };
  p.tick = () => {
    p.x! += p.vx!;
    p.y! += p.vy!;
    if (p.x! < 0) p.x = W;
    if (p.x! > W) p.x = 0;
    if (p.y! < 0) p.y = H;
    if (p.y! > H) p.y = 0;
  };
  p.reset();
  return p as Particle;
}

export function useParticleCanvas(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const animIdRef = useRef<number>(0);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    let W = 0;
    let H = 0;
    const pts: Particle[] = [];

    function resize() {
      if (!c) return;
      W = c.width = c.offsetWidth;
      H = c.height = c.offsetHeight;
    }

    resize();
    for (let i = 0; i < N; i++) {
      pts.push(createParticle(W, H));
    }

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < CONNECT_DIST) {
            const a = (1 - d / CONNECT_DIST) * 0.2;
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
        p.tick();
      });
      animIdRef.current = requestAnimationFrame(draw);
    }

    draw();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animIdRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [canvasRef]);
}
