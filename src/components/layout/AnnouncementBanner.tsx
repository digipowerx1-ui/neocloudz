"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function AnnouncementBanner() {
  return (
    <aside className="site-announcement-banner" aria-label="Launch announcement">
      <div className="banner-glow-line" />
      <div className="banner-container">
        <div className="banner-content">
          <span className="banner-copy">
            Introducing NeoCloudz Token Factory at GTC Berlin.
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
