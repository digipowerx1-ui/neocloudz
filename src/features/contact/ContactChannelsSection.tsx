import { MessageSquare, AtSign, Network, MessageCircle } from "lucide-react";

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
    icon: <MessageSquare size={28} color="var(--green)" />,
    name: "Live Systems Chat",
    desc: "Direct uplink to our engineering team. No bots, real humans, zero latency.",
    meta: "~5 min response",
  },
  {
    variant: "b",
    cardClass: "blue-ch",
    icon: <AtSign size={28} color="var(--blue)" />,
    name: "Twitter / X",
    desc: "Follow @NeoCloudz for real-time uptime logs and GPU cluster drops.",
    meta: "@NeoCloudz",
  },
  {
    variant: "a",
    cardClass: "amber-ch",
    icon: <Network size={28} color="var(--amber)" />,
    name: "LinkedIn Core",
    desc: "Strategic company news, architectural launches, and career opportunities.",
    meta: "NeoCloudz Inc.",
  },
  {
    variant: "r",
    cardClass: "red-ch",
    icon: <MessageCircle size={28} color="var(--red)" />,
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
                background: "rgba(255, 255, 255, 0.03)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "20px",
                padding: "32px",
                boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease"
              }}
            >
              <div className={`ch-icon-wrap ${channel.variant}`} style={{ 
                background: "rgba(255,255,255,0.05)", 
                border: "1px solid rgba(255,255,255,0.1)", 
                width: "56px", 
                height: "56px", 
                borderRadius: "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "24px",
                boxShadow: "0 0 16px rgba(255,255,255,0.05)"
              }}>
                {channel.icon}
              </div>
              <div className="ch-name" style={{ fontSize: "18px", fontWeight: 700, color: "var(--white)", marginBottom: "12px" }}>{channel.name}</div>
              <div className="ch-desc" style={{ opacity: 0.7, color: "var(--text)", lineHeight: 1.6, marginBottom: "20px" }}>{channel.desc}</div>
              <div className={`ch-time ${channel.variant}`} style={{ fontFamily: "var(--font-mono)", fontSize: "12px", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                {channel.meta}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

