import { useEffect } from "react";

const REVEAL_SELECTOR = ".reveal";
const THRESHOLD = 0.1;
const ROOT_MARGIN = "0px 0px -40px 0px";

export function useScrollReveal(containerRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const container = containerRef.current ?? document;
    const els = container.querySelectorAll<HTMLElement>(REVEAL_SELECTOR);
    if (els.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
          }
        });
      },
      { threshold: THRESHOLD, rootMargin: ROOT_MARGIN }
    );

    els.forEach((el) => obs.observe(el));

    return () => {
      els.forEach((el) => obs.unobserve(el));
    };
  }, [containerRef]);
}
