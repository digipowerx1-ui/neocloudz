import { useEffect, useRef } from "react";

interface ArchNode {
  label: string;
  sub: string;
  rx: number;
  ry: number;
}

interface ArchPacket {
  a: number;
  b: number;
  t: number;
  speed: number;
  col: string;
  sz: number;
}

const NODES: ReadonlyArray<ArchNode> = [
  { label: "Your VPC", sub: "Private Network", rx: 0.1, ry: 0.45 },
  { label: "NeoCloudz Fabric", sub: "InfiniBand 400G", rx: 0.36, ry: 0.45 },
  { label: "GPU Cluster", sub: "Dedicated B300×64", rx: 0.64, ry: 0.45 },
  { label: "WEKA Storage", sub: "<10μs · 1.4 TB/s", rx: 0.9, ry: 0.45 },
];

const CONNECTIONS: ReadonlyArray<readonly [number, number]> = [
  [0, 1],
  [1, 2],
  [2, 3],
];

const ICONS = ["🏢", "🔗", "⚡", "🗄️"];

function buildPackets(): ArchPacket[] {
  const packets: ArchPacket[] = [];
  CONNECTIONS.forEach(([a, b]) => {
    for (let i = 0; i < 4; i++) {
      packets.push({
        a,
        b,
        t: Math.random(),
        speed: 0.004 + Math.random() * 0.005,
        col: Math.random() > 0.5 ? "rgba(45,255,122,1)" : "rgba(77,200,255,1)",
        sz: 3 + Math.random() * 2,
      });
    }
  });
  return packets;
}

export function useEnterpriseArchCanvas(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const animIdRef = useRef<number>(0);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    let W = 0;
    let H = 0;
    const packets = buildPackets();
    const pulseT = NODES.map(() => Math.random() * Math.PI * 2);

    function setSize() {
      if (!c) return;
      W = c.width = c.offsetWidth;
      H = c.height = c.offsetHeight;
    }

    function projectNode(node: ArchNode): [number, number] {
      return [node.rx * W, node.ry * H];
    }

    function draw(ts: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);

      CONNECTIONS.forEach(([a, b]) => {
        const [ax, ay] = projectNode(NODES[a]);
        const [bx, by] = projectNode(NODES[b]);
        ctx.beginPath();
        ctx.strokeStyle = "rgba(45,255,122,0.14)";
        ctx.lineWidth = 2;
        ctx.setLineDash([10, 7]);
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      packets.forEach((p) => {
        p.t += p.speed;
        if (p.t >= 1) p.t = 0;
        const [ax, ay] = projectNode(NODES[p.a]);
        const [bx, by] = projectNode(NODES[p.b]);
        const nx = ax + (bx - ax) * p.t;
        const ny = ay + (by - ay) * p.t;
        ctx.beginPath();
        ctx.arc(nx, ny, p.sz * 2.4, 0, Math.PI * 2);
        ctx.fillStyle = p.col.replace(",1)", ",.12)");
        ctx.fill();
        ctx.beginPath();
        ctx.arc(nx, ny, p.sz, 0, Math.PI * 2);
        ctx.fillStyle = p.col;
        ctx.shadowColor = p.col;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      NODES.forEach((node, i) => {
        const [nx, ny] = projectNode(node);
        const phase = pulseT[i] + ts * 0.0009;
        const pf = 0.5 + 0.5 * Math.sin(phase);

        ctx.beginPath();
        ctx.arc(nx, ny, 38 + pf * 8, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(45,255,122,${0.06 + pf * 0.06})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        const grad = ctx.createRadialGradient(nx, ny, 0, nx, ny, 30);
        grad.addColorStop(0, "rgba(45,255,122,0.18)");
        grad.addColorStop(1, "rgba(10,20,10,0.9)");
        ctx.beginPath();
        ctx.arc(nx, ny, 30, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(nx, ny, 30, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(45,255,122,${0.35 + pf * 0.3})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.fillStyle = "rgba(45,255,122,0.8)";
        ctx.font = 'bold 13px "JetBrains Mono", monospace';
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(ICONS[i], nx, ny);

        ctx.fillStyle = "#f0f5f0";
        ctx.font = 'bold 12px "JetBrains Mono", monospace';
        ctx.textBaseline = "alphabetic";
        ctx.fillText(node.label, nx, ny + 52);
        ctx.fillStyle = "rgba(74,90,74,0.9)";
        ctx.font = '10px "JetBrains Mono", monospace';
        ctx.fillText(node.sub, nx, ny + 68);
      });

      animIdRef.current = requestAnimationFrame(draw);
    }

    setSize();
    animIdRef.current = requestAnimationFrame(draw);
    window.addEventListener("resize", setSize);

    return () => {
      cancelAnimationFrame(animIdRef.current);
      window.removeEventListener("resize", setSize);
    };
  }, [canvasRef]);
}
