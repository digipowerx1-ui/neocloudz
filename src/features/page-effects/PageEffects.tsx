"use client";

import { useRef } from "react";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useCountUp } from "@/hooks/useCountUp";
import { useFaqAccordion } from "@/hooks/useFaqAccordion";

export default function PageEffects({
  children,
}: {
  children: React.ReactNode;
}) {
  const progress = useScrollProgress();
  const containerRef = useRef<HTMLDivElement>(null);

  useScrollReveal(containerRef);
  useCountUp(containerRef);
  useFaqAccordion(containerRef);

  return (
    <>
      <div
        className="scroll-progress"
        style={{ transform: `scaleX(${progress / 100})` }}
      />
      <div ref={containerRef}>{children}</div>
    </>
  );
}
