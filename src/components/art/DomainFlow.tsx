/**
 * A drawn workflow strip for a domain, in place of a photograph.
 *
 * The owner's note: stock photography and line-art illustration both read as
 * decoration, and what a buyer wants to see is the shape of the system. So
 * this draws the actual path -- what goes in, where the model sits, what
 * comes out, and where it lands -- from the same tokens as the rest of the
 * page, per domain.
 *
 * Drawn rather than shipped as an image: it themes correctly in both
 * palettes, costs no bytes, and stays sharp at any density. Nothing here is
 * a screenshot of a client system, and nothing claims to be.
 *
 * The motion is a single dash offset on the connector, transform-free and
 * paused under `prefers-reduced-motion`. It exists to say "this flows one
 * way", which a static diagram has to spend a label on.
 */
export function DomainFlow({
  stages,
  className,
}: {
  /** Four is the shape this is drawn for: source, model, decision, system. */
  stages: { label: string; sub: string }[];
  className?: string;
}) {
  return (
    <div
      className={`domain-flow relative overflow-hidden rounded-lg bg-[color:rgb(var(--art-ground))] p-6 md:p-8 ${className ?? ""}`}
    >
      <svg
        viewBox="0 0 400 220"
        className="h-auto w-full"
        role="img"
        aria-label={`Pipeline: ${stages.map((s) => s.label).join(", then ")}`}
      >
        <defs>
          <linearGradient id="df-rail" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="rgb(var(--color-brand))" stopOpacity="0.15" />
            <stop offset="50%" stopColor="rgb(var(--color-link))" stopOpacity="0.9" />
            <stop offset="100%" stopColor="rgb(var(--color-brand))" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        {/* The rail every stage sits on. */}
        <line x1="34" y1="72" x2="366" y2="72" stroke="var(--color-border)" strokeWidth="1" />
        <line
          x1="34"
          y1="72"
          x2="366"
          y2="72"
          stroke="url(#df-rail)"
          strokeWidth="2"
          strokeDasharray="6 10"
          className="domain-flow__rail"
        />

        {stages.slice(0, 4).map((s, i) => {
          const x = 34 + i * (332 / 3);
          return (
            <g key={s.label}>
              <rect
                x={x - 14}
                y={58}
                width="28"
                height="28"
                rx="9"
                fill="rgb(var(--color-surface))"
                stroke="rgb(var(--color-brand))"
                strokeWidth="2"
              />
              <text
                x={x}
                y={76}
                textAnchor="middle"
                className="fill-[rgb(var(--color-link))] text-[11px] font-semibold"
              >
                {i + 1}
              </text>
              <text
                x={x}
                y={112}
                textAnchor="middle"
                className="fill-[rgb(var(--color-text))] text-[12px] font-semibold"
              >
                {s.label}
              </text>
              <text
                x={x}
                y={132}
                textAnchor="middle"
                className="fill-[rgb(var(--color-muted))] text-[11.5px]"
              >
                {s.sub}
              </text>
            </g>
          );
        })}

        {/* The part that makes it read as engineering rather than a diagram
            of a diagram: the thing that runs underneath the whole path. */}
        <rect
          x="34"
          y="166"
          width="332"
          height="30"
          rx="10"
          fill="none"
          stroke="var(--color-border)"
          strokeDasharray="4 5"
        />
        <text
          x="200"
          y="185"
          textAnchor="middle"
          className="fill-[rgb(var(--color-muted))] text-[11.5px]"
        >
          traces · evals · rollback
        </text>
      </svg>
    </div>
  );
}
