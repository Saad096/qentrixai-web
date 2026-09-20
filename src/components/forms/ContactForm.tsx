"use client";

/**
 * 2026-07 revamp: renamed the service select to "What are you looking to
 * solve?", added the accent focus glow on inputs, a human note above the
 * fields, and a "Message sent ✓" submit-button success state. Submit goes
 * full-width on mobile.
 */
import * as React from "react";
import { Send, MessageCircle, Mail, Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { publicEnv } from "@/lib/env";
import { cn } from "@/lib/utils";

const problems = [
 "Ship an LLM product or copilot",
 "Automate a workflow with agents",
 "Search and answer over our documents",
 "Automate calls with voice AI",
 "Computer vision or document AI",
 "Launch an AI MVP",
 "Cloud, MLOps or AI infrastructure",
 "Something else",
];

const budgets = [
 "< $5k (exploration)",
 "$5k – $15k",
 "$15k – $40k",
 "$40k – $100k",
 "$100k+",
 "Not sure yet",
];

type State =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

export function ContactForm() {
  const [state, setState] = React.useState<State>({ status: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState({ status: "submitting" });
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    if ((data as Record<string, string>).honeypot) {
      setState({ status: "success", message: "Thanks, we'll be in touch." });
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setState({
          status: "error",
          message: json?.message || "We couldn't send that right now. Please email or WhatsApp us with the links below.",
        });
        return;
      }
      setState({
        status: "success",
        message: json?.message || "Thanks, we received your message and will reply within one business day.",
      });
      form.reset();
    } catch {
      setState({
        status: "error",
        message: "Network issue. Please email or WhatsApp us with the links below.",
      });
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <p className="text-[14px] leading-relaxed text-muted">
        We read every message and respond within one business day.
      </p>

      <input
        type="text"
        name="honeypot"
        autoComplete="off"
        tabIndex={-1}
        aria-hidden="true"
        aria-label="Leave this field empty"
        className="hidden"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" name="name" type="text" required autoComplete="name" placeholder="Your full name" />
        <Field label="Email" name="email" type="email" required autoComplete="email" inputMode="email" placeholder="you@company.com" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Company (optional)" name="company" type="text" autoComplete="organization" placeholder="Company or project" />
        <Field label="Phone or WhatsApp" name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="+1 555 000 0000" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Select label="What are you looking to solve?" name="service" options={problems} />
        <Select label="Budget range" name="budget" options={budgets} />
      </div>
      <Field label="Message" name="message" type="textarea" required placeholder="Tell us about the problem, the team, and the ideal timeline." />

      <div className="mt-2 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
        <Button
          type="submit"
          disabled={state.status === "submitting" || state.status === "success"}
          className="w-full sm:w-auto"
        >
          {state.status === "submitting" ? (
            <>
              <Loader2 className="size-4 animate-spin" /> Sending…
            </>
          ) : state.status === "success" ? (
            <>
              <Check className="size-4" /> Message sent
            </>
          ) : (
            <>
              <Send className="size-4" /> Send message
            </>
          )}
        </Button>
      </div>

      {state.status === "success" && (
        <div className="rounded-md border border-success/40 bg-success/10 px-4 py-3 text-base text-text">
          {state.message}
        </div>
      )}
      {state.status === "error" && (
        <div className="rounded-md border border-warn/40 bg-warn/10 px-4 py-3 text-base text-text">
          <p>{state.message}</p>
          <div className="mt-2 flex flex-wrap gap-3">
            <a
              href={`mailto:${publicEnv.profile.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-border)] bg-surface px-3 py-1.5 text-[13px] text-text"
            >
              <Mail className="size-3.5" /> Email
            </a>
            {publicEnv.socials.whatsapp && (
              <a
                href={publicEnv.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-border)] bg-surface px-3 py-1.5 text-[13px] text-text"
              >
                <MessageCircle className="size-3.5" /> WhatsApp
              </a>
            )}
          </div>
        </div>
      )}
    </form>
  );
}

const inputClass =
 "w-full rounded-xl border border-[color:var(--color-border)] bg-surface/60 px-4 py-3 text-[14.5px] text-text placeholder-ink/35 outline-none transition duration-200 focus:border-brand focus:shadow-[0_0_0_3px_rgb(var(--color-accent-rgb)/0.2)]";

function Field({
  label,
  name,
  type,
  required,
  autoComplete,
  inputMode,
  placeholder,
}: {
  label: string;
  name: string;
  type: "text" | "email" | "tel" | "textarea";
  required?: boolean;
  autoComplete?: string;
  inputMode?: "text" | "email" | "tel" | "numeric" | "url";
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="block text-[12.5px] font-medium uppercase tracking-[0.12em] text-muted">
        {label}
        {required && <span className="text-link"> *</span>}
      </span>
      {type === "textarea" ? (
        <textarea
          name={name}
          required={required}
          autoComplete={autoComplete}
          rows={5}
          placeholder={placeholder}
          className={cn(inputClass, "mt-2 resize-none")}
        />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          autoComplete={autoComplete}
          inputMode={inputMode}
          placeholder={placeholder}
          className={cn(inputClass, "mt-2")}
        />
      )}
    </label>
  );
}

function Select({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <label className="block">
      <span className="block text-[12.5px] font-medium uppercase tracking-[0.12em] text-muted">
        {label}
      </span>
      <select
        name={name}
        defaultValue=""
        className={cn(inputClass, "mt-2 appearance-none")}
      >
        <option value="" disabled className="bg-surface text-text">
          Choose…
        </option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-surface text-text">
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}
