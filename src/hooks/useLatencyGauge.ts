import { useEffect, useRef } from "react";

function deg(d: number) {
  return (d * Math.PI) / 180;
}

export function useLatencyGauge(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const animIdRef = useRef<number>(0);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let needleAngle = Math.PI;
    let targetAngle = Math.PI;
    let animating = false;

    function setSize() {
      if (!c) return;
      W = c.width = c.offsetWidth;
      H = c.height = c.offsetHeight;
    }

    function draw() {
      if (!W || !H || !ctx) return;
      ctx.clearRect(0, 0, W, H);
      const cx = W / 2;
      const cy = H * 0.62;
      const r = Math.min(W, H) * 0.42;

      ctx.beginPath();
      ctx.arc(cx, cy, r, Math.PI, 0, false);
      ctx.strokeStyle = "rgba(255,255,255,0.05)";
      ctx.lineWidth = 28;
      ctx.lineCap = "butt";
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx, cy, r, Math.PI, Math.PI + deg(60), false);
      ctx.strokeStyle = "#2dff7a";
      ctx.lineWidth = 28;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx, cy, r, Math.PI + deg(60), Math.PI + deg(120), false);
      ctx.strokeStyle = "#ffb84d";
      ctx.lineWidth = 28;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx, cy, r, Math.PI + deg(120), 0, false);
      ctx.strokeStyle = "#ff4d55";
      ctx.lineWidth = 28;
      ctx.stroke();

      ctx.font = "600 10px JetBrains Mono, monospace";
      ctx.textAlign = "center";
      ctx.fillStyle = "#2dff7a";
      ctx.fillText("< 5ms", cx - r * 0.64, cy - r * 0.05);
      ctx.fillStyle = "#ffb84d";
      ctx.fillText("5-10ms", cx + 2, cy - r * 0.8);
      ctx.fillStyle = "#ff4d55";
      ctx.fillText("10ms+", cx + r * 0.64, cy - r * 0.05);

      for (let d = 0; d <= 180; d += 18) {
        const rad = Math.PI + deg(d);
        ctx.beginPath();
        ctx.moveTo(cx + (r - 20) * Math.cos(rad), cy + (r - 20) * Math.sin(rad));
        ctx.lineTo(cx + (r + 8) * Math.cos(rad), cy + (r + 8) * Math.sin(rad));
        ctx.strokeStyle = "rgba(255,255,255,0.14)";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      const nLen = r * 0.82;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + nLen * Math.cos(needleAngle), cy + nLen * Math.sin(needleAngle));
      ctx.strokeStyle = "#f0f5f0";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx, cy, 10, 0, Math.PI * 2);
      ctx.fillStyle = "#f0f5f0";
      ctx.fill();

      const msVal = (((needleAngle - Math.PI) / Math.PI) * 20).toFixed(1);
      ctx.font = "700 36px JetBrains Mono, monospace";
      ctx.fillStyle = "#2dff7a";
      ctx.textAlign = "center";
      ctx.fillText(msVal + "ms", cx, cy + r * 0.38);
      ctx.font = "500 12px Inter, sans-serif";
      ctx.fillStyle = "#4a5a4a";
      ctx.fillText("p99 inference latency", cx, cy + r * 0.54);
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
      animIdRef.current = requestAnimationFrame(animateNeedle);
    }

    setSize();
    draw();

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !animating) {
            animating = true;
            targetAngle = Math.PI + deg(43.2);
            animateNeedle();
          }
        });
      },
      { threshold: 0.4 }
    );

    obs.observe(c);
    window.addEventListener("resize", () => {
      setSize();
      draw();
    });

    return () => {
      cancelAnimationFrame(animIdRef.current);
      obs.disconnect();
    };
  }, [canvasRef]);
}
