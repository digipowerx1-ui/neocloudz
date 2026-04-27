"use client";

import { useEffect, useState, type RefObject } from "react";

/* Hero particle canvas — 90 nodes, 130px connection */
export function usePricingParticleCanvas(canvasRef: RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    let W = 0;
    let H = 0;
    interface Pt {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
    }
    const pts: Pt[] = [];
    function resize() {
      if (!c) return;
      W = c.width = c.offsetWidth;
      H = c.height = c.offsetHeight;
    }
    resize();
    for (let i = 0; i < 90; i++) {
      pts.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        r: Math.random() * 1.5 + 0.5,
      });
    }
    let raf = 0;
    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);
      pts.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(45,255,122,0.55)";
        ctx.fill();
      });
      pts.forEach((a, i) => {
        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 130) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(45,255,122,${0.18 * (1 - d / 130)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      });
      raf = requestAnimationFrame(draw);
    }
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [canvasRef]);
}

/* Wave canvas (CTA banner) */
export function usePricingWaveCanvas(canvasRef: RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    function resize() {
      if (!c) return;
      c.width = c.offsetWidth;
      c.height = c.offsetHeight;
    }
    resize();
    window.addEventListener("resize", resize);
    let t = 0;
    const waves = [
      { amp: 28, freq: 0.008, spd: 0.025, color: "rgba(45,255,122,0.4)", lw: 1.5 },
      { amp: 18, freq: 0.012, spd: 0.035, color: "rgba(77,200,255,0.3)", lw: 1 },
      { amp: 38, freq: 0.005, spd: 0.018, color: "rgba(45,255,122,0.2)", lw: 2 },
      { amp: 14, freq: 0.018, spd: 0.045, color: "rgba(45,255,122,0.15)", lw: 1 },
    ];
    let raf = 0;
    function draw() {
      if (!ctx || !c) return;
      const W = c.width;
      const H = c.height;
      ctx.clearRect(0, 0, W, H);
      waves.forEach((w) => {
        ctx.beginPath();
        for (let x = 0; x <= W; x += 2) {
          const y = H / 2 + Math.sin(x * w.freq + t * w.spd) * w.amp;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = w.color;
        ctx.lineWidth = w.lw;
        ctx.shadowColor = w.color;
        ctx.shadowBlur = 8;
        ctx.stroke();
        ctx.shadowBlur = 0;
      });
      t++;
      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [canvasRef]);
}

/* Pricing mesh canvas */
export function usePricingMeshCanvas(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  sectionRef: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let W = 0;
    let H = 0;
    function sz() {
      if (!canvas || !section) return;
      W = section.offsetWidth;
      H = section.offsetHeight;
      canvas.width = W;
      canvas.height = H;
    }
    sz();
    window.addEventListener("resize", sz);
    let t = 0;
    const blobs = [
      { x: 0.12, y: 0.3, r: 340, c: "rgba(45,255,122,", sp: 0.0007, ph: 0 },
      { x: 0.88, y: 0.65, r: 380, c: "rgba(77,200,255,", sp: 0.0005, ph: 2 },
      { x: 0.5, y: 0.1, r: 260, c: "rgba(45,255,122,", sp: 0.0009, ph: 4 },
    ];
    let raf = 0;
    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);
      blobs.forEach((b) => {
        const x = (b.x + Math.sin(t * b.sp + b.ph) * 0.09) * W;
        const y = (b.y + Math.cos(t * b.sp * 1.2 + b.ph) * 0.07) * H;
        const g = ctx.createRadialGradient(x, y, 0, x, y, b.r);
        g.addColorStop(0, b.c + "0.06)");
        g.addColorStop(1, b.c + "0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      });
      ctx.strokeStyle = "rgba(45,255,122,0.025)";
      ctx.lineWidth = 1;
      const gs = 55;
      for (let x = 0; x < W; x += gs) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      for (let y = 0; y < H; y += gs) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }
      t++;
      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", sz);
    };
  }, [canvasRef, sectionRef]);
}

/* Hero typing line */
const TYPING_LINES = [
  "> neocloudz pricing --model blackwell",
  "> neocloudz pricing --type b300 --reserved",
  "> cat /etc/neocloudz/pricing.json",
  "> curl api.neocloudz.com/v1/prices",
  "> neocloudz billing --show monthly",
];

export function usePricingTyping(elRef: RefObject<HTMLSpanElement | null>) {
  useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    let li = 0;
    let ci = 0;
    let deleting = false;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | null = null;
    function tick() {
      if (cancelled || !el) return;
      const target = TYPING_LINES[li];
      if (!deleting) {
        el.textContent = target.substring(0, ci + 1);
        ci++;
        if (ci === target.length) {
          timer = setTimeout(() => {
            deleting = true;
            tick();
          }, 2200);
          return;
        }
      } else {
        el.textContent = target.substring(0, ci - 1);
        ci--;
        if (ci === 0) {
          deleting = false;
          li = (li + 1) % TYPING_LINES.length;
        }
      }
      timer = setTimeout(tick, deleting ? 35 : 65);
    }
    tick();
    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [elRef]);
}

/* Hero twinkling stars (DOM injection) */
export function usePricingStars(heroRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const elements: HTMLDivElement[] = [];
    for (let i = 0; i < 70; i++) {
      const s = document.createElement("div");
      const sz = Math.random() * 1.8 + 0.3;
      s.style.cssText = `position:absolute;width:${sz}px;height:${sz}px;border-radius:50%;background:rgba(${Math.random() > 0.5 ? "45,255,122" : "180,220,180"},${Math.random() * 0.5 + 0.1});left:${Math.random() * 100}%;top:${Math.random() * 100}%;pointer-events:none;z-index:1;animation:pricing-twinkle ${1.5 + Math.random() * 3}s ${Math.random() * 3}s ease-in-out infinite;`;
      hero.appendChild(s);
      elements.push(s);
    }
    return () => elements.forEach((el) => el.remove());
  }, [heroRef]);
}

/* Hero dynamic glow */
export function usePricingHeroGlow(heroRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const glow = document.createElement("div");
    glow.style.cssText = "position:absolute;inset:0;pointer-events:none;z-index:1;";
    hero.appendChild(glow);
    let t = 0;
    let raf = 0;
    function animate() {
      t += 0.005;
      const x = (50 + Math.sin(t) * 20).toFixed(1);
      const y = (45 + Math.cos(t * 0.7) * 15).toFixed(1);
      glow.style.background = `radial-gradient(ellipse 60% 45% at ${x}% ${y}%, rgba(45,255,122,0.05) 0%, transparent 70%)`;
      raf = requestAnimationFrame(animate);
    }
    animate();
    return () => {
      cancelAnimationFrame(raf);
      glow.remove();
    };
  }, [heroRef]);
}

/* Hero mouse parallax */
export function usePricingHeroParallax(
  heroRef: RefObject<HTMLElement | null>,
  gridRef: RefObject<HTMLDivElement | null>,
) {
  useEffect(() => {
    const hero = heroRef.current;
    const grid = gridRef.current;
    if (!hero || !grid) return;
    function onMove(e: MouseEvent) {
      if (!hero || !grid) return;
      const r = hero.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - 0.5) * 12;
      const y = ((e.clientY - r.top) / r.height - 0.5) * 8;
      grid.style.transform = `translate(${x}px,${y}px)`;
    }
    function onLeave() {
      if (grid) grid.style.transform = "";
    }
    hero.addEventListener("mousemove", onMove);
    hero.addEventListener("mouseleave", onLeave);
    return () => {
      hero.removeEventListener("mousemove", onMove);
      hero.removeEventListener("mouseleave", onLeave);
    };
  }, [heroRef, gridRef]);
}

/* Hero live strip — gpus + savings tickers */
interface HeroLiveStrip {
  gpus: number;
  savings: number;
}
export function usePricingLiveStrip(): HeroLiveStrip {
  const [v, setV] = useState<HeroLiveStrip>({ gpus: 2048, savings: 62 });
  useEffect(() => {
    const id = window.setInterval(() => {
      setV((p) => {
        const g = Math.max(1980, Math.min(2150, p.gpus + Math.floor((Math.random() - 0.3) * 6)));
        const s = Math.max(58, Math.min(68, p.savings + Math.floor((Math.random() - 0.5) * 2)));
        return { gpus: g, savings: s };
      });
    }, 2000);
    return () => window.clearInterval(id);
  }, []);
  return v;
}

/* Scroll progress bar */
export function usePricingScrollBar(barRef: RefObject<HTMLDivElement | null>) {
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
export function usePricingScrollReveal(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const targets = Array.from(root.querySelectorAll<HTMLElement>(".reveal"));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            window.setTimeout(() => e.target.classList.add("visible"), i * 60);
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

/* Demand bars animate on intersect */
export function usePricingDemandBars(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const cards = Array.from(root.querySelectorAll<HTMLElement>(".price-card"));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const bars = e.target.querySelectorAll<HTMLElement>(".demand-fill");
            bars.forEach((b) => {
              const w = b.getAttribute("data-w") || "60%";
              window.setTimeout(() => {
                b.style.width = w;
              }, 200);
            });
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.3 },
    );
    cards.forEach((c) => obs.observe(c));
    return () => obs.disconnect();
  }, [rootRef]);
}

/* Feature reveal stagger */
export function usePricingFeatureReveal(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const cards = Array.from(root.querySelectorAll<HTMLElement>(".price-card"));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const feats = e.target.querySelectorAll<HTMLElement>(".price-feature");
            feats.forEach((f, i) => {
              window.setTimeout(() => f.classList.add("revealed"), i * 80 + 200);
            });
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.2 },
    );
    cards.forEach((c) => obs.observe(c));
    return () => obs.disconnect();
  }, [rootRef]);
}

/* Hover spotlight on price cards */
export function usePricingHoverSpotlight(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const cards = Array.from(root.querySelectorAll<HTMLElement>(".price-card"));
    const handlers: Array<{
      el: HTMLElement;
      move: (e: MouseEvent) => void;
      leave: () => void;
    }> = [];
    cards.forEach((card) => {
      const move = (e: MouseEvent) => {
        const r = card.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;
        card.style.backgroundImage = `radial-gradient(220px circle at ${x}px ${y}px, rgba(45,255,122,0.07), transparent 70%)`;
      };
      const leave = () => {
        card.style.backgroundImage = "";
      };
      card.addEventListener("mousemove", move);
      card.addEventListener("mouseleave", leave);
      handlers.push({ el: card, move, leave });
    });
    return () => {
      handlers.forEach(({ el, move, leave }) => {
        el.removeEventListener("mousemove", move);
        el.removeEventListener("mouseleave", leave);
      });
    };
  }, [rootRef]);
}

/* Card sparklines */
export function usePricingCardSparklines(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const canvases = Array.from(root.querySelectorAll<HTMLCanvasElement>(".price-sparkline"));
    const colors = ["#2dff7a", "#2dff7a", "#4dc8ff", "#4dc8ff"];
    const acolors = [
      "rgba(45,255,122,",
      "rgba(45,255,122,",
      "rgba(77,200,255,",
      "rgba(77,200,255,",
    ];
    const cleanups: Array<() => void> = [];
    canvases.forEach((canvas, ci) => {
      canvas.width = canvas.offsetWidth || 200;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const data = Array.from({ length: 40 }, () => 45 + Math.random() * 48);
      const clr = colors[ci % colors.length];
      const aclr = acolors[ci % acolors.length];
      function draw() {
        if (!ctx) return;
        const W = canvas.width;
        const H = canvas.height;
        ctx.clearRect(0, 0, W, H);
        const min = Math.min(...data);
        const max = Math.max(...data);
        const rng = max - min || 1;
        ctx.beginPath();
        data.forEach((v, i) => {
          const x = i * (W / (data.length - 1));
          const y = H - (((v - min) / rng) * 26 + 4);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });
        ctx.lineTo(W, H);
        ctx.lineTo(0, H);
        ctx.closePath();
        const grad = ctx.createLinearGradient(0, 0, 0, H);
        grad.addColorStop(0, aclr + "0.2)");
        grad.addColorStop(1, aclr + "0)");
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.beginPath();
        data.forEach((v, i) => {
          const x = i * (W / (data.length - 1));
          const y = H - (((v - min) / rng) * 26 + 4);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });
        ctx.strokeStyle = clr;
        ctx.lineWidth = 1.5;
        ctx.shadowColor = clr;
        ctx.shadowBlur = 5;
        ctx.stroke();
        ctx.shadowBlur = 0;
        const lv = data[data.length - 1];
        const lx = W;
        const ly = H - (((lv - min) / rng) * 26 + 4);
        ctx.beginPath();
        ctx.arc(lx, ly, 3, 0, Math.PI * 2);
        ctx.fillStyle = clr;
        ctx.shadowColor = clr;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      draw();
      const id = window.setInterval(() => {
        data.shift();
        data.push(45 + Math.random() * 48);
        draw();
      }, 900 + ci * 200);
      cleanups.push(() => window.clearInterval(id));
    });
    return () => cleanups.forEach((fn) => fn());
  }, [rootRef]);
}

/* Matrix row reveal + check pop */
export function usePricingMatrix(tableRef: RefObject<HTMLTableElement | null>) {
  useEffect(() => {
    const table = tableRef.current;
    if (!table) return;
    const rows = Array.from(table.querySelectorAll<HTMLTableRowElement>(".matrix-row"));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            window.setTimeout(() => {
              e.target.classList.add("revealed");
              const checks = e.target.querySelectorAll<HTMLElement>(".check-icon");
              checks.forEach((c, j) => {
                window.setTimeout(() => c.classList.add("pop"), j * 60 + 200);
              });
            }, i * 40);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    rows.forEach((r) => obs.observe(r));
    return () => obs.disconnect();
  }, [tableRef]);
}

/* CTA particle burst */
export function usePricingCtaBurst(btnRef: RefObject<HTMLAnchorElement | null>) {
  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;
    function onClick(e: MouseEvent) {
      for (let i = 0; i < 14; i++) {
        const p = document.createElement("div");
        const angle = Math.random() * Math.PI * 2;
        const dist = 50 + Math.random() * 80;
        const dx = Math.cos(angle) * dist;
        const dy = Math.sin(angle) * dist;
        const sz = 2 + Math.random() * 4;
        p.style.cssText = `position:fixed;width:${sz}px;height:${sz}px;border-radius:50%;background:${Math.random() > 0.5 ? "#2dff7a" : "#4dc8ff"};left:${e.clientX}px;top:${e.clientY}px;pointer-events:none;z-index:9999;transition:transform .6s ease-out,opacity .6s ease-out;`;
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
