import { useEffect, useRef, useState } from "react";

interface MetricConfig {
  base: number;
  range: number;
  fmt: (v: number) => string;
}

const METRICS: Record<string, MetricConfig> = {
  jobs: { base: 2847, range: 130, fmt: (v) => Math.round(v).toLocaleString() },
  gpus: { base: 16384, range: 256, fmt: (v) => Math.round(v).toLocaleString() },
  lat: { base: 4.2, range: 0.9, fmt: (v) => v.toFixed(1) + "ms" },
  dc: { base: 6, range: 0, fmt: (v) => String(Math.round(v)) },
  up: { base: 99.99, range: 0, fmt: (v) => v.toFixed(2) + "%" },
};

export function useLiveMetrics() {
  const [values, setValues] = useState<Record<string, string>>({
    jobs: METRICS.jobs.fmt(METRICS.jobs.base),
    gpus: METRICS.gpus.fmt(METRICS.gpus.base),
    lat: METRICS.lat.fmt(METRICS.lat.base),
    dc: METRICS.dc.fmt(METRICS.dc.base),
    up: METRICS.up.fmt(METRICS.up.base),
  });

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setValues((prev) => {
        const next: Record<string, string> = { ...prev };
        for (const [key, cfg] of Object.entries(METRICS)) {
          const val = cfg.base + (Math.random() - 0.5) * cfg.range;
          next[key] = cfg.fmt(val);
        }
        return next;
      });
    }, 1800);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return values;
}
