import { NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/mail";
import { rateLimit, clientIp } from "@/lib/rateLimit";

const cors = process.env.CORS_ALLOW_ORIGINS ?? "*";

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": cors,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

export async function OPTIONS() {
  return new NextResponse(null, { headers: corsHeaders() });
}

export async function POST(req: Request) {
  const limited = rateLimit(`contact:${clientIp(req)}`, { limit: 5 });
  if (!limited.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Try again shortly." },
      { status: 429, headers: { "Retry-After": String(limited.retryAfterSeconds) } }
    );
  }

  let payload: Record<string, unknown> = {};
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid JSON body." },
      { status: 400, headers: corsHeaders() }
    );
  }

  const name = String(payload.name ?? "").trim();
  const email = String(payload.email ?? "").trim();
  const message = String(payload.message ?? "").trim();
  const company = String(payload.company ?? "").trim();
  const phone = String(payload.phone ?? "").trim();
  const service = String(payload.service ?? "").trim();
  const budget = String(payload.budget ?? "").trim();
  const honeypot = String(payload.honeypot ?? "").trim();

  if (honeypot.length > 0) {
    // Silently accept spam
    return NextResponse.json({ ok: true, message: "Thanks. We will be in touch." }, { headers: corsHeaders() });
  }

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, message: "Please include your name, email and a short message." },
      { status: 400, headers: corsHeaders() }
    );
  }

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRe.test(email)) {
    return NextResponse.json(
      { ok: false, message: "That email address looks off. Please double-check it." },
      { status: 400, headers: corsHeaders() }
    );
  }

  const result = await sendContactEmail({ name, email, message, company, phone, service, budget });

  if (!result.ok) {
    // Log the underlying reason on the server for diagnostics — clients only
    // see a friendly fallback message.
    if (result.reason) {
      console.warn(`[contact] email send failed via ${result.provider}: ${result.reason}`);
    }
    return NextResponse.json(
      {
        ok: false,
        message:
          "We received your message, but our email service isn't fully configured yet. Please ping us on WhatsApp or email so we can reply right away.",
        provider: result.provider,
        // Exposed in non-production builds only — helps you debug locally.
        ...(process.env.NODE_ENV !== "production" && result.reason
          ? { reason: result.reason }
          : {}),
      },
      { status: 202, headers: corsHeaders() }
    );
  }

  return NextResponse.json(
    { ok: true, message: "Thanks. We received your message and will reply within one business day." },
    { headers: corsHeaders() }
  );
}
