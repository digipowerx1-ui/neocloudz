"use client";

import { useEffect, useState, type RefObject } from "react";

/* Hero live counter strip (GPUs / util / jobs / pflops / bw) */
interface LiveStrip {
  gpus: number;
  util: number;
  jobs: number;
  pflops: number;
  bw: number;
}

export function useHomeLiveStrip(): LiveStrip {
  const [v, setV] = useState<LiveStrip>({
    gpus: 2048,
    util: 74,
    jobs: 318,
    pflops: 892,
    bw: 398,
  });
  useEffect(() => {
    const id = window.setInterval(() => {
      setV((p) => {
        const clamp = (n: number, mn: number, mx: number) => Math.max(mn, Math.min(mx, n));
        const r = (range: number) => Math.floor((Math.random() - 0.5) * range * 2);
        return {
          gpus: clamp(p.gpus + r(2), 2000, 2100),
          util: clamp(p.util + r(1.5), 65, 95),
          jobs: clamp(p.jobs + r(2.5), 280, 380),
          pflops: clamp(p.pflops + r(4), 820, 980),
          bw: clamp(p.bw + r(6), 320, 460),
        };
      });
    }, 1600);
    return () => window.clearInterval(id);
  }, []);
  return v;
}

/* Cycling tbar status text */
const TBAR_STATES = [
  "CLUSTER ONLINE",
  "64 GPUs ACTIVE",
  "112.8 PetaFLOPs",
  "IB 400G · NOMINAL",
  "WEKA HEALTHY",
  "NVLink OK",
];

export function useCyclingStatus(): { label: string; visible: boolean } {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const id = window.setInterval(() => {
      setVisible(false);
      window.setTimeout(() => {
        setIdx((i) => (i + 1) % TBAR_STATES.length);
        setVisible(true);
      }, 300);
    }, 3200);
    return () => window.clearInterval(id);
  }, []);
  return { label: TBAR_STATES[idx], visible };
}

/* Scroll progress bar */
export function useScrollProgressBar(barRef: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    function onScroll() {
      if (!bar) return;
      const max = document.body.scrollHeight - window.innerHeight;
      if (max <= 0) {
        bar.style.width = "0%";
        return;
      }
      const pct = (window.scrollY / max) * 100;
      bar.style.width = pct + "%";
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [barRef]);
}

/* Scroll reveal */
export function useScrollReveal(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const sel =
      ".gpu-cat-card,.price-card,.why-item,.sf-item,.stat-card,.faq-item,.hp-label,.nvlink-section,.logos-section,.partners-section,.workloads-container,.storage-grid,.why-grid";
    const targets = Array.from(root.querySelectorAll<HTMLElement>(sel));
    targets.forEach((el) => el.classList.add("reveal"));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            window.setTimeout(() => e.target.classList.add("visible"), i * 55);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 },
    );
    targets.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [rootRef]);
}

/* FAQ accordion (click delegation) */
export function useFaqAccordion(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    function onClick(ev: MouseEvent) {
      const target = ev.target as HTMLElement | null;
      if (!target) return;
      const q = target.closest<HTMLElement>(".faq-q");
      if (!q || !root || !root.contains(q)) return;
      const item = q.parentElement;
      if (!item) return;
      const wasOpen = item.classList.contains("open");
      root.querySelectorAll(".faq-item").forEach((i) => i.classList.remove("open"));
      if (!wasOpen) item.classList.add("open");
    }
    root.addEventListener("click", onClick);
    return () => root.removeEventListener("click", onClick);
  }, [rootRef]);
}

/* Hero floating orbs — append DOM nodes once */
export function useHomeOrbs(heroRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const cols = ["rgba(45,255,122", "rgba(77,200,255", "rgba(45,255,122"];
    const elements: HTMLDivElement[] = [];
    for (let i = 0; i < 16; i++) {
      const orb = document.createElement("div");
      const sz = Math.random() * 5 + 2;
      const col = cols[Math.floor(Math.random() * cols.length)];
      const dur = 9 + Math.random() * 14;
      const drift = (Math.random() - 0.5) * 180;
      orb.className = "orb";
      orb.style.cssText = `width:${sz}px;height:${sz}px;left:${Math.random() * 100}%;bottom:${-sz}px;background:${col},${0.5 + Math.random() * 0.5});box-shadow:0 0 ${sz * 3}px ${col},.7);--drift:${drift}px;animation-duration:${dur}s;animation-delay:${Math.random() * dur}s;`;
      hero.appendChild(orb);
      elements.push(orb);
    }
    return () => {
      elements.forEach((el) => el.remove());
    };
  }, [heroRef]);
}

/* Hero twinkling stars */
export function useHomeStars(heroRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const elements: HTMLDivElement[] = [];
    for (let i = 0; i < 60; i++) {
      const s = document.createElement("div");
      const sz = Math.random() * 1.5 + 0.4;
      s.style.cssText = `position:absolute;width:${sz}px;height:${sz}px;border-radius:50%;background:rgba(${Math.random() > 0.5 ? "45,255,122" : "200,212,200"},${Math.random() * 0.6 + 0.1});left:${Math.random() * 100}%;top:${Math.random() * 100}%;pointer-events:none;z-index:1;animation:home-blink ${1.5 + Math.random() * 3}s ${Math.random() * 3}s ease-in-out infinite;`;
      hero.appendChild(s);
      elements.push(s);
    }
    return () => {
      elements.forEach((el) => el.remove());
    };
  }, [heroRef]);
}

/* Mouse parallax on hero grid + glow */
export function useHomeParallax(
  heroRef: RefObject<HTMLElement | null>,
  gridRef: RefObject<HTMLDivElement | null>,
  glowRef: RefObject<HTMLDivElement | null>,
) {
  useEffect(() => {
    const hero = heroRef.current;
    const grid = gridRef.current;
    const glow = glowRef.current;
    if (!hero || !grid) return;
    function onMove(e: MouseEvent) {
      if (!hero || !grid) return;
      const r = hero.getBoundingClientRect();
      const cx = (e.clientX - r.left) / r.width - 0.5;
      const cy = (e.clientY - r.top) / r.height - 0.5;
      grid.style.transform = `translate(${cx * 20}px,${cy * 14}px)`;
      if (glow) {
        glow.style.transform = `translate(calc(-50% + ${cx * 45}px),calc(-50% + ${cy * 32}px))`;
      }
    }
    function onLeave() {
      if (!grid) return;
      grid.style.transform = "";
      if (glow) glow.style.transform = "";
    }
    hero.addEventListener("mousemove", onMove);
    hero.addEventListener("mouseleave", onLeave);
    return () => {
      hero.removeEventListener("mousemove", onMove);
      hero.removeEventListener("mouseleave", onLeave);
    };
  }, [heroRef, gridRef, glowRef]);
}

/* Typing headline — toggles eyebrow h1 text through phrases */
const TYPING_PHRASES = [
  "The Future of AI",
  "Blackwell. On Demand.",
  "Grace Blackwell Bare Metal.",
  "Deploy in 60 Seconds.",
  "The Future of AI",
];
const TYPING_SUFFIX_HTML =
  '<br><span style="color:var(--green)">Compute Starts Here.</span>';

export function useHomeTypingHeadline(elRef: RefObject<HTMLHeadingElement | null>) {
  useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    let pi = 0;
    let ci = 0;
    let del = false;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | null = null;
    function tick() {
      if (cancelled || !el) return;
      const ph = TYPING_PHRASES[pi];
      if (!del) {
        ci++;
        el.innerHTML = ph.slice(0, ci) + TYPING_SUFFIX_HTML;
        if (ci === ph.length) {
          del = true;
          timer = setTimeout(tick, 2400);
          return;
        }
        timer = setTimeout(tick, 52);
      } else {
        ci--;
        el.innerHTML = ph.slice(0, ci) + TYPING_SUFFIX_HTML;
        if (ci === 0) {
          del = false;
          pi = (pi + 1) % TYPING_PHRASES.length;
          timer = setTimeout(tick, 380);
          return;
        }
        timer = setTimeout(tick, 26);
      }
    }
    timer = setTimeout(tick, 2200);
    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [elRef]);
}

/* Stat cards count-up + ring charts */
interface StatConfig {
  target: number;
  prefix: string;
  suffix: string;
  duration: number;
  float?: boolean;
}
const STAT_CONFIGS: StatConfig[] = [
  { target: 60, prefix: "<", suffix: "s", duration: 1100 },
  { target: 99.99, prefix: "", suffix: "%", duration: 1800, float: true },
  { target: 400, prefix: "", suffix: "G", duration: 1300 },
  { target: 10, prefix: "<", suffix: "μs", duration: 900 },
];

export function useStatCountUpAndRings(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const cards = Array.from(root.querySelectorAll<HTMLElement>(".stat-card"));
    if (!cards.length) return;
    const circumference = 2 * Math.PI * 22;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const card = entry.target as HTMLElement;
          const idx = cards.indexOf(card);
          if (idx < 0 || idx >= STAT_CONFIGS.length) return;
          const cfg = STAT_CONFIGS[idx];
          const numEl = card.querySelector<HTMLElement>(".stat-num");
          const ring = card.querySelector<SVGCircleElement>(".ring-fill");
          if (numEl) {
            const start = performance.now();
            const tick = (now: number) => {
              const progress = Math.min((now - start) / cfg.duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              const value = cfg.float
                ? (eased * cfg.target).toFixed(2)
                : Math.floor(eased * cfg.target).toString();
              numEl.textContent = cfg.prefix + value + cfg.suffix;
              if (progress < 1) requestAnimationFrame(tick);
              else {
                numEl.textContent =
                  cfg.prefix +
                  (cfg.float ? cfg.target.toFixed(2) : cfg.target) +
                  cfg.suffix;
                card.classList.add("counted");
              }
            };
            requestAnimationFrame(tick);
          }
          if (ring) {
            const pct = parseFloat(ring.getAttribute("data-pct") || "80");
            ring.style.strokeDasharray = String(circumference);
            ring.style.strokeDashoffset = String(circumference);
            requestAnimationFrame(() => {
              ring.style.strokeDashoffset = String(circumference * (1 - pct / 100));
            });
          }
          obs.unobserve(card);
        });
      },
      { threshold: 0.5 },
    );
    cards.forEach((c) => obs.observe(c));
    return () => obs.disconnect();
  }, [rootRef]);
}

/* Benchmark bars animate */
export function useBenchBars(sectionRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const fills = Array.from(section.querySelectorAll<HTMLElement>(".bench-fill"));
    if (!fills.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        fills.forEach((f, i) => {
          const pct = parseInt(f.getAttribute("data-pct") || "50", 10);
          const lbl = f.getAttribute("data-label") || "";
          window.setTimeout(
            () => {
              f.style.width = pct + "%";
              const row = f.closest(".bench-row");
              if (row && i % 3 === 0 && lbl) {
                const v = row.querySelector<HTMLElement>(".bench-val");
                if (v) v.textContent = lbl;
              }
            },
            Math.floor(i / 3) * 200 + 100,
          );
        });
        obs.disconnect();
      },
      { threshold: 0.25 },
    );
    obs.observe(section);
    return () => obs.disconnect();
  }, [sectionRef]);
}

/* Pricing card spotlight on hover */
export function usePricingSpotlight(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const cards = Array.from(root.querySelectorAll<HTMLElement>(".price-card"));
    function makeMove(card: HTMLElement) {
      return (e: MouseEvent) => {
        const r = card.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;
        card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(45,255,122,.08) 0%, var(--surface2) 55%)`;
      };
    }
    function makeLeave(card: HTMLElement) {
      return () => {
        card.style.background = "";
      };
    }
    const handlers: Array<{ card: HTMLElement; move: (e: MouseEvent) => void; leave: () => void }> = [];
    cards.forEach((card) => {
      const move = makeMove(card);
      const leave = makeLeave(card);
      card.addEventListener("mousemove", move);
      card.addEventListener("mouseleave", leave);
      handlers.push({ card, move, leave });
    });
    return () => {
      handlers.forEach(({ card, move, leave }) => {
        card.removeEventListener("mousemove", move);
        card.removeEventListener("mouseleave", leave);
      });
    };
  }, [rootRef]);
}

/* Storage live bandwidth bars (DOM-injected) */
export function useStorageBandwidthBars(stBodyRef: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const sb = stBodyRef.current;
    if (!sb) return;
    const labels = ["GPU-0 → WEKA", "GPU-16 → WEKA", "GPU-32 → WEKA", "GPU-48 → WEKA"];
    const wrap = document.createElement("div");
    wrap.style.cssText = "margin-top:14px;display:flex;flex-direction:column;gap:5px;";
    wrap.innerHTML =
      '<div style="font-size:10px;color:#4a5a4a;margin-bottom:5px;font-family:var(--font-mono);">── live throughput ──</div>' +
      labels
        .map(
          (lbl, i) =>
            `<div style="display:flex;gap:8px;align-items:center;">
        <span style="font-size:9px;color:#4a5a4a;width:96px;font-family:var(--font-mono);flex-shrink:0">${lbl}</span>
        <div style="flex:1;height:4px;background:rgba(255,255,255,.05);border-radius:2px;overflow:hidden;position:relative;">
          <div class="lb" style="height:100%;border-radius:2px;background:var(--green);box-shadow:0 0 6px var(--green);width:${40 + i * 10}%;transition:width .9s ease;"></div>
        </div>
        <span class="lbv" style="font-size:9px;font-family:var(--font-mono);color:var(--green);width:34px;text-align:right;">${40 + i * 10}%</span>
      </div>`,
        )
        .join("");
    sb.appendChild(wrap);
    const id = window.setInterval(() => {
      const bars = wrap.querySelectorAll<HTMLElement>(".lb");
      const vals = wrap.querySelectorAll<HTMLElement>(".lbv");
      bars.forEach((b, i) => {
        const p = 25 + Math.floor(Math.random() * 68);
        b.style.width = p + "%";
        if (vals[i]) vals[i].textContent = p + "%";
      });
    }, 1500);
    return () => {
      window.clearInterval(id);
      wrap.remove();
    };
  }, [stBodyRef]);
}

/* GPU catalog card mini sparklines */
export function useGpuCatalogSparklines(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const cards = Array.from(root.querySelectorAll<HTMLElement>(".gpu-cat-card"));
    const cleanups: Array<() => void> = [];
    cards.forEach((card, ci) => {
      if (card.querySelector("canvas")) return;
      const spark = document.createElement("canvas");
      spark.width = 160;
      spark.height = 32;
      spark.style.cssText =
        "display:block;margin:12px 0 0;width:160px;height:32px;opacity:0.7;";
      const lastChild = card.lastElementChild;
      if (lastChild) card.insertBefore(spark, lastChild);
      else card.appendChild(spark);
      const ctx = spark.getContext("2d");
      if (!ctx) return;
      const data = Array.from({ length: 30 }, () => 55 + Math.random() * 38);
      const colors = ["#2dff7a", "#4dc8ff", "#ffb84d"];
      const alphaColors = [
        "rgba(45,255,122,",
        "rgba(77,200,255,",
        "rgba(255,184,77,",
      ];
      const clr = colors[ci % colors.length];
      const aclr = alphaColors[ci % alphaColors.length];
      function draw() {
        if (!ctx) return;
        ctx.clearRect(0, 0, 160, 32);
        const min = Math.min(...data);
        const max = Math.max(...data);
        const range = max - min || 1;
        const grad = ctx.createLinearGradient(0, 0, 0, 32);
        grad.addColorStop(0, aclr + "0.18)");
        grad.addColorStop(1, aclr + "0)");
        ctx.beginPath();
        data.forEach((v, i) => {
          const x = i * (160 / 29);
          const y = 32 - (((v - min) / range) * 24 + 4);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });
        ctx.lineTo(159, 32);
        ctx.lineTo(0, 32);
        ctx.closePath();
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.beginPath();
        data.forEach((v, i) => {
          const x = i * (160 / 29);
          const y = 32 - (((v - min) / range) * 24 + 4);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });
        ctx.strokeStyle = clr;
        ctx.lineWidth = 1.5;
        ctx.shadowColor = clr;
        ctx.shadowBlur = 6;
        ctx.stroke();
        ctx.shadowBlur = 0;
        const lastX = 159;
        const lastY = 32 - (((data[data.length - 1] - min) / range) * 24 + 4);
        ctx.beginPath();
        ctx.arc(lastX, lastY, 3, 0, Math.PI * 2);
        ctx.fillStyle = clr;
        ctx.shadowColor = clr;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      draw();
      const id = window.setInterval(() => {
        data.shift();
        data.push(55 + Math.random() * 38);
        draw();
      }, 800 + ci * 150);
      cleanups.push(() => {
        window.clearInterval(id);
        spark.remove();
      });
    });
    return () => cleanups.forEach((fn) => fn());
  }, [rootRef]);
}

/* GPU heatmap pulse on cluster nodes */
export function useGpuHeatmapPulse(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const id = window.setInterval(() => {
      root.querySelectorAll<HTMLElement>(".gpu-node.util-high").forEach((n) => {
        n.style.boxShadow = `inset 0 0 ${7 + Math.random() * 9}px rgba(45,255,122,.14)`;
      });
      root.querySelectorAll<HTMLElement>(".gpu-node.util-error").forEach((n) => {
        n.style.boxShadow = `inset 0 0 ${5 + Math.random() * 7}px rgba(255,77,77,.18)`;
      });
    }, 900);
    return () => window.clearInterval(id);
  }, [rootRef]);
}

/* CTA particle burst on click */
export function useCtaParticleBurst(btnRef: RefObject<HTMLAnchorElement | null>) {
  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;
    function onClick(e: MouseEvent) {
      for (let i = 0; i < 16; i++) {
        const p = document.createElement("div");
        const angle = Math.random() * Math.PI * 2;
        const dist = 40 + Math.random() * 80;
        const dx = Math.cos(angle) * dist;
        const dy = Math.sin(angle) * dist;
        const sz = 2 + Math.random() * 4;
        p.className = "burst-particle";
        p.style.cssText = `position:fixed;width:${sz}px;height:${sz}px;border-radius:50%;
          background:${Math.random() > 0.5 ? "#2dff7a" : "#4dc8ff"};
          left:${e.clientX}px;top:${e.clientY}px;
          pointer-events:none;z-index:9999;
          transition:transform 0.6s ease-out,opacity 0.6s ease-out;opacity:1;`;
        document.body.appendChild(p);
        requestAnimationFrame(() => {
          p.style.transform = `translate(${dx}px,${dy}px) scale(0)`;
          p.style.opacity = "0";
        });
        window.setTimeout(() => p.remove(), 700);
      }
    }
    btn.addEventListener("click", onClick);
    return () => btn.removeEventListener("click", onClick);
  }, [btnRef]);
}

/* Stat card ring pulse drift after initial load */
export function useStatRingPulse(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const rings = Array.from(root.querySelectorAll<SVGCircleElement>(".ring-fill"));
    const circumference = 2 * Math.PI * 22;
    const intervals: number[] = [];
    rings.forEach((r) => {
      const id = window.setInterval(
        () => {
          const pct = parseFloat(r.getAttribute("data-pct") || "80");
          const target = circumference * (1 - pct / 100);
          const jitter = target + (Math.random() - 0.5) * 8;
          r.style.transition = "stroke-dashoffset 1.2s ease";
          r.style.strokeDashoffset = String(
            Math.max(0, Math.min(circumference, jitter)),
          );
          window.setTimeout(() => {
            r.style.strokeDashoffset = String(target);
          }, 1300);
        },
        4000 + Math.random() * 2000,
      );
      intervals.push(id);
    });
    return () => intervals.forEach((id) => window.clearInterval(id));
  }, [rootRef]);
}
