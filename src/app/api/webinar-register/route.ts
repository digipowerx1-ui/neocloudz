import { NextRequest, NextResponse } from "next/server";

// ponytail: thin proxy so the Magent token stays server-side; swap the URL/env when the flow moves to prod
const MAGENT_URL =
  "https://ebooks.magent-qa.com/api/v1/mflow/execute/4023a25e-9f06-4f59-b499-4e979c16d2ef";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: NextRequest) {
  const token = process.env.MAGENT_WEBINAR_TOKEN;
  if (!token) return NextResponse.json({ error: "not_configured" }, { status: 500 });

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }
  const clean = (v: unknown) => (typeof v === "string" ? v.trim().replace(/\s+/g, " ").slice(0, 200) : "");
  const name = clean(body.name), email = clean(body.email), company = clean(body.company);
  if (!name || !company || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "invalid_fields" }, { status: 400 });
  }

  const upstream = await fetch(MAGENT_URL, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ name, email, company }),
  });
  if (!upstream.ok) return NextResponse.json({ error: "upstream_failed" }, { status: 502 });
  return NextResponse.json({ ok: true });
}
