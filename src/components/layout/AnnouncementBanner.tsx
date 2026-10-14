"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function AnnouncementBanner() {
  return (
    <aside className="site-announcement-banner" aria-label="Launch announcement">
      <div className="banner-glow-line" />
      <div className="banner-container">
        <div className="banner-content">
          <span className="banner-tag">
            <Sparkles size={12} className="banner-sparkle" aria-hidden="true" />
            <span className="banner-tag-text">GTC Berlin</span>
          </span>
          <span className="banner-copy">
            Introducing NeoCloudz Token Factory at GTC Berlin. Request early access.
          </span>
          <Link
            href="/token-factory"
            className="banner-cta"
            aria-label="Explore Token Factory — Managed AI Inference"
          >
            <span>Explore Token Factory</span>
            <ArrowRight size={13} className="banner-arrow" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
