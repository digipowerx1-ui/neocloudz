import type { Metadata } from "next";
import "./globals.css";
import "@/components/layout/layout.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieConsent } from "@/components/layout/CookieConsent";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.neocloudz.com"),
  title: "NeoCloudz — GPU Infrastructure for AI",
  description: "GPU Infrastructure for AI",
  openGraph: {
    siteName: "NeoCloudz",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
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
        <CookieConsent />
      </body>
    </html>
  );
}
