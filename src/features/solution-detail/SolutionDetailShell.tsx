"use client";

import Link from "next/link";
import { useRef } from "react";
import { useTrainingTerminal } from "@/hooks/useTrainingTerminal";

export interface TerminalLine {
  line: string;
  cls: string;
}

export interface SolutionDetailData {
  eyebrow: string;
  title: string;
  titleAccent: string;
  lede: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  icon: string;
  cardTitle: string;
  cardDescription: string;
  idealFor: string[];
  highlights: string[];
  terminalTitle: string;
  terminalLines: TerminalLine[];
  related: { label: string; href: string }[];
}

export default function SolutionDetailShell({ data }: { data: SolutionDetailData }) {
  const terminalRef = useRef<HTMLDivElement>(null);
  useTrainingTerminal(terminalRef);

  return (
    <>
      <section className="hero" style={{ minHeight: "70vh" }}>
        <div className="hero-grid"></div>
        <div className="aurora-1"></div>
        <div className="aurora-2"></div>
        <div className="aurora-3"></div>

        <div className="hero-content">
          <div className="hero-tag">
            <span className="hero-tag-dot"></span>
            {data.eyebrow}
          </div>
          <h1>
            {data.title} <span className="g">{data.titleAccent}</span>
          </h1>
          <p className="hero-sub">{data.lede}</p>

          <div className="hero-ctas">
            <Link href={data.primaryCta.href} className="btn btn-green btn-lg">
              {data.primaryCta.label}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            {data.secondaryCta ? (
              <Link href={data.secondaryCta.href} className="btn btn-outline btn-lg">
                {data.secondaryCta.label}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            ) : null}
          </div>
        </div>
      </section>

      <section className="solutions" id="detail">
        <div className="section-inner">
          <div className="section-label reveal">// Solution Overview</div>
          <h2 className="section-title reveal">
            Built for Every Stage of the <span className="g">AI Lifecycle.</span>
          </h2>
          <p className="section-sub reveal">
            Purpose-built infrastructure aligned to your workflow — from experimentation
            through production deployment at scale.
          </p>

          <div className="sol-card reveal mt-16">
            <div className="sol-info">
              <span className="sol-icon">{data.icon}</span>
              <h3 className="sol-title">{data.cardTitle}</h3>
              <p className="sol-desc">{data.cardDescription}</p>

              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: 3,
                  textTransform: "uppercase",
                  color: "var(--green)",
                  marginTop: 18,
                  marginBottom: 10,
                }}
              >
                Ideal For
              </div>
              <ul className="sol-features">
                {data.idealFor.map((it, i) => (
                  <li key={i}>{it}</li>
                ))}
              </ul>

              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: 3,
                  textTransform: "uppercase",
                  color: "var(--green)",
                  marginTop: 28,
                  marginBottom: 10,
                }}
              >
                Highlights
              </div>
              <ul className="sol-features">
                {data.highlights.map((it, i) => (
                  <li key={i}>{it}</li>
                ))}
              </ul>

              <div style={{ marginTop: 32 }}>
                <Link href={data.primaryCta.href} className="btn btn-green">
                  {data.primaryCta.label}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="sol-visual">
              <div className="term-window">
                <div className="term-bar">
                  <span className="term-dot term-dot-r"></span>
                  <span className="term-dot term-dot-y"></span>
                  <span className="term-dot term-dot-g"></span>
                  <span className="term-title">{data.terminalTitle}</span>
                </div>
                <div className="term-body" ref={terminalRef}>
                  {data.terminalLines.map((tl, i) => (
                    <span key={i} className={`term-line ${tl.cls}`} data-line={i}>
                      {tl.line}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="solutions" id="related" style={{ paddingTop: 0 }}>
        <div className="section-inner">
          <div className="section-label reveal">// Explore More Solutions</div>
          <h2 className="section-title reveal">
            One platform. <span className="g">Every workload.</span>
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 16,
              marginTop: 32,
            }}
            className="reveal"
          >
            {data.related.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className="btn btn-outline"
                style={{ justifyContent: "space-between", textAlign: "left" }}
              >
                {r.label}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-banner" id="cta">
        <div className="cta-content">
          <h2>
            Your AI Infrastructure <span className="g">Starts Here.</span>
          </h2>
          <p>
            Request private clusters or launch on-demand AI instances on NVIDIA
            Blackwell B200 in under 60 seconds.
          </p>
          <div className="cta-btns">
            <Link href="/contact" className="btn btn-green btn-lg">
              Request Private Clusters
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link href="/contact" className="btn btn-outline btn-lg">
              Contact Sales
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
