import { useEffect } from "react";

export interface AuditEntry {
  c: string;
  m: string;
}

const LINE_INTERVAL_MS = 820;
const RESET_DELAY_MS = 3200;
const ENTER_TRANSITION = "opacity 0.3s, transform 0.3s";

function timestamp(): string {
  const now = new Date();
  return [now.getHours(), now.getMinutes(), now.getSeconds()]
    .map((n) => String(n).padStart(2, "0"))
    .join(":");
}

export function useAuditLogStream(
  logRef: React.RefObject<HTMLDivElement | null>,
  triggerRef: React.RefObject<HTMLElement | null>,
  entries: ReadonlyArray<AuditEntry>,
) {
  useEffect(() => {
    const log = logRef.current;
    const trigger = triggerRef.current;
    if (!log || !trigger) return;

    let idx = 0;
    let running = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    function appendLine() {
      if (!log) return;
      if (idx >= entries.length) {
        timers.push(
          setTimeout(() => {
            log.innerHTML = "";
            idx = 0;
            appendLine();
          }, RESET_DELAY_MS),
        );
        return;
      }

      const entry = entries[idx++];
      const ts = timestamp();
      const div = document.createElement("div");
      div.className = "log-line";
      div.style.cssText = `opacity:0;transform:translateX(-8px);transition:${ENTER_TRANSITION};`;
      div.innerHTML = `<span class="log-time">${ts}</span><span class="log-msg ${entry.c}">${entry.m}</span>`;
      log.appendChild(div);
      requestAnimationFrame(() => {
        div.style.opacity = "1";
        div.style.transform = "translateX(0)";
      });
      log.scrollTop = log.scrollHeight;
      timers.push(setTimeout(appendLine, LINE_INTERVAL_MS));
    }

    const observer = new IntersectionObserver(
      (obs) => {
        if (obs[0].isIntersecting && !running) {
          running = true;
          appendLine();
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(trigger);

    return () => {
      observer.disconnect();
      timers.forEach(clearTimeout);
    };
  }, [logRef, triggerRef, entries]);
}
