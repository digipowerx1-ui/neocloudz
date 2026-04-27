"use client";

import { useRef } from "react";
import { useOnboardingTimeline } from "@/hooks/useOnboardingTimeline";

interface TimelineStep {
  num: string;
  label: string;
  days: string;
  isLive?: boolean;
}

const STEPS: ReadonlyArray<TimelineStep> = [
  { num: "01", label: "Security Review", days: "Day 1–2" },
  { num: "02", label: "Network Config", days: "Day 3–4" },
  { num: "03", label: "Cluster Provisioning", days: "Day 5–7" },
  { num: "04", label: "Integration & Testing", days: "Day 8–14" },
  { num: "🚀", label: "Go Live", days: "Day 15", isLive: true },
];

export default function EnterpriseOnboarding() {
  const sectionRef = useRef<HTMLElement>(null);
  const particleRef = useRef<HTMLDivElement>(null);
  useOnboardingTimeline(sectionRef, particleRef);

  return (
    <section ref={sectionRef} className="hp-section mid" id="onboarding">
      <div style={{ maxWidth: "1100px", margin: "0 auto", textAlign: "center" }}>
        <div className="hp-label reveal" style={{ justifyContent: "center" }}>
          Onboarding
        </div>
        <div className="hp-h2 reveal">
          Live in <span className="g">15 Days.</span>
        </div>
        <p
          className="hp-sub reveal"
          style={{ textAlign: "center", margin: "14px auto 56px" }}
        >
          Our dedicated onboarding team handles everything — from initial security
          review to your first production training run.
        </p>
      </div>

      <div className="timeline-wrap" id="timeline-wrap">
        <div className="timeline-line">
          <div ref={particleRef} className="timeline-particle" id="tl-particle" />
        </div>
        <div className="timeline-steps">
          {STEPS.map((step, idx) => (
            <div key={idx} className="timeline-step" data-step={idx}>
              <div
                className={`tl-node${step.isLive ? " tl-node-live" : ""}`}
                id={`tl-node-${idx}`}
              >
                <span>{step.num}</span>
              </div>
              <div className="tl-step-label">{step.label}</div>
              <div className="tl-step-days">{step.days}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
