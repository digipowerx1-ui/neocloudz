import type { Metadata } from "next";
import { TokenFactoryShell } from "@/features/token-factory/TokenFactoryShell";

export const metadata: Metadata = {
  title: "NeoCloudz Token Factory — Managed AI Inference",
  description:
    "Meet NeoCloudz Token Factory. Token Factory provides managed AI inference; AI Factory as a Service provides managed infrastructure.",
  openGraph: {
    title: "NeoCloudz Token Factory — Managed AI Inference",
    description:
      "Token Factory provides managed AI inference; AI Factory as a Service provides managed infrastructure.",
  },
};

export default function TokenFactoryPage() {
  return <TokenFactoryShell />;
}
