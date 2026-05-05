import { useEffect, useState } from "react";

export interface ContactMetrics {
  responseLabel: string;
  responseLabelWithTilde: string;
  resolved: number;
  uptimeLabel: string;
}

const TICK_MS = 3000;
const MIN_RESPONSE_MIN = 45;
const MAX_RESPONSE_MIN = 180;
const MIN_RESOLVED = 200;
const MAX_RESOLVED = 400;
const INITIAL_MINS = 107;
const INITIAL_RESOLVED = 247;

function clamp(v: number, mn: number, mx: number) {
  return Math.max(mn, Math.min(mx, v));
}

function formatMinutes(min: number): string {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

function buildMetrics(mins: number, resolved: number, stable = false): ContactMetrics {
  const label = formatMinutes(mins);
  // Use a stable value for hydration, then randomize on client
  const uptime = stable ? "99.99%" : (Math.random() > 0.5 ? "99.99%" : "99.98%");
  return {
    responseLabel: label,
    responseLabelWithTilde: `~${label}`,
    resolved,
    uptimeLabel: uptime,
  };
}

export function useLiveContactMetrics(): ContactMetrics {
  const [metrics, setMetrics] = useState<ContactMetrics>(() =>
    buildMetrics(INITIAL_MINS, INITIAL_RESOLVED, true),
  );

  useEffect(() => {
    let mins = INITIAL_MINS;
    let resolved = INITIAL_RESOLVED;

    const id = setInterval(() => {
      mins = clamp(
        mins + Math.round((Math.random() - 0.5) * 8),
        MIN_RESPONSE_MIN,
        MAX_RESPONSE_MIN,
      );
      resolved = clamp(
        resolved + Math.round(Math.random() * 2),
        MIN_RESOLVED,
        MAX_RESOLVED,
      );
      setMetrics(buildMetrics(mins, resolved));
    }, TICK_MS);

    return () => clearInterval(id);
  }, []);

  return metrics;
}
