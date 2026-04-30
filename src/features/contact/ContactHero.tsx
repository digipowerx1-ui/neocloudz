"use client";

import { useLiveContactMetrics } from "@/hooks/useLiveContactMetrics";
import { HeroParticles } from "@/components/layout/HeroParticles";

interface AuroraBand {
  background: string;
  top: string;
  adur: string;
  adel: string;
}

const AURORA_BANDS: ReadonlyArray<AuroraBand> = [
  { background: "rgba(45,255,122,0.45)", top: "20%", adur: "18s", adel: "0s" },
  { background: "rgba(77,200,255,0.3)", top: "55%", adur: "22s", adel: "7s" },
  { background: "rgba(255,184,77,0.2)", top: "75%", adur: "15s", adel: "12s" },
];

interface FloatBadge {
  label: string;
  value: string;
  left?: string;
  right?: string;
  top: string;
  dur: string;
  del: string;
  rot: string;
}

const STATIC_BADGES: ReadonlyArray<FloatBadge> = [
  {
    label: "Support Tickets",
    value: "Resolved Today",
    right: "5%",
    top: "26%",
    dur: "9s",
    del: "1.5s",
    rot: "1.5deg",
  },
  {
    label: "CSAT Score",
    value: "4.9 / 5.0 ⭐",
    left: "6%",
    top: "60%",
    dur: "7.5s",
    del: "3s",
    rot: "-1deg",
  },
  {
    label: "Support Hours",
    value: "24 / 7 / 365",
    right: "6%",
    top: "62%",
    dur: "8.5s",
    del: "2s",
    rot: "2deg",
  },
];

interface CssVars extends React.CSSProperties {
  "--adur"?: string;
  "--adel"?: string;
  "--dur"?: string;
  "--del"?: string;
  "--rot"?: string;
}

export default function ContactHero() {
  const { responseLabelWithTilde } = useLiveContactMetrics();

  return (
    <section className="hero" id="hero">
      <HeroParticles />
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

      <div
        className="float-badge"
        style={
          {
            left: "5%",
            top: "28%",
            "--dur": "8s",
            "--del": "0s",
            "--rot": "-2deg",
          } as CssVars
        }
      >
        <span className="fbadge-label">Avg Response</span>
        <span className="fbadge-val" id="fb-resp">
          {responseLabelWithTilde}
        </span>
      </div>

      {STATIC_BADGES.map((badge, idx) => {
        const style: CssVars = {
          top: badge.top,
          "--dur": badge.dur,
          "--del": badge.del,
          "--rot": badge.rot,
        };
        if (badge.left) style.left = badge.left;
        if (badge.right) style.right = badge.right;
        return (
          <div key={idx} className="float-badge" style={style}>
            <span className="fbadge-label">{badge.label}</span>
            <span className="fbadge-val">{badge.value}</span>
          </div>
        );
      })}

      <div className="hero-content">
        <div className="hero-eyebrow">NEOCLOUDZ COMMS HUB</div>
        <h1 className="hero-h1">
          Accelerate Your
          <br />
          <span className="g">AI Connection.</span>
        </h1>
        <p className="hero-sub" style={{ maxWidth: "600px", margin: "0 auto 48px" }}>
          Direct access to the engineers and experts building the future of GPU infrastructure. Fast responses, zero friction.
        </p>
        <div className="response-badge">
          <span className="resp-dot" />
          <span>
            System Status: <strong style={{ color: "var(--green)" }}>ONLINE</strong> · Avg response time: <strong style={{ color: "var(--white)" }}>&lt; 2 hours</strong>
          </span>
        </div>
      </div>
    </section>
  );
}
