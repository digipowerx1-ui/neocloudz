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
    icon: <img src="/assets/icons/channels/chat.png" alt="Chat" style={{ width: "100%", height: "100%", objectFit: "contain" }} />,
    name: "Live Systems Chat",
    desc: "Direct uplink to our engineering team. No bots, real humans, zero latency.",
    meta: "~5 min response",
  },
  {
    variant: "b",
    cardClass: "blue-ch",
    icon: <img src="/assets/icons/channels/twitter.png" alt="Twitter" style={{ width: "100%", height: "100%", objectFit: "contain" }} />,
    name: "Twitter / X",
    desc: "Follow @NeoCloudz for real-time uptime logs and GPU cluster drops.",
    meta: "@NeoCloudz",
  },
  {
    variant: "a",
    cardClass: "amber-ch",
    icon: <img src="/assets/icons/channels/linkedin.png" alt="LinkedIn" style={{ width: "100%", height: "100%", objectFit: "contain" }} />,
    name: "LinkedIn Core",
    desc: "Strategic company news, architectural launches, and career opportunities.",
    meta: "NeoCloudz Inc.",
  },
  {
    variant: "r",
    cardClass: "red-ch",
    icon: <img src="/assets/icons/channels/discord.png" alt="Discord" style={{ width: "100%", height: "100%", objectFit: "contain" }} />,
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
              <div className={`ch-icon-wrap ${channel.variant}`} style={{ background: "transparent", border: "none", width: "56px", height: "56px", padding: "0", marginBottom: "16px" }}>
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

