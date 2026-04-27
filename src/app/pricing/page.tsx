import "./pricing.css";
import { PricingShell } from "@/features/pricing-page/PricingShell";

export const metadata = {
  title: "Pricing — NeoCloudz GPU Cloud",
  description:
    "By the minute. No ingress fees. No egress fees. No contracts. Just the world's fastest GPUs at transparent prices.",
};

export default function PricingPage() {
  return <PricingShell />;
}
