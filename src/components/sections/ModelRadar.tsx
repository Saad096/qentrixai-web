"use client";

/**
 * Model selection radar.
 *
 * Adapted from an interactive radar the owner shared: candidates placed in
 * Adopt / Trial / Assess / Hold rings by a weighted composite, with the
 * weights under the reader's control so the ranking rescores live. The thing
 * worth borrowing was the principle -- the motion serves the argument rather
 * than decorating it.
 *
 * What it argues: there is no best model, only a best model *for a set of
 * weights*, and picking one is an engineering decision you can show your
 * work on. Drag "sovereignty" up and the hosted frontier models fall out of
 * Adopt on their own.
 *
 * The scores are our read, not a benchmark, and the component says so on the
 * page. Publishing them as measurements would be inventing evidence.
 */
import * as React from "react";
import { cn } from "@/lib/utils";

type Axis = "quality" | "cost" | "latency" | "sovereignty";

type Model = {
  name: string;
  /** Open weights you can host yourself. Drives the sovereignty score. */
  open: boolean;
  scores: Record<Axis, number>;
  note: string;
};

const AXES: { key: Axis; label: string; hint: string }[] = [
  { key: "quality", label: "Quality", hint: "Reasoning and instruction following" },
  { key: "cost", label: "Cost", hint: "Lower spend per million tokens scores higher" },
  { key: "latency", label: "Latency", hint: "Time to first token and tail behaviour" },
  { key: "sovereignty", label: "Sovereignty", hint: "Can it run inside your own boundary" },
];

const MODELS: Model[] = [
  { name: "GPT-5", open: false, scores: { quality: 96, cost: 42, latency: 66, sovereignty: 10 }, note: "Frontier quality, hosted only." },
  { name: "Claude", open: false, scores: { quality: 94, cost: 46, latency: 68, sovereignty: 10 }, note: "Strong on long context and refusal behaviour." },
  { name: "Gemini", open: false, scores: { quality: 90, cost: 58, latency: 72, sovereignty: 12 }, note: "Competitive multimodal, hosted only." },
  { name: "DeepSeek", open: true, scores: { quality: 86, cost: 88, latency: 70, sovereignty: 90 }, note: "Open weights, strong reasoning per unit cost." },
  { name: "Qwen", open: true, scores: { quality: 84, cost: 86, latency: 74, sovereignty: 92 }, note: "Wide size range, good multilingual coverage." },
  { name: "Llama", open: true, scores: { quality: 80, cost: 84, latency: 76, sovereignty: 94 }, note: "The safest self-host default; broad tooling." },
  { name: "Kimi", open: true, scores: { quality: 83, cost: 82, latency: 66, sovereignty: 86 }, note: "Very long context, newer operational track record." },
  { name: "Mistral", open: true, scores: { quality: 76, cost: 88, latency: 84, sovereignty: 92 }, note: "Small and fast; EU-hosted options." },
  { name: "Gemma", open: true, scores: { quality: 68, cost: 92, latency: 90, sovereignty: 94 }, note: "Cheap and quick for narrow, well-scoped tasks." },
  { name: "Phi", open: true, scores: { quality: 62, cost: 94, latency: 93, sovereignty: 94 }, note: "Edge-sized; a router's first hop." },
];

/* Equal weights are not "balanced" -- three cheap axes outvote quality and a
   small model lands above the frontier ones, which is arithmetic rather than
   advice. These are what each stance actually means to a buyer: balanced
   still cares most about quality but has no sovereignty requirement, and
   quality-first is near-pure quality, which is the only weighting where a
   hosted frontier model actually wins. Add any cost weight at all and the
   open models take the top of the list -- which is the argument. */
const PRESETS: { label: string; weights: Record<Axis, number> }[] = [
  { label: "Balanced", weights: { quality: 85, cost: 50, latency: 45, sovereignty: 15 } },
  { label: "Sovereign-first", weights: { quality: 55, cost: 40, latency: 35, sovereignty: 100 } },
  { label: "Cost-first", weights: { quality: 40, cost: 100, latency: 60, sovereignty: 35 } },
  { label: "Quality-first", weights: { quality: 100, cost: 10, latency: 25, sovereignty: 5 } },
];

const BANDS = [
  { name: "Adopt", min: 80 },
  { name: "Trial", min: 65 },
  { name: "Assess", min: 50 },
  { name: "Hold", min: 0 },
];

function bandOf(score: number) {
  return BANDS.find((b) => score >= b.min) ?? BANDS[BANDS.length - 1];
}

export function ModelRadar() {
  const [weights, setWeights] = React.useState<Record<Axis, number>>(PRESETS[0].weights);

  const ranked = React.useMemo(() => {
    const total = AXES.reduce((sum, a) => sum + weights[a.key], 0) || 1;
    return MODELS.map((m) => {
      const score = AXES.reduce((sum, a) => sum + m.scores[a.key] * weights[a.key], 0) / total;
      return { ...m, score: Math.round(score) };
    }).sort((a, b) => b.score - a.score);
  }, [weights]);

  const grouped = BANDS.map((band) => ({
    band,
    models: ranked.filter((m) => bandOf(m.score).name === band.name),
  }));

  return (
    <section className="section rule">
      <div className="mx-auto w-full max-w-container px-5 sm:px-8 lg:px-9">
        <p className="mb-4 font-mono text-xs text-muted">How we pick a model</p>
        <h2 className="max-w-[24ch] text-3xl font-bold text-text">
          There is no best model. There is a best model for your weights.
        </h2>
        <p className="mt-5 max-w-measure text-md text-muted">
          Move the weights and the shortlist rescores. Push sovereignty up and the hosted frontier
          models leave the Adopt ring on their own — which is the whole argument for doing this
          with numbers in front of you rather than by reputation.
        </p>

        <div className="mt-11 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <div className="flex flex-wrap gap-2">
              {PRESETS.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => setWeights(p.weights)}
                  className="min-h-[44px] rounded-full border border-[color:var(--color-border)] px-4 text-sm text-muted transition-colors hover:border-brand hover:text-text"
                >
                  {p.label}
                </button>
              ))}
            </div>

            <div className="mt-7 space-y-6">
              {AXES.map((a) => (
                <div key={a.key}>
                  <label htmlFor={`w-${a.key}`} className="flex items-baseline justify-between gap-4">
                    <span className="text-base font-semibold text-text">{a.label}</span>
                    <span className="font-mono text-xs tabular-nums text-brand">{weights[a.key]}</span>
                  </label>
                  <input
                    id={`w-${a.key}`}
                    type="range"
                    min={0}
                    max={100}
                    value={weights[a.key]}
                    onChange={(e) =>
                      setWeights((w) => ({ ...w, [a.key]: Number(e.target.value) }))
                    }
                    className="mt-2 h-11 w-full accent-[color:rgb(var(--color-brand))]"
                  />
                  <p className="font-mono text-xs text-muted">{a.hint}</p>
                </div>
              ))}
            </div>

            <p className="mt-8 font-mono text-xs text-muted">
              Our read of each model, not a benchmark. The weights are the point, not the numbers.
            </p>
          </div>

          <div className="lg:col-span-8">
            <ul className="space-y-6">
              {grouped.map(({ band, models }) => (
                <li key={band.name}>
                  <div className="flex items-baseline justify-between border-b border-[color:var(--color-border)] pb-2">
                    <span className="text-md font-semibold text-text">{band.name}</span>
                    <span className="font-mono text-xs text-muted">
                      {band.name === "Hold" ? "below 50" : `${band.min}+`}
                    </span>
                  </div>
                  {models.length === 0 ? (
                    <p className="pt-3 font-mono text-xs text-muted">Nothing at these weights.</p>
                  ) : (
                    <ul className="pt-3">
                      {models.map((m) => (
                        <li
                          key={m.name}
                          className="flex flex-wrap items-baseline gap-x-3 gap-y-1 py-2"
                        >
                          <span className="w-[6.5rem] font-mono text-sm tabular-nums text-brand">
                            {m.score}
                          </span>
                          <span className="text-base font-semibold text-text">{m.name}</span>
                          <span
                            className={cn(
                              "rounded-full border px-2 py-0.5 font-mono text-xs",
                              m.open
                                ? "border-[color:var(--color-border)] text-text"
                                : "border-transparent text-muted"
                            )}
                          >
                            {m.open ? "open weights" : "hosted"}
                          </span>
                          <span className="w-full text-base text-muted sm:w-auto sm:flex-1">
                            {m.note}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
