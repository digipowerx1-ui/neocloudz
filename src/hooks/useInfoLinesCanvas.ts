import { useEffect, useRef } from "react";

interface FlowLine {
  y: number;
  speed: number;
  amp: number;
  fr: number;
  ph: number;
  col: string;
}

const LINE_COUNT = 6;

function createLines(): FlowLine[] {
  const lines: FlowLine[] = [];
  for (let i = 0; i < LINE_COUNT; i++) {
    lines.push({
      y: Math.random(),
      speed: 0.00015 + Math.random() * 0.0002,
      amp: 60 + Math.random() * 80,
      fr: 0.005 + Math.random() * 0.008,
      ph: Math.random() * Math.PI * 2,
      col: Math.random() > 0.5 ? "rgba(45,255,122," : "rgba(77,200,255,",
    });
  }
  return lines;
}

export function useInfoLinesCanvas(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const animIdRef = useRef<number>(0);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let t = 0;
    const lines = createLines();

    function resize() {
      if (!c) return;
      W = c.width = c.offsetWidth;
      H = c.height = c.offsetHeight;
    }

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);
      t += 0.008;
      lines.forEach((ln) => {
        ctx.beginPath();
        for (let x = 0; x <= W; x += 3) {
          const y =
            ln.y * H + Math.sin(x * ln.fr + t * ln.speed * 200 + ln.ph) * ln.amp;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = ln.col + "0.06)";
        ctx.lineWidth = 1;
        ctx.stroke();
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
