"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function FinalCTA() {
  const pathname = usePathname() || "/";
  const source = pathname === "/" ? "homepage" : pathname.replace("/", "") || "unknown";

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
          <Link href={`/contact?source=${source}&cta=contact_sales`} className="btn-launch">
            Contact Sales ▶
          </Link>
          <Link href={`/contact?source=${source}&cta=talk_to_sales`} className="btn-outline">
            Talk to Sales →
          </Link>
        </div>
      </div>
    </section>
  );
}
