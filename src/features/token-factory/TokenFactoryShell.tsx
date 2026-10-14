"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Zap,
  Cpu,
  Layers,
  ShieldCheck,
  Server,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Activity,
  MapPin,
  Users,
} from "lucide-react";
import { HeroParticles } from "@/components/layout/HeroParticles";
import PageEffects from "@/features/page-effects/PageEffects";
import "./token-factory.css";

/* Enterprise High-Tech Custom Icons */
function NeuralChatIcon({ className }: { className?: string }) {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 0 1-4.255-.95L3 20l1.245-3.735C3.473 14.97 3 13.535 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      <path d="M8 12h.01" strokeWidth="2.5" />
      <path d="M12 12h.01" strokeWidth="2.5" />
      <path d="M16 12h.01" strokeWidth="2.5" />
      <path d="M9 8.5c1.8-1 4.2-1 6 0" strokeDasharray="1.5 1.5" />
      <path d="M9 15.5c1.8 1 4.2 1 6 0" strokeDasharray="1.5 1.5" />
    </svg>
  );
}

function VectorRagIcon({ className }: { className?: string }) {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="3" />
      <circle cx="4" cy="6" r="2" />
      <circle cx="20" cy="6" r="2" />
      <circle cx="4" cy="18" r="2" />
      <circle cx="20" cy="18" r="2" />
      <path d="M5.6 7.2 9.4 10.3" />
      <path d="M18.4 7.2 14.6 10.3" />
      <path d="M5.6 16.8 9.4 13.7" />
      <path d="M18.4 16.8 14.6 13.7" />
      <path d="M4 8.5v7" strokeDasharray="2 2" />
      <path d="M20 8.5v7" strokeDasharray="2 2" />
    </svg>
  );
}

function CodeSynthesisIcon({ className }: { className?: string }) {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <polyline points="7 8 3 12 7 16" />
      <polyline points="17 8 21 12 17 16" />
      <line x1="14" y1="4" x2="10" y2="20" />
      <circle cx="12" cy="12" r="1.75" fill="currentColor" />
      <circle cx="7" cy="12" r="0.75" fill="currentColor" />
      <circle cx="17" cy="12" r="0.75" fill="currentColor" />
    </svg>
  );
}

function AgentOrchestrationIcon({ className }: { className?: string }) {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="9" y="2" width="6" height="5" rx="1.5" />
      <rect x="2" y="16" width="6" height="5" rx="1.5" />
      <rect x="16" y="16" width="6" height="5" rx="1.5" />
      <path d="M12 7v4" />
      <path d="M12 11h-7v5" />
      <path d="M12 11h7v5" />
      <circle cx="12" cy="11" r="1.5" fill="currentColor" />
      <path d="M8 18.5h8" strokeDasharray="1.5 2" />
    </svg>
  );
}

interface FaqItem {
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    q: "Which foundation models are supported during early access?",
    a: "Early access supports premier open foundation models including Meta Llama 3.3 (70B, 8B), DeepSeek-V3, DeepSeek-R1, Mistral Large 2, and Qwen 2.5. Dedicated endpoints also support custom fine-tuned checkpoints, LoRA adapters, and proprietary architectures.",
  },
  {
    q: "When will early-access applicants be onboarded?",
    a: "Rolling onboarding begins leading up to GTC Berlin. Applications are reviewed within 48 business hours by our infrastructure architects, and qualified teams receive pilot onboarding details and API credentials promptly.",
  },
  {
    q: "What is the pricing structure during the early-access pilot?",
    a: "Early-access participants receive introductory pilot credits and preferred token volume rates. For dedicated endpoints, reserved instance pilot rates are customized based on cluster configuration and commitment duration.",
  },
  {
    q: "Where is the serving infrastructure hosted?",
    a: "All inference clusters operate in NeoCloudz U.S. Tier III Data Centers (TIA-942 Rated 3, SOC 2 Type I compliant) with redundant utility feeds, liquid-cooled high-density racks, and multi-terabit direct fiber uplinks.",
  },
  {
    q: "How does NeoCloudz protect data privacy and intellectual property?",
    a: "NeoCloudz maintains a strict zero data retention policy. Your prompt inputs, token completions, and model weights are never stored on persistent storage without explicit configuration, and are NEVER used to train or tune foundation models. Dedicated endpoints operate within isolated private VPCs.",
  },
  {
    q: "How does Token Factory differ from AI Factory as a Service?",
    a: "Token Factory provides managed AI inference with turnkey API endpoints, automated vLLM acceleration, and dedicated model serving clusters. In contrast, AI Factory as a Service provides managed infrastructure pods (bare-metal GPU clusters, power, and physical hardware operations) where your team manages the model and serving stack.",
  },
];

interface GtcEventItem {
  id: string;
  monthDay: string;
  weekday: string;
  timeRange: string;
  title: string;
  location: string;
  guestsText: string;
  posterTitle: string;
  posterDate: string;
  linkUrl: string;
}

const GTC_EVENTS: GtcEventItem[] = [
  {
    id: "meet-the-team",
    monthDay: "Oct 20",
    weekday: "Tuesday",
    timeRange: "8:00 AM · 5:00 PM GMT+2",
    title: "NeoCloudz Happy Hour: Meet the Team",
    location: "Vox Restaurant & Bar",
    guestsText: "No guests",
    posterTitle: "Meet the Team",
    posterDate: "OCTOBER 20, 2026 | 5-7 PM | BERLIN",
    linkUrl: "https://luma.com/1cmdbxc6",
  },
  {
    id: "lets-talk-inference",
    monthDay: "Oct 21",
    weekday: "Wednesday",
    timeRange: "8:00 AM · 5:00 PM GMT+2",
    title: "NeoCloudz Happy Hour: Let's Talk Inference",
    location: "Vox Restaurant & Bar",
    guestsText: "No guests",
    posterTitle: "Let's Talk Inference",
    posterDate: "OCTOBER 21, 2026 | 5-7 PM | BERLIN",
    linkUrl: "https://luma.com/o1robneo",
  },
  {
    id: "launch-celebration",
    monthDay: "Oct 22",
    weekday: "Thursday",
    timeRange: "8:00 AM · 5:00 PM GMT+2",
    title: "NeoCloudz Happy Hour: Token Factory Launch Celebration",
    location: "Vox Restaurant & Bar",
    guestsText: "No guests",
    posterTitle: "Token Factory Launch Celebration",
    posterDate: "OCTOBER 22, 2026 | 5-7 PM | BERLIN",
    linkUrl: "https://luma.com/3hbr52g9",
  },
];

export function TokenFactoryShell() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaq((prev) => (prev === idx ? null : idx));
  };

  return (
    <PageEffects>
      <div className="token-factory-page">
        {/* HERO SECTION */}
        <section className="tf-prod-hero" id="hero">
          <HeroParticles />
          <div className="hero-grid" />
          <div className="hero-aurora">
            <div
              className="aurora-band"
              style={
                {
                  background: "rgba(45, 255, 122, 0.28)",
                  top: "15%",
                  "--adur": "18s",
                  "--adel": "0s",
                } as React.CSSProperties
              }
            />
            <div
              className="aurora-band"
              style={
                {
                  background: "rgba(77, 200, 255, 0.22)",
                  top: "55%",
                  "--adur": "24s",
                  "--adel": "3s",
                } as React.CSSProperties
              }
            />
          </div>

          <div className="hero-content">
            <div className="tf-early-badge">
              <span className="dot" />
              <span>Token Factory · Early Access</span>
            </div>

            <h1>
              Meet NeoCloudz <span className="g">Token Factory.</span>
            </h1>

            <p className="hero-sub">
              Token Factory provides managed AI inference;{" "}
              <Link href="/ai-factory-as-a-service" className="tf-desc-link">
                AI Factory as a Service
              </Link>{" "}
              provides managed infrastructure.
            </p>

            <div className="tf-hero-ctas">
              <Link
                href="/contact?interest=token_factory&intent=early-access&source=token-factory&cta=hero_request_early_access"
                className="btn-launch"
                aria-label="Request Early Access to NeoCloudz Token Factory"
              >
                Request Early Access <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <a href="#overview" className="btn-outline" aria-label="Explore Architecture">
                Explore Architecture ↓
              </a>
            </div>

            <div className="tf-hero-terminal">
              <span className="prompt">$</span>
              <div className="tf-terminal-cmd">
                <span className="tf-term-tag">Serving: Llama-3.3-70B</span>
                <span className="tf-term-sep">·</span>
                <span className="tf-term-tag">Blackwell B200</span>
                <span className="tf-term-sep">·</span>
                <span className="tf-term-tag">TTFT: 42ms</span>
                <span className="tf-term-sep">·</span>
                <span className="tf-term-tag">FP8 Tensor Engine</span>
              </div>
            </div>
          </div>
        </section>

        {/* GTC BERLIN CALLOUT CARD */}
        <div className="tf-gtc-banner-wrap">
          <div className="tf-gtc-card">
            <div className="tf-gtc-left">
              <div className="tf-gtc-badge">GTC Berlin 2026</div>
              <div className="tf-gtc-info">
                <div className="tf-gtc-title">Introducing Token Factory Live in Berlin</div>
                <div className="tf-gtc-desc">
                  Join our engineering leadership at GTC Berlin for a 1-on-1 private architecture session. Review your inference throughput requirements, test latency benchmarks, and secure your early-access capacity allocation.
                </div>
              </div>
            </div>
            <Link
              href="/contact?interest=gtc_berlin_meeting&intent=meeting&gtc_meeting=true&source=token-factory&cta=gtc_berlin_callout"
              className="tf-gtc-cta"
              aria-label="Schedule a meeting with NeoCloudz at GTC Berlin"
            >
              <span>Meet Us in Berlin</span>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* GTC BERLIN SIDE EVENTS SECTION */}
        <section className="tf-events-section" id="events">
          <div className="tf-events-container">
            {/* Header with Title and Badge */}
            <div className="tf-events-header">
              <div className="tf-events-title-wrap">
                <h2 className="tf-events-title">Events</h2>
              </div>
              <span className="tf-events-badge">Upcoming</span>
            </div>

            {/* Timeline List */}
            <div className="tf-timeline-wrap">
              <div className="tf-timeline-line" aria-hidden="true" />
              <div className="tf-timeline-list">
                {GTC_EVENTS.map((event) => (
                  <div key={event.id} className="tf-timeline-row">
                    {/* Left: Date Column */}
                    <div className="tf-event-date-col">
                      <span className="tf-event-date-main">{event.monthDay}</span>
                      <span className="tf-event-date-sep">·</span>
                      <span className="tf-event-date-sub">{event.weekday}</span>
                    </div>

                    {/* Center Node on Timeline Track */}
                    <div className="tf-timeline-node" aria-hidden="true">
                      <span className="tf-timeline-dot" />
                    </div>

                    {/* Right: Event Card */}
                    <div className="tf-event-card">
                      <div className="tf-event-details">
                        <div className="tf-event-time">{event.timeRange}</div>
                        <h3 className="tf-event-heading">{event.title}</h3>

                        <div className="tf-event-meta-group">
                          <div className="tf-event-meta-item">
                            <MapPin size={15} className="tf-meta-icon" aria-hidden="true" />
                            <span>{event.location}</span>
                          </div>
                          <div className="tf-event-meta-item">
                            <Users size={15} className="tf-meta-icon" aria-hidden="true" />
                            <span>{event.guestsText}</span>
                          </div>
                        </div>

                        <div className="tf-event-actions">
                          <a
                            href={event.linkUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="tf-event-manage-btn"
                            aria-label={`Register on Luma for ${event.title}`}
                          >
                            <span>Manage Event</span>
                            <ArrowRight size={14} aria-hidden="true" />
                          </a>
                        </div>
                      </div>

                      {/* Right: Poster Graphic linking to Luma with NeoCloudz logo */}
                      <a
                        href={event.linkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="tf-event-poster"
                        aria-label={`Open Luma event for ${event.posterTitle}`}
                      >
                        <div className="tf-poster-grid" aria-hidden="true" />
                        <div className="tf-poster-top">
                          <Image
                            src="/DigiPowerX Posts (17) 1.png"
                            alt="NeoCloudz"
                            width={120}
                            height={26}
                            style={{ height: "26px", width: "auto", display: "block", objectFit: "contain" }}
                          />
                        </div>

                        <div className="tf-poster-badge">HAPPY HOUR</div>

                        <div className="tf-poster-content">
                          <h4 className="tf-poster-title">{event.posterTitle}</h4>
                          <p className="tf-poster-tagline">Meet. Connect. Explore AI.</p>
                        </div>

                        <div className="tf-poster-footer">
                          <span>{event.posterDate}</span>
                        </div>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 1: PRODUCT OVERVIEW */}
        <section className="tf-section-block" id="overview">
          <div className="tf-section-inner">
            <div className="tf-section-header">
              <div className="hp-label" style={{ justifyContent: "center" }}>Product Overview</div>
              <h2>
                Run Inference Without Managing <span className="g">GPU Serving Infrastructure</span>
              </h2>
              <p>
                Eliminate the operational complexity of CUDA drivers, container orchestration, vLLM configuration, and hardware failures. Token Factory delivers production model serving as a reliable utility.
              </p>
            </div>

            <div className="tf-grid-3">
              <div className="tf-card">
                <div className="tf-card-icon">
                  <Zap size={24} />
                </div>
                <h3>Zero Infrastructure DevOps</h3>
                <p>
                  No Kubernetes GPU operators, no driver crashes, and no kernel debugging. Send requests to OpenAI-compatible REST endpoints or connect private endpoints directly to your VPC.
                </p>
              </div>

              <div className="tf-card">
                <div className="tf-card-icon">
                  <Activity size={24} />
                </div>
                <h3>Sub-Millisecond TTFT</h3>
                <p>
                  Purpose-built memory architectures and optimized speculative decoding runtimes deliver industry-leading Time-To-First-Token and sustained streaming throughput.
                </p>
              </div>

              <div className="tf-card">
                <div className="tf-card-icon">
                  <ShieldCheck size={24} />
                </div>
                <h3>Automated High Availability</h3>
                <p>
                  Continuous cluster monitoring with instant node failover and load distribution ensures production workloads stay operational without manual intervention.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: ACCESS OPTIONS */}
        <section className="tf-section-block" id="access-options">
          <div className="tf-section-inner">
            <div className="tf-section-header">
              <div className="hp-label" style={{ justifyContent: "center" }}>Access Options</div>
              <h2>
                Tailored Access for <span className="g">Every Stage of Growth</span>
              </h2>
              <p>
                Choose flexible serverless token consumption for immediate prototyping, or reserve dedicated single-tenant clusters for sustained enterprise throughput.
              </p>
            </div>

            <div className="tf-access-grid">
              {/* Option A: API-Based Inference */}
              <div className="tf-access-card featured">
                <span className="tf-scope-badge active">Early Access Available</span>
                <h3>API-Based Inference</h3>
                <p>
                  Serverless, on-demand token serving powered by our high-density shared Blackwell B200 clusters. Instant deployment with zero capacity commitments.
                </p>
                <ul className="tf-access-bullets">
                  <li>
                    <CheckCircle2 size={16} color="var(--green)" />
                    <span>Pay only for tokens consumed (input + output)</span>
                  </li>
                  <li>
                    <CheckCircle2 size={16} color="var(--green)" />
                    <span>OpenAI API specification compatibility</span>
                  </li>
                  <li>
                    <CheckCircle2 size={16} color="var(--green)" />
                    <span>Automatic dynamic scaling under high traffic surges</span>
                  </li>
                  <li>
                    <CheckCircle2 size={16} color="var(--green)" />
                    <span>Pre-loaded Llama 3.3, DeepSeek, Mistral weights</span>
                  </li>
                </ul>
                <Link
                  href="/contact?interest=token-factory&intent=early-access"
                  className="btn-launch btn-cta"
                  aria-label="Request Early Access for API Inference"
                >
                  Request API Early Access <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>

              {/* Option B: Dedicated Endpoints */}
              <div className="tf-access-card">
                <span className="tf-scope-badge pilot">Pilot Allocation Scope</span>
                <h3>Dedicated Endpoints</h3>
                <p>
                  Single-tenant, physically isolated GPU nodes reserved exclusively for your workload. Maximum data privacy, guaranteed throughput, and custom model weights.
                </p>
                <ul className="tf-access-bullets">
                  <li>
                    <CheckCircle2 size={16} color="var(--blue)" />
                    <span>Dedicated Blackwell B200 or H100 GPU compute pods</span>
                  </li>
                  <li>
                    <CheckCircle2 size={16} color="var(--blue)" />
                    <span>Support for custom fine-tunes & proprietary weights</span>
                  </li>
                  <li>
                    <CheckCircle2 size={16} color="var(--blue)" />
                    <span>Private VPC peering & zero public internet exposure</span>
                  </li>
                  <li>
                    <CheckCircle2 size={16} color="var(--blue)" />
                    <span>Strict enterprise latency & uptime SLAs</span>
                  </li>
                </ul>
                <Link
                  href="/contact?interest=token_factory&intent=early-access&source=token-factory&cta=dedicated_pilot"
                  className="btn-outline btn-cta"
                  aria-label="Request Dedicated Endpoint Pilot"
                >
                  Reserve Dedicated Endpoint Pilot
                </Link>
              </div>
            </div>

            {/* Scope Distinction: Early Access Scope vs. Planned Capabilities */}
            <div className="tf-scope-distinction">
              <div>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--green)",
                    marginBottom: "10px",
                  }}
                >
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "var(--green)",
                    }}
                  />
                  Confirmed Early-Access Scope
                </div>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    fontSize: "13.5px",
                    color: "var(--text)",
                    opacity: 0.9,
                  }}
                >
                  <li>• Serverless token serving for Meta Llama 3.3, DeepSeek-V3/R1, and Mistral</li>
                  <li>• Dedicated Blackwell B200 / H100 pods for custom fine-tunes & LoRA adapters</li>
                  <li>• OpenAI-compatible REST API integration with streaming SSE tokens</li>
                  <li>• Strict zero data retention & U.S. Tier III certified facility hosting</li>
                </ul>
              </div>

              <div>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                    marginBottom: "10px",
                  }}
                >
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "var(--muted)",
                    }}
                  />
                  Planned Post-Early Access Features
                </div>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    fontSize: "13.5px",
                    color: "var(--muted)",
                  }}
                >
                  <li>• Multi-region global edge token routing and KV cache distribution</li>
                  <li>• One-click model distillation and automatic quantization pipeline</li>
                  <li>• Self-serve token consumption analytics and team budget centers</li>
                  <li>• Automated multi-cloud fallback routing with custom SLA policies</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: WHY NEOCLOUDZ */}
        <section className="tf-section-block" id="why-neocloudz">
          <div className="tf-section-inner">
            <div className="tf-section-header">
              <div className="hp-label" style={{ justifyContent: "center" }}>Why NeoCloudz</div>
              <h2>
                Workload Optimization Through <span className="g">Full-Stack Control</span>
              </h2>
              <p>
                Unlike generic API wrappers or cloud resellers, NeoCloudz owns and engineers the physical compute, memory, storage, and networking layers for maximum inference throughput.
              </p>
            </div>

            <div className="tf-grid-4">
              <div className="tf-card">
                <div className="tf-card-icon">
                  <Cpu size={24} />
                </div>
                <h3>1. GPU Compute Control</h3>
                <p>
                  Direct, unvirtualized access to NVIDIA Blackwell B200 and Hopper H100 SXM5 accelerators featuring 5th-gen Tensor Cores and FP8/FP4 micro-scaling engines.
                </p>
              </div>

              <div className="tf-card">
                <div className="tf-card-icon">
                  <Server size={24} />
                </div>
                <h3>2. Ultra-Fast Memory (HBM3e)</h3>
                <p>
                  Up to 8 TB/s per GPU memory bandwidth accelerates memory-bound attention operations, massive context window ingestion, and concurrent KV cache lookups.
                </p>
              </div>

              <div className="tf-card">
                <div className="tf-card-icon">
                  <Layers size={24} />
                </div>
                <h3>3. High-Throughput Storage</h3>
                <p>
                  Ultra-low-latency parallel NVMe storage fabric enables instant weight hydration, fast checkpoint switching, and sustained RAG context pre-loading.
                </p>
              </div>

              <div className="tf-card">
                <div className="tf-card-icon">
                  <Zap size={24} />
                </div>
                <h3>4. 900 GB/s NVLink & Networking</h3>
                <p>
                  900 GB/s NVLink 4.0 interconnects paired with 400 Gb/s InfiniBand RDMA networking eliminate inter-GPU communication latency during tensor-parallel serving.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: USE CASES */}
        <section className="tf-section-block" id="use-cases">
          <div className="tf-section-inner">
            <div className="tf-section-header">
              <div className="hp-label" style={{ justifyContent: "center" }}>Production Use Cases</div>
              <h2>
                Engineered for <span className="g">Demanding AI Workloads</span>
              </h2>
              <p>
                From low-latency interactive conversations to high-throughput autonomous agents, Token Factory delivers the consistency your users expect.
              </p>
            </div>

            <div className="tf-grid-4">
              <div className="tf-use-card">
                <div className="tf-use-icon green">
                  <NeuralChatIcon />
                </div>
                <h4>AI Assistants & Chat</h4>
                <p>
                  Deliver fluid conversational interfaces with sub-100ms first token latency, high concurrency, and zero jitter during peak hours.
                </p>
              </div>

              <div className="tf-use-card">
                <div className="tf-use-icon blue">
                  <VectorRagIcon />
                </div>
                <h4>Enterprise Knowledge & RAG</h4>
                <p>
                  Query massive vector stores and proprietary context windows with fast parallel prefill and strict enterprise zero data retention.
                </p>
              </div>

              <div className="tf-use-card">
                <div className="tf-use-icon amber">
                  <CodeSynthesisIcon />
                </div>
                <h4>Coding Copilots & Dev Tools</h4>
                <p>
                  Support high-output token streams for code generation, live completions, syntax analysis, and CI/CD automated review bots.
                </p>
              </div>

              <div className="tf-use-card">
                <div className="tf-use-icon purple">
                  <AgentOrchestrationIcon />
                </div>
                <h4>Autonomous Agent Systems</h4>
                <p>
                  Execute recursive reasoning cycles, tool-calling chains, and multi-agent coordination without rate limit throttling or slow queueing.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: EARLY-ACCESS PROCESS ROADMAP */}
        <section className="tf-section-block" id="process">
          <div className="tf-section-inner">
            <div className="tf-section-header">
              <div className="hp-label" style={{ justifyContent: "center" }}>Onboarding Roadmap</div>
              <h2>
                Simple, High-Touch <span className="g">Early-Access Process</span>
              </h2>
              <p>
                We collaborate directly with your engineering team to ensure rapid integration, performance tuning, and capacity reservation.
              </p>
            </div>

            <div className="tf-roadmap-grid">
              <div className="tf-step-card">
                <div className="tf-step-num">01</div>
                <h4>Submit Requirements</h4>
                <p>
                  Tell us about your target models, expected request volume, latency requirements, and launch timeline.
                </p>
              </div>

              <div className="tf-step-card">
                <div className="tf-step-num">02</div>
                <h4>Workload & Fit Discussion</h4>
                <p>
                  Meet with our infrastructure architects to benchmark token performance and choose optimal runtime parameters.
                </p>
              </div>

              <div className="tf-step-card">
                <div className="tf-step-num">03</div>
                <h4>Agree on Pilot Scope</h4>
                <p>
                  Confirm token quotas or dedicated GPU node allocations, SLA commitments, and pilot pricing terms.
                </p>
              </div>

              <div className="tf-step-card">
                <div className="tf-step-num">04</div>
                <h4>Receive Onboarding Details</h4>
                <p>
                  Get API credentials, endpoint documentation, private Slack channel access, and start serving production requests.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: FAQ */}
        <section className="tf-section-block" id="faq">
          <div className="tf-section-inner">
            <div className="tf-section-header">
              <div className="hp-label" style={{ justifyContent: "center" }}>FAQ</div>
              <h2>
                Frequently Asked <span className="g">Questions</span>
              </h2>
              <p>
                Key technical and operational details regarding the NeoCloudz Token Factory early-access program.
              </p>
            </div>

            <div className="tf-faq-list">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="tf-faq-item"
                    onClick={() => toggleFaq(idx)}
                    role="button"
                    tabIndex={0}
                    aria-expanded={isOpen}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggleFaq(idx);
                      }
                    }}
                  >
                    <div className="tf-faq-q">
                      <span>{faq.q}</span>
                      <ChevronDown
                        size={18}
                        style={{
                          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                          transition: "transform 0.2s ease",
                          color: isOpen ? "var(--green)" : "var(--muted)",
                        }}
                      />
                    </div>
                    {isOpen && <div className="tf-faq-a">{faq.a}</div>}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 7: FINAL CTA */}
        <section className="tf-final-cta-section">
          <div className="tf-final-card">
            <div className="hp-label" style={{ justifyContent: "center", marginBottom: "20px" }}>
              Get Started Today
            </div>
            <h2>
              Ready to Accelerate Your AI Inference <br />
              <span className="g">Without Managing GPUs?</span>
            </h2>
            <p>
              Request early access to NeoCloudz Token Factory today. Our team will contact you to evaluate workload fit, allocate pilot capacity, and accelerate your time-to-production.
            </p>
            <div className="tf-hero-ctas" style={{ marginBottom: 0 }}>
              <Link
                href="/contact?interest=token_factory&intent=early-access&source=token-factory&cta=final_request_early_access"
                className="btn-launch"
                aria-label="Request Early Access to NeoCloudz Token Factory"
              >
                Request Early Access <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link
                href="/contact?interest=gtc_berlin_meeting&intent=meeting&gtc_meeting=true&source=token-factory&cta=gtc_berlin_footer"
                className="btn-outline"
                aria-label="Meet NeoCloudz at GTC Berlin"
              >
                Meet Us at GTC Berlin →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PageEffects>
  );
}
