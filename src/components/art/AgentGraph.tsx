/**
 * Agent graph — the artwork for "Put agents to work".
 *
 * Says the thing the copy says: typed tools, retries, and an approval
 * checkpoint on anything irreversible. The gate node is the point of the
 * picture, so it is the only one drawn filled.
 */
export function AgentGraph() {
  return (
    <svg viewBox="0 0 200 150" className="size-full" role="presentation">
      <defs>
        <marker id="ag-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M0 0 L8 4 L0 8 z" fill="rgb(var(--color-muted))" />
        </marker>
      </defs>

      <g stroke="rgb(var(--color-muted))" strokeWidth="1" fill="none" opacity="0.6">
        <path id="ag-path" d="M34 75 H74" markerEnd="url(#ag-arrow)" />
        <path d="M100 62 V40 H134" markerEnd="url(#ag-arrow)" />
        <path d="M100 88 V110 H134" markerEnd="url(#ag-arrow)" />
        {/* The retry edge, dashed because it is the exceptional path. */}
        <path d="M134 40 q26 35 0 70" strokeDasharray="3 3" />
      </g>

      {/* Input */}
      <circle cx="24" cy="75" r="9" fill="none" stroke="rgb(var(--color-brand))" strokeWidth="3" />

      {/* Planner */}
      <rect x="74" y="62" width="26" height="26" rx="7" fill="rgb(var(--color-brand))" opacity="0.18" stroke="rgb(var(--color-brand))" strokeWidth="1.5" />
      <text x="87" y="79" textAnchor="middle" fontSize="9" fill="rgb(var(--color-text))" fontFamily="var(--font-mono, monospace)">
        ⌘
      </text>

      {/* Typed tools */}
      {[40, 110].map((y) => (
        <g key={y}>
          <rect x="134" y={y - 9} width="44" height="18" rx="5" fill="rgb(var(--color-surface))" stroke="rgb(var(--color-border))" />
          <text x="156" y={y + 3.5} textAnchor="middle" fontSize="8" fill="rgb(var(--color-muted))" fontFamily="var(--font-mono, monospace)">
            tool()
          </text>
        </g>
      ))}

      {/* The approval gate sits on the irreversible branch. */}
      <g>
        <rect x="103" y="101" width="18" height="18" rx="5" fill="rgb(var(--color-brand))" />
        <path d="M108 110 l3 3 l5 -6" stroke="rgb(var(--color-on-brand))" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <text x="112" y="133" textAnchor="middle" fontSize="7.5" fill="rgb(var(--color-muted))" fontFamily="var(--font-mono, monospace)">
        approval
      </text>

      <circle className="art-packet" r="2.5" fill="rgb(var(--color-link))" style={{ offsetPath: "path('M34 75 H74')" }} />
    </svg>
  );
}
