"use client";

import React from "react";
import Link from "next/link";

export function FinalCTA() {
  return (
    <section className="final-cta">
      {/* Aurora Waves Background */}
      <div className="cta-aurora">
        <div className="aurora-wave w1" />
        <div className="aurora-wave w2" />
        <div className="aurora-wave w3" />
      </div>

      <div className="cta-content">
        <h2 className="cta-title">
          Start Building on <span className="g">Blackwell.</span>
        </h2>
        <p className="cta-desc">
          Join hundreds of AI teams running training, inference, and
          prototyping on NeoCloudz dedicated infrastructure. No
          commitments on entry plans. No legacy hardware. Just B200
          performance from day one.
        </p>

        <div className="cta-btns">
          <Link href="/contact" className="btn-launch">
            Launch AI Instance ▶
          </Link>
          <Link href="/contact" className="btn-outline">
            Talk to Sales →
          </Link>
        </div>
      </div>
    </section>
  );
}
