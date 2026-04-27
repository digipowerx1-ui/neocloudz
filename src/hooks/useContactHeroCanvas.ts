import { useEffect, useRef } from "react";

interface HeroParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  col: string;
  a: number;
}

const PARTICLE_COUNT = 80;
const CONNECT_DIST = 120;
const COLOR_GREEN = "45,255,122";
const COLOR_BLUE = "77,200,255";
const COLOR_AMBER = "255,184,77";

function pickColor(): string {
  const r = Math.random();
  if (r > 0.7) return COLOR_BLUE;
  if (r > 0.4) return COLOR_GREEN;
  return COLOR_AMBER;
}

function createParticle(W: number, H: number): HeroParticle {
  return {
    x: Math.random() * W,
    y: Math.random() * H,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    r: Math.random() * 1.6 + 0.4,
    col: pickColor(),
    a: Math.random() * 0.45 + 0.15,
  };
}

function tickParticle(p: HeroParticle, W: number, H: number) {
  p.x += p.vx;
  p.y += p.vy;
  if (p.x < 0) p.x = W;
  if (p.x > W) p.x = 0;
  if (p.y < 0) p.y = H;
  if (p.y > H) p.y = 0;
}

export function useContactHeroCanvas(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const animIdRef = useRef<number>(0);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    let W = 0;
    let H = 0;
    const pts: HeroParticle[] = [];

    function resize() {
      if (!c) return;
      W = c.width = c.offsetWidth;
      H = c.height = c.offsetHeight;
    }

    resize();
    for (let i = 0; i < PARTICLE_COUNT; i++) pts.push(createParticle(W, H));

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < CONNECT_DIST) {
            const a = (1 - d / CONNECT_DIST) * 0.18;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${pts[i].col},${a})`;
            ctx.lineWidth = 0.6;
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
        tickParticle(p, W, H);
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
