import { useEffect, useState } from "react";

export interface EnterpriseLiveValues {
  clusters: string;
  gpus: string;
  resp: number;
  uptime: string;
}

const INITIAL: EnterpriseLiveValues = {
  clusters: "142",
  gpus: (18432).toLocaleString(),
  resp: 11,
  uptime: (99.991).toFixed(3),
};

const TICK_MS = 1800;

function clamp(v: number, mn: number, mx: number) {
  return Math.max(mn, Math.min(mx, v));
}

function rand(range: number) {
  return Math.round((Math.random() - 0.5) * range * 2);
}

export function useEnterpriseLiveStrip(): EnterpriseLiveValues {
  const [values, setValues] = useState<EnterpriseLiveValues>(INITIAL);

  useEffect(() => {
    let clusters = 142;
    let gpus = 18432;
    let resp = 11;
    let uptimeVal = 99.991;

    const id = setInterval(() => {
      clusters = clamp(clusters + rand(1), 138, 148);
      gpus = clamp(gpus + rand(8), 18200, 18700);
      resp = clamp(resp + rand(1), 8, 15);
      uptimeVal = clamp(uptimeVal + (Math.random() - 0.5) * 0.001, 99.988, 99.999);
      setValues({
        clusters: String(clusters),
        gpus: gpus.toLocaleString(),
        resp,
        uptime: uptimeVal.toFixed(3),
      });
    }, TICK_MS);

    return () => clearInterval(id);
  }, []);

  return values;
}
