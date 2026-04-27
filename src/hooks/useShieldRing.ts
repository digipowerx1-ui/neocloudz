import { useEffect, useRef } from "react";

export function useShieldRing(ringRef: React.RefObject<SVGCircleElement | null>) {
  const animIdRef = useRef<number>(0);

  useEffect(() => {
    const ring = ringRef.current;
    if (!ring) return;

    let t = 0;

    function animate() {
      const target = ringRef.current;
      if (!target) return;
      t += 0.018;
      const p = 0.5 + 0.5 * Math.sin(t);
      target.setAttribute("stroke-opacity", (0.1 + p * 0.35).toFixed(3));
      target.setAttribute("r", (40 + p * 7).toFixed(1));
      animIdRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => cancelAnimationFrame(animIdRef.current);
  }, [ringRef]);
}
