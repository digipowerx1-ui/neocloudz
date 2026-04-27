import { useEffect, useRef } from "react";

interface WaveConfig {
  amp: number;
  fr: number;
  spd: number;
  col: string;
  lw: number;
  ph: number;
}

const WAVES: WaveConfig[] = [
  { amp: 28, fr: 0.008, spd: 1.0, col: "rgba(45,255,122,", lw: 1.5, ph: 0 },
  { amp: 16, fr: 0.014, spd: 1.7, col: "rgba(45,255,122,", lw: 0.8, ph: 2.1 },
  { amp: 38, fr: 0.005, spd: 0.65, col: "rgba(77,200,255,", lw: 1.0, ph: 4.3 },
  { amp: 12, fr: 0.02, spd: 2.2, col: "rgba(255,184,77,", lw: 0.6, ph: 1.0 },
];

export function useWaveformCanvas(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const animIdRef = useRef<number>(0);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let t = 0;

    function resize() {
      if (!c) return;
      W = c.width = c.offsetWidth;
      H = c.height = c.offsetHeight;
    }

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);
      t += 0.013;
      WAVES.forEach((w) => {
        [0.45, 0.08].forEach((alpha, gi) => {
          ctx.beginPath();
          for (let x = 0; x <= W; x += gi ? 4 : 2) {
            const y =
              H / 2 +
              Math.sin(x * w.fr + t * w.spd + w.ph) * w.amp +
              Math.sin(x * w.fr * 1.8 + t * w.spd * 0.55) * (w.amp * 0.35);
            if (x === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
          ctx.strokeStyle = w.col + alpha + ")";
          ctx.lineWidth = gi ? w.lw * 7 : w.lw;
          ctx.stroke();
        });
      });
      animIdRef.current = requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animIdRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [canvasRef]);
}
