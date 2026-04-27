import type { Metadata } from "next";
import "./globals.css";
import "@/components/layout/layout.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "NeoCloudz — GPU Infrastructure for AI",
  description: "GPU Infrastructure for AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
