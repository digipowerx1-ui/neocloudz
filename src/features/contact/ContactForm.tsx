"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { sendContactMessage } from "@/services/api/contact";

const INTEREST_OPTIONS = [
  { value: "on_demand_gpus", label: "On-Demand GPUs" },
  { value: "enterprise_bare_metal", label: "Enterprise / Bare Metal" },
  { value: "weka_storage", label: "WEKA Storage" },
  { value: "technical_support", label: "Technical Support" },
  { value: "partnership", label: "Partnership" },
  { value: "other", label: "Other" },
] as const;

const BUDGET_OPTIONS = [
  { value: "under_5k", label: "Under $5,000" },
  { value: "range_5k_20k", label: "$5k – $20k" },
  { value: "range_20k_100k", label: "$20k – $100k" },
  { value: "range_100k_500k", label: "$100k – $500k" },
  { value: "range_500k_plus", label: "$500k+" },
] as const;

const MESSAGE_MAX = 800;
const MESSAGE_NEAR_LIMIT = 720;
const SIMULATED_LATENCY_MS = 1800;
const PARTICLE_COUNT = 20;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FormState {
  interest: string;
  name: string;
  email: string;
  company: string;
  budget: string;
  message: string;
}

const INITIAL_FORM: FormState = {
  interest: "on_demand_gpus",
  name: "",
  email: "",
  company: "",
  budget: "under_5k",
  message: "",
};

type SubmitStatus = "idle" | "loading" | "success";

function generateTicketId(): string {
  return String(Math.floor(10000 + Math.random() * 90000));
}

function fireParticles(origin: HTMLElement) {
  const rect = origin.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const particle = document.createElement("div");
    particle.className = "contact-page-particle";
    particle.style.left = `${cx}px`;
    particle.style.top = `${cy}px`;
    document.body.appendChild(particle);
    const angle = Math.random() * Math.PI * 2;
    const dist = 80 + Math.random() * 120;
    const tx = Math.cos(angle) * dist;
    const ty = Math.sin(angle) * dist;
    const animation = particle.animate(
      [
        { transform: "translate(-50%,-50%) scale(1)", opacity: 1 },
        {
          transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(0)`,
          opacity: 0,
        },
      ],
      {
        duration: 600 + Math.random() * 400,
        easing: "cubic-bezier(.16,1,.3,1)",
        fill: "forwards",
      },
    );
    animation.onfinish = () => particle.remove();
  }
}

function ContactFormInner() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [nameTouched, setNameTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [ticketId, setTicketId] = useState<string>("00000");
  const [error, setError] = useState<string | null>(null);
  const [dots, setDots] = useState(".");
  const submitRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (status !== "loading") return;
    const id = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "." : `${prev}.`));
    }, 400);
    return () => clearInterval(id);
  }, [status]);

  const nameValid = form.name.trim().length > 1;
  const emailValid = EMAIL_REGEX.test(form.email);
  const charCount = form.message.length;
  const charCountClass =
    charCount >= MESSAGE_MAX ? "max" : charCount > MESSAGE_NEAR_LIMIT ? "near" : "";

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNameTouched(true);
    setEmailTouched(true);
    if (!nameValid || !emailValid) return;

    setError(null);
    setStatus("loading");

    const source = searchParams.get("source") || "unknown";
    const cta = searchParams.get("cta") || "unknown";
    const finalSource = `${source}_${cta}`;

    const payload = {
      interestType: form.interest,
      fullName: form.name,
      workEmail: form.email,
      company: form.company,
      budgetRange: form.budget,
      message: form.message,
      source: finalSource,
      progress: "new"
    };

    try {
      await sendContactMessage(payload);

      setTicketId(generateTicketId());
      if (submitRef.current) fireParticles(submitRef.current);
      setStatus("success");
    } catch (err) {
      console.error("Submission error:", err);
      setError("Transmission failed. Please check your connection and try again.");
      setStatus("idle");
    }
  }

  if (status === "success") {
    return (
      <div className="form-success" style={{ background: "rgba(10,15,10,0.5)", border: "1px solid var(--border)", borderRadius: "24px", padding: "60px 40px" }}>
        <div className="success-icon-wrap" style={{ marginBottom: "24px" }}>
          <CheckCircle2 size={64} color="var(--green)" style={{ filter: "drop-shadow(0 0 20px rgba(45, 255, 122, 0.4))" }} />
        </div>
        <div className="success-title">
          Protocol <span>Executed.</span>
        </div>
        <div className="success-desc" style={{ fontSize: "16px", marginBottom: "40px", color: "var(--text)", opacity: 0.8 }}>
          Your transmission has been received. Our engineering team will review your requirements and respond within the 2-hour window.
        </div>
        <div className="success-terminal" style={{ background: "#000", border: "1px solid rgba(45, 255, 122, 0.3)", boxShadow: "0 0 30px rgba(45, 255, 122, 0.1)", borderRadius: "16px" }}>
          <div className="st-line">
            <span className="st-prompt">$</span>
            <span className="st-text">neo handshake --init</span>
          </div>
          <div className="st-line">
            <span className="st-prompt" style={{ color: "var(--green)" }}>
              ✓
            </span>
            <span className="st-text" style={{ color: "var(--green)" }}>
              Secure uplink established
            </span>
          </div>
          <div className="st-line">
            <span className="st-prompt" style={{ color: "var(--muted)" }}>
              #
            </span>
            <span className="st-text" style={{ color: "var(--muted)" }}>
              Ticket: NCZ-{ticketId}
            </span>
          </div>
          <div className="st-line">
            <span className="st-prompt" style={{ color: "var(--muted)" }}>
              #
            </span>
            <span className="st-text" style={{ color: "var(--muted)" }}>
              Priority: High-Performance
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate style={{ position: "relative", zIndex: 10 }}>
      <div className="field-group">
        <label className="field-label" htmlFor="f-interest">
          INTEREST CHANNEL
        </label>
        <div className="interest-pills" style={{ marginTop: "12px" }}>
          {INTEREST_OPTIONS.map((option) => {
            const isActive = form.interest === option.value;
            return (
              <span
                key={option.value}
                className={`interest-pill${isActive ? " active" : ""}`}
                style={{ 
                  padding: "10px 20px", 
                  borderRadius: "30px",
                  background: isActive ? "rgba(45, 255, 122, 0.1)" : "rgba(255,255,255,0.03)",
                  border: `1px solid ${isActive ? "var(--green)" : "rgba(255,255,255,0.1)"}`
                }}
                onClick={() => update("interest", option.value)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    update("interest", option.value);
                  }
                }}
              >
                {option.label}
              </span>
            );
          })}
        </div>
        <input type="hidden" id="f-interest" value={form.interest} readOnly />
      </div>

      <div className="field-row">
        <div className="field-group">
          <label className="field-label" htmlFor="f-name">
            FULL IDENTITY
          </label>
          <input
            className={`field-input${nameTouched && nameValid
                ? " valid"
                : nameTouched && form.name && !nameValid
                  ? " invalid"
                  : ""
              }`}
            type="text"
            id="f-name"
            placeholder="Ada Lovelace"
            autoComplete="name"
            value={form.name}
            style={{ padding: "14px 18px", borderRadius: "12px" }}
            onChange={(e) => update("name", e.target.value)}
            onBlur={() => setNameTouched(true)}
          />
        </div>
        <div className="field-group">
          <label className="field-label" htmlFor="f-email">
            SECURE EMAIL
          </label>
          <input
            className={`field-input${emailTouched && emailValid
                ? " valid"
                : emailTouched && form.email && !emailValid
                  ? " invalid"
                  : ""
              }`}
            type="email"
            id="f-email"
            placeholder="ada@company.com"
            autoComplete="email"
            value={form.email}
            style={{ padding: "14px 18px", borderRadius: "12px" }}
            onChange={(e) => update("email", e.target.value)}
            onBlur={() => setEmailTouched(true)}
          />
        </div>
      </div>

      <div className="field-row">
        <div className="field-group">
          <label className="field-label" htmlFor="f-company">
            ORGANIZATION
          </label>
          <input
            className="field-input"
            type="text"
            id="f-company"
            placeholder="Acme AI Inc."
            value={form.company}
            style={{ padding: "14px 18px", borderRadius: "12px" }}
            onChange={(e) => update("company", e.target.value)}
          />
        </div>
        <div className="field-group">
          <label className="field-label" htmlFor="f-gpu">
            MONTHLY SCALE
          </label>
          <select
            className="field-select"
            id="f-gpu"
            value={form.budget}
            style={{ padding: "14px 18px", borderRadius: "12px" }}
            onChange={(e) => update("budget", e.target.value)}
          >
            <option value="">Select range...</option>
            {BUDGET_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="field-group">
        <label className="field-label" htmlFor="f-msg">
          MISSION SPECIFICATIONS
        </label>
        <textarea
          className="field-textarea"
          id="f-msg"
          placeholder="Tell us about your use case, cluster size, and deployment timeline..."
          maxLength={MESSAGE_MAX}
          value={form.message}
          style={{ padding: "14px 18px", borderRadius: "12px", minHeight: "140px" }}
          onChange={(e) => update("message", e.target.value)}
        />
        <div className={`char-count${charCountClass ? ` ${charCountClass}` : ""}`}>
          {charCount} / {MESSAGE_MAX}
        </div>
      </div>

      {error && (
        <div className="form-error" style={{ color: "#ff4d4d", fontSize: "14px", marginBottom: "16px", padding: "12px", background: "rgba(255, 77, 77, 0.1)", border: "1px solid rgba(255, 77, 77, 0.2)", borderRadius: "8px", textAlign: "center" }}>
          {error}
        </div>
      )}

      <button
        ref={submitRef}
        type="submit"
        className="submit-btn"
        id="submit-btn"
        disabled={status === "loading"}
        style={{ padding: "18px", borderRadius: "12px", fontSize: "16px" }}
      >
        {status === "loading" ? (
          <span>
            Establishing Connection<span>{dots}</span>
          </span>
        ) : (
          <span>INITIATE CONTACT →</span>
        )}
      </button>
      <input type="hidden" name="source" value={`${searchParams.get("source") || "unknown"}_${searchParams.get("cta") || "unknown"}`} />
    </form>
  );
}

export default function ContactForm() {
  return (
    <Suspense fallback={<div>Loading form...</div>}>
      <ContactFormInner />
    </Suspense>
  );
}
