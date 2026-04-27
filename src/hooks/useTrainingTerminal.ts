import { useEffect, useRef } from "react";

const TERM_LINES_SELECTOR = ".term-line";
const LINE_DELAY_MS = 100;
const CYCLE_PAUSE_MS = 3000;
const THRESHOLD = 0.3;

export function useTrainingTerminal(terminalRef: React.RefObject<HTMLElement | null>) {
  const streamTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const terminal = terminalRef.current;
    if (!terminal) return;
    let running = false;

    function runStream() {
      if (running) return;
      running = true;
      const lines = terminal!.querySelectorAll<HTMLElement>(TERM_LINES_SELECTOR);
      lines.forEach((l) => l.classList.remove("show"));
      lines.forEach((line, i) => {
        setTimeout(() => {
          line.classList.add("show");
        }, i * LINE_DELAY_MS);
      });

      streamTimeoutRef.current = setTimeout(() => {
        running = false;
        runStream();
      }, lines.length * LINE_DELAY_MS + CYCLE_PAUSE_MS);
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            runStream();
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: THRESHOLD }
    );

    obs.observe(terminal);

    return () => {
      if (streamTimeoutRef.current) clearTimeout(streamTimeoutRef.current);
      obs.disconnect();
    };
  }, [terminalRef]);
}
