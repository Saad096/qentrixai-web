/**
 * Demo → production, as the section's centrepiece rather than a footnote.
 *
 * The previous version was a 520px SVG sitting under a wall of prose with a
 * stock glass render beside it: the argument was in the text and the visual
 * said nothing. Here each stage carries the clause from the prose that
 * belongs to it, so the diagram *is* the argument.
 *
 * Two kinds of motion, doing two different jobs:
 *
 * 1. Scroll-driven, via ScrollReveal's GSAP instance and the data attributes
 *    (`data-pipeline` on the container, `data-pipeline-rail` on the
 *    connector, `data-pipeline-node` on each stage). The rail draws once as
 *    the block arrives. GSAP sets every from-state at runtime, so with no JS
 *    -- or with reduced motion -- the stages render in their final state.
 *
 * 2. A continuous loop, in CSS (`.pipe-packet`, `.pipe-node`). A packet
 *    travels the wire and each stage lights as it arrives. The rail drawing
 *    itself once and then sitting still argued that production is a sequence
 *    and then showed a static row of dots. Work moves through these stages
 *    continuously; it does not arrive at one of them and stop.
 *
 * The delays below are where each node centre falls along the rail, so a
 * stage fires when the packet is actually on it rather than on a clock of
 * its own. Six stages, twelve seconds, one every 1.75s.
 */
const STAGES = [
  { name: "Demo", note: "Answers well in a notebook." },
  { name: "Retrieval", note: "Stays fresh as the corpus moves." },
  { name: "Evals", note: "Catch a regression before your customer does." },
  { name: "Tracing", note: "Read what actually happened, at 3am." },
  { name: "Rollback", note: "A way back when it fails anyway." },
  { name: "Production", note: "Survives real users and real load." },
];

export function GapPipeline() {
  return (
    <div data-pipeline className="relative mt-14">
      {/* The rail only reads as a sequence when the stages sit on one row. */}
      <div
        className="pointer-events-none absolute inset-x-0 top-[13px] hidden h-px bg-[color:var(--color-border)] lg:block"
        aria-hidden="true"
      >
        <span
          data-pipeline-rail
          className="absolute inset-0 origin-left bg-gradient-to-r from-brand to-accent"
        />
        {/* Sibling of the rail, not a child: the rail is scaled on scroll and
            anything inside it gets squashed with it. */}
        <span className="pipe-packet absolute inset-y-[-1px] left-0 w-full">
          <span className="bg-[color:rgb(var(--color-link))] shadow-[0_0_14px_2px_rgb(var(--color-link)/0.55)]" />
        </span>
      </div>

      <ol className="grid grid-cols-1 gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-6">
        {STAGES.map((stage, i) => (
          <li key={stage.name} data-pipeline-node className="relative">
            {/* Every node carries the full brand ring. The middle four were
                hairline outlines, which made four of the six stages read as
                not-yet-reached -- the opposite of the argument, since the
                unglamorous middle *is* the work. Direction is already carried
                by the rail gradient; it does not need dimmed nodes too. */}
            <span
              aria-hidden="true"
              className="pipe-node block size-[27px] rounded-full border-[7px] border-brand bg-bg"
              style={{ "--pipe-delay": `${(0.45 + i * 1.75).toFixed(2)}s` } as React.CSSProperties}
            />
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.08em] text-text">{stage.name}</p>
            <p className="mt-2 text-base text-text-2">{stage.note}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
