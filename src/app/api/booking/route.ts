import { NextResponse } from "next/server";
import { sendBookingEmail } from "@/lib/mail";
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
  const limited = rateLimit(`booking:${clientIp(req)}`, { limit: 5 });
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
  const company = String(payload.company ?? "").trim();
  const phone = String(payload.phone ?? "").trim();
  const dateLabel = String(payload.dateLabel ?? "").trim();
  const timeLabel = String(payload.timeLabel ?? "").trim();
  const timezone = String(payload.timezone ?? "PKT").trim();
  const note = String(payload.note ?? "").trim();
  const honeypot = String(payload.honeypot ?? "").trim();

  if (honeypot.length > 0) {
    return NextResponse.json(
      { ok: true, message: "Thanks — we'll confirm your slot shortly." },
      { headers: corsHeaders() }
    );
  }

  if (!name || !email || !dateLabel || !timeLabel) {
    return NextResponse.json(
      { ok: false, message: "Please pick a date and time, and share your name and email." },
      { status: 400, headers: corsHeaders() }
    );
  }

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRe.test(email)) {
    return NextResponse.json(
      { ok: false, message: "That email address looks off — please double-check." },
      { status: 400, headers: corsHeaders() }
    );
  }

  const result = await sendBookingEmail({
    name,
    email,
    company,
    phone,
    dateLabel,
    timeLabel,
    timezone,
    note,
  });

  if (!result.ok) {
    if (result.reason) {
      console.warn(`[booking] email send failed via ${result.provider}: ${result.reason}`);
    }
    return NextResponse.json(
      {
        ok: false,
        message:
          "We received your request, but our email service isn't fully configured yet. Please ping us on WhatsApp or email so we can confirm your slot.",
        provider: result.provider,
        ...(process.env.NODE_ENV !== "production" && result.reason
          ? { reason: result.reason }
          : {}),
      },
      { status: 202, headers: corsHeaders() }
    );
  }

  return NextResponse.json(
    {
      ok: true,
      message: `Thanks — we've got your request for ${dateLabel} at ${timeLabel} (${timezone}). We'll confirm by email within one business day.`,
    },
    { headers: corsHeaders() }
  );
}
