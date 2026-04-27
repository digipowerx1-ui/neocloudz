import { useEffect, useRef } from "react";

const COUNT_SELECTOR = "[data-count],[data-countf]";
const THRESHOLD = 0.5;
const FRAME_MS = 16;
const COUNT_STEPS = 60;
const COUNTF_STEPS = 80;

export function useCountUp(containerRef: React.RefObject<HTMLElement | null>) {
  const timersRef = useRef<ReturnType<typeof setInterval>[]>([]);

  useEffect(() => {
    const container = containerRef.current ?? document;
    const stats = container.querySelectorAll<HTMLElement>(COUNT_SELECTOR);
    if (stats.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;

          if (el.dataset.count) {
            const target = parseInt(el.dataset.count, 10);
            const suffix = el.dataset.suffix || "";
            let cur = 0;
            const step = target / COUNT_STEPS;
            const iv = setInterval(() => {
              cur += step;
              if (cur >= target) {
                cur = target;
                clearInterval(iv);
              }
              el.textContent = Math.round(cur) + suffix;
            }, FRAME_MS);
            timersRef.current.push(iv);
          }

          if (el.dataset.countf) {
            const target = parseFloat(el.dataset.countf);
            const prefix = el.dataset.prefix || "";
            let cur = 1.0;
            const step = (target - 1.0) / COUNTF_STEPS;
            const iv = setInterval(() => {
              cur += step;
              if (cur >= target) {
                cur = target;
                clearInterval(iv);
              }
              el.textContent = prefix + cur.toFixed(2);
            }, FRAME_MS);
            timersRef.current.push(iv);
          }

          obs.unobserve(el);
        });
      },
      { threshold: THRESHOLD }
    );

    stats.forEach((s) => obs.observe(s));

    return () => {
      timersRef.current.forEach(clearInterval);
      timersRef.current = [];
      stats.forEach((s) => obs.unobserve(s));
    };
  }, [containerRef]);
}
