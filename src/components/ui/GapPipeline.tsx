/**
 * Demo → production, as the section's centrepiece rather than a footnote.
 *
 * The previous version was a 520px SVG sitting under a wall of prose with a
 * stock glass render beside it: the argument was in the text and the visual
 * said nothing. Here each stage carries the clause from the prose that
 * belongs to it, so the diagram *is* the argument.
 *
 * Motion is driven by ScrollReveal's GSAP instance via the data attributes:
 * `data-pipeline` on the container, `data-pipeline-rail` on the connector,
 * `data-pipeline-node` on each stage. GSAP sets the from-state at runtime, so
 * with no JS — or with reduced motion — every stage renders in its final
 * state.
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
      </div>

      <ol className="grid grid-cols-1 gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-6">
        {STAGES.map((stage) => (
          <li key={stage.name} data-pipeline-node className="relative">
            {/* Every node carries the full brand ring. The middle four were
                hairline outlines, which made four of the six stages read as
                not-yet-reached -- the opposite of the argument, since the
                unglamorous middle *is* the work. Direction is already carried
                by the rail gradient; it does not need dimmed nodes too. */}
            <span
              aria-hidden="true"
              className="block size-[27px] rounded-full border-[7px] border-brand bg-bg"
            />
            <p className="mt-5 font-mono text-xs text-link">{stage.name}</p>
            <p className="mt-2 text-base text-muted">{stage.note}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
