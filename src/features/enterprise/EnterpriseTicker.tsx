interface TickerItem {
  bright: string;
  rest: string;
}

const TICKER_ITEMS: ReadonlyArray<TickerItem> = [
  { bright: "SOC 2 Type II", rest: "Certified" },
  { bright: "99.99%", rest: "Uptime SLA" },
  { bright: "Dedicated Bare Metal", rest: "Zero Shared Tenancy" },
  { bright: "InfiniBand 400G", rest: "Private Fabric" },
  { bright: "HIPAA", rest: "Compliant Infrastructure" },
  { bright: "<15min P1", rest: "Enterprise Response SLA" },
  { bright: "ISO 27001", rest: "& GDPR Ready" },
  { bright: "VPC Isolation", rest: "Private Networking" },
  { bright: "WEKA Storage", rest: "<10μs Latency" },
  { bright: "Named Account Manager", rest: "Included" },
];

const REPEAT_COUNT = 2;

export default function EnterpriseTicker() {
  return (
    <div className="ticker-wrap">
      <div className="ticker-track">
        {Array.from({ length: REPEAT_COUNT }).flatMap((_, repeatIdx) =>
          TICKER_ITEMS.map((item, idx) => (
            <span key={`${repeatIdx}-${idx}`} className="ticker-item">
              <span className="dot" />
              <span className="bright">{item.bright}</span> {item.rest}
            </span>
          )),
        )}
      </div>
    </div>
  );
}
