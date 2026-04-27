import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Solutions — NeoCloudz | GPU Infrastructure for AI",
  description: "GPU Infrastructure for AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
