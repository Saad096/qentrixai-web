/**
 * A drawn workflow strip: what goes in, where the model sits, what comes
 * out, and where it lands.
 *
 * The labels are HTML in a grid, not SVG text, and that is the whole design
 * of this component. Two bugs got it here on 2026-09-22. Centred SVG text
 * ran off the right edge, so "event, not face" rendered as "event, not
 * fac". Anchoring the end labels inward fixed the clip and made stage three
 * and stage four collide instead, because SVG text does not wrap and each
 * stage only has about 107px of room.
 *
 * A grid column per stage solves both at once and is better besides: the
 * text wraps, it is selectable, it can be translated, and a screen reader
 * reads it as text rather than as part of a picture. The SVG keeps what it
 * is actually good at -- the rail, the nodes and the pulse travelling
 * between them.
 *
 * The motion is a pulse along the rail with each node lighting as it
 * arrives, on a six-second loop: slow enough to follow, slow enough to
 * ignore. It stops under `prefers-reduced-motion`.
 */
export function DomainFlow({
  stages,
  className,
}: {
  /** Four is the shape this is drawn for: source, model, decision, system. */
  stages: { label: string; sub: string }[];
  className?: string;
}) {
  const shown = stages.slice(0, 4);
  const n = Math.max(1, shown.length - 1);

  return (
    <div
      className={`domain-flow relative overflow-hidden rounded-lg bg-[color:rgb(var(--art-ground))] p-6 md:p-8 ${className ?? ""}`}
    >
      {/* The rail and the nodes. Sized to the same grid the labels use, so a
          node always sits over its own column. */}
      <svg
        viewBox="0 0 400 56"
        className="block h-auto w-full"
        role="img"
        aria-label={`Pipeline: ${shown.map((s) => s.label).join(", then ")}`}
      >
        <defs>
          <linearGradient id="df-rail" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="rgb(var(--color-brand))" stopOpacity="0.15" />
            <stop offset="50%" stopColor="rgb(var(--color-link))" stopOpacity="0.9" />
            <stop offset="100%" stopColor="rgb(var(--color-brand))" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        <line x1="50" y1="28" x2="350" y2="28" stroke="var(--color-border)" strokeWidth="1" />
        <line
          x1="50"
          y1="28"
          x2="350"
          y2="28"
          stroke="url(#df-rail)"
          strokeWidth="2"
          strokeDasharray="6 10"
          className="domain-flow__rail"
        />

        <circle r="5" fill="rgb(var(--color-link))" className="domain-flow__pulse">
          <animateMotion
            dur="6s"
            repeatCount="indefinite"
            path="M50 28 H350"
            keyPoints="0;0;0.333;0.333;0.667;0.667;1;1"
            keyTimes="0;0.06;0.27;0.39;0.60;0.72;0.93;1"
            calcMode="linear"
          />
        </circle>

        {shown.map((s, i) => {
          const x = 50 + i * (300 / n);
          return (
            <g key={s.label}>
              <rect
                x={x - 14}
                y={14}
                width="28"
                height="28"
                rx="9"
                fill="rgb(var(--color-surface))"
                stroke="rgb(var(--color-brand))"
                strokeWidth="2"
                className="domain-flow__node"
                style={{ animationDelay: `${i * 1.5}s` }}
              />
              <text
                x={x}
                y={32}
                textAnchor="middle"
                className="fill-[rgb(var(--color-link))] text-[11px] font-semibold"
              >
                {i + 1}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Labels as real text. They wrap, they are selectable, and nothing
          here can clip or collide however long a caption gets. */}
      <ul
        className="mt-4 grid gap-2 text-center"
        style={{ gridTemplateColumns: `repeat(${shown.length}, minmax(0, 1fr))` }}
      >
        {shown.map((s) => (
          <li key={s.label} className="min-w-0">
            <span className="block text-xs font-semibold text-text">{s.label}</span>
            <span className="mt-0.5 block text-xs text-muted">{s.sub}</span>
          </li>
        ))}
      </ul>

      <p className="mt-6 rounded-lg border border-dashed border-[color:var(--color-border)] py-2.5 text-center text-xs text-muted">
        traces · evals · rollback
      </p>
    </div>
  );
}
