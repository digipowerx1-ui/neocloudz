"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import {
  sendContactMessage,
  ContactPayload,
  EndpointPreference,
  RequestType,
  ProductInterest,
  InterestType,
  BudgetRange,
} from "@/services/api/contact";

const INTEREST_OPTIONS = [
  { value: "on_demand_gpus", label: "On-Demand GPUs" },
  { value: "enterprise_bare_metal", label: "Enterprise / Bare Metal" },
  { value: "token_factory", label: "Token Factory" },
  { value: "weka_storage", label: "WEKA Storage" },
  { value: "technical_support", label: "Technical Support" },
  { value: "partnership", label: "Partnership & Other" },
] as const;

const BUDGET_OPTIONS: ReadonlyArray<{ value: BudgetRange; label: string }> = [
  { value: "under_5k", label: "< $5k" },
  { value: "range_5k_20k", label: "$5k – $20k" },
  { value: "range_20k_100k", label: "$20k – $100k" },
  { value: "range_100k_500k", label: "$100k – $500k" },
  { value: "range_500k_plus", label: "$500k+" },
];

const ENDPOINT_OPTIONS: ReadonlyArray<{
  value: EndpointPreference | "";
  label: string;
}> = [
    { value: "", label: "Select preference..." },
    { value: "api_inference", label: "Serverless API (Pay-per-token)" },
    { value: "dedicated_endpoint", label: "Dedicated Endpoint" },
    { value: "undecided", label: "Undecided / Exploring" },
  ];

const USAGE_OPTIONS = [
  { value: "", label: "Select expected usage..." },
  { value: "< 1M tokens/day", label: "Under 1M tokens / day" },
  { value: "1M - 10M tokens/day", label: "1M – 10M tokens / day" },
  { value: "10M - 50M tokens/day", label: "10M – 50M tokens / day" },
  { value: "50M+ tokens/day", label: "50M+ tokens / day" },
] as const;

const POPULAR_MODELS = [
  "Nemotron 3 Ultra 550B",
  "GLM-5.3 Flash",
  "Qwen3.8 27B",
  "Nemotron 3.5 Lightning 30B",
  "Gemma 3 1B IT",
  "Kimi-VL-A3B-Thinking",
  "Custom / Fine-tuned",
] as const;

const MESSAGE_MAX = 800;
const MESSAGE_NEAR_LIMIT = 720;
const PARTICLE_COUNT = 20;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FREE_EMAIL_DOMAINS = new Set([
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "icloud.com",
  "aol.com",
  "mail.com",
  "proton.me",
  "protonmail.com",
  "zoho.com",
  "yandex.com",
  "gmx.com",
  "gmx.net",
  "live.com",
  "msn.com",
  "me.com",
  "comcast.net",
  "sbcglobal.net",
  "verizon.net",
]);

function normalizeEmail(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return "";
  if (trimmed.includes("@")) return trimmed;
  // If typed like 'user.company.com', convert first dot to '@'
  const parts = trimmed.split(".");
  if (parts.length >= 3) {
    const user = parts[0];
    const domain = parts.slice(1).join(".");
    return `${user}@${domain}`;
  }
  return trimmed;
}

function isDomainEmail(email: string): boolean {
  const normalized = normalizeEmail(email);
  if (!EMAIL_REGEX.test(normalized)) return false;
  const parts = normalized.toLowerCase().split("@");
  if (parts.length !== 2) return false;
  const domain = parts[1];
  return !FREE_EMAIL_DOMAINS.has(domain);
}

async function checkDomainDnsExists(domain: string): Promise<boolean> {
  if (!domain) return false;
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 5000);
    const res = await fetch(`/api/verify-domain?domain=${encodeURIComponent(domain)}`, {
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!res.ok) return false;
    const data = await res.json();
    return data.exists === true;
  } catch {
    // Network or timeout error — fail closed (reject the domain)
    return false;
  }
}

interface FormState {
  interest: string;
  name: string;
  email: string;
  company: string;
  budget: string;
  message: string;
  // Token Factory Early Access fields
  modelsOfInterest: string;
  endpointPreference: EndpointPreference | "";
  expectedUsage: string;
  targetStartDate: string;
  interestedInGtcBerlin: boolean;
  marketingOptIn: boolean;
}

const INITIAL_FORM: FormState = {
  interest: "on_demand_gpus",
  name: "",
  email: "",
  company: "",
  budget: "",
  message: "",
  modelsOfInterest: "",
  endpointPreference: "",
  expectedUsage: "",
  targetStartDate: "",
  interestedInGtcBerlin: false,
  marketingOptIn: false,
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

function getInitialForm(searchParams: ReturnType<typeof useSearchParams>): FormState {
  const interestParam = (searchParams.get("interest") || "").toLowerCase().replace(/-/g, "_");
  const intentParam = (searchParams.get("intent") || "").toLowerCase().replace(/_/g, "-");
  const gtcMeeting = searchParams.get("gtc_meeting");

  const isEarlyAccess =
    interestParam === "token_factory" && intentParam === "early-access";

  if (isEarlyAccess) {
    return {
      ...INITIAL_FORM,
      interest: "token_factory",
      interestedInGtcBerlin: false,
      marketingOptIn: false,
      message: "",
    };
  }

  if (interestParam) {
    if (
      interestParam === "gtc_berlin_meeting" ||
      interestParam.includes("gtc") ||
      gtcMeeting === "true"
    ) {
      return {
        ...INITIAL_FORM,
        interest: "gtc_berlin_meeting",
        interestedInGtcBerlin: true,
        message:
          "Hello! We would like to schedule a private meeting with the NeoCloudz architecture team at GTC Berlin to discuss Token Factory and our AI inference workload.",
      };
    }
    if (interestParam === "token_factory") {
      return {
        ...INITIAL_FORM,
        interest: "token_factory",
        message:
          "Requesting early access pilot scope for NeoCloudz Token Factory (managed AI inference).",
      };
    }
    const match = INTEREST_OPTIONS.find((opt) => opt.value === interestParam);
    if (match) {
      return { ...INITIAL_FORM, interest: match.value };
    }
  }
  return INITIAL_FORM;
}

function ContactFormInner() {
  const searchParams = useSearchParams();
  const [form, setForm] = useState<FormState>(() => getInitialForm(searchParams));
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [nameTouched, setNameTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [companyTouched, setCompanyTouched] = useState(false);
  const [ticketId, setTicketId] = useState<string>("00000");
  const [error, setError] = useState<string | null>(null);
  const [dots, setDots] = useState(".");
  const [emailChecking, setEmailChecking] = useState(false);
  const [domainVerified, setDomainVerified] = useState<boolean | null>(null);
  const submitRef = useRef<HTMLButtonElement>(null);

  const isEarlyAccess = form.interest === "token_factory" || form.interest === "gtc_berlin_meeting";

  useEffect(() => {
    if (status !== "loading") return;
    const id = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "." : `${prev}.`));
    }, 400);
    return () => clearInterval(id);
  }, [status]);

  useEffect(() => {
    let cancelled = false;
    const norm = normalizeEmail(form.email);
    if (!norm || !EMAIL_REGEX.test(norm)) {
      const timer = setTimeout(() => {
        if (!cancelled) {
          setDomainVerified(null);
          setEmailChecking(false);
        }
      }, 0);
      return () => {
        cancelled = true;
        clearTimeout(timer);
      };
    }

    const domain = norm.split("@")[1]?.toLowerCase();
    if (!domain || FREE_EMAIL_DOMAINS.has(domain)) {
      const timer = setTimeout(() => {
        if (!cancelled) {
          setDomainVerified(false);
          setEmailChecking(false);
        }
      }, 0);
      return () => {
        cancelled = true;
        clearTimeout(timer);
      };
    }

    const startTimer = setTimeout(() => {
      if (!cancelled) {
        setEmailChecking(true);
        setDomainVerified(null);
      }
    }, 0);

    const checkTimer = setTimeout(async () => {
      const exists = await checkDomainDnsExists(domain);
      if (!cancelled) {
        setDomainVerified(exists);
        setEmailChecking(false);
      }
    }, 200);

    return () => {
      cancelled = true;
      clearTimeout(startTimer);
      clearTimeout(checkTimer);
    };
  }, [form.email]);

  const nameValid = form.name.trim().length > 1;
  const normalizedEmail = normalizeEmail(form.email);
  const emailFormatValid = EMAIL_REGEX.test(normalizedEmail);
  const isBusinessEmail = isDomainEmail(form.email);
  const emailValid = emailFormatValid && isBusinessEmail && domainVerified === true;
  const companyValid = form.company.trim().length > 0;
  const messageValid = form.message.trim().length > 0;
  const charCount = form.message.length;
  const charCountClass =
    charCount >= MESSAGE_MAX ? "max" : charCount > MESSAGE_NEAR_LIMIT ? "near" : "";

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "interest" && value === "gtc_berlin_meeting") {
        next.interestedInGtcBerlin = true;
      }
      return next;
    });
  }

  function handleToggleModel(model: string) {
    const current = form.modelsOfInterest
      ? form.modelsOfInterest.split(",").map((s) => s.trim()).filter(Boolean)
      : [];
    const exists = current.some((m) => m.toLowerCase() === model.toLowerCase());
    let updated: string[];
    if (exists) {
      updated = current.filter((m) => m.toLowerCase() !== model.toLowerCase());
    } else {
      updated = [...current, model];
    }
    update("modelsOfInterest", updated.join(", "));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNameTouched(true);
    setEmailTouched(true);
    setCompanyTouched(true);

    if (emailChecking) {
      setError("Verifying domain, please wait a moment...");
      return;
    }
    if (domainVerified === null && emailFormatValid && isBusinessEmail) {
      setError("Domain verification pending. Please wait a moment and try again.");
      return;
    }
    if (!nameValid || !emailValid) {
      if (!emailValid) {
        setError("Please enter a business or work email.");
      } else {
        setError("Please enter your full identity.");
      }
      return;
    }

    if (isEarlyAccess) {
      if (!companyValid) {
        setError("Please enter your organization / company name.");
        return;
      }
      if (!messageValid) {
        setError("Please describe what you are building and the models you want to run.");
        return;
      }
    }

    setError(null);
    setStatus("loading");

    const sourceParam = searchParams.get("source") || undefined;
    const ctaParam = searchParams.get("cta") || undefined;
    const finalSource = `${sourceParam || "unknown"}_${ctaParam || "unknown"}`;

    const originatingPage =
      searchParams.get("originating_page") ||
      searchParams.get("originatingPage") ||
      sourceParam ||
      (typeof window !== "undefined" ? window.location.pathname : undefined);

    const originatingCta =
      searchParams.get("originating_cta") ||
      searchParams.get("originatingCta") ||
      ctaParam ||
      undefined;

    const utmSource = searchParams.get("utm_source") || searchParams.get("utmSource") || undefined;
    const utmMedium = searchParams.get("utm_medium") || searchParams.get("utmMedium") || undefined;
    const utmCampaign = searchParams.get("utm_campaign") || searchParams.get("utmCampaign") || undefined;
    const utmTerm = searchParams.get("utm_term") || searchParams.get("utmTerm") || undefined;
    const utmContent = searchParams.get("utm_content") || searchParams.get("utmContent") || undefined;

    const payload: ContactPayload = {
      fullName: form.name,
      workEmail: normalizedEmail,
      company: form.company,
      message: form.message,
      source: finalSource,
      progress: "new",
      originatingPage,
      originatingCta,
      utmSource,
      utmMedium,
      utmCampaign,
      utmTerm,
      utmContent,
    };

    if (isEarlyAccess) {
      payload.requestType = "early_access";
      payload.productInterest = "token_factory";
      if (form.modelsOfInterest) payload.modelsOfInterest = form.modelsOfInterest;
      if (form.endpointPreference) {
        const pref = form.endpointPreference as string;
        payload.endpointPreference = (pref === "dedicated" ? "dedicated_endpoint" : pref) as EndpointPreference;
      }
      if (form.expectedUsage) payload.expectedUsage = form.expectedUsage;
      if (form.targetStartDate) payload.targetStartDate = form.targetStartDate;
      payload.interestedInGtcBerlin = Boolean(form.interestedInGtcBerlin);
      payload.marketingOptIn = Boolean(form.marketingOptIn);
    } else {
      payload.requestType = "general_contact";
      if (form.interest === "gtc_berlin_meeting") {
        payload.interestType = "other";
        payload.interestedInGtcBerlin = true;
      } else if (
        form.interest === "on_demand_gpus" ||
        form.interest === "enterprise_bare_metal" ||
        form.interest === "weka_storage" ||
        form.interest === "technical_support" ||
        form.interest === "partnership" ||
        form.interest === "other"
      ) {
        payload.interestType = form.interest;
      } else {
        payload.interestType = "other";
      }
      if (form.budget) payload.budgetRange = form.budget as BudgetRange;
    }

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
      <div
        className="form-success"
        style={{
          background: "rgba(10,15,10,0.5)",
          border: "1px solid var(--border)",
          borderRadius: "24px",
          padding: "60px 40px",
        }}
      >
        <div className="success-icon-wrap" style={{ marginBottom: "24px" }}>
          <CheckCircle2
            size={64}
            color="var(--green)"
            style={{ filter: "drop-shadow(0 0 20px rgba(45, 255, 122, 0.4))" }}
          />
        </div>
        <div className="success-title">
          Protocol <span>Executed.</span>
        </div>
        <div
          className="success-desc"
          style={{
            fontSize: "16px",
            marginBottom: "40px",
            color: "var(--text)",
            opacity: 0.85,
            lineHeight: 1.6,
          }}
        >
          Thank you for your interest in NeoCloudz Token Factory. We&apos;ve received your early-access request, and our team will contact you about next steps.
        </div>
        <div
          className="success-terminal"
          style={{
            background: "#000",
            border: "1px solid rgba(45, 255, 122, 0.3)",
            boxShadow: "0 0 30px rgba(45, 255, 122, 0.1)",
            borderRadius: "16px",
          }}
        >
          <div className="st-line">
            <span className="st-prompt">$</span>
            <span className="st-text">
              {isEarlyAccess ? "neo token-factory --early-access" : "neo handshake --init"}
            </span>
          </div>
          <div className="st-line">
            <span className="st-prompt" style={{ color: "var(--green)" }}>
              ✓
            </span>
            <span className="st-text" style={{ color: "var(--green)" }}>
              {isEarlyAccess ? "Early access telemetry logged" : "Secure uplink established"}
            </span>
          </div>
          <div className="st-line">
            <span className="st-prompt" style={{ color: "var(--green)" }}>
              ✓
            </span>
            <span className="st-text" style={{ color: "var(--green)" }}>
              Domain verified: {normalizedEmail.split("@")[1] || "active"} (MX DNS)
            </span>
          </div>
          <div className="st-line">
            <span className="st-prompt" style={{ color: "var(--muted)" }}>
              #
            </span>
            <span className="st-text" style={{ color: "var(--muted)" }}>
              {isEarlyAccess ? `Request: TF-EA-${ticketId}` : `Ticket: NCZ-${ticketId}`}
            </span>
          </div>
          <div className="st-line">
            <span className="st-prompt" style={{ color: "var(--muted)" }}>
              #
            </span>
            <span className="st-text" style={{ color: "var(--muted)" }}>
              {isEarlyAccess ? "Status: Under Review" : "Priority: High-Performance"}
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
        <div className="interest-pills" style={{ marginTop: "10px", display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {INTEREST_OPTIONS.map((option) => {
            const isActive = form.interest === option.value;
            return (
              <span
                key={option.value}
                className={`interest-pill${isActive ? " active" : ""}`}
                style={{
                  padding: "8px 16px",
                  borderRadius: "20px",
                  fontSize: "13px",
                  fontWeight: isActive ? 600 : 500,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  background: isActive ? "rgba(45, 255, 122, 0.12)" : "rgba(255,255,255,0.03)",
                  border: `1px solid ${isActive ? "var(--green)" : "rgba(255,255,255,0.08)"}`,
                  color: isActive ? "var(--white)" : "var(--text)",
                }}
                onClick={() => update("interest", option.value)}
                role="button"
                aria-label={`Select interest: ${option.label}`}
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
            FULL IDENTITY *
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
            WORK / DOMAIN EMAIL *
          </label>
          <input
            className={`field-input${emailTouched && emailValid
                ? " valid"
                : emailTouched && form.email && (emailChecking || domainVerified === null)
                  ? ""
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
            onBlur={() => {
              setEmailTouched(true);
              const normalized = normalizeEmail(form.email);
              if (normalized !== form.email) {
                update("email", normalized);
              }
            }}
          />
          {emailTouched && form.email && (
            <span
              style={{
                color: emailValid
                  ? "var(--green)"
                  : emailChecking || (domainVerified === null && emailFormatValid && isBusinessEmail)
                    ? "#ffb84d"
                    : "#ff4d4d",
                fontSize: "12px",
                marginTop: "6px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontWeight: emailValid ? 600 : 400,
              }}
            >
              {emailChecking || (domainVerified === null && emailFormatValid && isBusinessEmail) ? (
                "⚡ Verifying domain in real-time..."
              ) : emailValid ? (
                <>✓ Business domain verified & active</>
              ) : (
                "✕ Please enter a business or work email."
              )}
            </span>
          )}
        </div>
      </div>

      <div className="field-row">
        <div className="field-group">
          <label className="field-label" htmlFor="f-company">
            ORGANIZATION {isEarlyAccess ? "*" : ""}
          </label>
          <input
            className={`field-input${companyTouched && isEarlyAccess && !companyValid ? " invalid" : ""
              }`}
            type="text"
            id="f-company"
            placeholder="Acme AI Inc."
            value={form.company}
            style={{ padding: "14px 18px", borderRadius: "12px" }}
            onChange={(e) => update("company", e.target.value)}
            onBlur={() => setCompanyTouched(true)}
          />
        </div>
        {!isEarlyAccess ? (
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
        ) : (
          <div className="field-group">
            <label className="field-label" htmlFor="f-endpoint">
              ENDPOINT PREFERENCE (OPTIONAL)
            </label>
            <select
              className="field-select"
              id="f-endpoint"
              value={form.endpointPreference}
              style={{ padding: "14px 18px", borderRadius: "12px" }}
              onChange={(e) => update("endpointPreference", e.target.value as EndpointPreference)}
            >
              {ENDPOINT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {isEarlyAccess && (
        <>
          <div className="field-group">
            <label className="field-label" htmlFor="f-models">
              MODELS OF INTEREST (OPTIONAL)
            </label>
            <input
              className="field-input"
              type="text"
              id="f-models"
              placeholder="e.g. Nemotron 3, GLM-5.3, Qwen3.8..."
              value={form.modelsOfInterest}
              style={{ padding: "14px 18px", borderRadius: "12px" }}
              onChange={(e) => update("modelsOfInterest", e.target.value)}
            />
            <div className="model-chips">
              {POPULAR_MODELS.map((model) => {
                const selected = form.modelsOfInterest
                  .split(",")
                  .map((m) => m.trim().toLowerCase())
                  .includes(model.toLowerCase());
                return (
                  <button
                    key={model}
                    type="button"
                    className={`model-chip${selected ? " selected" : ""}`}
                    onClick={() => handleToggleModel(model)}
                  >
                    {selected ? `✓ ${model}` : `+ ${model}`}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="field-row">
            <div className="field-group">
              <label className="field-label" htmlFor="f-usage">
                EXPECTED USAGE (OPTIONAL)
              </label>
              <select
                className="field-select"
                id="f-usage"
                value={form.expectedUsage}
                style={{ padding: "14px 18px", borderRadius: "12px" }}
                onChange={(e) => update("expectedUsage", e.target.value)}
              >
                {USAGE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="field-group">
              <label className="field-label" htmlFor="f-start-date">
                TARGET START DATE (OPTIONAL)
              </label>
              <input
                className="field-input"
                type="date"
                id="f-start-date"
                value={form.targetStartDate}
                style={{ padding: "14px 18px", borderRadius: "12px", colorScheme: "dark" }}
                onChange={(e) => update("targetStartDate", e.target.value)}
              />
            </div>
          </div>

          <div className="field-group" style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "4px" }}>
            <label className={`field-checkbox-row${form.interestedInGtcBerlin ? " checked" : ""}`}>
              <input
                type="checkbox"
                className="field-checkbox-input"
                id="f-gtc-berlin"
                checked={form.interestedInGtcBerlin}
                onChange={(e) => update("interestedInGtcBerlin", e.target.checked)}
              />
              <span className="field-checkbox-text">
                <strong>Meet Us at GTC Berlin</strong> — I would like to schedule an in-person architecture session at NVIDIA GTC Berlin.
              </span>
            </label>

            <label className={`field-checkbox-row${form.marketingOptIn ? " checked" : ""}`}>
              <input
                type="checkbox"
                className="field-checkbox-input"
                id="f-marketing-opt-in"
                checked={form.marketingOptIn}
                onChange={(e) => update("marketingOptIn", e.target.checked)}
              />
              <span className="field-checkbox-text">
                Keep me updated with NeoCloudz Token Factory benchmarks, platform updates, and technical deep-dives (optional).
              </span>
            </label>
          </div>
        </>
      )}

      <div className="field-group">
        <label className="field-label" htmlFor="f-msg">
          {isEarlyAccess ? "USE-CASE & INFERENCE SPECIFICATIONS *" : "MISSION SPECIFICATIONS"}
        </label>
        {isEarlyAccess && (
          <div className="field-helper" id="f-msg-help">
            Describe your target models, expected queries per second (QPS), latency requirements, and pilot timing.
          </div>
        )}
        <textarea
          className="field-textarea"
          id="f-msg"
          aria-describedby={isEarlyAccess ? "f-msg-help" : undefined}
          aria-required={isEarlyAccess ? "true" : undefined}
          placeholder={
            isEarlyAccess
              ? "e.g., We are serving Nemotron 3 Ultra and Qwen3.8 27B for customer-facing chat. We need p95 TTFT < 200ms and 80+ tokens/sec throughput at ~40 concurrent streams. Seeking dedicated private endpoint pilot capacity starting next month..."
              : "Tell us about your use case, cluster size, and deployment timeline..."
          }
          maxLength={MESSAGE_MAX}
          value={form.message}
          style={{
            padding: "14px 18px",
            borderRadius: "12px",
            minHeight: "140px",
            fontFamily: "inherit",
            fontSize: "14px",
            lineHeight: 1.6,
            marginTop: isEarlyAccess ? "8px" : "0",
          }}
          onChange={(e) => update("message", e.target.value)}
        />
        <div className={`char-count${charCountClass ? ` ${charCountClass}` : ""}`}>
          {charCount} / {MESSAGE_MAX}
        </div>
      </div>

      {error && (
        <div
          className="form-error"
          style={{
            color: "#ff4d4d",
            fontSize: "14px",
            marginBottom: "16px",
            padding: "12px",
            background: "rgba(255, 77, 77, 0.1)",
            border: "1px solid rgba(255, 77, 77, 0.2)",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          {error}
        </div>
      )}

      <button
        ref={submitRef}
        type="submit"
        className="submit-btn"
        id="submit-btn"
        aria-label={isEarlyAccess ? "Request Early Access" : "Submit Contact Request"}
        disabled={status === "loading"}
        style={{ padding: "18px", borderRadius: "12px", fontSize: "16px" }}
      >
        {status === "loading" ? (
          <span>
            {isEarlyAccess ? "Requesting Early Access" : "Establishing Connection"}
            <span>{dots}</span>
          </span>
        ) : (
          <span>{isEarlyAccess ? "Request Early Access" : "INITIATE CONTACT →"}</span>
        )}
      </button>

      <div className="privacy-note">
        We respect your privacy. Inquiries are processed in accordance with our{" "}
        <Link href="/privacy-policy" target="_blank" rel="noopener noreferrer">
          Privacy Policy
        </Link>
        . Workload specifications are held strictly confidential.
      </div>
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
