import { useEffect, useRef } from "react";

interface InfraNode {
  label: string;
  sub: string;
  icon: string;
}

interface Packet {
  seg: number;
  t: number;
  speed: number;
  col: string;
}

const NODES: InfraNode[] = [
  { label: "DigiPowerX", sub: "Energy-Optimized\nPower", icon: "⚡" },
  { label: "U.S. Data Center", sub: "Tier III / TIA-942\nRated 3", icon: "🏛️" },
  { label: "Supermicro", sub: "High-Density\nServers", icon: "🖥️" },
  { label: "NVIDIA B200", sub: "Blackwell\nGPU Cluster", icon: "🎮" },
  { label: "Your Workload", sub: "AI Training &\nInference", icon: "🚀" },
];

function roundRect(
  ct: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
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

export function useInfraCanvas(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const animIdRef = useRef<number>(0);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let animT = 0;

    const packets: Packet[] = [];
    for (let i = 0; i < 8; i++) {
      packets.push({
        seg: Math.floor(Math.random() * 4),
        t: Math.random(),
        speed: 0.003 + Math.random() * 0.003,
        col: Math.random() > 0.5 ? "45,255,122" : "77,200,255",
      });
    }

    function setSize() {
      if (!c) return;
      W = c.width = c.offsetWidth * window.devicePixelRatio;
      H = c.height = c.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      W = c.offsetWidth;
      H = c.offsetHeight;
    }

    function getNodePos(i: number) {
      const isMobile = W < 600;
      const pad = isMobile ? 40 : 80;
      const segW = (W - pad * 2) / (NODES.length - 1);
      return { x: pad + i * segW, y: H / 2 };
    }

    function draw() {
      if (!W || !H || !ctx) {
        animIdRef.current = requestAnimationFrame(draw);
        return;
      }
      ctx.clearRect(0, 0, W, H);
      animT += 0.016;

      const isMobile = W < 600;
      const nodeScale = isMobile ? Math.max(0.65, W / 600) : 1;
      const nW = 104 * nodeScale;
      const nH = 72 * nodeScale;
      const gap = nW / 2 + 2;

      ctx.setLineDash([6, 6]);
      ctx.lineDashOffset = -(animT * 18);
      for (let i = 0; i < NODES.length - 1; i++) {
        const a = getNodePos(i);
        const b = getNodePos(i + 1);
        ctx.beginPath();
        ctx.moveTo(a.x + gap, a.y);
        ctx.lineTo(b.x - gap, b.y);
        ctx.strokeStyle = "rgba(45,255,122,0.18)";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
      ctx.setLineDash([]);
      ctx.lineDashOffset = 0;

      NODES.forEach((n, i) => {
        const pos = getNodePos(i);

        const pr = (58 + Math.sin(animT * 1.8 + i * 1.2) * 6) * nodeScale;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, pr, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(45,255,122,0.07)";
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        roundRect(ctx, pos.x - nW / 2, pos.y - nH / 2, nW, nH, 10 * nodeScale);
        ctx.fillStyle = "rgba(15,20,16,0.96)";
        ctx.fill();
        ctx.strokeStyle = i === 3 ? "rgba(45,255,122,0.55)" : "rgba(45,255,122,0.22)";
        ctx.lineWidth = i === 3 ? 1.5 : 1;
        ctx.stroke();

        ctx.font = `${20 * nodeScale}px serif`;
        ctx.textAlign = "center";
        ctx.fillText(n.icon, pos.x, pos.y - (10 * nodeScale));

        ctx.font = `600 ${10 * nodeScale}px Inter, sans-serif`;
        ctx.fillStyle = "#f0f5f0";
        ctx.fillText(n.label, pos.x, pos.y + (7 * nodeScale));

        ctx.font = `${9 * nodeScale}px Inter, sans-serif`;
        ctx.fillStyle = "#4a5a4a";
        n.sub.split("\n").forEach((line, li) => {
          ctx.fillText(line, pos.x, pos.y + (18 * nodeScale) + li * (11 * nodeScale));
        });
      });

      packets.forEach((p) => {
        p.t += p.speed;
        if (p.t >= 1) {
          p.t = 0;
          p.seg = (p.seg + 1) % 4;
        }
        const a = getNodePos(p.seg);
        const b = getNodePos(p.seg + 1);
        const sx = a.x + gap;
        const ex = b.x - gap;
        const px = sx + (ex - sx) * p.t;
        const py = a.y;
        ctx.beginPath();
        ctx.arc(px, py, 9 * nodeScale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.col},0.12)`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(px, py, 4 * nodeScale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.col},0.92)`;
        ctx.fill();
      });

      animIdRef.current = requestAnimationFrame(draw);
    }

    setSize();
    draw();
    window.addEventListener("resize", setSize);

    return () => {
      cancelAnimationFrame(animIdRef.current);
      window.removeEventListener("resize", setSize);
    };
  }, [canvasRef]);
}
