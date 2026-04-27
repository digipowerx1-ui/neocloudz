import { useEffect } from "react";

const NODE_POSITIONS = [0, 25, 50, 75, 100];
const TIER_DURATION_MS = 900;
const NEXT_TIER_DELAY_MS = 650;
const RESET_PAUSE_MS = 800;
const RESET_LOOP_DELAY_MS = 400;
const REVEAL_DELAY_PER_STEP_S = 0.12;
const LOOP_START_DELAY_MS = 600;

export function useOnboardingTimeline(
  sectionRef: React.RefObject<HTMLElement | null>,
  particleRef: React.RefObject<HTMLDivElement | null>,
) {
  useEffect(() => {
    const section = sectionRef.current;
    const particle = particleRef.current;
    if (!section || !particle) return;

    const steps = section.querySelectorAll<HTMLElement>(".timeline-step");
    const nodes = section.querySelectorAll<HTMLElement>(".tl-node");
    if (steps.length === 0) return;

    let currentPct = 0;
    let animRunning = false;
    let animFrame = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];

    function setTier(idx: number, cb?: () => void) {
      nodes.forEach((n) => n.classList.remove("pulse"));
      const target = NODE_POSITIONS[idx];
      const startPct = currentPct;
      const startTime = performance.now();

      const frame = (now: number) => {
        const p = Math.min((now - startTime) / TIER_DURATION_MS, 1);
        const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
        currentPct = startPct + (target - startPct) * eased;
        if (particle) particle.style.left = `${currentPct}%`;
        if (p < 1) {
          animFrame = requestAnimationFrame(frame);
        } else {
          currentPct = target;
          if (particle) particle.style.left = `${target}%`;
          nodes[idx]?.classList.add("pulse");
          if (cb) timers.push(setTimeout(cb, NEXT_TIER_DELAY_MS));
        }
      };

      animFrame = requestAnimationFrame(frame);
    }

    function loop(stepIdx: number) {
      setTier(stepIdx, () => {
        const next = (stepIdx + 1) % NODE_POSITIONS.length;
        if (next === 0) {
          timers.push(
            setTimeout(() => {
              nodes.forEach((n) => n.classList.remove("pulse"));
              currentPct = 0;
              if (particle) particle.style.left = "0%";
              timers.push(setTimeout(() => loop(0), RESET_LOOP_DELAY_MS));
            }, RESET_PAUSE_MS),
          );
        } else {
          loop(next);
        }
      });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || animRunning) return;
        animRunning = true;
        steps.forEach((step, i) => {
          step.style.transitionDelay = `${i * REVEAL_DELAY_PER_STEP_S}s`;
          step.classList.add("vis");
        });
        timers.push(setTimeout(() => loop(0), LOOP_START_DELAY_MS));
        observer.disconnect();
      },
      { threshold: 0.3 },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animFrame);
      timers.forEach(clearTimeout);
    };
  }, [sectionRef, particleRef]);
}
