"use client";

/**
 * Custom-built scheduling calendar for /book. No third-party calendar
 * embed — a month grid plus hourly slots that match the site's own
 * design language (glass cards, accent gradient selection, semantic
 * tokens). Booking a slot submits straight to /api/booking, which emails
 * the request the same way the contact form does.
 */
import * as React from "react";
import { ChevronLeft, ChevronRight, Loader2, Check, Mail, MessageCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { publicEnv } from "@/lib/env";
import { cn } from "@/lib/utils";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MONTH_NAMES = [
 "January", "February", "March", "April", "May", "June",
 "July", "August", "September", "October", "November", "December",
];
const TIME_SLOTS = [
 "09:00", "10:00", "11:00", "12:00", "13:00",
 "14:00", "15:00", "16:00", "17:00", "18:00",
];

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function formatTime12h(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(m).padStart(2, "0")} ${period}`;
}

function formatDateLabel(d: Date) {
  return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
}

type State =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

export function BookingCalendar() {
  const today = React.useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const [viewYear, setViewYear] = React.useState(today.getFullYear());
  const [viewMonth, setViewMonth] = React.useState(today.getMonth());
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = React.useState<string | null>(null);
  const [state, setState] = React.useState<State>({ status: "idle" });

  const isCurrentMonth = viewYear === today.getFullYear() && viewMonth === today.getMonth();

  const cells = React.useMemo(() => {
    const firstOfMonth = new Date(viewYear, viewMonth, 1);
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const leadingBlanks = (firstOfMonth.getDay() + 6) % 7; // Monday-first offset

    const out: (Date | null)[] = Array.from({ length: leadingBlanks }, () => null);
    for (let day = 1; day <= daysInMonth; day++) {
      out.push(new Date(viewYear, viewMonth, day));
    }
    while (out.length % 7 !== 0) out.push(null);
    return out;
  }, [viewYear, viewMonth]);

  function goPrevMonth() {
    if (isCurrentMonth) return;
    const prev = new Date(viewYear, viewMonth - 1, 1);
    setViewYear(prev.getFullYear());
    setViewMonth(prev.getMonth());
  }

  function goNextMonth() {
    const next = new Date(viewYear, viewMonth + 1, 1);
    setViewYear(next.getFullYear());
    setViewMonth(next.getMonth());
  }

  function selectDate(d: Date) {
    setSelectedDate(d);
    setSelectedTime(null);
    setState({ status: "idle" });
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!selectedDate || !selectedTime) return;
    setState({ status: "submitting" });
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    if (data.honeypot) {
      setState({ status: "success", message: "Thanks, we'll confirm your slot shortly." });
      return;
    }

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          dateLabel: formatDateLabel(selectedDate),
          timeLabel: formatTime12h(selectedTime),
          timezone: "PKT",
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setState({
          status: "error",
          message: json?.message || "We couldn't send that right now. Please email or WhatsApp us instead.",
        });
        return;
      }
      setState({
        status: "success",
        message: json?.message || "Thanks — we'll confirm your slot by email within one business day.",
      });
      form.reset();
      setSelectedDate(null);
      setSelectedTime(null);
    } catch {
      setState({ status: "error", message: "Network issue. Please email or WhatsApp us instead." });
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="lg:col-span-6">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold text-text">
            {MONTH_NAMES[viewMonth]} {viewYear}
          </h3>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={goPrevMonth}
              disabled={isCurrentMonth}
              aria-label="Previous month"
              className="grid size-11 place-items-center rounded-full border border-[color:var(--color-border)] text-text transition-colors hover:border-brand hover:text-link disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={goNextMonth}
              aria-label="Next month"
              className="grid size-11 place-items-center rounded-full border border-[color:var(--color-border)] text-text transition-colors hover:border-brand hover:text-link"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-7 gap-1 text-center text-[11px] font-medium uppercase tracking-[0.08em] text-muted">
          {WEEKDAYS.map((w) => (
            <div key={w}>{w}</div>
          ))}
        </div>

        <div className="mt-1.5 grid grid-cols-7 gap-1.5">
          {cells.map((d, i) => {
            if (!d) return <div key={i} />;
            const isSunday = d.getDay() === 0;
            const isPast = d < today;
            const disabled = isSunday || isPast;
            const selected = selectedDate && isSameDay(d, selectedDate);
            const isToday = isSameDay(d, today);
            return (
              <button
                key={i}
                type="button"
                disabled={disabled}
                onClick={() => selectDate(d)}
                className={cn(
 "aspect-square min-h-[44px] min-w-[44px] rounded-xl text-[13.5px] font-medium transition-all duration-150",
                  disabled && "cursor-not-allowed text-muted",
                  !disabled && !selected && "text-text hover:bg-brand/10 hover:text-link",
                  selected && "bg-gradient-to-br from-brand to-brand text-white ",
                  !selected && isToday && !disabled && "ring-1 ring-accent/40"
                )}
              >
                {d.getDate()}
              </button>
            );
          })}
        </div>

        <p className="mt-4 text-[12.5px] text-muted">
          Mon – Sat · 9:00 AM – 7:00 PM PKT. Sundays are off.
        </p>

        {selectedDate && (
          <div className="mt-6">
            <p className="flex items-center gap-2 text-[12.5px] font-medium uppercase tracking-[0.12em] text-muted">
              <Clock className="size-3.5" /> Pick a time — {formatDateLabel(selectedDate)}
            </p>
            <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
              {TIME_SLOTS.map((t) => {
                const selected = t === selectedTime;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setSelectedTime(t)}
                    className={cn(
 "min-h-[44px] rounded-full border px-4 text-[13px] font-medium transition-all duration-150",
                      selected
                        ? "border-transparent bg-gradient-to-r from-brand to-brand text-white "
                        : "border-[color:var(--color-border)] text-text hover:border-brand hover:text-link"
                    )}
                  >
                    {formatTime12h(t)}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="lg:col-span-6">
        {!selectedDate || !selectedTime ? (
          <div className="flex h-full min-h-[220px] flex-col items-center justify-center rounded-2xl border border-dashed border-[color:var(--color-border)] bg-surface p-8 text-center">
            <Clock className="size-6 text-muted" />
            <p className="mt-3 text-[14px] text-muted">
              Pick a date and time on the left, then leave your details here.
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="grid gap-4">
            <div className="rounded-2xl border border-brand bg-gradient-to-br from-brand/10 via-transparent to-brand/5 px-4 py-3">
              <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-link">Your slot</p>
              <p className="mt-1 text-[14.5px] font-medium text-text">
                {formatDateLabel(selectedDate)} · {formatTime12h(selectedTime)} PKT
              </p>
            </div>

            <input type="text" name="honeypot" autoComplete="off" tabIndex={-1} className="hidden" />

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name" name="name" type="text" required placeholder="Your full name" />
              <Field label="Email" name="email" type="email" required placeholder="you@company.com" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Company (optional)" name="company" type="text" placeholder="Company / project" />
              <Field label="Phone / WhatsApp (optional)" name="phone" type="text" placeholder="+1 555 …" />
            </div>
            <Field label="Anything we should know? (optional)" name="note" type="textarea" placeholder="Goal, timeline, or a link to what you're building." />

            <Button
              type="submit"
              disabled={state.status === "submitting" || state.status === "success"}
              className="w-full sm:w-auto"
            >
              {state.status === "submitting" ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> Requesting…
                </>
              ) : state.status === "success" ? (
                <>
                  <Check className="size-4" /> Requested
                </>
              ) : (
                <>Request this slot</>
              )}
            </Button>

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
        )}
      </div>
    </div>
  );
}

const inputClass =
 "w-full rounded-xl border border-[color:var(--color-border)] bg-surface/60 px-4 py-3 text-[14.5px] text-text placeholder-ink/35 outline-none transition duration-200 focus:border-brand focus:shadow-[0_0_0_3px_rgb(var(--color-accent-rgb)/0.2)]";

function Field({
  label,
  name,
  type,
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type: "text" | "email" | "textarea";
  required?: boolean;
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
          rows={3}
          placeholder={placeholder}
          className={cn(inputClass, "mt-2 resize-none")}
        />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          className={cn(inputClass, "mt-2")}
        />
      )}
    </label>
  );
}
