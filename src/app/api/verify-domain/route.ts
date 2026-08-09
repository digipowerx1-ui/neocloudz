import { NextRequest, NextResponse } from "next/server";
import dns from "dns/promises";

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error("DNS timeout")), ms)
    ),
  ]);
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const domain = searchParams.get("domain")?.toLowerCase().trim();

  if (!domain || !/^[a-z0-9][a-z0-9\-\.]{0,253}[a-z0-9]$/.test(domain)) {
    return NextResponse.json({ exists: false, reason: "invalid_domain" });
  }

  try {
    const mxRecords = await withTimeout(dns.resolveMx(domain), 2000);
    if (mxRecords && mxRecords.length > 0) {
      return NextResponse.json({ exists: true, reason: "mx_found" });
    }
  } catch {
    // MX not found or timeout — fall through to A record check
  }

  try {
    const aRecords = await withTimeout(dns.resolve4(domain), 2000);
    if (aRecords && aRecords.length > 0) {
      return NextResponse.json({ exists: true, reason: "a_found" });
    }
  } catch {
    // A record not found or timeout
  }

  return NextResponse.json({ exists: false, reason: "nxdomain" });
}
