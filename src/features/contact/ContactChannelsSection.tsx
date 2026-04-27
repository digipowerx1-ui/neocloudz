interface Channel {
  variant: "g" | "b" | "a" | "r";
  cardClass: "green-ch" | "blue-ch" | "amber-ch" | "red-ch";
  icon: string;
  name: string;
  desc: string;
  meta: string;
}

const CHANNELS: ReadonlyArray<Channel> = [
  {
    variant: "g",
    cardClass: "green-ch",
    icon: "💬",
    name: "Live Chat",
    desc: "Chat with our team directly from the dashboard. No bots, real humans.",
    meta: "~5 min response",
  },
  {
    variant: "b",
    cardClass: "blue-ch",
    icon: "🐦",
    name: "Twitter / X",
    desc: "Follow @NeoCloudz for uptime updates, GPU availability, and announcements.",
    meta: "@NeoCloudz",
  },
  {
    variant: "a",
    cardClass: "amber-ch",
    icon: "💼",
    name: "LinkedIn",
    desc: "Connect for company news, product launches, and career opportunities.",
    meta: "NeoCloudz Inc.",
  },
  {
    variant: "r",
    cardClass: "red-ch",
    icon: "🎮",
    name: "Discord",
    desc: "Join the community server. Ask questions, share benchmarks, get early access.",
    meta: "5,400+ members",
  },
];

const REVEAL_DELAY_CLASSES = ["", "rd1", "rd2", "rd3"];

export default function ContactChannelsSection() {
  return (
    <div className="channels-section">
      <div className="channels-label">Other Ways to Reach Us</div>
      <div className="channels-title">
        Find Us <span>Everywhere.</span>
      </div>
      <div className="channels-grid">
        {CHANNELS.map((channel, idx) => {
          const delay = REVEAL_DELAY_CLASSES[idx] ?? "";
          return (
            <div
              key={channel.name}
              className={`channel-card ${channel.cardClass} reveal${delay ? ` ${delay}` : ""}`}
            >
              <div className={`ch-icon-wrap ${channel.variant}`}>{channel.icon}</div>
              <div className="ch-name">{channel.name}</div>
              <div className="ch-desc">{channel.desc}</div>
              <div className={`ch-time ${channel.variant}`}>{channel.meta}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
