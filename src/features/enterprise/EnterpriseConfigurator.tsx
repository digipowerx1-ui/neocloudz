"use client";

import { useEffect, useRef, useState } from "react";

type ConfigKey = "gpu_type" | "gpu_count" | "storage" | "network" | "support";

interface ConfigOption {
  value: string;
  label: string;
}

interface ConfigGroup {
  key: ConfigKey;
  label: string;
  options: ReadonlyArray<ConfigOption>;
}

const CONFIG_GROUPS: ReadonlyArray<ConfigGroup> = [
  {
    key: "gpu_type",
    label: "GPU Type",
    options: [
      { value: "b200", label: "B200" },
      { value: "b300", label: "B300" },
      { value: "gb200", label: "GB200" },
      { value: "gb300", label: "GB300" },
    ],
  },
  {
    key: "gpu_count",
    label: "Cluster Size",
    options: [
      { value: "8", label: "8 GPUs" },
      { value: "16", label: "16 GPUs" },
      { value: "64", label: "64 GPUs" },
      { value: "128", label: "128 GPUs" },
      { value: "512", label: "512 GPUs" },
    ],
  },
  {
    key: "storage",
    label: "Storage",
    options: [
      { value: "none", label: "None" },
      { value: "weka_10tb", label: "10TB WEKA" },
      { value: "weka_100tb", label: "100TB WEKA" },
    ],
  },
  {
    key: "network",
    label: "Networking",
    options: [
      { value: "standard", label: "Standard" },
      { value: "infiniband_400g", label: "InfiniBand 400G" },
      { value: "custom", label: "Custom Fabric" },
    ],
  },
  {
    key: "support",
    label: "Support Tier",
    options: [
      { value: "enterprise", label: "Enterprise" },
      { value: "mission_critical", label: "Mission Critical" },
    ],
  },
];

const LABELS: Record<ConfigKey, Record<string, string>> = {
  gpu_type: { b200: "B200", b300: "B300", gb200: "GB200 NVL72", gb300: "GB300 NVL72" },
  gpu_count: { "8": "8", "16": "16", "64": "64", "128": "128", "512": "512" },
  storage: { none: "none", weka_10tb: "weka_10tb", weka_100tb: "weka_100tb" },
  network: {
    standard: "standard",
    infiniband_400g: "infiniband_400g",
    custom: "custom_fabric",
  },
  support: { enterprise: "enterprise", mission_critical: "mission_critical" },
};

const SLA_MAP: Record<string, string> = {
  b200: "99.9%",
  b300: "99.99%",
  gb200: "99.99%",
  gb300: "99.999%",
};

const INITIAL_CONFIG: Record<ConfigKey, string> = {
  gpu_type: "b300",
  gpu_count: "64",
  storage: "weka_100tb",
  network: "infiniband_400g",
  support: "enterprise",
};

const STREAM_LINE_DELAY_MS = 105;
const STREAM_DEBOUNCE_MS = 150;
const INITIAL_STREAM_DELAY_MS = 700;

interface OutputLine {
  c: string;
  m: string;
  ts: string;
}

function timestamp(): string {
  const now = new Date();
  return [now.getHours(), now.getMinutes(), now.getSeconds()]
    .map((n) => String(n).padStart(2, "0"))
    .join(":");
}

function buildLines(config: Record<ConfigKey, string>): { c: string; m: string }[] {
  return [
    { c: "green", m: "> neo enterprise config --cluster custom" },
    { c: "muted", m: "  Initializing enterprise configuration..." },
    { c: "", m: "  gpu_type:    " + LABELS.gpu_type[config.gpu_type] },
    { c: "", m: "  gpu_count:   " + LABELS.gpu_count[config.gpu_count] },
    { c: "", m: "  storage:     " + LABELS.storage[config.storage] },
    { c: "", m: "  network:     " + LABELS.network[config.network] },
    { c: "", m: "  sla:         " + SLA_MAP[config.gpu_type] },
    { c: "", m: "  support:     " + LABELS.support[config.support] },
    { c: "", m: "  compliance:  soc2,hipaa,gdpr,iso27001" },
    { c: "muted", m: "" },
    { c: "green", m: "  Estimated:   Contact Sales for Custom Pricing" },
    { c: "blue", m: "> Configuration validated ✓ — Ready to submit" },
  ];
}

export default function EnterpriseConfigurator() {
  const [config, setConfig] = useState<Record<ConfigKey, string>>(INITIAL_CONFIG);
  const [lines, setLines] = useState<OutputLine[]>([]);
  const lineTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const initialRef = useRef(true);

  function streamLines(currentConfig: Record<ConfigKey, string>) {
    if (lineTimerRef.current) clearTimeout(lineTimerRef.current);
    setLines([]);
    const target = buildLines(currentConfig);
    let i = 0;

    const next = () => {
      if (i >= target.length) return;
      const line = target[i++];
      setLines((prev) => [...prev, { ...line, ts: timestamp() }]);
      lineTimerRef.current = setTimeout(next, STREAM_LINE_DELAY_MS);
    };

    next();
  }

  useEffect(() => {
    const initialDelay = initialRef.current ? INITIAL_STREAM_DELAY_MS : STREAM_DEBOUNCE_MS;
    initialRef.current = false;

    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(() => streamLines(config), initialDelay);

    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, [config]);

  useEffect(() => {
    return () => {
      if (lineTimerRef.current) clearTimeout(lineTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [lines]);

  function handleSelect(key: ConfigKey, value: string) {
    setConfig((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit() {
    setLines((prev) => [
      ...prev,
      {
        c: "green",
        m: "> Configuration submitted — Sales team will contact you within 1 business day ✓",
        ts: timestamp(),
      },
    ]);
  }

  return (
    <section className="hp-section dark" id="configurator">
      <div style={{ maxWidth: "1100px", margin: "0 auto", textAlign: "center" }}>
        <div className="hp-label reveal" style={{ justifyContent: "center" }}>
          Cluster Configurator
        </div>
        <div className="hp-h2 reveal">
          Build Your
          <br />
          <span className="g">Dedicated Cluster.</span>
        </div>
        <p className="hp-sub reveal" style={{ margin: "14px auto 0" }}>
          Select your options and get an instant configuration — our team will follow
          up within one business day.
        </p>
      </div>

      <div className="config-terminal-wrap reveal" id="demo">
        <div className="terminal-bar">
          <div className="tbar-dots">
            <div className="tbar-dot red" />
            <div className="tbar-dot amber" />
            <div className="tbar-dot green" />
          </div>
          <div className="tbar-title">
            neocloudz — cluster-configurator — interactive
          </div>
          <div className="tbar-status">CONFIGURING</div>
        </div>
        <div className="config-body">
          <div className="config-selectors">
            {CONFIG_GROUPS.map((group) => (
              <div key={group.key} className="config-group">
                <div className="config-group-label">{group.label}</div>
                <div className="config-options" data-key={group.key}>
                  {group.options.map((option) => {
                    const isActive = config[group.key] === option.value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        className={`cfg-btn${isActive ? " active" : ""}`}
                        data-val={option.value}
                        onClick={() => handleSelect(group.key, option.value)}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
            <button
              type="button"
              className="config-submit"
              id="config-submit"
              onClick={handleSubmit}
            >
              Submit Configuration →
            </button>
          </div>
          <div ref={outputRef} className="config-output-panel" id="config-output">
            {lines.map((line, idx) => (
              <div key={idx} className="log-line">
                <span className="log-time">{line.ts}</span>
                <span className={`log-msg ${line.c}`}>{line.m}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
