import type React from "react";
import { useEffect } from "react";

export interface AuditEntry {
  c: string;
  m: string;
}

const LINE_INTERVAL_MS = 850;
const MAX_LINES = 14;
const ENTER_TRANSITION = "opacity 0.35s ease, transform 0.35s ease";

function timestamp(offsetSeconds = 0): string {
  const now = new Date(Date.now() - offsetSeconds * 1000);
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

    function addEntry(entry: AuditEntry, offsetSec = 0, animate = true) {
      if (!log) return;

      while (log.children.length >= MAX_LINES) {
        log.removeChild(log.firstElementChild!);
      }

      const ts = timestamp(offsetSec);
      const div = document.createElement("div");
      div.className = "log-line";
      const colorClass = entry.c ? entry.c : "info";

      if (animate) {
        div.style.cssText = `opacity:0;transform:translateY(4px);transition:${ENTER_TRANSITION};`;
        div.innerHTML = `<span class="log-time">${ts}</span><span class="log-msg ${colorClass}">${entry.m}</span>`;
        log.appendChild(div);
        requestAnimationFrame(() => {
          div.style.opacity = "1";
          div.style.transform = "translateY(0)";
        });
      } else {
        div.innerHTML = `<span class="log-time">${ts}</span><span class="log-msg ${colorClass}">${entry.m}</span>`;
        log.appendChild(div);
      }

      log.scrollTop = log.scrollHeight;
    }

    function initPreload() {
      if (!log) return;
      log.innerHTML = "";
      const initialCount = Math.min(8, entries.length);
      for (let i = 0; i < initialCount; i++) {
        addEntry(entries[i], (initialCount - i) * 3, false);
      }
      idx = initialCount;
    }

    function streamNext() {
      if (!log) return;
      const entry = entries[idx % entries.length];
      idx++;
      addEntry(entry, 0, true);
      timers.push(setTimeout(streamNext, LINE_INTERVAL_MS));
    }

    const observer = new IntersectionObserver(
      (obs) => {
        if (obs[0].isIntersecting && !running) {
          running = true;
          initPreload();
          timers.push(setTimeout(streamNext, LINE_INTERVAL_MS));
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(trigger);

    return () => {
      observer.disconnect();
      timers.forEach(clearTimeout);
    };
  }, [logRef, triggerRef, entries]);
}
