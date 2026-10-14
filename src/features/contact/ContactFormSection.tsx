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
      <div style={{ marginBottom: "40px" }}>
        <div className="hp-label" style={{ marginBottom: "16px" }}>
          Token Factory Early Access
        </div>
        <h1
          className="form-title"
          style={{
            fontSize: "44px",
            letterSpacing: "-1.5px",
            lineHeight: 1.1,
            marginBottom: "16px",
            color: "var(--white)",
            fontWeight: 800,
          }}
        >
          Request Early Access to <span style={{ color: "var(--green)" }}>Token Factory</span>
        </h1>
        <div
          className="form-desc"
          style={{
            fontSize: "16px",
            color: "var(--text)",
            opacity: 0.85,
            lineHeight: 1.6,
            maxWidth: "520px",
          }}
        >
          Tell us what you’re building and the models you want to run. Our team will contact you to discuss early-access fit and next steps.
        </div>
      </div>
    );
  }

  return (
    <div style={{ marginBottom: "40px" }}>
      <div className="hp-label" style={{ marginBottom: "16px" }}>
        Communications Uplink
      </div>
      <h1
        className="form-title"
        style={{
          fontSize: "48px",
          letterSpacing: "-1.5px",
          lineHeight: 1.1,
          marginBottom: "16px",
          color: "var(--white)",
          fontWeight: 800,
        }}
      >
        Let&apos;s build <br /> something <span style={{ color: "var(--green)" }}>massive.</span>
      </h1>
      <div
        className="form-desc"
        style={{
          fontSize: "16px",
          color: "var(--text)",
          opacity: 0.8,
          lineHeight: 1.6,
          maxWidth: "480px",
        }}
      >
        Whether you need a dedicated H100 cluster by Tuesday or have a complex technical requirement, our engineering team is ready to accelerate your workload.
      </div>
    </div>
  );
}

export default function ContactFormSection() {
  return (
    <div className="form-panel" style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: "100%", maxWidth: "560px", position: "relative", zIndex: 2 }}>
        <Suspense
          fallback={
            <div style={{ marginBottom: "40px" }}>
              <div className="hp-label" style={{ marginBottom: "16px" }}>Communications Uplink</div>
              <div
                className="form-title"
                style={{
                  fontSize: "48px",
                  letterSpacing: "-1.5px",
                  lineHeight: 1.1,
                  marginBottom: "16px",
                  color: "var(--white)",
                  fontWeight: 800,
                }}
              >
                Let&apos;s build <br /> something <span style={{ color: "var(--green)" }}>massive.</span>
              </div>
            </div>
          }
        >
          <ContactFormHeader />
        </Suspense>
        <ContactForm />
        <div style={{ marginTop: "48px", borderRadius: "20px", overflow: "hidden", border: "1px solid rgba(45, 255, 122, 0.15)", boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}>
          <img 
            src="/contact-footer.png" 
            alt="NeoCloudz high-density GPU data center infrastructure server cluster" 
            style={{ width: "100%", height: "auto", display: "block", filter: "brightness(0.9)" }} 
          />
        </div>
      </div>
    </div>
  );
}
