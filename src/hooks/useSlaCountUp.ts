import { useEffect } from "react";

export interface SlaCountConfig {
  target: number;
  decimals: number;
  durationMs: number;
}

export const SLA_CARD_SELECTOR = ".sla-card";
export const SLA_PCT_SELECTOR = ".sla-pct";
export const SLA_FILL_SELECTOR = ".sla-resp-fill";

const FILL_DELAY_MS = 300;

export function useSlaCountUp(
  containerRef: React.RefObject<HTMLElement | null>,
  configs: ReadonlyArray<SlaCountConfig>,
) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll<HTMLElement>(SLA_CARD_SELECTOR);
    if (cards.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, cardIdx) => {
          if (!entry.isIntersecting) return;
          const cfg = configs[cardIdx];
          if (!cfg) return;

          const pctEl = entry.target.querySelector<HTMLElement>(SLA_PCT_SELECTOR);
          if (pctEl) {
            const start = performance.now();
            const tick = (now: number) => {
              const prog = Math.min((now - start) / cfg.durationMs, 1);
              const eased = 1 - Math.pow(1 - prog, 3);
              pctEl.textContent = (eased * cfg.target).toFixed(cfg.decimals) + "%";
              if (prog < 1) requestAnimationFrame(tick);
              else pctEl.textContent = cfg.target.toFixed(cfg.decimals) + "%";
            };
            requestAnimationFrame(tick);
          }

          const fill = entry.target.querySelector<HTMLElement>(SLA_FILL_SELECTOR);
          if (fill) {
            const width = parseInt(fill.getAttribute("data-width") ?? "50", 10);
            setTimeout(() => {
              fill.style.width = `${width}%`;
            }, FILL_DELAY_MS);
          }
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.4 },
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [containerRef, configs]);
}
