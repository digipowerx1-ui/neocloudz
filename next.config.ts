import type { NextConfig } from "next";

// ponytail: subdomains serve a static coming-soon page; swap for real apps when they exist
const COMING_SOON_HOSTS = ["console.neocloudz.com", "api.neocloudz.com"];

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.31.45"],
  async redirects() {
    return [{ source: "/coming-soon.html", destination: "/coming-soon", permanent: true }];
  },
  async rewrites() {
    return {
      beforeFiles: COMING_SOON_HOSTS.map((host) => ({
        source: "/((?!_next/|images/|favicon\\.ico|coming-soon\\.html).*)",
        has: [{ type: "host" as const, value: host }],
        destination: "/coming-soon.html",
      })),
      afterFiles: [{ source: "/coming-soon", destination: "/coming-soon.html" }],
    };
  },
};

export default nextConfig;
