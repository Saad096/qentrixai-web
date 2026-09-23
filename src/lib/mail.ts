/**
 * Server-only email delivery. Supports three providers via env:
 *   EMAIL_PROVIDER=resend   -> RESEND_API_KEY (recommended)
 *   EMAIL_PROVIDER=sendgrid -> SENDGRID_API_KEY
 *   EMAIL_PROVIDER=smtp     -> SMTP_HOST / SMTP_PORT / SMTP_USER / SMTP_PASS
 *
 * Envelope (standard transactional-form pattern):
 *   From      = verified sender owned by us
 *   To        = CONTACT_RECEIVER_EMAIL
 *   Reply-To  = the form submitter (hit Reply in your inbox -> goes to them)
 *
 * Why not use the submitter's email as From?
 *   Modern providers reject that as spoofing — the sender domain must be one
 *   you control / have verified. The Reply-To trick gives the same UX in the
 *   reply flow without breaking SPF/DKIM.
 *
 * Resend specifics:
 *   - With a verified domain, set RESEND_FROM_EMAIL=noreply@yourdomain.com.
 *   - Without a verified domain, From defaults to `onboarding@resend.dev`,
 *     and Resend (on free accounts) only allows delivery to the email tied
 *     to your Resend account. Verify a domain at resend.com/domains to send
 *     to arbitrary recipients in production.
 */

import "server-only";

export type ContactPayload = {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  budget?: string;
  service?: string;
  message: string;
};

export type BookingPayload = {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  dateLabel: string;
  timeLabel: string;
  timezone: string;
  note?: string;
};

function resendSender(): { email: string; name: string; header: string } {
  const email = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
  const name = process.env.RESEND_FROM_NAME ?? "QentrixAI";
  return { email, name, header: `${name} <${email}>` };
}

function sendgridSender(): { email: string; name: string } {
  return {
    email: process.env.SENDGRID_FROM_EMAIL ?? "noreply@qentrixai.com",
    name: process.env.SENDGRID_FROM_NAME ?? "QentrixAI",
  };
}

/**
 * Where a submitted brief lands. Deliberately NOT the public address: the
 * site still shows talk@qentrix-ai.com everywhere a visitor can write to us
 * by hand, and replies go out from there. This is only the inbox the form
 * delivers to.
 *
 * The NEXT_PUBLIC_PROFILE_EMAIL fallback is gone. It silently made the
 * displayed address double as the delivery address, so changing one changed
 * the other -- which is the exact coupling this split exists to avoid.
 */
const TO = process.env.CONTACT_RECEIVER_EMAIL ?? "talk2saadalam@gmail.com";

function buildPlainText(p: ContactPayload) {
  return [
    "New inbound from the QentrixAI website",
    "------------------------------------------",
    `Name:     ${p.name}`,
    `Email:    ${p.email}`,
    p.company ? `Company:  ${p.company}` : undefined,
    p.phone ? `Phone:    ${p.phone}` : undefined,
    p.service ? `Service:  ${p.service}` : undefined,
    p.budget ? `Budget:   ${p.budget}` : undefined,
    "",
    "Message:",
    p.message,
    "",
    "—",
    "Reply directly to this email to respond to the sender.",
  ]
    .filter(Boolean)
    .join("\n");
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Email-client safe HTML. Inline styles, table-based layout — works in
 * Gmail, Outlook (incl. Win/Mac desktop), Apple Mail, Yahoo, mobile.
 */
function buildHtml(p: ContactPayload) {
  const row = (label: string, value?: string) =>
    value
      ? `<tr>
            <td style="padding:8px 16px 8px 0;color:#6b7280;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;font-weight:600;white-space:nowrap;vertical-align:top;width:1%;">${escapeHtml(label)}</td>
            <td style="padding:8px 0;color:#0f172a;font-size:14px;line-height:1.55;">${escapeHtml(value)}</td>
          </tr>`
      : "";

  const messageHtml = escapeHtml(p.message).replace(/\n/g, "<br>");
  const mailtoReply = `mailto:${encodeURIComponent(p.email)}?subject=${encodeURIComponent(
    "Re: your message to QentrixAI"
  )}`;

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="color-scheme" content="light only">
    <meta name="supported-color-schemes" content="light only">
    <title>New inquiry — QentrixAI</title>
    <!--[if mso]><style>body,table,td{font-family:Segoe UI,Arial,sans-serif !important;}</style><![endif]-->
  </head>
  <body style="margin:0;padding:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#0f172a;">
    <span style="display:none !important;visibility:hidden;opacity:0;color:transparent;height:0;width:0;overflow:hidden;">New inquiry from ${escapeHtml(p.name)} — ${escapeHtml(p.service || "QentrixAI website")}.</span>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:28px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:620px;background:#ffffff;border-radius:16px;border:1px solid #e5e7eb;overflow:hidden;box-shadow:0 12px 40px -16px rgba(15,23,42,0.18);">
            <tr>
              <td style="background:linear-gradient(135deg,#3b66ff 0%,#8b5cf6 55%,#22d3ee 100%);padding:24px 30px;">
                <div style="color:#ffffff;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;font-weight:700;opacity:0.92;">QentrixAI · Website inquiry</div>
                <div style="color:#ffffff;font-size:22px;font-weight:700;margin-top:8px;line-height:1.25;">New brief from ${escapeHtml(p.name)}</div>
                ${p.service ? `<div style="color:rgba(255,255,255,0.92);font-size:13px;margin-top:4px;">Interested in <strong>${escapeHtml(p.service)}</strong>${p.budget ? ` · budget ${escapeHtml(p.budget)}` : ""}</div>` : ""}
              </td>
            </tr>

            <tr>
              <td style="padding:26px 30px 6px 30px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  ${row("Name", p.name)}
                  ${row("Email", p.email)}
                  ${row("Company", p.company)}
                  ${row("Phone", p.phone)}
                  ${row("Service", p.service)}
                  ${row("Budget", p.budget)}
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:14px 30px 22px 30px;">
                <div style="color:#6b7280;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;font-weight:600;margin-bottom:10px;">Message</div>
                <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:12px;padding:16px 18px;color:#111827;font-size:15px;line-height:1.65;">
                  ${messageHtml}
                </div>
              </td>
            </tr>

            <tr>
              <td style="padding:0 30px 24px 30px;">
                <a href="${mailtoReply}" style="display:inline-block;padding:11px 18px;background:linear-gradient(135deg,#3b66ff,#8b5cf6);color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;border-radius:999px;">Reply to ${escapeHtml(p.name)}</a>
                <span style="margin-left:10px;font-size:12px;color:#6b7280;">or hit Reply — it goes back to ${escapeHtml(p.email)}.</span>
              </td>
            </tr>

            <tr>
              <td style="padding:16px 30px 22px 30px;border-top:1px solid #e5e7eb;background:#fafafa;">
                <div style="font-size:11px;color:#9ca3af;line-height:1.6;">
                  Sent via the QentrixAI website contact form · qentrixai.com<br>
                  This message was relayed by an authenticated sender. Replies route back to ${escapeHtml(p.email)}.
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

async function deliverEmail(args: {
  subject: string;
  text: string;
  html: string;
  replyToEmail: string;
  replyToName: string;
}): Promise<{ ok: boolean; provider: string; reason?: string; id?: string }> {
  const { subject, text, html, replyToEmail, replyToName } = args;
  const provider = (process.env.EMAIL_PROVIDER ?? "").toLowerCase();

  try {
    if (provider === "resend" && process.env.RESEND_API_KEY) {
      const sender = resendSender();
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: sender.header,
          to: [TO],
          subject,
          html,
          text,
          reply_to: replyToEmail,
        }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        return {
          ok: false,
          provider,
          reason: `resend ${res.status} ${JSON.stringify(body).slice(0, 300)}`,
        };
      }
      return { ok: true, provider, id: (body as { id?: string }).id };
    }

    if (provider === "sendgrid" && process.env.SENDGRID_API_KEY) {
      const { email: fromEmail, name: fromName } = sendgridSender();
      const res = await fetch("https://api.sendgrid.com/v3/mail/send", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          personalizations: [{ to: [{ email: TO }] }],
          from: { email: fromEmail, name: fromName },
          reply_to: { email: replyToEmail, name: replyToName },
          subject,
          content: [
            { type: "text/plain", value: text },
            { type: "text/html", value: html },
          ],
        }),
      });
      if (!res.ok) {
        const detail = await res.text().catch(() => "");
        return { ok: false, provider, reason: `sendgrid ${res.status} ${detail.slice(0, 300)}` };
      }
      return { ok: true, provider };
    }

    if (provider === "smtp" && process.env.SMTP_HOST) {
      const nodemailer = await import("nodemailer");
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT ?? 587),
        secure: Number(process.env.SMTP_PORT) === 465,
        auth: process.env.SMTP_USER
          ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
          : undefined,
      });
      await transporter.sendMail({
        from: process.env.MAIL_FROM ?? `QentrixAI <${process.env.SMTP_USER ?? "noreply@qentrixai.com"}>`,
        to: TO,
        subject,
        text,
        html,
        replyTo: `${replyToName} <${replyToEmail}>`,
      });
      return { ok: true, provider };
    }

    return { ok: false, provider: "none", reason: "no email provider configured" };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { ok: false, provider, reason: message };
  }
}

export async function sendContactEmail(
  payload: ContactPayload
): Promise<{ ok: boolean; provider: string; reason?: string; id?: string }> {
  return deliverEmail({
    subject: `[QentrixAI] New brief from ${payload.name}`,
    text: buildPlainText(payload),
    html: buildHtml(payload),
    replyToEmail: payload.email,
    replyToName: payload.name,
  });
}

function buildBookingPlainText(p: BookingPayload) {
  return [
    "New strategy call booking from the QentrixAI website",
    "------------------------------------------------------",
    `Name:      ${p.name}`,
    `Email:     ${p.email}`,
    p.company ? `Company:   ${p.company}` : undefined,
    p.phone ? `Phone:     ${p.phone}` : undefined,
    `Date:      ${p.dateLabel}`,
    `Time:      ${p.timeLabel} (${p.timezone})`,
    p.note ? "" : undefined,
    p.note ? "Note:" : undefined,
    p.note,
    "",
    "—",
    "Reply directly to this email to confirm or reschedule the slot.",
  ]
    .filter((line) => line !== undefined)
    .join("\n");
}

function buildBookingHtml(p: BookingPayload) {
  const row = (label: string, value?: string) =>
    value
      ? `<tr>
            <td style="padding:8px 16px 8px 0;color:#6b7280;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;font-weight:600;white-space:nowrap;vertical-align:top;width:1%;">${escapeHtml(label)}</td>
            <td style="padding:8px 0;color:#0f172a;font-size:14px;line-height:1.55;">${escapeHtml(value)}</td>
          </tr>`
      : "";

  const mailtoReply = `mailto:${encodeURIComponent(p.email)}?subject=${encodeURIComponent(
    "Re: your strategy call with QentrixAI"
  )}`;

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="color-scheme" content="light only">
    <meta name="supported-color-schemes" content="light only">
    <title>New strategy call booking — QentrixAI</title>
    <!--[if mso]><style>body,table,td{font-family:Segoe UI,Arial,sans-serif !important;}</style><![endif]-->
  </head>
  <body style="margin:0;padding:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#0f172a;">
    <span style="display:none !important;visibility:hidden;opacity:0;color:transparent;height:0;width:0;overflow:hidden;">${escapeHtml(p.name)} booked a strategy call for ${escapeHtml(p.dateLabel)} at ${escapeHtml(p.timeLabel)}.</span>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:28px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:620px;background:#ffffff;border-radius:16px;border:1px solid #e5e7eb;overflow:hidden;box-shadow:0 12px 40px -16px rgba(15,23,42,0.18);">
            <tr>
              <td style="background:linear-gradient(135deg,#3b66ff 0%,#8b5cf6 55%,#22d3ee 100%);padding:24px 30px;">
                <div style="color:#ffffff;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;font-weight:700;opacity:0.92;">QentrixAI · Strategy call request</div>
                <div style="color:#ffffff;font-size:22px;font-weight:700;margin-top:8px;line-height:1.25;">${escapeHtml(p.name)} wants a 30-minute call</div>
                <div style="color:rgba(255,255,255,0.92);font-size:13px;margin-top:4px;">Requested for <strong>${escapeHtml(p.dateLabel)}</strong> at <strong>${escapeHtml(p.timeLabel)} (${escapeHtml(p.timezone)})</strong></div>
              </td>
            </tr>

            <tr>
              <td style="padding:26px 30px 6px 30px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  ${row("Name", p.name)}
                  ${row("Email", p.email)}
                  ${row("Company", p.company)}
                  ${row("Phone", p.phone)}
                  ${row("Date", p.dateLabel)}
                  ${row("Time", `${p.timeLabel} (${p.timezone})`)}
                </table>
              </td>
            </tr>

            ${
              p.note
                ? `<tr>
              <td style="padding:14px 30px 22px 30px;">
                <div style="color:#6b7280;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;font-weight:600;margin-bottom:10px;">Note</div>
                <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:12px;padding:16px 18px;color:#111827;font-size:15px;line-height:1.65;">
                  ${escapeHtml(p.note).replace(/\n/g, "<br>")}
                </div>
              </td>
            </tr>`
                : ""
            }

            <tr>
              <td style="padding:0 30px 24px 30px;">
                <a href="${mailtoReply}" style="display:inline-block;padding:11px 18px;background:linear-gradient(135deg,#3b66ff,#8b5cf6);color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;border-radius:999px;">Confirm with ${escapeHtml(p.name)}</a>
                <span style="margin-left:10px;font-size:12px;color:#6b7280;">or hit Reply — it goes back to ${escapeHtml(p.email)}.</span>
              </td>
            </tr>

            <tr>
              <td style="padding:16px 30px 22px 30px;border-top:1px solid #e5e7eb;background:#fafafa;">
                <div style="font-size:11px;color:#9ca3af;line-height:1.6;">
                  Sent via the QentrixAI booking calendar · qentrixai.com<br>
                  This message was relayed by an authenticated sender. Replies route back to ${escapeHtml(p.email)}.
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export async function sendBookingEmail(
  payload: BookingPayload
): Promise<{ ok: boolean; provider: string; reason?: string; id?: string }> {
  return deliverEmail({
    subject: `[QentrixAI] Strategy call request — ${payload.name} · ${payload.dateLabel} ${payload.timeLabel}`,
    text: buildBookingPlainText(payload),
    html: buildBookingHtml(payload),
    replyToEmail: payload.email,
    replyToName: payload.name,
  });
}
