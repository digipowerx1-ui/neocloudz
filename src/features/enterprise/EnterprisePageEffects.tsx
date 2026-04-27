"use client";

import { useEffect, useRef } from "react";

const REVEAL_SELECTOR =
  ".ent-card,.testi-card,.sla-card,.hp-label,.hp-h2,.hp-sub,.reveal,.faq-item,.timeline-step";
const REVEAL_THRESHOLD = 0.1;
const REVEAL_STAGGER_MS = 55;

export default function EnterprisePageEffects({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = document.getElementById("scroll-bar");
    function handleScroll() {
      if (!bar) return;
      const max = document.body.scrollHeight - window.innerHeight;
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      bar.style.width = `${pct}%`;
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const elements = Array.from(
      root.querySelectorAll<HTMLElement>(REVEAL_SELECTOR),
    );
    elements.forEach((el) => {
      if (!el.classList.contains("reveal")) el.classList.add("reveal");
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, idx) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            window.setTimeout(() => target.classList.add("visible"), idx * REVEAL_STAGGER_MS);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: REVEAL_THRESHOLD },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const handler = (event: Event) => {
      const target = event.target as HTMLElement | null;
      const q = target?.closest<HTMLElement>(".faq-q");
      if (!q) return;
      const item = q.parentElement;
      if (!item) return;
      const wasOpen = item.classList.contains("open");
      root.querySelectorAll<HTMLElement>(".faq-item").forEach((i) => i.classList.remove("open"));
      if (!wasOpen) item.classList.add("open");
    };
    root.addEventListener("click", handler);
    return () => root.removeEventListener("click", handler);
  }, []);

  return (
    <div ref={containerRef} className="enterprise-page">
      <div id="scroll-bar" />
      {children}
    </div>
  );
}
