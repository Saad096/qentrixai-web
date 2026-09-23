"use client";

/**
 * Model selection radar, across language, speech and vision.
 *
 * Adapted from an interactive radar the owner shared: candidates placed in
 * Adopt / Trial / Assess / Hold rings by a weighted composite, with the
 * weights under the reader's control so the ranking rescores live. The thing
 * worth borrowing was the principle -- the motion serves the argument rather
 * than decorating it.
 *
 * What it argues: there is no best model, only a best model *for a set of
 * weights*, and picking one is an engineering decision you can show your
 * work on. Drag sovereignty up on the language tab and the hosted frontier
 * models fall out of Adopt on their own. Do the same on the vision tab and
 * almost nothing moves, because the strong vision models are already open,
 * permissively licensed and small enough for a Jetson. That contrast is the
 * reason the three modalities sit in one component rather than three.
 *
 * The scores are our read, sourced in /docs/revamp/09-model-landscape.md,
 * and the component says so on the page. Publishing them as measurements
 * would be inventing evidence.
 */
import * as React from "react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import {
  ACCESS_LABEL,
  AXES,
  BANDS,
  MODALITIES,
  PRESETS,
  RADAR_UPDATED,
  bandOf,
  rank,
  type Axis,
  type Modality,
} from "@/data/modelRadar";

export function ModelRadar() {
  const [modality, setModality] = React.useState<Modality>("language");
  const [weights, setWeights] = React.useState<Record<Axis, number>>(PRESETS[0].weights);

  const ranked = React.useMemo(() => rank(modality, weights), [modality, weights]);
  const grouped = BANDS.map((band) => ({
    band,
    models: ranked.filter((m) => bandOf(m.score).name === band.name),
  }));

  const activeModality = MODALITIES.find((m) => m.key === modality)!;
  const activePreset = PRESETS.find((p) =>
    AXES.every((a) => p.weights[a.key] === weights[a.key])
  );

  return (
    <section id="model-radar" className="section rule">
      <Container>
        <p className="mb-4 font-mono text-xs text-muted">How we pick a model</p>
        <h2 className="max-w-[24ch] text-3xl font-bold text-text">
          There is no best model. There is a best model for your weights.
        </h2>
        <p className="mt-5 max-w-measure text-md text-muted">
          Move the weights and the shortlist rescores. Push sovereignty up on language and the
          hosted frontier models leave the Adopt ring on their own. Do it on vision and almost
          nothing moves. That gap between the two is most of what a model decision is actually
          about, and it is easier to drag than to argue.
        </p>

        {/* Modality tabs. Each one is a different market with different
            physics, so the lede changes with the tab rather than trying to
            say one thing about all three. */}
        <div className="mt-10 flex flex-wrap gap-2" role="tablist" aria-label="Model modality">
          {MODALITIES.map((m) => {
            const active = m.key === modality;
            return (
              <button
                key={m.key}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setModality(m.key)}
                className={cn(
                  "min-h-[44px] rounded-full border px-5 text-base font-semibold transition-colors",
                  active
                    ? "border-transparent bg-brand text-on-brand"
                    : "border-[color:var(--color-border)] text-text-2 hover:border-link hover:text-text"
                )}
              >
                {m.label}
              </button>
            );
          })}
        </div>

        <p className="mt-6 max-w-measure text-base text-text-2">{activeModality.lede}</p>

        <div className="mt-11 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <h3 className="font-mono text-xs uppercase tracking-[0.1em] text-muted">
              Start from a stance
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {PRESETS.map((p) => {
                const active = activePreset?.label === p.label;
                return (
                  <button
                    key={p.label}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setWeights(p.weights)}
                    className={cn(
                      "min-h-[44px] rounded-full border px-4 text-sm transition-colors",
                      active
                        ? "border-link text-text"
                        : "border-[color:var(--color-border)] text-muted hover:border-link hover:text-text"
                    )}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>

            <h3 className="mt-9 font-mono text-xs uppercase tracking-[0.1em] text-muted">
              Then argue with it
            </h3>
            <div className="mt-4 space-y-6">
              {AXES.map((a) => (
                <div key={a.key}>
                  <label htmlFor={`w-${a.key}`} className="flex items-baseline justify-between gap-4">
                    <span className="text-base font-semibold text-text">{a.label}</span>
                    <span className="font-mono text-xs tabular-nums text-link">{weights[a.key]}</span>
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
                    className="mt-2 h-11 w-full accent-[color:rgb(var(--color-link))]"
                  />
                  <p className="font-mono text-xs text-muted">{a.hint[modality]}</p>
                </div>
              ))}
            </div>

            <p className="mt-8 border-t border-[color:var(--color-border)] pt-5 font-mono text-xs leading-relaxed text-muted">
              Our read as of {RADAR_UPDATED}, from published benchmarks, list pricing and what
              practitioners report in production. Not a benchmark run of our own. Every axis points
              the same way, so cost and latency are inverted: cheaper and faster score higher.
            </p>
          </div>

          <div className="lg:col-span-8">
            <ul className="space-y-7">
              {grouped.map(({ band, models }) => (
                <li key={band.name}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-[color:var(--color-border)] pb-2">
                    <span className="text-md font-semibold text-text">{band.name}</span>
                    <span className="font-mono text-xs text-muted">{band.blurb}</span>
                  </div>

                  {models.length === 0 ? (
                    <p className="pt-3 font-mono text-xs text-muted">Nothing at these weights.</p>
                  ) : (
                    <ul className="pt-2">
                      {models.map((m) => (
                        <li key={m.name} className="py-3">
                          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                            <span className="w-[3.5rem] shrink-0 font-mono text-sm tabular-nums text-link">
                              {m.score}
                            </span>
                            <span className="text-base font-semibold text-text">{m.name}</span>
                            <span className="font-mono text-xs text-muted">{m.vendor}</span>
                            <span
                              className={cn(
                                "rounded-full border px-2 py-0.5 font-mono text-xs",
                                m.access === "hosted"
                                  ? "border-transparent text-muted"
                                  : "border-[color:var(--color-border)] text-text"
                              )}
                            >
                              {ACCESS_LABEL[m.access]}
                            </span>
                          </div>

                          <div className="mt-2 flex items-center gap-3">
                            <span className="w-[3.5rem] shrink-0" aria-hidden="true" />
                            {/* The bar is the only reason a rescore reads as
                                movement rather than as numbers changing. It
                                carries no information the score does not, so
                                it stays out of the accessibility tree. */}
                            <span
                              aria-hidden="true"
                              className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-2"
                            >
                              <span
                                className="block h-full rounded-full bg-brand transition-[width] duration-500 ease-out"
                                style={{ width: `${m.score}%` }}
                              />
                            </span>
                          </div>

                          <p className="mt-2 pl-0 text-base text-muted sm:pl-[4.6rem]">{m.note}</p>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
