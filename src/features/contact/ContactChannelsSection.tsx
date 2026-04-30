import { MessageSquare, Gamepad2 } from "lucide-react";

// Custom SVG components for missing brand icons in this Lucide version
const TwitterIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const LinkedinIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

interface Channel {
  variant: "g" | "b" | "a" | "r";
  cardClass: "green-ch" | "blue-ch" | "amber-ch" | "red-ch";
  icon: React.ReactNode;
  name: string;
  desc: string;
  meta: string;
}

const CHANNELS: ReadonlyArray<Channel> = [
  {
    variant: "g",
    cardClass: "green-ch",
    icon: <MessageSquare size={20} />,
    name: "Live Systems Chat",
    desc: "Direct uplink to our engineering team. No bots, real humans, zero latency.",
    meta: "~5 min response",
  },
  {
    variant: "b",
    cardClass: "blue-ch",
    icon: <TwitterIcon size={20} />,
    name: "Twitter / X",
    desc: "Follow @NeoCloudz for real-time uptime logs and GPU cluster drops.",
    meta: "@NeoCloudz",
  },
  {
    variant: "a",
    cardClass: "amber-ch",
    icon: <LinkedinIcon size={20} />,
    name: "LinkedIn Core",
    desc: "Strategic company news, architectural launches, and career opportunities.",
    meta: "NeoCloudz Inc.",
  },
  {
    variant: "r",
    cardClass: "red-ch",
    icon: <Gamepad2 size={20} />,
    name: "Discord Node",
    desc: "Join the developer community. Share benchmarks and get early access.",
    meta: "5,400+ members",
  },
];

const REVEAL_DELAY_CLASSES = ["", "rd1", "rd2", "rd3"];

export default function ContactChannelsSection() {
  return (
    <div className="channels-section">
      <div className="channels-label">SECONDARY CHANNELS</div>
      <div className="channels-title">
        Connect <span>Everywhere.</span>
      </div>
      <div className="channels-grid">
        {CHANNELS.map((channel, idx) => {
          const delay = REVEAL_DELAY_CLASSES[idx] ?? "";
          return (
            <div
              key={channel.name}
              className={`channel-card ${channel.cardClass} reveal${delay ? ` ${delay}` : ""}`}
              style={{
                background: "linear-gradient(180deg, rgba(20,26,20,0.8) 0%, #000 100%)",
                border: "1px solid rgba(255,255,255,0.06)"
              }}
            >
              <div className={`ch-icon-wrap ${channel.variant}`} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                {channel.icon}
              </div>
              <div className="ch-name">{channel.name}</div>
              <div className="ch-desc" style={{ opacity: 0.6 }}>{channel.desc}</div>
              <div className={`ch-time ${channel.variant}`} style={{ fontFamily: "var(--font-mono)", fontSize: "11px" }}>
                {channel.meta}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

