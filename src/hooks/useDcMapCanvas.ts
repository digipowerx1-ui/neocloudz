import { useEffect, useRef } from "react";

interface DataCenter {
  rx: number;
  ry: number;
  label: string;
  sub: string;
}

interface MapPacket {
  a: number;
  b: number;
  t: number;
  speed: number;
  rev: boolean;
}

const DATA_CENTERS: DataCenter[] = [
  { rx: 0.14, ry: 0.38, label: "US West", sub: "San Jose, CA" },
  { rx: 0.22, ry: 0.35, label: "US East", sub: "Ashburn, VA" },
  { rx: 0.41, ry: 0.3, label: "EU West", sub: "London, UK" },
  { rx: 0.47, ry: 0.32, label: "EU Central", sub: "Frankfurt, DE" },
  { rx: 0.51, ry: 0.38, label: "EU North", sub: "Stockholm, SE" },
  { rx: 0.6, ry: 0.38, label: "ME", sub: "Dubai, UAE" },
  { rx: 0.73, ry: 0.44, label: "APAC", sub: "Singapore" },
  { rx: 0.82, ry: 0.36, label: "APAC East", sub: "Tokyo, JP" },
];

const CONNECTIONS: ReadonlyArray<readonly [number, number]> = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [2, 5],
  [5, 6],
  [6, 7],
  [1, 3],
  [0, 2],
  [6, 5],
];

function createPackets(): MapPacket[] {
  const packets: MapPacket[] = [];
  CONNECTIONS.forEach(([a, b]) => {
    for (let i = 0; i < 2; i++) {
      packets.push({
        a,
        b,
        t: Math.random(),
        speed: 0.003 + Math.random() * 0.004,
        rev: Math.random() > 0.5,
      });
    }
  });
  return packets;
}

export function useDcMapCanvas(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const animIdRef = useRef<number>(0);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let t = 0;
    const packets = createPackets();

    function resize() {
      if (!c) return;
      W = c.width = c.offsetWidth;
      H = c.height = c.offsetHeight;
    }

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);
      t += 0.008;

      ctx.strokeStyle = "rgba(45,255,122,0.04)";
      ctx.lineWidth = 1;
      for (let i = 0; i < 8; i++) {
        ctx.beginPath();
        ctx.moveTo(0, (H * i) / 7);
        ctx.lineTo(W, (H * i) / 7);
        ctx.stroke();
      }
      for (let i = 0; i < 14; i++) {
        ctx.beginPath();
        ctx.moveTo((W * i) / 13, 0);
        ctx.lineTo((W * i) / 13, H);
        ctx.stroke();
      }

      CONNECTIONS.forEach(([ai, bi]) => {
        const a = DATA_CENTERS[ai];
        const b = DATA_CENTERS[bi];
        const ax = a.rx * W;
        const ay = a.ry * H;
        const bx = b.rx * W;
        const by = b.ry * H;
        const midX = (ax + bx) / 2;
        const midY = Math.min(ay, by) - Math.abs(bx - ax) * 0.25;
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.quadraticCurveTo(midX, midY, bx, by);
        ctx.strokeStyle = "rgba(45,255,122,0.12)";
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      packets.forEach((p) => {
        p.t += p.speed * (p.rev ? -1 : 1);
        if (p.t >= 1) p.t = 0;
        if (p.t < 0) p.t = 1;
        const a = DATA_CENTERS[p.a];
        const b = DATA_CENTERS[p.b];
        const ax = a.rx * W;
        const ay = a.ry * H;
        const bx = b.rx * W;
        const by = b.ry * H;
        const midX = (ax + bx) / 2;
        const midY = Math.min(ay, by) - Math.abs(bx - ax) * 0.25;
        const tt = p.t;
        const nx = (1 - tt) * (1 - tt) * ax + 2 * (1 - tt) * tt * midX + tt * tt * bx;
        const ny = (1 - tt) * (1 - tt) * ay + 2 * (1 - tt) * tt * midY + tt * tt * by;
        ctx.beginPath();
        ctx.arc(nx, ny, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(45,255,122,0.9)";
        ctx.shadowColor = "rgba(45,255,122,1)";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      DATA_CENTERS.forEach((dc, i) => {
        const nx = dc.rx * W;
        const ny = dc.ry * H;
        const pulse = 0.5 + 0.5 * Math.sin(t * 1.8 + i * 0.9);

        ctx.beginPath();
        ctx.arc(nx, ny, 16 + pulse * 5, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(45,255,122,${0.06 + pulse * 0.08})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(nx, ny, 10, 0, Math.PI * 2);
        const grad = ctx.createRadialGradient(nx, ny, 0, nx, ny, 10);
        grad.addColorStop(0, "rgba(45,255,122,0.8)");
        grad.addColorStop(1, "rgba(45,255,122,0.15)");
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(nx, ny, 10, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(45,255,122,${0.5 + pulse * 0.3})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.fillStyle = "rgba(240,245,240,0.85)";
        ctx.font = 'bold 11px "JetBrains Mono", monospace';
        ctx.textAlign = "center";
        ctx.textBaseline = "alphabetic";
        ctx.fillText(dc.label, nx, ny + 26);
        ctx.fillStyle = "rgba(74,90,74,0.8)";
        ctx.font = '9px "JetBrains Mono", monospace';
        ctx.fillText(dc.sub, nx, ny + 38);
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
