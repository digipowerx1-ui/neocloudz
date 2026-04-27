/* eslint-disable react/no-unescaped-entities, @typescript-eslint/ban-ts-comment */
"use client";

import { useEffect, useRef, useState } from "react";
import "./enterprise.css";

export default function EnterprisePage() {
  useEffect(() => {
    /* ── 1. Scroll progress bar ── */
    const bar = document.getElementById("scroll-bar");
    const handleScroll = () => {
      if (!bar) return;
      const pct =
        window.scrollY / (document.body.scrollHeight - window.innerHeight);
      bar.style.width = pct * 100 + "%";
    };
    window.addEventListener("scroll", handleScroll);

    /* ── 2. Particle network canvas (hero) ── */
    let animId: number;
    (function () {
      const c = document.getElementById("particle-canvas") as HTMLCanvasElement;
      if (!c) return;
      const ctx = c.getContext("2d");
      if (!ctx) return;
      let W: number, H: number;
      const pts: any[] = [];
      const N = 90,
        G = "45,255,122",
        B = "77,200,255";
      function resize() {
        if (!c) return;
        W = c.width = c.offsetWidth;
        H = c.height = c.offsetHeight;
      }
      function Pt(this: any) {
        this.reset = function () {
          this.x = Math.random() * W;
          this.y = Math.random() * H;
          this.vx = (Math.random() - 0.5) * 0.45;
          this.vy = (Math.random() - 0.5) * 0.45;
          this.r = Math.random() * 1.8 + 0.5;
          this.col = Math.random() > 0.7 ? B : G;
          this.a = Math.random() * 0.5 + 0.2;
        };
        this.reset();
        this.tick = function () {
          this.x += this.vx;
          this.y += this.vy;
          if (this.x < 0) this.x = W;
          if (this.x > W) this.x = 0;
          if (this.y < 0) this.y = H;
          if (this.y > H) this.y = 0;
        };
      }
      for (let i = 0; i < N; i++) {
        const p = new (Pt as any)();
        pts.push(p);
      }
      function draw() {
        if (!ctx) return;
        ctx.clearRect(0, 0, W, H);
        for (let i = 0; i < pts.length; i++)
          for (let j = i + 1; j < pts.length; j++) {
            const dx = pts[i].x - pts[j].x,
              dy = pts[i].y - pts[j].y,
              d = Math.sqrt(dx * dx + dy * dy);
            if (d < 130) {
              const a = (1 - d / 130) * 0.2;
              ctx.beginPath();
              ctx.strokeStyle = `rgba(${pts[i].col},${a})`;
              ctx.lineWidth = 0.7;
              ctx.moveTo(pts[i].x, pts[i].y);
              ctx.lineTo(pts[j].x, pts[j].y);
              ctx.stroke();
            }
          }
        pts.forEach((p) => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.col},${p.a})`;
          ctx.fill();
          p.tick();
        });
        animId = requestAnimationFrame(draw);
      }
      resize();
      draw();
      window.addEventListener("resize", resize);
    })();

    /* ── 3. Typing terminal headline ── */
    let typeTimer: any;
    (function () {
      const el = document.getElementById("hero-typed");
      if (!el) return;
      const cmds = [
        "enterprise --dedicated --sla 99.99",
        "cluster init --gpu b300 --count 64",
        "vpc link --private --infiniband 400g",
        "compliance audit --soc2 --hipaa --gdpr",
      ];
      let ci = 0,
        i = 0,
        deleting = false;
      function type() {
        const text = cmds[ci];
        if (!deleting) {
          el!.textContent = text.slice(0, ++i);
          if (i >= text.length) {
            deleting = true;
            typeTimer = setTimeout(type, 3200);
            return;
          }
        } else {
          el!.textContent = text.slice(0, --i);
          if (i <= 0) {
            deleting = false;
            ci = (ci + 1) % cmds.length;
            typeTimer = setTimeout(type, 400);
            return;
          }
        }
        typeTimer = setTimeout(type, deleting ? 28 : 52);
      }
      typeTimer = setTimeout(type, 900);
    })();

    /* ── 4. Hero live strip counters ── */
    let stripInterval: any;
    (function () {
      let clusters = 142,
        gpus = 18432,
        resp = 11,
        uptimeVal = 99.991;
      const clEl = document.getElementById("hl-clusters");
      const gpEl = document.getElementById("hl-gpus");
      const rpEl = document.getElementById("hl-resp");
      const utEl = document.getElementById("hl-uptime");
      function clamp(v: number, mn: number, mx: number) {
        return Math.max(mn, Math.min(mx, v));
      }
      function rand(range: number) {
        return Math.round((Math.random() - 0.5) * range * 2);
      }
      stripInterval = setInterval(() => {
        clusters = clamp(clusters + rand(1), 138, 148);
        gpus = clamp(gpus + rand(8), 18200, 18700);
        resp = clamp(resp + rand(1), 8, 15);
        uptimeVal = clamp(
          uptimeVal + (Math.random() - 0.5) * 0.001,
          99.988,
          99.999
        );
        if (clEl) clEl.textContent = clusters.toString();
        if (gpEl) gpEl.textContent = gpus.toLocaleString();
        if (rpEl)
          rpEl.innerHTML = resp + '<span style="font-size:12px">ms</span>';
        if (utEl)
          utEl.innerHTML =
            uptimeVal.toFixed(3) + '<span style="font-size:12px">%</span>';
      }, 1800);
    })();

    /* ── 5. Architecture diagram canvas ── */
    let archAnimId: any;
    (function () {
      const c = document.getElementById("arch-canvas") as HTMLCanvasElement;
      if (!c) return;
      const ctx = c.getContext("2d");
      if (!ctx) return;
      let W: number, H: number;
      function setSize() {
        if (!c) return;
        W = c.width = c.offsetWidth;
        H = c.height = c.offsetHeight;
      }
      setSize();
      window.addEventListener("resize", setSize);

      const nodes = [
        { label: "Your VPC", sub: "Private Network", rx: 0.1, ry: 0.45 },
        { label: "NeoCloudz Fabric", sub: "InfiniBand 400G", rx: 0.36, ry: 0.45 },
        { label: "GPU Cluster", sub: "Dedicated B300×64", rx: 0.64, ry: 0.45 },
        { label: "WEKA Storage", sub: "<10μs · 1.4 TB/s", rx: 0.9, ry: 0.45 },
      ];
      const connections = [
        [0, 1],
        [1, 2],
        [2, 3],
      ];

      const packets: any[] = [];
      connections.forEach(([a, b]) => {
        for (let i = 0; i < 4; i++) {
          packets.push({
            a,
            b,
            t: Math.random(),
            speed: 0.004 + Math.random() * 0.005,
            col:
              Math.random() > 0.5
                ? "rgba(45,255,122,1)"
                : "rgba(77,200,255,1)",
            sz: 3 + Math.random() * 2,
          });
        }
      });
      const pulseT = nodes.map(() => Math.random() * Math.PI * 2);

      function draw(ts: number) {
        if (!ctx) return;
        ctx.clearRect(0, 0, W, H);
        const px = (n: any) => [n.rx * W, n.ry * H];

        // Connection lines
        connections.forEach(([a, b]) => {
          const [ax, ay] = px(nodes[a]),
            [bx, by] = px(nodes[b]);
          ctx.beginPath();
          ctx.strokeStyle = "rgba(45,255,122,0.14)";
          ctx.lineWidth = 2;
          ctx.setLineDash([10, 7]);
          ctx.moveTo(ax, ay);
          ctx.lineTo(bx, by);
          ctx.stroke();
          ctx.setLineDash([]);
        });

        // Packets
        packets.forEach((p) => {
          p.t += p.speed;
          if (p.t >= 1) p.t = 0;
          const [ax, ay] = px(nodes[p.a]),
            [bx, by] = px(nodes[p.b]);
          const nx = ax + (bx - ax) * p.t,
            ny = ay + (by - ay) * p.t;
          ctx.beginPath();
          ctx.arc(nx, ny, p.sz * 2.4, 0, Math.PI * 2);
          ctx.fillStyle = p.col.replace(",1)", ",.12)");
          ctx.fill();
          ctx.beginPath();
          ctx.arc(nx, ny, p.sz, 0, Math.PI * 2);
          ctx.fillStyle = p.col;
          ctx.shadowColor = p.col;
          ctx.shadowBlur = 10;
          ctx.fill();
          ctx.shadowBlur = 0;
        });

        // Nodes
        nodes.forEach((n, i) => {
          const [nx, ny] = px(n);
          const phase = pulseT[i] + ts * 0.0009;
          const pf = 0.5 + 0.5 * Math.sin(phase);

          // Outer ring
          ctx.beginPath();
          ctx.arc(nx, ny, 38 + pf * 8, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(45,255,122,${0.06 + pf * 0.06})`;
          ctx.lineWidth = 1;
          ctx.stroke();

          // Node circle
          const grad = ctx.createRadialGradient(nx, ny, 0, nx, ny, 30);
          grad.addColorStop(0, "rgba(45,255,122,0.18)");
          grad.addColorStop(1, "rgba(10,20,10,0.9)");
          ctx.beginPath();
          ctx.arc(nx, ny, 30, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
          ctx.beginPath();
          ctx.arc(nx, ny, 30, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(45,255,122,${0.35 + pf * 0.3})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Icon
          ctx.fillStyle = "rgba(45,255,122,0.8)";
          ctx.font = 'bold 13px "JetBrains Mono",monospace';
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          const icons = ["🏢", "🔗", "⚡", "🗄️"];
          ctx.fillText(icons[i], nx, ny);

          // Label
          ctx.fillStyle = "#f0f5f0";
          ctx.font = 'bold 12px "JetBrains Mono",monospace';
          ctx.textBaseline = "alphabetic";
          ctx.fillText(n.label, nx, ny + 52);
          ctx.fillStyle = "rgba(74,90,74,0.9)";
          ctx.font = '10px "JetBrains Mono",monospace';
          ctx.fillText(n.sub, nx, ny + 68);
        });

        archAnimId = requestAnimationFrame(draw);
      }
      archAnimId = requestAnimationFrame(draw);
    })();

    /* ── 6. Shield SVG animation ── */
    let shieldAnimId: any;
    (function () {
      const ring = document.querySelector(".shield-ring");
      if (!ring) return;
      let t = 0;
      function animate() {
        t += 0.018;
        const p = 0.5 + 0.5 * Math.sin(t);
        ring!.setAttribute("stroke-opacity", (0.1 + p * 0.35).toFixed(3));
        ring!.setAttribute("r", (40 + p * 7).toFixed(1));
        shieldAnimId = requestAnimationFrame(animate);
      }
      animate();
    })();

    /* ── 7. Compliance badge pop-in ── */
    (function () {
      const badges = document.querySelectorAll(".comp-badge");
      const obs = new IntersectionObserver(
        (entries) => {
          if (!entries[0].isIntersecting) return;
          badges.forEach((b) => {
            const delay = parseInt(b.getAttribute("data-delay") || "0");
            setTimeout(() => b.classList.add("pop"), delay);
          });
          obs.disconnect();
        },
        { threshold: 0.3 }
      );
      const sec = document.getElementById("security");
      if (sec) obs.observe(sec);
    })();

    /* ── 8. Audit log streamer ── */
    let auditTimer: any;
    (function () {
      const log = document.getElementById("audit-log");
      if (!log) return;
      const entries = [
        { c: "text-green", m: "[SOC2]   Annual audit completed — PASS — zero findings" },
        { c: "", m: "[AUTH]   MFA enforced on all admin accounts (142 users)" },
        { c: "text-green", m: "[ENCR]   AES-256 at-rest encryption verified on all volumes" },
        { c: "text-blue", m: "[NET]    VPC flow logs exported to SIEM — 0 anomalies detected" },
        { c: "text-green", m: "[HIPAA]  PHI isolation boundary check — PASS" },
        { c: "", m: "[IAM]    Privilege access review completed — 14 accounts rotated" },
        { c: "text-green", m: "[GDPR]   Data residency constraints applied — EU region isolated" },
        { c: "text-amber", m: "[WARN]   Certificate expiry in 28 days — auto-renewal queued" },
        { c: "text-green", m: "[ISO]    ISO 27001 control audit checkpoint — all controls green" },
        { c: "", m: "[LOG]    Immutable audit trail synced to cold storage (S3 Glacier)" },
        { c: "text-green", m: "[PCI]    Cardholder data scope verified — zero PAN exposure" },
        { c: "text-blue", m: "[SCAN]   Vulnerability scan complete — 0 critical / 2 low (patching)" },
      ];
      let idx = 0,
        running = false;

      function streamLine() {
        if (idx >= entries.length) {
          auditTimer = setTimeout(() => {
            log!.innerHTML = "";
            idx = 0;
            streamLine();
          }, 3200);
          return;
        }
        const e = entries[idx++];
        const now = new Date();
        const ts = [now.getHours(), now.getMinutes(), now.getSeconds()]
          .map((n) => String(n).padStart(2, "0"))
          .join(":");
        const div = document.createElement("div");
        div.className = "log-line flex gap-3";
        div.style.cssText =
          "opacity:0;transform:translateX(-8px);transition:opacity 0.3s,transform 0.3s;";
        div.innerHTML = `<span class="log-time text-muted shrink-0">${ts}</span><span class="log-msg text-text ${e.c}">${e.m}</span>`;
        log!.appendChild(div);
        requestAnimationFrame(() => {
          div.style.opacity = "1";
          div.style.transform = "translateX(0)";
        });
        log!.scrollTop = log!.scrollHeight;
        auditTimer = setTimeout(streamLine, 820);
      }

      const obs = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !running) {
            running = true;
            streamLine();
            obs.disconnect();
          }
        },
        { threshold: 0.3 }
      );
      const sec = document.getElementById("security");
      if (sec) obs.observe(sec);
    })();

    /* ── 9. SLA uptime count-up + response bars ── */
    (function () {
      const slaData = [
        { id: "sla-pct-0", target: 99.9, dec: 1, dur: 1400 },
        { id: "sla-pct-1", target: 99.99, dec: 2, dur: 1800 },
        { id: "sla-pct-2", target: 99.999, dec: 3, dur: 2200 },
      ];
      const cards = document.querySelectorAll(".sla-card");
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry, cardIdx) => {
            if (!entry.isIntersecting) return;
            const cfg = slaData[cardIdx];
            if (!cfg) return;
            const el = document.getElementById(cfg.id);
            if (!el) return;
            const start = performance.now();
            (function tick(now) {
              const prog = Math.min((now - start) / cfg.dur, 1);
              const eased = 1 - Math.pow(1 - prog, 3);
              el.textContent = (eased * cfg.target).toFixed(cfg.dec) + "%";
              if (prog < 1) requestAnimationFrame(tick);
              else el.textContent = cfg.target.toFixed(cfg.dec) + "%";
            })(start);
            const fill = entry.target.querySelector(".sla-resp-fill") as HTMLElement;
            if (fill) {
              const w = parseInt(fill.getAttribute("data-width") || "50");
              setTimeout(() => {
                fill.style.width = w + "%";
              }, 300);
            }
            obs.unobserve(entry.target);
          });
        },
        { threshold: 0.4 }
      );
      cards.forEach((c) => obs.observe(c));
    })();

    /* ── 10. Cluster configurator ── */
    let configStreamTimer: any;
    (function () {
      const config: any = {
        gpu_type: "b300",
        gpu_count: "64",
        storage: "weka_100tb",
        network: "infiniband_400g",
        support: "enterprise",
      };
      const labels: any = {
        gpu_type: {
          b200: "B200",
          b300: "B300",
          gb200: "GB200 NVL72",
          gb300: "GB300 NVL72",
        },
        gpu_count: {
          "8": "8",
          "16": "16",
          "64": "64",
          "128": "128",
          "512": "512",
        },
        storage: {
          none: "none",
          weka_10tb: "weka_10tb",
          weka_100tb: "weka_100tb",
        },
        network: {
          standard: "standard",
          infiniband_400g: "infiniband_400g",
          custom: "custom_fabric",
        },
        support: {
          enterprise: "enterprise",
          mission_critical: "mission_critical",
        },
      };
      const slaMap: any = {
        b200: "99.9%",
        b300: "99.99%",
        gb200: "99.99%",
        gb300: "99.999%",
      };
      const output = document.getElementById("config-output");

      function getLines() {
        return [
          { c: "text-green", m: "> neo enterprise config --cluster custom" },
          { c: "text-muted", m: "  Initializing enterprise configuration..." },
          { c: "", m: "  gpu_type:    " + labels.gpu_type[config.gpu_type] },
          { c: "", m: "  gpu_count:   " + labels.gpu_count[config.gpu_count] },
          { c: "", m: "  storage:     " + labels.storage[config.storage] },
          { c: "", m: "  network:     " + labels.network[config.network] },
          { c: "", m: "  sla:         " + slaMap[config.gpu_type] },
          { c: "", m: "  support:     " + labels.support[config.support] },
          { c: "", m: "  compliance:  soc2,hipaa,gdpr,iso27001" },
          { c: "text-muted", m: "" },
          { c: "text-green", m: "  Estimated:   Contact Sales for Custom Pricing" },
          { c: "text-blue", m: "> Configuration validated ✓ — Ready to submit" },
        ];
      }

      function stream() {
        clearTimeout(configStreamTimer);
        if (output) output.innerHTML = "";
        const lines = getLines();
        let i = 0;
        function next() {
          if (!output || i >= lines.length) return;
          const ln = lines[i++];
          const now = new Date();
          const ts = [now.getHours(), now.getMinutes(), now.getSeconds()]
            .map((n) => String(n).padStart(2, "0"))
            .join(":");
          const div = document.createElement("div");
          div.className = "log-line flex gap-3";
          div.style.cssText =
            "opacity:0;transform:translateX(-6px);transition:opacity 0.22s,transform 0.22s;";
          div.innerHTML = `<span class="log-time text-muted shrink-0">${ts}</span><span class="log-msg text-text ${ln.c}">${ln.m}</span>`;
          output.appendChild(div);
          requestAnimationFrame(() => {
            div.style.opacity = "1";
            div.style.transform = "translateX(0)";
          });
          output.scrollTop = output.scrollHeight;
          configStreamTimer = setTimeout(next, 105);
        }
        next();
      }

      document.querySelectorAll(".config-options").forEach((group) => {
        group.querySelectorAll(".cfg-btn").forEach((btn) => {
          btn.addEventListener("click", () => {
            group
              .querySelectorAll(".cfg-btn")
              .forEach((b) => b.classList.remove("active", "bg-[#2dff7a]/10", "border-green", "text-green"));
            group
              .querySelectorAll(".cfg-btn")
              .forEach((b) => b.classList.add("bg-white/5", "border-white/10", "text-muted"));
            
            btn.classList.add("active", "bg-[#2dff7a]/10", "border-green", "text-green");
            btn.classList.remove("bg-white/5", "border-white/10", "text-muted");
            
            config[group.getAttribute("data-key") as string] = btn.getAttribute(
              "data-val"
            );
            clearTimeout(configStreamTimer);
            configStreamTimer = setTimeout(stream, 150);
          });
        });
      });

      const submitBtn = document.getElementById("config-submit");
      if (submitBtn) {
        submitBtn.addEventListener("click", () => {
          const div = document.createElement("div");
          div.className = "log-line flex gap-3";
          const ts = new Date().toTimeString().slice(0, 8);
          div.innerHTML = `<span class="log-time text-muted shrink-0">${ts}</span><span class="log-msg text-green">> Configuration submitted — Sales team will contact you within 1 business day ✓</span>`;
          div.style.cssText = "opacity:0;transition:opacity 0.3s;";
          if (output) {
            output.appendChild(div);
            requestAnimationFrame(() => (div.style.opacity = "1"));
            output.scrollTop = output.scrollHeight;
          }
        });
      }

      setTimeout(stream, 700);
    })();

    /* ── 11. Migration timeline ── */
    let timelineAnimId: any;
    (function () {
      const particle = document.getElementById("tl-particle");
      const steps = document.querySelectorAll(".timeline-step");
      const nodes = document.querySelectorAll(".tl-node");
      const section = document.getElementById("onboarding");
      if (!particle || !steps.length || !section) return;

      const nodePositions = [0, 25, 50, 75, 100];
      let currentPct = 0,
        animRunning = false;

      function setTier(idx: number, cb?: () => void) {
        nodes.forEach((n) => n.classList.remove("pulse"));
        const target = nodePositions[idx];
        const startPct = currentPct;
        const startTime = performance.now();
        const duration = 900;
        function frame(now: number) {
          const p = Math.min((now - startTime) / duration, 1);
          const e = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
          currentPct = startPct + (target - startPct) * e;
          particle!.style.left = currentPct + "%";
          if (p < 1) {
            timelineAnimId = requestAnimationFrame(frame);
          } else {
            currentPct = target;
            particle!.style.left = target + "%";
            nodes[idx].classList.add("pulse");
            if (cb) setTimeout(cb, 650);
          }
        }
        timelineAnimId = requestAnimationFrame(frame);
      }

      function loop(stepIdx: number) {
        setTier(stepIdx, () => {
          const next = (stepIdx + 1) % 5;
          if (next === 0) {
            setTimeout(() => {
              nodes.forEach((n) => n.classList.remove("pulse"));
              currentPct = 0;
              particle!.style.left = "0%";
              setTimeout(() => loop(0), 400);
            }, 800);
          } else loop(next);
        });
      }

      const obs = new IntersectionObserver(
        (entries) => {
          if (!entries[0].isIntersecting || animRunning) return;
          animRunning = true;
          steps.forEach((s: any, i) => {
            s.style.transitionDelay = i * 0.12 + "s";
            s.classList.add("vis");
          });
          setTimeout(() => loop(0), 600);
          obs.disconnect();
        },
        { threshold: 0.3 }
      );
      obs.observe(section);
    })();

    /* ── 12. Waveform canvas (CTA) ── */
    let waveAnimId: any;
    (function () {
      const c = document.getElementById("wave-canvas") as HTMLCanvasElement;
      if (!c) return;
      const ctx = c.getContext("2d");
      if (!ctx) return;
      let W: number,
        H: number,
        t = 0;
      const waves = [
        { amp: 28, fr: 0.008, spd: 1.0, col: "rgba(45,255,122,", lw: 1.5, ph: 0 },
        { amp: 16, fr: 0.014, spd: 1.7, col: "rgba(45,255,122,", lw: 0.8, ph: 2.1 },
        { amp: 38, fr: 0.005, spd: 0.65, col: "rgba(77,200,255,", lw: 1.0, ph: 4.3 },
        { amp: 12, fr: 0.02, spd: 2.2, col: "rgba(255,184,77,", lw: 0.6, ph: 1.0 },
      ];
      function resize() {
        W = c.width = c.offsetWidth;
        H = c.height = c.offsetHeight;
      }
      function draw() {
        ctx!.clearRect(0, 0, W, H);
        t += 0.013;
        waves.forEach((w) => {
          [0.45, 0.08].forEach((alpha, gi) => {
            ctx!.beginPath();
            for (let x = 0; x <= W; x += gi ? 4 : 2) {
              const y =
                H / 2 +
                Math.sin(x * w.fr + t * w.spd + w.ph) * w.amp +
                Math.sin(x * w.fr * 1.8 + t * w.spd * 0.55) * (w.amp * 0.35);
              x === 0 ? ctx!.moveTo(x, y) : ctx!.lineTo(x, y);
            }
            ctx!.strokeStyle = w.col + alpha + ")";
            ctx!.lineWidth = gi ? w.lw * 7 : w.lw;
            ctx!.stroke();
          });
        });
        waveAnimId = requestAnimationFrame(draw);
      }
      resize();
      draw();
      window.addEventListener("resize", resize);
    })();

    /* ── 13. Scroll reveal ── */
    (function () {
      const sel =
        ".ent-card,.testi-card,.sla-card,.hp-label,.hp-h2,.hp-sub,.reveal,.faq-item,.timeline-step";
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e, i) => {
            if (e.isIntersecting) {
              setTimeout(() => e.target.classList.add("visible"), i * 55);
              obs.unobserve(e.target);
            }
          });
        },
        { threshold: 0.1 }
      );
      document.querySelectorAll(sel).forEach((el) => {
        if (!el.classList.contains("reveal")) el.classList.add("reveal");
        obs.observe(el);
      });
    })();

    /* ── 14. FAQ accordion ── */
    const faqs = document.querySelectorAll(".faq-q");
    const faqHandler = (e: any) => {
      const q = e.currentTarget;
      const item = q.parentElement;
      const wasOpen = item.classList.contains("open");
      document
        .querySelectorAll(".faq-item")
        .forEach((i) => i.classList.remove("open"));
      if (!wasOpen) item.classList.add("open");
    };
    faqs.forEach((q) => q.addEventListener("click", faqHandler));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animId);
      clearTimeout(typeTimer);
      clearInterval(stripInterval);
      cancelAnimationFrame(archAnimId);
      cancelAnimationFrame(shieldAnimId);
      clearTimeout(auditTimer);
      clearTimeout(configStreamTimer);
      cancelAnimationFrame(timelineAnimId);
      cancelAnimationFrame(waveAnimId);
      faqs.forEach((q) => q.removeEventListener("click", faqHandler));
    };
  }, []);

  return (
    <div className="bg-bg text-text font-sans overflow-x-hidden min-h-screen">
      {/* Scroll progress bar */}
      <div
        id="scroll-bar"
        className="fixed top-0 left-0 h-[2px] bg-green z-[500] w-0 transition-all duration-100 shadow-[0_0_8px_#2dff7a]"
      ></div>

      {/* ═══════════════════════ NAV ═══════════════════════ */}
      <nav className="fixed top-0 left-0 right-0 z-[200] h-16 flex items-center justify-between px-10 bg-[#0a0f0a]/90 backdrop-blur-md border-b border-border">
        <a
          href="#"
          className="font-sans text-[20px] font-extrabold text-white no-underline tracking-[-0.5px]"
        >
          Neo<span className="text-green">Cloudz</span>
        </a>
        <ul className="flex gap-8 list-none m-0 p-0">
          <li>
            <a
              href="#"
              className="text-[#c8d4c8]/65 no-underline text-[14px] font-medium transition-colors hover:text-white"
            >
              Products
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-[#c8d4c8]/65 no-underline text-[14px] font-medium transition-colors hover:text-white"
            >
              Solution
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-[#c8d4c8]/65 no-underline text-[14px] font-medium transition-colors hover:text-white"
            >
              Pricing
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-green no-underline text-[14px] font-medium transition-colors"
            >
              Enterprise
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-[#c8d4c8]/65 no-underline text-[14px] font-medium transition-colors hover:text-white"
            >
              Company
            </a>
          </li>
        </ul>
        <a
          href="#"
          className="bg-green text-[#0a0f0a] px-[22px] py-[10px] rounded-md text-[13px] font-bold no-underline flex items-center gap-[6px] transition-opacity hover:opacity-85"
        >
          Launch AI Instances ▶
        </a>
      </nav>

      {/* ═══════════════════════ HERO ═══════════════════════ */}
      <section
        className="min-h-screen pt-16 flex flex-col items-center justify-center relative overflow-hidden text-center"
        id="hero"
      >
        <canvas
          id="particle-canvas"
          className="absolute inset-0 w-full h-full z-[2] pointer-events-none"
        ></canvas>
        <div className="absolute inset-0 z-[1] hero-grid-bg"></div>
        <div className="hero-aurora">
          <div
            className="aurora-band"
            style={{
              background: "rgba(45,255,122,0.4)",
              top: "15%",
              // @ts-ignore
              "--adur": "16s",
              "--adel": "0s",
            }}
          ></div>
          <div
            className="aurora-band"
            style={{
              background: "rgba(77,200,255,0.3)",
              top: "45%",
              // @ts-ignore
              "--adur": "20s",
              "--adel": "5s",
            }}
          ></div>
          <div
            className="aurora-band"
            style={{
              background: "rgba(45,255,122,0.25)",
              top: "70%",
              // @ts-ignore
              "--adur": "13s",
              "--adel": "9s",
            }}
          ></div>
        </div>

        {/* Floating stat badges */}
        <div
          className="stat-badge"
          style={{
            left: "5%",
            top: "34%",
            // @ts-ignore
            "--dur": "8s",
            "--del": "0s",
            "--rot": "-2deg",
          }}
        >
          🔒 SOC 2 Type II
        </div>
        <div
          className="stat-badge"
          style={{
            right: "5%",
            top: "32%",
            // @ts-ignore
            "--dur": "9s",
            "--del": "1.8s",
            "--rot": "1.5deg",
          }}
        >
          99.99% SLA
        </div>
        <div
          className="stat-badge"
          style={{
            left: "7%",
            top: "62%",
            // @ts-ignore
            "--dur": "7s",
            "--del": "3.2s",
            "--rot": "-1.5deg",
          }}
        >
          ⚡ Dedicated Infra
        </div>
        <div
          className="stat-badge"
          style={{
            right: "7%",
            top: "62%",
            // @ts-ignore
            "--dur": "8.5s",
            "--del": "2.1s",
            "--rot": "2deg",
          }}
        >
          🏥 HIPAA Ready
        </div>

        <div className="relative z-[20] px-10 max-w-[900px]">
          <div className="font-mono text-[14px] text-green mb-[22px] flex items-center justify-center gap-[6px]">
            <span className="text-[#1aaa4e]">&#62;</span>
            <span id="hero-typed"></span>
            <span className="cursor">|</span>
          </div>

          <h1 className="text-[clamp(38px,5.5vw,76px)] font-extrabold text-white tracking-[-2px] leading-[1.03] mb-5">
            GPU Infrastructure.<br />
            <strong className="text-green font-extrabold">Enterprise Grade.</strong>
          </h1>

          <p className="text-[18px] text-[#c8d4c8]/60 max-w-[600px] mx-auto mb-9 leading-[1.65]">
            Dedicated clusters. Private networking. SLA-backed uptime.<br />
            Built for teams that can't afford downtime.
          </p>

          <div className="flex gap-[14px] justify-center flex-wrap mb-12">
            <a
              href="#demo"
              className="bg-green text-[#060a06] px-7 py-[13px] rounded-md font-bold text-[14px] no-underline flex items-center gap-2 transition-all hover:shadow-[0_0_28px_rgba(45,255,122,0.4)] hover:-translate-y-[1px]"
            >
              Request a Demo &#8594;
            </a>
            <a
              href="#"
              className="bg-transparent text-text px-7 py-[13px] rounded-md font-semibold text-[14px] no-underline flex items-center gap-2 border border-white/10 transition-colors hover:border-[#2dff7a]/40"
            >
              Download Security Brief
            </a>
          </div>

          <div className="flex gap-6 px-7 py-[14px] flex-wrap justify-center bg-[#0d3320]/35 border border-[#2dff7a]/10 rounded-[10px] backdrop-blur-md relative z-[3]">
            <div className="flex flex-col items-center gap-[3px]">
              <span className="font-mono text-[18px] font-bold text-green" id="hl-clusters">
                142
              </span>
              <span className="text-[10px] text-muted uppercase tracking-[0.08em] whitespace-nowrap">
                Enterprise Clusters
              </span>
            </div>
            <div className="w-[1px] bg-[#2dff7a]/15 self-stretch"></div>
            <div className="flex flex-col items-center gap-[3px]">
              <span className="font-mono text-[18px] font-bold text-green" id="hl-gpus">
                18,432
              </span>
              <span className="text-[10px] text-muted uppercase tracking-[0.08em] whitespace-nowrap">
                Dedicated GPUs
              </span>
            </div>
            <div className="w-[1px] bg-[#2dff7a]/15 self-stretch"></div>
            <div className="flex flex-col items-center gap-[3px]">
              <span className="font-mono text-[18px] font-bold text-green" id="hl-resp">
                11<span className="text-[12px]">ms</span>
              </span>
              <span className="text-[10px] text-muted uppercase tracking-[0.08em] whitespace-nowrap">
                Avg Response Time
              </span>
            </div>
            <div className="w-[1px] bg-[#2dff7a]/15 self-stretch"></div>
            <div className="flex flex-col items-center gap-[3px]">
              <span className="font-mono text-[18px] font-bold text-green" id="hl-countries">
                42
              </span>
              <span className="text-[10px] text-muted uppercase tracking-[0.08em] whitespace-nowrap">
                Countries
              </span>
            </div>
            <div className="w-[1px] bg-[#2dff7a]/15 self-stretch"></div>
            <div className="flex flex-col items-center gap-[3px]">
              <span className="font-mono text-[18px] font-bold text-green" id="hl-uptime">
                99.991<span className="text-[12px]">%</span>
              </span>
              <span className="text-[10px] text-muted uppercase tracking-[0.08em] whitespace-nowrap">
                Uptime This Year
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ TICKER ═══════════════════════ */}
      <div className="bg-surface border-y border-[#2dff7a]/10 overflow-hidden">
        <div className="ticker-track">
          {[1, 2].map((i) => (
            <div key={i} className="flex">
              <span className="inline-flex items-center gap-[10px] px-10 py-[18px] font-mono text-[13px] font-bold text-[#c8d4c8]/45 border-r border-[#2dff7a]/10 tracking-[0.04em] whitespace-nowrap shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-green opacity-50"></span>
                <span className="text-white">SOC 2 Type II</span> Certified
              </span>
              <span className="inline-flex items-center gap-[10px] px-10 py-[18px] font-mono text-[13px] font-bold text-[#c8d4c8]/45 border-r border-[#2dff7a]/10 tracking-[0.04em] whitespace-nowrap shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-green opacity-50"></span>
                <span className="text-white">99.99%</span> Uptime SLA
              </span>
              <span className="inline-flex items-center gap-[10px] px-10 py-[18px] font-mono text-[13px] font-bold text-[#c8d4c8]/45 border-r border-[#2dff7a]/10 tracking-[0.04em] whitespace-nowrap shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-green opacity-50"></span>
                <span className="text-white">Dedicated Bare Metal</span> Zero Shared Tenancy
              </span>
              <span className="inline-flex items-center gap-[10px] px-10 py-[18px] font-mono text-[13px] font-bold text-[#c8d4c8]/45 border-r border-[#2dff7a]/10 tracking-[0.04em] whitespace-nowrap shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-green opacity-50"></span>
                <span className="text-white">InfiniBand 400G</span> Private Fabric
              </span>
              <span className="inline-flex items-center gap-[10px] px-10 py-[18px] font-mono text-[13px] font-bold text-[#c8d4c8]/45 border-r border-[#2dff7a]/10 tracking-[0.04em] whitespace-nowrap shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-green opacity-50"></span>
                <span className="text-white">HIPAA</span> Compliant Infrastructure
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════ LOGOS ═══════════════════════ */}
      <div className="bg-surface border-b border-border py-12 px-20">
        <div className="text-center text-[12px] text-muted uppercase tracking-[0.12em] mb-8 font-bold">
          Trusted by teams building at scale
        </div>
        <div className="logos-marquee-wrap">
          <div className="logos-marquee-track">
            {[1, 2].map((i) => (
              <div key={i} className="flex">
                {[
                  "Acme AI",
                  "Quantum Labs",
                  "Apex Systems",
                  "NovaTech AI",
                  "FusionCore",
                  "Meridian AI",
                  "Helix Data",
                  "Orbital ML",
                  "CipherAI",
                  "Vertex Labs",
                ].map((logo, j) => (
                  <span
                    key={j}
                    className="inline-flex items-center px-7 py-2.5 mx-3 rounded-lg bg-surface2 border border-border text-[14px] font-bold text-[#c8d4c8]/35 tracking-[0.02em] whitespace-nowrap transition-colors hover:text-[#c8d4c8]/70 hover:border-[#2dff7a]/20 cursor-default"
                  >
                    {logo}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════ WHY ENTERPRISE ═══════════════════════ */}
      <section className="bg-bg border-t border-border py-[100px] px-20" id="why-enterprise">
        <div className="flex items-center gap-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-green mb-4 max-w-[1200px] mx-auto reveal before:content-[''] before:flex-1 before:h-[1px] before:bg-[#2dff7a]/20 after:content-[''] after:flex-1 after:h-[1px] after:bg-[#2dff7a]/20">
          Why Enterprise
        </div>
        <div className="text-[clamp(30px,3.5vw,52px)] font-extrabold text-white tracking-[-1.2px] leading-[1.07] mb-4 max-w-[1200px] mx-auto reveal">
          Built for Teams That<br />
          <span className="text-green">Can't Afford Downtime.</span>
        </div>
        <p className="text-[16px] text-muted max-w-[1200px] mx-auto leading-[1.65] reveal">
          Everything you need to run mission-critical AI with confidence — dedicated hardware, private networking, and white-glove support.
        </p>

        <div className="grid grid-cols-3 gap-5 mt-14 max-w-[1200px] mx-auto">
          {[
            { icon: "🖥️", title: "Dedicated Infrastructure", desc: "Your own bare-metal cluster with zero noisy neighbors. Every GPU, every NVLink switch, every InfiniBand port — reserved exclusively for your workloads." },
            { icon: "🔒", title: "Private Networking", desc: "VPC isolation, private InfiniBand fabric, no shared routing. Your traffic never crosses a shared network — air-gapped from day one." },
            { icon: "📈", title: "SLA-Backed Uptime", desc: "99.99% uptime SLA with financial credits for any breach. We put our money where our mouth is — downtime credits automatically applied to your next invoice." },
            { icon: "🛡️", title: "Compliance Ready", desc: "SOC 2 Type II, HIPAA, GDPR, and ISO 27001 support out of the box. Our compliance package includes audit-ready documentation and a dedicated security liaison." },
            { icon: "🎯", title: "Priority Support", desc: "Named account manager, <15min P1 response time, and a dedicated NOC team monitoring your cluster 24/7 — not a ticket queue, a direct line." },
            { icon: "📋", title: "Custom Contracts", desc: "Reserved pricing, flexible payment terms, multi-year discounts, and purchase order support. We work the way enterprise procurement works." },
          ].map((item, i) => (
            <div key={i} className={`ent-card bg-surface2 border border-border rounded-[14px] p-8 relative overflow-hidden transition-all duration-250 cursor-default reveal reveal-d${i + 1}`}>
              <div className="ent-icon w-12 h-12 rounded-xl bg-[#2dff7a]/10 border border-[#2dff7a]/15 flex items-center justify-center mb-4.5 text-[22px] transition-all duration-300">
                {item.icon}
              </div>
              <div className="text-[17px] font-bold text-white mb-2.5 tracking-[-0.3px]">
                {item.title}
              </div>
              <div className="text-[14px] text-muted leading-[1.65]">
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════ ARCHITECTURE DIAGRAM ═══════════════════════ */}
      <section className="arch-section bg-surface border-y border-border py-[100px] px-20 relative overflow-hidden" id="architecture">
        <div className="max-w-[1200px] mx-auto text-center">
          <div className="flex items-center gap-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-green mb-4 justify-center reveal before:content-[''] before:w-16 before:h-[1px] before:bg-[#2dff7a]/20 after:content-[''] after:w-16 after:h-[1px] after:bg-[#2dff7a]/20">
            Network Architecture
          </div>
          <div className="text-[clamp(30px,3.5vw,52px)] font-extrabold text-white tracking-[-1.2px] leading-[1.07] mb-4 text-center reveal">
            Zero-Trust Private Network.<br />
            <span className="text-green">Your Data Never Touches Shared Infrastructure.</span>
          </div>
        </div>
        <div className="relative w-full h-[360px] mt-12 mx-auto max-w-[1100px]">
          <canvas id="arch-canvas" className="absolute inset-0 w-full h-full"></canvas>
        </div>
        <p className="text-center font-mono text-[12px] text-muted mt-7 tracking-[0.05em]">
          All inter-node traffic runs over your private InfiniBand fabric — no public internet, no shared routing.
        </p>
      </section>

      {/* ═══════════════════════ SECURITY ═══════════════════════ */}
      <section className="bg-bg border-t border-border py-[100px] px-20" id="security">
        <div className="grid grid-cols-2 gap-[72px] items-start max-w-[1200px] mx-auto">
          {/* LEFT */}
          <div>
            <div className="flex items-center gap-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-green mb-4 reveal before:content-[''] before:w-16 before:h-[1px] before:bg-[#2dff7a]/20 after:content-[''] after:w-16 after:h-[1px] after:bg-[#2dff7a]/20">
              Security & Compliance
            </div>
            <div className="text-[clamp(30px,3.5vw,52px)] font-extrabold text-white tracking-[-1.2px] leading-[1.07] mb-4 reveal">
              Enterprise-Grade Security.<br />
              <span className="text-green">Not An Afterthought.</span>
            </div>
            <p className="text-[16px] text-muted max-w-[560px] leading-[1.65] mt-3.5 mb-0 reveal">
              Every cluster ships with a comprehensive security posture — hardened OS images, encrypted volumes, immutable audit logs, and continuous compliance monitoring.
            </p>

            <div className="my-7 reveal">
              <svg className="w-20 h-24" viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 5 L88 20 L88 63 Q88 93 50 115 Q12 93 12 63 L12 20 Z" fill="rgba(45,255,122,0.06)" stroke="rgba(45,255,122,0.5)" strokeWidth="1.5" />
                <path d="M34 60 L46 72 L68 46" stroke="#2dff7a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <circle className="shield-ring" cx="50" cy="62" r="42" stroke="rgba(45,255,122,0.15)" strokeWidth="1.5" />
              </svg>
            </div>

            <div className="flex flex-col gap-2.5 mt-2">
              {[
                { name: "SOC 2 Type II", desc: "Annual audit", delay: "0" },
                { name: "HIPAA", desc: "Healthcare ready", delay: "100" },
                { name: "GDPR", desc: "EU data residency", delay: "200" },
                { name: "ISO 27001", desc: "Information security", delay: "300" },
                { name: "PCI DSS", desc: "Payment card scope", delay: "400" },
              ].map((comp, i) => (
                <div key={i} className="comp-badge" data-delay={comp.delay}>
                  <div className="w-[26px] h-[26px] rounded-full bg-[#2dff7a]/10 flex items-center justify-center text-[14px] text-green font-extrabold shrink-0">✓</div>
                  <div className="font-mono text-[13px] font-bold text-white tracking-[0.04em]">{comp.name}</div>
                  <div className="text-[12px] text-muted ml-auto">{comp.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Audit log terminal */}
          <div>
            <div className="audit-terminal">
              <div className="bg-[#0d130d] border-b border-[#2dff7a]/10 px-4 h-10 flex items-center gap-3 select-none">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
                </div>
                <div className="flex-1 text-center font-mono text-[12px] text-[#c8d4c8]/40 tracking-[0.05em]">
                  neocloudz — compliance-audit-log — live
                </div>
                <div className="flex items-center gap-1 font-mono text-[11px] text-green tbar-status">
                  MONITORING
                </div>
              </div>
              <div className="audit-log-body p-4 font-mono text-[11px] leading-[1.9] h-[420px] overflow-y-auto" id="audit-log"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ SLA TIERS ═══════════════════════ */}
      <section className="bg-surface border-t border-border py-[100px] px-20 text-center" id="sla">
        <div className="flex items-center gap-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-green mb-4 justify-center max-w-[1100px] mx-auto reveal before:content-[''] before:w-16 before:h-[1px] before:bg-[#2dff7a]/20 after:content-[''] after:w-16 after:h-[1px] after:bg-[#2dff7a]/20">
          Support & SLA
        </div>
        <div className="text-[clamp(30px,3.5vw,52px)] font-extrabold text-white tracking-[-1.2px] leading-[1.07] mb-4 text-center max-w-[1100px] mx-auto reveal">
          SLA That Means<br />
          <span className="text-green">Something.</span>
        </div>
        <p className="text-[16px] text-muted text-center mx-auto mb-0 reveal">
          Financial credits for any downtime breach. No fine print, no excuses.
        </p>

        <div className="grid grid-cols-3 gap-5 mt-14 max-w-[1100px] mx-auto text-left">
          {/* Standard */}
          <div className="sla-card bg-surface2 border border-border rounded-[14px] p-8 relative transition-all duration-200 reveal reveal-d1">
            <div className="text-[21px] font-extrabold text-white tracking-[-0.4px] mb-1 mt-3.5">Standard</div>
            <div className="text-[12px] text-muted mb-6">Included with all plans</div>
            <div className="flex flex-col gap-[3px] mb-5">
              <span className="font-mono text-[38px] font-extrabold text-green tracking-[-1px] leading-none" id="sla-pct-0">0.0%</span>
              <span className="text-[10px] text-muted uppercase tracking-[0.09em]">Uptime SLA</span>
            </div>
            <div className="mb-6">
              <div className="text-[12px] text-muted mb-1.5">P1 Response: <span className="text-white font-bold">4 hours</span></div>
              <div className="h-1.5 bg-white/5 rounded-[3px] overflow-hidden"><div className="sla-resp-fill" data-width="25"></div></div>
            </div>
            <ul className="list-none flex flex-col gap-2.5 mb-6">
              {[
                "99.9% uptime SLA",
                "4hr P1 response",
                "Email & chat support",
                "Shared NOC monitoring",
                "Status page access"
              ].map((feat, i) => (
                <li key={i} className="text-[13px] text-[#c8d4c8]/70 flex items-start gap-2 before:content-['✓'] before:text-green before:font-bold before:shrink-0">{feat}</li>
              ))}
            </ul>
          </div>

          {/* Enterprise (featured) */}
          <div className="sla-card sla-featured bg-surface2 border border-border rounded-[14px] p-8 relative transition-all duration-200 reveal reveal-d2">
            <div className="absolute -top-[1px] left-1/2 -translate-x-1/2 bg-green text-[#060a06] text-[9px] font-extrabold tracking-[0.1em] px-3.5 py-[3px] rounded-b-[7px]">ENTERPRISE</div>
            <div className="text-[21px] font-extrabold text-white tracking-[-0.4px] mb-1 mt-3.5">Enterprise</div>
            <div className="text-[12px] text-green mb-6">Contact Sales</div>
            <div className="flex flex-col gap-[3px] mb-5">
              <span className="font-mono text-[38px] font-extrabold text-green tracking-[-1px] leading-none" id="sla-pct-1">0.00%</span>
              <span className="text-[10px] text-muted uppercase tracking-[0.09em]">Uptime SLA</span>
            </div>
            <div className="mb-6">
              <div className="text-[12px] text-muted mb-1.5">P1 Response: <span className="text-green font-bold">&lt;15 minutes</span></div>
              <div className="h-1.5 bg-white/5 rounded-[3px] overflow-hidden"><div className="sla-resp-fill shadow-[0_0_8px_rgba(45,255,122,0.5)]" data-width="75"></div></div>
            </div>
            <ul className="list-none flex flex-col gap-2.5 mb-6">
              {[
                "99.99% uptime SLA",
                "<15min P1 response",
                "Named account manager",
                "Dedicated NOC team",
                "Phone + Slack support",
                "Quarterly business reviews"
              ].map((feat, i) => (
                <li key={i} className="text-[13px] text-[#c8d4c8]/70 flex items-start gap-2 before:content-['✓'] before:text-green before:font-bold before:shrink-0">{feat}</li>
              ))}
            </ul>
            <a href="#demo" className="block w-full text-center bg-green text-[#060a06] p-3 rounded-[7px] font-bold text-[13px] no-underline transition-opacity mt-1 hover:opacity-85">Request Demo &#8594;</a>
          </div>

          {/* Mission Critical */}
          <div className="sla-card bg-surface2 border border-border rounded-[14px] p-8 relative transition-all duration-200 reveal reveal-d3">
            <div className="text-[21px] font-extrabold text-white tracking-[-0.4px] mb-1 mt-3.5">Mission Critical</div>
            <div className="text-[12px] text-green mb-6">Custom Pricing</div>
            <div className="flex flex-col gap-[3px] mb-5">
              <span className="font-mono text-[38px] font-extrabold text-green tracking-[-1px] leading-none" id="sla-pct-2">0.000%</span>
              <span className="text-[10px] text-muted uppercase tracking-[0.09em]">Uptime SLA</span>
            </div>
            <div className="mb-6">
              <div className="text-[12px] text-muted mb-1.5">P1 Response: <span className="text-amber font-bold">&lt;5 minutes</span></div>
              <div className="h-1.5 bg-white/5 rounded-[3px] overflow-hidden"><div className="sla-resp-fill !bg-gradient-to-r !from-[#b85000] !to-[#ffb84d] shadow-[0_0_8px_rgba(255,184,77,0.4)]" data-width="96"></div></div>
            </div>
            <ul className="list-none flex flex-col gap-2.5 mb-6">
              {[
                "99.999% uptime SLA",
                "<5min P1 response",
                "Dedicated SRE team",
                "24/7 war room access",
                "Incident command support"
              ].map((feat, i) => (
                <li key={i} className="text-[13px] text-[#c8d4c8]/70 flex items-start gap-2 before:content-['✓'] before:text-green before:font-bold before:shrink-0">{feat}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ CLUSTER CONFIGURATOR ═══════════════════════ */}
      <section className="bg-bg border-t border-border py-[100px] px-20" id="configurator">
        <div className="max-w-[1100px] mx-auto text-center">
          <div className="flex items-center gap-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-green mb-4 justify-center reveal before:content-[''] before:w-16 before:h-[1px] before:bg-[#2dff7a]/20 after:content-[''] after:w-16 after:h-[1px] after:bg-[#2dff7a]/20">
            Cluster Configurator
          </div>
          <div className="text-[clamp(30px,3.5vw,52px)] font-extrabold text-white tracking-[-1.2px] leading-[1.07] mb-4 reveal">
            Build Your<br />
            <span className="text-green">Dedicated Cluster.</span>
          </div>
          <p className="text-[16px] text-muted my-3.5 mx-auto reveal">
            Select your options and get an instant configuration — our team will follow up within one business day.
          </p>
        </div>

        <div className="max-w-[1100px] mt-12 mx-auto bg-[#060a06] border border-[#2dff7a]/20 rounded-[14px] overflow-hidden shadow-[0_0_0_1px_rgba(45,255,122,0.05),_0_40px_80px_rgba(0,0,0,0.8)] reveal" id="demo">
          <div className="bg-[#0d130d] border-b border-[#2dff7a]/10 px-4 h-10 flex items-center gap-3 select-none">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
              <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
              <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
            </div>
            <div className="flex-1 text-center font-mono text-[12px] text-[#c8d4c8]/40 tracking-[0.05em]">
              neocloudz — cluster-configurator — interactive
            </div>
            <div className="flex items-center gap-1 font-mono text-[11px] text-green tbar-status">
              CONFIGURING
            </div>
          </div>
          <div className="grid grid-cols-[360px_1fr] min-h-[480px]">
            {/* Selectors */}
            <div className="p-6 border-r border-[#2dff7a]/10 flex flex-col gap-5 config-selectors">
              {[
                { label: "GPU Type", key: "gpu_type", opts: [{v:"b200",l:"B200"},{v:"b300",l:"B300",a:1},{v:"gb200",l:"GB200"},{v:"gb300",l:"GB300"}] },
                { label: "Cluster Size", key: "gpu_count", opts: [{v:"8",l:"8 GPUs"},{v:"16",l:"16 GPUs"},{v:"64",l:"64 GPUs",a:1},{v:"128",l:"128 GPUs"},{v:"512",l:"512 GPUs"}] },
                { label: "Storage", key: "storage", opts: [{v:"none",l:"None"},{v:"weka_10tb",l:"10TB WEKA"},{v:"weka_100tb",l:"100TB WEKA",a:1}] },
                { label: "Networking", key: "network", opts: [{v:"standard",l:"Standard"},{v:"infiniband_400g",l:"InfiniBand 400G",a:1},{v:"custom",l:"Custom Fabric"}] },
                { label: "Support Tier", key: "support", opts: [{v:"enterprise",l:"Enterprise",a:1},{v:"mission_critical",l:"Mission Critical"}] },
              ].map((grp, i) => (
                <div key={i} className="config-group">
                  <div className="font-mono text-[10px] font-bold text-muted uppercase tracking-[0.1em] mb-2">{grp.label}</div>
                  <div className="flex gap-2 flex-wrap config-options" data-key={grp.key}>
                    {grp.opts.map((opt, j) => (
                      <button key={j} className={`cfg-btn font-mono text-[11px] font-bold py-1.5 px-3.5 rounded-md cursor-pointer transition-colors ${opt.a ? 'active bg-[#2dff7a]/10 border border-[#2dff7a]/50 text-green' : 'bg-white/5 border border-white/10 text-muted hover:border-[#2dff7a]/30 hover:text-text'}`} data-val={opt.v}>
                        {opt.l}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              <button className="mt-auto w-full flex justify-center bg-green text-[#060a06] p-2.5 rounded-[7px] font-bold text-[13px] border-none cursor-pointer font-sans transition-opacity hover:opacity-85" id="config-submit">
                Submit Configuration &#8594;
              </button>
            </div>
            {/* Output */}
            <div className="p-4 font-mono text-[11px] leading-[1.9] overflow-y-auto max-h-[480px] config-output-panel" id="config-output"></div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ ONBOARDING TIMELINE ═══════════════════════ */}
      <section className="bg-surface border-t border-border py-[100px] px-20" id="onboarding">
        <div className="max-w-[1100px] mx-auto text-center">
          <div className="flex items-center gap-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-green mb-4 justify-center reveal before:content-[''] before:w-16 before:h-[1px] before:bg-[#2dff7a]/20 after:content-[''] after:w-16 after:h-[1px] after:bg-[#2dff7a]/20">
            Onboarding
          </div>
          <div className="text-[clamp(30px,3.5vw,52px)] font-extrabold text-white tracking-[-1.2px] leading-[1.07] mb-4 reveal">
            Live in <span className="text-green">15 Days.</span>
          </div>
          <p className="text-[16px] text-muted text-center mx-auto my-3.5 mb-14 reveal">
            Our dedicated onboarding team handles everything — from initial security review to your first production training run.
          </p>
        </div>

        <div className="relative max-w-[1000px] mx-auto pt-5" id="timeline-wrap">
          <div className="absolute top-12 left-14 right-14 h-[2px] bg-[#2dff7a]/10 rounded-[1px]">
            <div className="timeline-particle" id="tl-particle"></div>
          </div>
          <div className="flex justify-between items-start relative z-[2]">
            {[
              { num: "01", label: "Security Review", days: "Day 1–2" },
              { num: "02", label: "Network Config", days: "Day 3–4" },
              { num: "03", label: "Cluster Provisioning", days: "Day 5–7" },
              { num: "04", label: "Integration & Testing", days: "Day 8–14" },
              { num: "🚀", label: "Go Live", days: "Day 15", isLive: true },
            ].map((st, i) => (
              <div key={i} className="timeline-step" data-step={i}>
                <div className={`tl-node ${st.isLive ? 'tl-node-live' : ''}`} id={`tl-node-${i}`}><span>{st.num}</span></div>
                <div className="text-[13px] font-bold text-white text-center max-w-[1200px]">{st.label}</div>
                <div className="font-mono text-[11px] text-muted">{st.days}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ TESTIMONIALS ═══════════════════════ */}
      <section className="bg-bg border-t border-border py-[100px] px-20" id="testimonials">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center gap-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-green mb-4 justify-center reveal before:content-[''] before:w-16 before:h-[1px] before:bg-[#2dff7a]/20 after:content-[''] after:w-16 after:h-[1px] after:bg-[#2dff7a]/20">
            Customer Stories
          </div>
          <div className="text-[clamp(30px,3.5vw,52px)] font-extrabold text-white tracking-[-1.2px] leading-[1.07] mb-4 text-center reveal">
            Trusted by Teams Running<br />
            <span className="text-green">Mission-Critical AI.</span>
          </div>

          <div className="grid grid-cols-3 gap-5 mt-14">
            {[
              {
                q: "NeoCloudz gave us a dedicated cluster with 99.99% uptime and our own InfiniBand fabric. Training runs that used to fail on shared infrastructure now complete reliably every time.",
                bg: "linear-gradient(135deg,#2dff7a,#1aaa4e)", in: "SR", n: "Sarah R.", r: "VP of Infrastructure · Acme AI"
              },
              {
                q: "The dedicated NOC and named account manager made our HIPAA compliance audit straightforward. Having SOC 2 Type II out of the box saved us months of work.",
                bg: "linear-gradient(135deg,#4dc8ff,#1a5080)", in: "MK", n: "Marcus K.", r: "CTO · Meridian AI"
              },
              {
                q: "From security review to Go Live in 12 days. The migration team handled our complex VPC setup and we were training on 128 B300s before the end of the second week.",
                bg: "linear-gradient(135deg,#ffb84d,#b85000)", in: "JL", n: "Jessica L.", r: "Head of ML Ops · Vertex Labs"
              }
            ].map((t, i) => (
              <div key={i} className={`testi-card bg-surface2 border border-border rounded-[14px] p-8 flex flex-col gap-6 transition-all duration-200 reveal reveal-d${i + 1}`}>
                <div className="text-[15px] text-[#c8d4c8]/75 leading-[1.7] italic flex-1 relative pt-[18px] testi-quote">{t.q}</div>
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center font-mono text-[13px] font-bold text-[#0a0f0a] shrink-0" style={{ background: t.bg }}>{t.in}</div>
                  <div>
                    <div className="text-[14px] font-bold text-white">{t.n}</div>
                    <div className="text-[12px] text-muted mt-0.5">{t.r}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ FAQ ═══════════════════════ */}
      <section className="bg-surface border-t border-border py-[100px] px-20" id="faq">
        <div className="grid grid-cols-[280px_1fr] gap-20 max-w-[1100px] mx-auto">
          <div className="faq-sidebar">
            <div className="flex items-center gap-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-green mb-4 after:content-[''] after:flex-1 after:h-[1px] after:bg-[#2dff7a]/20">
              FAQ
            </div>
            <h2 className="text-[40px] font-extrabold text-white tracking-[-1px] mb-3.5 leading-[1.1]">Enterprise<br />Questions.</h2>
            <p className="text-[14px] text-muted leading-[1.6] mt-3.5">Everything you need to know about running mission-critical AI on dedicated infrastructure.</p>
          </div>
          <div className="flex flex-col" id="faq-list">
            {[
              {
                q: "What does \"dedicated infrastructure\" actually mean?",
                a: "Dedicated infrastructure means your GPUs, InfiniBand switches, NVLink fabric, and storage are exclusively reserved for your organization — not shared with any other customer at any time. There are no hypervisors, no noisy neighbors, and no resource contention. You get bare-metal access with full hardware visibility and root-level control."
              },
              {
                q: "How does NeoCloudz handle compliance certifications?",
                a: "NeoCloudz maintains SOC 2 Type II, HIPAA, GDPR, and ISO 27001 compliance at the infrastructure level. Upon signing an Enterprise agreement, you receive access to our Trust Center with audit reports, penetration test results, and a shared responsibility matrix. A dedicated security liaison is assigned to assist with your organization's internal compliance audits."
              },
              {
                q: "What happens if NeoCloudz misses the SLA?",
                a: "SLA breaches trigger automatic service credits applied to your next invoice — no claim required, no negotiation. Enterprise customers receive 10% credit per 0.01% downtime below 99.99%. Mission Critical customers receive 25% credit per incident. Credits are calculated monthly and detailed in your billing dashboard."
              },
              {
                q: "How long does the migration process take?",
                a: "Our standard Enterprise onboarding is 15 business days from contract signature to production Go Live. This includes a security architecture review (Days 1–2), VPC and network configuration (Days 3–4), bare-metal cluster provisioning (Days 5–7), integration testing and runbook creation (Days 8–14), and final production cutover (Day 15). Accelerated onboarding is available for qualifying customers."
              },
              {
                q: "Can we negotiate custom contract terms and multi-year pricing?",
                a: "Yes. All Enterprise agreements are fully negotiable. We support purchase order invoicing, multi-year committed use discounts (up to 40% vs on-demand), custom payment terms, and committed capacity reservations. Contracts can be structured as monthly, quarterly, or annual billing cycles. Contact our enterprise sales team to begin a custom quote."
              }
            ].map((faq, i) => (
              <div key={i} className="faq-item border-b border-border">
                <div className="faq-q flex justify-between items-center py-[22px] cursor-pointer text-[16px] font-semibold text-white gap-4 transition-colors hover:text-green">
                  {faq.q}<span className="faq-arrow text-[18px] text-muted transition-transform duration-250 shrink-0">+</span>
                </div>
                <div className="faq-a text-[14px] text-muted leading-[1.7]">{faq.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ CTA ═══════════════════════ */}
      <div className="cta-banner py-[100px] px-20 bg-gradient-to-br from-[#0a1a0a] via-[#061206] to-[#0a0f0a] border-t border-[#2dff7a]/10 text-center relative overflow-hidden">
        <canvas id="wave-canvas" className="absolute inset-0 w-full h-full z-[1] pointer-events-none opacity-50"></canvas>
        <div className="flex items-center gap-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-green mb-5 justify-center relative z-[2] before:content-[''] before:w-16 before:h-[1px] before:bg-[#2dff7a]/20 after:content-[''] after:w-16 after:h-[1px] after:bg-[#2dff7a]/20">
          Get Started Today
        </div>
        <h2 className="text-[clamp(32px,4vw,58px)] font-extrabold text-white tracking-[-1.5px] leading-[1.05] mb-4 relative z-[2]">
          Ready to Go<br />
          <span className="text-green">Enterprise?</span>
        </h2>
        <p className="text-[18px] text-[#c8d4c8]/55 max-w-[520px] mx-auto mb-9 leading-[1.6] relative z-[2]">
          Join the teams running mission-critical AI on NeoCloudz dedicated infrastructure.
        </p>
        <div className="flex gap-[14px] justify-center flex-wrap relative z-[2]">
          <a href="#demo" className="bg-green text-[#060a06] px-7 py-[13px] rounded-md font-bold text-[14px] no-underline flex items-center gap-2 transition-all hover:shadow-[0_0_28px_rgba(45,255,122,0.4)] hover:-translate-y-[1px]">Request Demo ▶</a>
          <a href="#" className="bg-transparent text-text px-7 py-[13px] rounded-md font-semibold text-[14px] no-underline flex items-center gap-2 border border-white/10 transition-colors hover:border-[#2dff7a]/40">Talk to Sales →</a>
        </div>
      </div>

      {/* ═══════════════════════ FOOTER ═══════════════════════ */}
      <footer className="bg-[#060a06] border-t border-border pt-[60px] pb-9 px-20">
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1.5fr] gap-12 pb-12 border-b border-border">
          <div className="footer-brand">
            <a href="#" className="font-sans text-[20px] font-extrabold text-white no-underline tracking-[-0.5px]">Neo<span className="text-green">Cloudz</span></a>
            <p className="text-[14px] text-muted leading-[1.65] mt-3.5 max-w-[260px]">
              The fastest, most powerful GPU cloud for AI teams. Blackwell on-demand, Grace Blackwell bare metal, and WEKA storage — all in one platform.
            </p>
            <div className="flex gap-2.5 mt-5">
              {['𝕏', 'in', 'gh', 'dc'].map((s, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-[7px] bg-surface2 border border-border flex items-center justify-center text-[13px] no-underline text-muted transition-colors hover:border-[#2dff7a]/30 hover:text-green">{s}</a>
              ))}
            </div>
          </div>
          <div className="footer-col">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#c8d4c8]/40 mb-4">Products</h4>
            <ul className="list-none flex flex-col gap-2.5 m-0 p-0">
              <li><a href="#" className="text-[#c8d4c8]/50 no-underline text-[14px] transition-colors hover:text-white">B200 On-Demand</a></li>
              <li><a href="#" className="text-[#c8d4c8]/50 no-underline text-[14px] transition-colors hover:text-white">B300 On-Demand</a></li>
              <li><a href="#" className="text-[#c8d4c8]/50 no-underline text-[14px] transition-colors hover:text-white">GB200 Bare Metal</a></li>
              <li><a href="#" className="text-[#c8d4c8]/50 no-underline text-[14px] transition-colors hover:text-white">GB300 Bare Metal</a></li>
              <li><a href="#" className="text-[#c8d4c8]/50 no-underline text-[14px] transition-colors hover:text-white">WEKA Storage</a></li>
              <li><a href="#" className="text-[#c8d4c8]/50 no-underline text-[14px] transition-colors hover:text-white">Vera Rubin <span className="inline-block bg-[#2dff7a]/15 text-green text-[9px] font-extrabold py-[1px] px-1.5 rounded-[4px] ml-1.5 align-middle tracking-[0.05em]">SOON</span></a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#c8d4c8]/40 mb-4">Solutions</h4>
            <ul className="list-none flex flex-col gap-2.5 m-0 p-0">
              {["LLM Training", "Inference at Scale", "Fine-Tuning", "Research Compute", "Enterprise"].map((s, i) => (
                <li key={i}><a href="#" className="text-[#c8d4c8]/50 no-underline text-[14px] transition-colors hover:text-white">{s}</a></li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#c8d4c8]/40 mb-4">Company</h4>
            <ul className="list-none flex flex-col gap-2.5 m-0 p-0">
              <li><a href="#" className="text-[#c8d4c8]/50 no-underline text-[14px] transition-colors hover:text-white">About</a></li>
              <li><a href="#" className="text-[#c8d4c8]/50 no-underline text-[14px] transition-colors hover:text-white">Blog</a></li>
              <li><a href="#" className="text-[#c8d4c8]/50 no-underline text-[14px] transition-colors hover:text-white">Careers <span className="inline-block bg-[#2dff7a]/15 text-green text-[9px] font-extrabold py-[1px] px-1.5 rounded-[4px] ml-1.5 align-middle tracking-[0.05em]">HIRING</span></a></li>
              <li><a href="#" className="text-[#c8d4c8]/50 no-underline text-[14px] transition-colors hover:text-white">Status</a></li>
              <li><a href="#" className="text-[#c8d4c8]/50 no-underline text-[14px] transition-colors hover:text-white">Contact</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#c8d4c8]/40 mb-4">Resources</h4>
            <ul className="list-none flex flex-col gap-2.5 m-0 p-0">
              {["Documentation", "API Reference", "Benchmarks", "Pricing Calculator", "Support"].map((s, i) => (
                <li key={i}><a href="#" className="text-[#c8d4c8]/50 no-underline text-[14px] transition-colors hover:text-white">{s}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="pt-6 flex justify-between items-center flex-wrap gap-3">
          <p className="text-[13px] text-muted m-0">© 2025 NeoCloudz Inc. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="text-[13px] text-muted no-underline hover:text-text">Privacy Policy</a>
            <a href="#" className="text-[13px] text-muted no-underline hover:text-text">Terms of Service</a>
            <a href="#" className="text-[13px] text-muted no-underline hover:text-text">Security</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
