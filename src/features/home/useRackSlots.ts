"use client";

import { useEffect, type RefObject } from "react";

const SLOT_LABELS = [
  "H100·G00",
  "H100·G01",
  "H100·G02",
  "H100·G03",
  "H100·G04",
  "H100·G05",
  "H100·G06",
  "H100·G07",
  "NVSwitch·00",
  "NVSwitch·01",
  "IB·HCA·00",
  "IB·HCA·01",
  "10GbE·MGT",
  "BMC·IPMI",
  "PSU·A",
  "PSU·B",
];

const SLOT_DELAYS = [
  "0s",
  "0.3s",
  "0.6s",
  "0.9s",
  "1.2s",
  "1.5s",
  "1.8s",
  "2.1s",
  "0.2s",
  "0.5s",
  "0.8s",
  "1.1s",
  "1.4s",
  "1.7s",
  "2.0s",
  "2.3s",
];

const ACTIVE_SLOTS = new Set([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);

export function useRackSlots(frontRef: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const front = frontRef.current;
    if (!front) return;
    front.innerHTML = "";
    SLOT_LABELS.forEach((lbl, i) => {
      const slot = document.createElement("div");
      slot.className = "rack-slot" + (ACTIVE_SLOTS.has(i) ? " active" : "");
      slot.style.setProperty("--d", SLOT_DELAYS[i % SLOT_DELAYS.length]);
      slot.innerHTML = `<span class="rack-slot-label">${lbl}</span>`;
      front.appendChild(slot);
    });
    const id = window.setInterval(() => {
      const slots = front.querySelectorAll<HTMLDivElement>(".rack-slot.active");
      slots.forEach((s) => {
        if (Math.random() < 0.15) {
          s.style.opacity = "0.4";
          window.setTimeout(() => {
            s.style.opacity = "1";
          }, 80 + Math.random() * 120);
        }
      });
    }, 1200);
    return () => {
      window.clearInterval(id);
      front.innerHTML = "";
    };
  }, [frontRef]);
}
