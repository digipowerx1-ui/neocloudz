"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { useTrainingTerminal } from "@/hooks/useTrainingTerminal";

export interface OfferingCard {
  icon: string;
  title: string;
  description: string;
}

export interface FeatureBlock {
  title: string;
  description: string;
}

export interface TerminalLine {
  line: string;
  cls: string;
}

export interface ProductDetailData {
  eyebrow: string;
  title: string;
  titleAccent: string;
  lede: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };

  offeringsLabel: string;
  offeringsTitle: string;
  offeringsAccent: string;
  offeringsSub: string;
  offerings: OfferingCard[];

  featureLabel: string;
  featureTitle: string;
  featureAccent: string;
  featureDescription: string;
  featureIcon: string;
  featureBullets: string[];
  featureCta: { label: string; href: string };
  terminalTitle: string;
  terminalLines: TerminalLine[];

  pillars: FeatureBlock[];

  related: { label: string; href: string }[];
}

export default function ProductDetailShell({ data }: { data: ProductDetailData }) {
  const terminalRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname() || "/";
  const source = pathname.replace("/", "") || "unknown";
  
  useTrainingTerminal(terminalRef);

  return (
    <>
      {/* HERO */}
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
            <Link href={`${data.primaryCta.href}${data.primaryCta.href.includes("/contact") ? `?source=${source}&cta=${data.primaryCta.label.toLowerCase().replace(/ /g, "_")}` : ""}`} className="btn btn-green btn-lg">
              {data.primaryCta.label} ▶
            </Link>
            {data.secondaryCta ? (
              <Link href={`${data.secondaryCta.href}${data.secondaryCta.href.includes("/contact") ? `?source=${source}&cta=${data.secondaryCta.label.toLowerCase().replace(/ /g, "_")}` : ""}`} className="btn btn-outline btn-lg">
                {data.secondaryCta.label} →
              </Link>
            ) : null}
          </div>
        </div>
      </section>

      {/* OFFERINGS */}
      <section className="products" id="offerings">
        <div className="section-inner">
          <div className="section-label reveal">// {data.offeringsLabel}</div>
          <h2 className="section-title reveal">
            {data.offeringsTitle} <span className="g">{data.offeringsAccent}</span>
          </h2>
          <p className="section-sub reveal">{data.offeringsSub}</p>

          <div className="products-grid">
            {data.offerings.map((o, i) => (
              <div className="prod-card reveal" key={i}>
                <div className="prod-icon-wrap">{o.icon}</div>
                <div className="prod-name">{o.title}</div>
                <p className="prod-desc">{o.description}</p>
                <span className="prod-link">Learn more →</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEEP DIVE FEATURE BLOCK */}
      <section className="solutions" id="feature">
        <div className="section-inner">
          <div className="section-label reveal">// {data.featureLabel}</div>
          <h2 className="section-title reveal">
            {data.featureTitle} <span className="g">{data.featureAccent}</span>
          </h2>

          <div className="sol-card reveal mt-16">
            <div className="sol-info">
              <span className="sol-icon">{data.featureIcon}</span>
              <p className="sol-desc">{data.featureDescription}</p>
              <ul className="sol-features">
                {data.featureBullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
              <div style={{ marginTop: 32 }}>
                <Link href={`${data.featureCta.href}${data.featureCta.href.includes("/contact") ? `?source=${source}&cta=${data.featureCta.label.toLowerCase().replace(/ /g, "_")}` : ""}`} className="btn btn-green">
                  {data.featureCta.label} →
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

      {/* PILLARS */}
      <section className="products" id="pillars" style={{ paddingTop: 0 }}>
        <div className="section-inner">
          <div className="section-label reveal">// Built for Real Workloads</div>
          <h2 className="section-title reveal">
            One platform. <span className="g">Every workload.</span>
          </h2>

          <div className="products-grid">
            {data.pillars.map((p, i) => (
              <div className="prod-card reveal" key={i}>
                <div className="prod-name">{p.title}</div>
                <p className="prod-desc">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RELATED */}
      {data.related.length > 0 && (
        <section className="solutions" id="related" style={{ paddingTop: 0 }}>
          <div className="section-inner">
            <div className="section-label reveal">// Explore More Products</div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: 16,
                marginTop: 24,
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
                  {r.label} →
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
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
            <Link href={`/contact?source=${source}&cta=request_private_cluster`} className="btn btn-green btn-lg">
              Request Private Clusters ▶
            </Link>
            <Link href={`/contact?source=${source}&cta=contact_sales`} className="btn btn-outline btn-lg">
              Contact Sales →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
