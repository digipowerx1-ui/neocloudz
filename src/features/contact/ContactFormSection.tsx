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
      <div className="contact-form-header">
        <div className="hp-label">
          Token Factory Early Access
        </div>
        <h1 className="form-title">
          Request Early Access to <span className="accent-green">Token Factory</span>
        </h1>
        <p className="form-desc">
          Tell us what you’re building and the models you want to run. Our team will contact you to discuss workload fit and dedicated pilot capacity.
        </p>
      </div>
    );
  }

  return (
    <div className="contact-form-header">
      <div className="hp-label">
        Communications Uplink
      </div>
      <h1 className="form-title">
        Let&apos;s build <span className="accent-green">something massive.</span>
      </h1>
      <p className="form-desc">
        Whether you need dedicated Blackwell B200 / B300 clusters, WEKA high-speed storage fabric, or managed token inference, our engineering team is ready to accelerate your workload.
      </p>
    </div>
  );
}

export default function ContactFormSection() {
  return (
    <div className="form-panel">
      <div className="form-panel-content">
        <Suspense
          fallback={
            <div className="contact-form-header">
              <div className="hp-label">Communications Uplink</div>
              <div className="form-title">
                Let&apos;s build <span className="accent-green">something massive.</span>
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
