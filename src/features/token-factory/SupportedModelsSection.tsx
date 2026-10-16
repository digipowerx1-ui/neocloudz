"use client";

import React, { useState, useMemo } from "react";
import { Search, X, Sparkles, Cpu } from "lucide-react";
import {
  NvidiaLogo,
  ZaiOrgLogo,
  QwenLogo,
  GoogleLogo,
  MoonshotLogo,
} from "./ModelIcons";

export type BadgeVariant =
  | "purple"
  | "emerald"
  | "blue"
  | "amber"
  | "teal"
  | "sky"
  | "neutral";

export interface ModelBadge {
  label: string;
  variant: BadgeVariant;
}

export interface ModelItem {
  id: string;
  modelSlug: string;
  name: string;
  provider: string;
  providerType: "nvidia" | "zai-org" | "qwen" | "google" | "moonshot";
  description?: string;
  context: string;
  latency: string;
  quality?: string;
  badges: ModelBadge[];
}

export const SUPPORTED_MODELS: ModelItem[] = [
  {
    id: "nemotron-3-ultra-550b",
    modelSlug: "nvidia/nemotron-3-ultra-550b",
    name: "Nemotron 3 Ultra 550B",
    provider: "NVIDIA",
    providerType: "nvidia",
    context: "256K context",
    latency: "160 ms latency",
    quality: "quality 9.4",
    badges: [
      { label: "Reasoning", variant: "purple" },
      { label: "flagship", variant: "neutral" },
      { label: "NVIDIA Open Model", variant: "neutral" },
    ],
  },
  {
    id: "glm-5.3-flash",
    modelSlug: "zai-org/glm-5.3-flash",
    name: "GLM-5.3 Flash",
    provider: "zai-org",
    providerType: "zai-org",
    context: "1M context",
    latency: "120 ms latency",
    quality: "quality 8.7",
    badges: [
      { label: "Low latency", variant: "emerald" },
      { label: "MIT", variant: "neutral" },
    ],
  },
  {
    id: "qwen-3.8-27b",
    modelSlug: "qwen/qwen-3.8-27b",
    name: "Qwen3.8 27B",
    provider: "Qwen",
    providerType: "qwen",
    context: "256K context",
    latency: "140 ms latency",
    quality: "quality 8.6",
    badges: [
      { label: "General purpose", variant: "blue" },
      { label: "open weights", variant: "neutral" },
      { label: "Apache 2.0", variant: "neutral" },
    ],
  },
  {
    id: "nemotron-3.5-lightning-30b",
    modelSlug: "nvidia/nemotron-3.5-lightning-30b",
    name: "Nemotron 3.5 Lightning 30B",
    provider: "NVIDIA",
    providerType: "nvidia",
    context: "1M context",
    latency: "80 ms latency",
    quality: "quality 8.6",
    badges: [
      { label: "Mixture of experts", variant: "amber" },
      { label: "NVIDIA Open Model", variant: "neutral" },
    ],
  },
  {
    id: "gemma-3-1b-it",
    modelSlug: "google/gemma-3-1b-it",
    name: "Gemma 3 1B IT",
    provider: "Google",
    providerType: "google",
    context: "32K context",
    latency: "40 ms latency",
    quality: "quality 7.5",
    badges: [
      { label: "Small", variant: "teal" },
      { label: "high throughput", variant: "neutral" },
      { label: "Gemma Terms", variant: "neutral" },
    ],
  },
  {
    id: "kimi-vl-a3b-thinking",
    modelSlug: "moonshot/kimi-vl-a3b-thinking",
    name: "Kimi-VL-A3B-Thinking",
    provider: "Moonshot AI",
    providerType: "moonshot",
    description:
      'Moonshot AI\'s vision-language "Thinking" model (image + text in, text out), 131K context.',
    context: "128K context",
    latency: "91 ms latency",
    badges: [{ label: "Text", variant: "sky" }],
  },
];

const CATEGORY_TABS = [
  "All",
  "Reasoning",
  "Low latency",
  "Mixture of experts",
  "General purpose",
  "Small",
  "Text",
];

function renderProviderLogo(type: ModelItem["providerType"]) {
  switch (type) {
    case "nvidia":
      return <NvidiaLogo size={36} />;
    case "qwen":
      return <QwenLogo size={36} />;
    case "zai-org":
      return <ZaiOrgLogo size={34} />;
    case "google":
      return <GoogleLogo size={30} />;
    case "moonshot":
      return <MoonshotLogo size={34} />;
    default:
      return <Cpu className="w-7 h-7 text-green-400" />;
  }
}

export function SupportedModelsSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredModels = useMemo(() => {
    return SUPPORTED_MODELS.filter((model) => {
      // Category filter
      if (selectedCategory !== "All") {
        const hasTag = model.badges.some(
          (b) => b.label.toLowerCase() === selectedCategory.toLowerCase()
        );
        if (!hasTag) return false;
      }

      // Search query filter
      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase().trim();

      const nameMatch = model.name.toLowerCase().includes(query);
      const providerMatch = model.provider.toLowerCase().includes(query);
      const descMatch = model.description?.toLowerCase().includes(query) ?? false;
      const badgeMatch = model.badges.some((b) =>
        b.label.toLowerCase().includes(query)
      );
      const contextMatch = model.context.toLowerCase().includes(query);
      const latencyMatch = model.latency.toLowerCase().includes(query);
      const qualityMatch = model.quality?.toLowerCase().includes(query) ?? false;

      return (
        nameMatch ||
        providerMatch ||
        descMatch ||
        badgeMatch ||
        contextMatch ||
        latencyMatch ||
        qualityMatch
      );
    });
  }, [searchQuery, selectedCategory]);

  return (
    <section className="tf-section-block" id="supported-models" aria-labelledby="supported-models-heading">
      <div className="tf-section-inner" style={{ maxWidth: "1140px" }}>
        {/* Section Header */}
        <div className="tf-section-header" style={{ marginBottom: "36px" }}>
          <div className="hp-label" style={{ justifyContent: "center" }}>
            <Sparkles size={14} className="text-green" />
            <span>Pre-Loaded Architectures</span>
          </div>
          <h2 id="supported-models-heading">
            Premier Foundation Models. <br />
            <span className="g">Zero Infrastructure Overhead.</span>
          </h2>
          <p>
            Deploy and serve state-of-the-art open models with turnkey OpenAI-compatible
            API endpoints, guaranteed throughput, and sub-100ms first token latencies on
            dedicated Blackwell clusters.
          </p>
        </div>

        {/* Catalog Control Bar */}
        <div className="tf-catalog-bar">
          {/* Left: Dynamic Model Counter */}
          <div className="tf-catalog-counter">
            <span className="tf-catalog-counter-num">{filteredModels.length}</span>
            <span className="tf-catalog-counter-text">
              {filteredModels.length === 1 ? "model" : "models"}
            </span>
            {searchQuery && (
              <span className="tf-catalog-filter-indicator">
                matching &ldquo;{searchQuery}&rdquo;
              </span>
            )}
          </div>

          {/* Right: Search Input */}
          <div className="tf-catalog-search-wrapper">
            <Search size={17} className="tf-catalog-search-icon" aria-hidden="true" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search models..."
              aria-label="Search models"
              className="tf-catalog-search-input"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="tf-catalog-search-clear"
                aria-label="Clear search query"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="tf-category-chips" role="tablist" aria-label="Filter models by tag">
          {CATEGORY_TABS.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelectedCategory(cat)}
                className={`tf-category-chip ${isActive ? "active" : ""}`}
              >
                {cat}
                {cat === "All" && ` (${SUPPORTED_MODELS.length})`}
              </button>
            );
          })}
        </div>

        {/* Models Grid */}
        <div className="tf-models-list">
          {filteredModels.length > 0 ? (
            filteredModels.map((model) => (
              <article
                key={model.id}
                className="tf-model-card"
                id={`model-${model.id}`}
              >
                {/* Card Top: Provider Icon Box + Header Info */}
                <div className="tf-model-card-top">
                  <div className="tf-model-icon-box" aria-hidden="true">
                    {renderProviderLogo(model.providerType)}
                  </div>
                  <div className="tf-model-header-info">
                    <h3 className="tf-model-title">{model.name}</h3>
                    <span className="tf-model-meta-provider">by {model.provider}</span>
                  </div>
                </div>

                {/* Optional Description (for Kimi, etc.) */}
                {model.description && (
                  <p className="tf-model-description">{model.description}</p>
                )}

                {/* Metadata Row: [Context] · [Latency] · [Quality] */}
                <div className="tf-model-meta-row">
                  <span className="tf-model-meta-spec">{model.context}</span>
                  <span className="tf-meta-dot" aria-hidden="true">·</span>
                  <span className="tf-model-meta-spec">{model.latency}</span>
                  {model.quality && (
                    <>
                      <span className="tf-meta-dot" aria-hidden="true">·</span>
                      <span className="tf-model-meta-quality">{model.quality}</span>
                    </>
                  )}
                </div>

                {/* Badges / Tags Row */}
                <div className="tf-model-badges-row">
                  {model.badges.map((badge, idx) => (
                    <span
                      key={idx}
                      className={`tf-model-badge tf-badge-${badge.variant}`}
                    >
                      {badge.label}
                    </span>
                  ))}
                </div>
              </article>
            ))
          ) : (
            <div className="tf-models-empty">
              <Search size={32} className="tf-empty-icon" />
              <h4>No models match your search</h4>
              <p>
                We could not find any models matching &ldquo;{searchQuery}&rdquo;.
                Try clearing your search or checking our other supported architectures.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="btn-launch"
                style={{ marginTop: "16px", padding: "8px 20px", fontSize: "13px" }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
export default SupportedModelsSection;
