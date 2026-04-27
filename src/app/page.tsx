import "./home.css";
import { HomeShell } from "@/features/home/HomeShell";

export const metadata = {
  title: "NeoCloudz — GPU Cluster Terminal",
  description:
    "Private GPU clusters. Instant access. Zero friction. Monitor your entire cluster in real time.",
};

export default function HomePage() {
  return <HomeShell />;
}
