"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import ContactForm from "./ContactForm";

function ContactFormHeader() {
  const searchParams = useSearchParams();
  const interestParam = (searchParams.get("interest") || "").toLowerCase().replace(/-/g, "_");
  const intentParam = (searchParams.get("intent") || "").toLowerCase().replace(/_/g, "-");
  const isEarlyAccess =
    interestParam === "token_factory" && intentParam === "early-access";

  if (isEarlyAccess) {
    return (
      <div style={{ marginBottom: "32px" }}>
        <div className="hp-label" style={{ marginBottom: "12px" }}>
          Token Factory Early Access
        </div>
        <h1
          className="form-title"
          style={{
            fontSize: "36px",
            letterSpacing: "-1.2px",
            lineHeight: 1.15,
            marginBottom: "12px",
            color: "var(--white)",
            fontWeight: 800,
          }}
        >
          Request Early Access to <span style={{ color: "var(--green)" }}>Token Factory</span>
        </h1>
        <div
          className="form-desc"
          style={{
            fontSize: "15px",
            color: "var(--text)",
            opacity: 0.85,
            lineHeight: 1.6,
            maxWidth: "520px",
            marginBottom: 0,
          }}
        >
          Tell us what you’re building and the models you want to run. Our team will contact you to discuss workload fit and dedicated pilot capacity.
        </div>
      </div>
    );
  }

  return (
    <div style={{ marginBottom: "32px" }}>
      <div className="hp-label" style={{ marginBottom: "12px" }}>
        Communications Uplink
      </div>
      <h1
        className="form-title"
        style={{
          fontSize: "40px",
          letterSpacing: "-1.2px",
          lineHeight: 1.15,
          marginBottom: "12px",
          color: "var(--white)",
          fontWeight: 800,
        }}
      >
        Let&apos;s build <span style={{ color: "var(--green)" }}>something massive.</span>
      </h1>
      <div
        className="form-desc"
        style={{
          fontSize: "15px",
          color: "var(--text)",
          opacity: 0.8,
          lineHeight: 1.6,
          maxWidth: "520px",
          marginBottom: 0,
        }}
      >
        Whether you need dedicated Blackwell B200 / B300 clusters, WEKA high-speed storage fabric, or managed token inference, our engineering team is ready to accelerate your workload.
      </div>
    </div>
  );
}

export default function ContactFormSection() {
  return (
    <div className="form-panel">
      <div style={{ width: "100%", position: "relative", zIndex: 2 }}>
        <Suspense
          fallback={
            <div style={{ marginBottom: "32px" }}>
              <div className="hp-label" style={{ marginBottom: "12px" }}>Communications Uplink</div>
              <div
                className="form-title"
                style={{
                  fontSize: "40px",
                  letterSpacing: "-1.2px",
                  lineHeight: 1.15,
                  marginBottom: "12px",
                  color: "var(--white)",
                  fontWeight: 800,
                }}
              >
                Let&apos;s build <span style={{ color: "var(--green)" }}>something massive.</span>
              </div>
            </div>
          }
        >
          <ContactFormHeader />
        </Suspense>
        <ContactForm />
      </div>
    </div>
  );
}
