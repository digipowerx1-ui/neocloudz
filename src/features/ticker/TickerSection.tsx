const TICKER_ITEMS = [
  { text: "NVIDIA Blackwell B200", highlight: true },
  { text: "AI Factory", highlight: false },
  { text: "GPU Service", highlight: false },
  { text: "ML Service", highlight: false },
  { text: "InfiniBand 400G", highlight: true },
  { text: "<5ms Inference", highlight: false },
  { text: "JupyterLab Ready", highlight: false },
  { text: "TIA-942 Tier III", highlight: true },
  { text: "DigiPowerX Power", highlight: false },
  { text: "WEKA Storage", highlight: false },
  { text: "99.99% SLA", highlight: true },
  { text: "U.S. Data Centers", highlight: false },
  { text: "Supermicro Servers", highlight: false },
  { text: "CERTAC Certified", highlight: true },
  { text: "Kubernetes-Native", highlight: false },
];

export default function TickerSection() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className="ticker">
      <div className="ticker-track">
        {items.map((item, i) => (
          <span
            key={i}
            className={`ticker-item${item.highlight ? " hi" : ""}`}
          >
            {item.text}
          </span>
        ))}
      </div>
    </div>
  );
}
