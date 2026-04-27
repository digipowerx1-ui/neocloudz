"use client";

import { useEffect, useRef } from "react";

const REVEAL_SELECTOR = ".reveal,.contact-card,.channel-card";
const REVEAL_THRESHOLD = 0.12;
const REVEAL_STAGGER_MS = 60;

export default function ContactPageEffects({ children }: { children: React.ReactNode }) {
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
    if (elements.length === 0) return;

    elements.forEach((el) => {
      if (!el.classList.contains("reveal")) el.classList.add("reveal");
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, idx) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            window.setTimeout(
              () => target.classList.add("visible"),
              idx * REVEAL_STAGGER_MS,
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: REVEAL_THRESHOLD },
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="contact-page">
      <div id="scroll-bar" />
      {children}
    </div>
  );
}
