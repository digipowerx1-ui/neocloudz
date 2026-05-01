"use client";

import { useRef } from "react";
import { useParticleCanvas } from "@/hooks/useParticleCanvas";
import { useTypingTerminal } from "@/hooks/useTypingTerminal";
import { useEnterpriseLiveStrip } from "@/hooks/useEnterpriseLiveStrip";

const HERO_COMMANDS = [
  "enterprise --dedicated --sla 99.99",
  "cluster init --gpu b300 --count 64",
  "vpc link --private --infiniband 400g",
  "compliance audit --soc2 --hipaa --gdpr",
];

interface AuroraBand {
  background: string;
  top: string;
  adur: string;
  adel: string;
}

const AURORA_BANDS: ReadonlyArray<AuroraBand> = [
  { background: "rgba(45,255,122,0.4)", top: "15%", adur: "16s", adel: "0s" },
  { background: "rgba(77,200,255,0.3)", top: "45%", adur: "20s", adel: "5s" },
  { background: "rgba(45,255,122,0.25)", top: "70%", adur: "13s", adel: "9s" },
];

interface StatBadge {
  text: string;
  left?: string;
  right?: string;
  top: string;
  dur: string;
  del: string;
  rot: string;
}

const STAT_BADGES: ReadonlyArray<StatBadge> = [
  { text: "🔒 SOC 2 Type II", left: "5%", top: "34%", dur: "8s", del: "0s", rot: "-2deg" },
  { text: "99.99% SLA", right: "5%", top: "32%", dur: "9s", del: "1.8s", rot: "1.5deg" },
  { text: "⚡ Dedicated Infra", left: "7%", top: "62%", dur: "7s", del: "3.2s", rot: "-1.5deg" },
  { text: "🏥 HIPAA Ready", right: "7%", top: "62%", dur: "8.5s", del: "2.1s", rot: "2deg" },
];

interface CssVars extends React.CSSProperties {
  "--adur"?: string;
  "--adel"?: string;
  "--dur"?: string;
  "--del"?: string;
  "--rot"?: string;
}

export default function EnterpriseHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useParticleCanvas(canvasRef);
  const typed = useTypingTerminal(HERO_COMMANDS);
  const live = useEnterpriseLiveStrip();

  return (
    <section className="hero" id="hero">
      <canvas ref={canvasRef} id="particle-canvas" />
      <div className="hero-grid" />
      <div className="hero-aurora">
        {AURORA_BANDS.map((band, idx) => {
          const style: CssVars = {
            background: band.background,
            top: band.top,
            "--adur": band.adur,
            "--adel": band.adel,
          };
          return <div key={idx} className="aurora-band" style={style} />;
        })}
      </div>

      {STAT_BADGES.map((badge, idx) => {
        const style: CssVars = {
          top: badge.top,
          "--dur": badge.dur,
          "--del": badge.del,
          "--rot": badge.rot,
        };
        if (badge.left) style.left = badge.left;
        if (badge.right) style.right = badge.right;
        return (
          <div key={idx} className={`stat-badge stat-badge-${idx + 1}`} style={style}>
            {badge.text}
          </div>
        );
      })}

      <div className="hero-content">
        <div className="hero-terminal-line">
          <span style={{ color: "var(--green-dim)" }}>&gt;</span>
          <span id="hero-typed">{typed}</span>
          <span className="cursor">|</span>
        </div>

        <h1 className="hero-h1">
          Build, Deploy, and Scale Massive.
          <br />
          <strong className="g">GPU Clusters — On Demand.</strong>
        </h1>

        <p className="hero-sub">
          Build, Deploy, and Scale Massive GPU Clusters — On Demand
        </p>

        <div className="hero-cta">
          <a href="/contact" className="btn-launch">
            Request a Demo →
          </a>
          <a href="/contact" className="btn-outline">
            Download Security Brief
          </a>
        </div>

        <div className="hero-live-strip">
          <div className="hlm">
            <span className="hlm-val" id="hl-clusters">
              {live.clusters}
            </span>
            <span className="hlm-lbl">Enterprise Clusters</span>
          </div>
          <div className="hlm-div" />
          <div className="hlm">
            <span className="hlm-val" id="hl-gpus">
              {live.gpus}
            </span>
            <span className="hlm-lbl">Dedicated GPUs</span>
          </div>
          <div className="hlm-div" />
          <div className="hlm">
            <span className="hlm-val" id="hl-resp">
              {live.resp}
              <span style={{ fontSize: "12px" }}>ms</span>
            </span>
            <span className="hlm-lbl">Avg Response Time</span>
          </div>
          <div className="hlm-div" />
          <div className="hlm">
            <span className="hlm-val" id="hl-countries">
              42
            </span>
            <span className="hlm-lbl">Countries</span>
          </div>
          <div className="hlm-div" />
          <div className="hlm">
            <span className="hlm-val" id="hl-uptime">
              {live.uptime}
              <span style={{ fontSize: "12px" }}>%</span>
            </span>
            <span className="hlm-lbl">Uptime This Year</span>
          </div>
        </div>
      </div>
    </section>
  );
}
