"use client";

/**
 * Inference economics -- the interactive dial.
 *
 * The reference artifact for this made a point worth keeping: its animation
 * served usability rather than decoration, coupling a control to instant
 * feedback. So this is not scroll-scrubbed. Scroll-scrubbing would mean the
 * reader cannot go back to a step they did not follow, and the interesting
 * part here is the comparison between steps.
 *
 * It plays itself through once when it first comes into view, so a passive
 * reader sees the curve, then stops and hands over. After that every step is
 * a button.
 *
 * The honest part: batching buys cost and *charges* tail latency for it. A
 * chart where every number improves at once would be a sales chart, not an
 * engineering one, so p99 is shown moving the wrong way at step two.
 */
import * as React from "react";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

type Step = { technique: string; detail: string; cost: number; p99: number };

const STEPS: Step[] = [
  {
    technique: "Baseline",
    detail: "One large model, one request at a time. Every token billed at list price.",
    cost: 100,
    p99: 100,
  },
  {
    technique: "Continuous batching",
    detail:
      "Requests share a forward pass instead of queueing behind one another. The GPU stops idling -- and queued requests wait a little longer, so tail latency goes up before it comes down.",
    cost: 62,
    p99: 118,
  },
  {
    technique: "KV-cache reuse",
    detail:
      "Shared prefixes -- system prompts, retrieved context -- are computed once and reused across requests.",
    cost: 48,
    p99: 86,
  },
  {
    technique: "Quantisation",
    detail:
      "Weights served at lower precision, gated on the eval suite. If quality drops below the bar, the change does not ship.",
    cost: 31,
    p99: 64,
  },
  {
    technique: "Model routing",
    detail:
      "A small model answers first and escalates to a large one only when it fails a confidence check. Most traffic never needs the large one.",
    cost: 18,
    p99: 52,
  },
];

/**
 * A bare "18%" does not say whether 18 is good. Indices here are relative to
 * a baseline of 100, so the number that carries the meaning is the change:
 * -82% on cost, and +18% on p99 at step two, where batching genuinely makes
 * the tail worse before the later steps pull it back. The sign is the whole
 * point -- it is what stops this being a sales chart.
 */
function delta(index: number) {
  const d = index - 100;
  return `${d > 0 ? "+" : d < 0 ? "\u2212" : "\u00b1"}${Math.abs(d)}%`;
}

/** Count between two values so the dial reads as movement, not a jump. */
function useEased(target: number, ms = 520) {
  const [value, setValue] = React.useState(target);
  const from = React.useRef(target);
  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      from.current = target;
      setValue(target);
      return;
    }
    const start = performance.now();
    const a = from.current;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / ms);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(a + (target - a) * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
      else from.current = target;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, ms]);
  return value;
}

export function InferenceEconomics() {
  const [active, setActive] = React.useState(0);
  const [hasPlayed, setHasPlayed] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);

  const step = STEPS[active];
  const cost = useEased(step.cost);
  const p99 = useEased(step.p99);

  // Play through once on first view, then hand over to the reader.
  React.useEffect(() => {
    const el = rootRef.current;
    if (!el || hasPlayed) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        setHasPlayed(true);
        let i = 0;
        const id = window.setInterval(() => {
          i += 1;
          setActive(i);
          if (i >= STEPS.length - 1) window.clearInterval(id);
        }, 900);
      },
      { threshold: 0.45 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [hasPlayed]);

  const circumference = 2 * Math.PI * 52;

  return (
    <Section
      id="inference"
      eyebrow="What we actually do to the bill"
      heading="Inference cost is engineering, not a pricing tier."
      lede="Past a certain volume the API bill overtakes the cost of running it yourself. This is the work that makes the crossover pay."
      ground="base"
    >
      <div ref={rootRef} className="mt-12 grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="relative mx-auto grid aspect-square w-full max-w-[320px] place-items-center">
            <svg viewBox="0 0 120 120" className="size-full -rotate-90" aria-hidden="true">
              <circle cx="60" cy="60" r="52" fill="none" strokeWidth="9"
                className="stroke-[color:var(--color-border)]" />
              <circle
                cx="60" cy="60" r="52" fill="none" strokeWidth="9" strokeLinecap="round"
                className="stroke-[color:rgb(var(--color-link))] transition-[stroke-dashoffset] duration-500 ease-out"
                /* The arc draws the saving, not the remaining spend. It used
                   to fill to `cost`, so at the last step a nearly empty ring
                   sat next to a headline reading -82%, which is the same fact
                   drawn backwards. */
                strokeDasharray={circumference}
                strokeDashoffset={circumference * (cost / 100)}
              />
            </svg>
            <div className="absolute grid place-items-center text-center">
              <span className="text-3xl font-bold tabular-nums text-text">{delta(cost)}</span>
              <span className="mt-1 font-mono text-xs text-muted">cost vs baseline</span>
              <span className="mt-1 font-mono text-xs text-muted">
                index <span className="tabular-nums text-text-2">{cost}</span>
              </span>
              <span className="mt-4 font-mono text-xs text-muted">
                p99 latency <span className="tabular-nums text-text">{delta(p99)}</span>
              </span>
            </div>
          </div>
          <p className="mt-6 font-mono text-xs text-muted">
            Illustrative. Indexed to a baseline of 100, not a measured client result.
          </p>
        </div>

        <ol className="lg:col-span-7">
          {STEPS.map((s, i) => (
            <li key={s.technique} className="border-t border-[color:var(--color-border)] last:border-b">
              <button
                type="button"
                onClick={() => {
                  setHasPlayed(true);
                  setActive(i);
                }}
                aria-current={i === active ? "step" : undefined}
                className={cn(
                  "flex w-full items-baseline gap-4 py-4 text-left transition-colors",
                  i === active ? "text-text" : "text-muted hover:text-text"
                )}
              >
                <span className="font-mono text-xs tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex-1">
                  <span className="block text-md font-semibold">{s.technique}</span>
                  {i === active && <span className="mt-2 block text-base text-muted">{s.detail}</span>}
                </span>
                <span className="text-right font-mono text-xs tabular-nums">
                  <span className="block text-link">{delta(s.cost)}</span>
                  <span className="mt-1 block text-muted">p99 {delta(s.p99)}</span>
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
