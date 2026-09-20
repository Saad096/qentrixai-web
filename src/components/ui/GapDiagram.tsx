/**
 * Demo → production, drawn.
 *
 * Inline SVG rather than an image file so it inherits the theme tokens and
 * costs no request. Original work: nothing here is traced from, or derived
 * from, either reference site.
 *
 * The section's prose already makes the argument in words, so the diagram is
 * decorative and aria-hidden rather than carrying a long description a screen
 * reader would hear twice.
 */
const STAGES = ["Demo", "Retrieval", "Evals", "Tracing", "Rollback", "Production"];

/**
 * Geometry. The end labels are centred on their node, so the first and last
 * node must sit far enough inside the 520-unit viewBox for the longest label
 * ("Production", ~66 units at 11px mono) to fit either side of it. At the
 * original 26/504 the last label was clipped to "Productio".
 */
const FIRST = 40;
const GAP = 88;

export function GapDiagram() {
  return (
    <svg
      viewBox="0 0 520 132"
      className="w-full max-w-[520px] text-muted"
      role="presentation"
      aria-hidden="true"
    >
      <line
        x1={FIRST}
        y1="66"
        x2={FIRST + GAP * (STAGES.length - 1)}
        y2="66"
        stroke="currentColor"
        strokeOpacity="0.28"
        strokeWidth="1"
        strokeDasharray="4 5"
      />
      {STAGES.map((label, i) => {
        const x = FIRST + i * GAP;
        const isEnd = i === 0 || i === STAGES.length - 1;
        return (
          <g key={label}>
            <circle
              cx={x}
              cy="66"
              r={isEnd ? 7 : 4.5}
              fill={isEnd ? "rgb(var(--color-brand))" : "rgb(var(--color-bg))"}
              stroke="currentColor"
              strokeOpacity={isEnd ? 0 : 0.5}
              strokeWidth="1"
            />
            <text
              x={x}
              y={i % 2 === 0 ? 40 : 102}
              textAnchor="middle"
              fill="currentColor"
              style={{ font: "500 11px var(--font-dm-mono), monospace" }}
            >
              {label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
