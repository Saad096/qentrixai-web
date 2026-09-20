/**
 * Retrieval flow — the artwork for "Make your knowledge answer".
 *
 * Query, a corpus of chunks with three of them matched, then a ranked answer
 * carrying numbered citations. The citations are the argument: the copy
 * promises answers you can check, and the picture shows what "checkable"
 * looks like.
 */
const CHUNKS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const HITS = new Set([2, 5, 9]);

export function RetrievalFlow() {
  return (
    <svg viewBox="0 0 200 150" className="size-full" role="presentation">
      {/* Query */}
      <rect x="22" y="14" width="156" height="20" rx="10" fill="rgb(var(--color-surface))" stroke="rgb(var(--color-border))" />
      <circle cx="35" cy="24" r="4" fill="none" stroke="rgb(var(--color-link))" strokeWidth="1.5" />
      <path d="M38 27 l3 3" stroke="rgb(var(--color-link))" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="46" y="21" width="68" height="5" rx="2.5" fill="rgb(var(--color-muted))" opacity="0.5" />

      {/* Corpus. Matched chunks carry the brand fill and pulse in turn. */}
      <g>
        {CHUNKS.map((i) => {
          const col = i % 4;
          const row = Math.floor(i / 4);
          const hit = HITS.has(i);
          return (
            <rect
              key={i}
              x={22 + col * 22}
              y={48 + row * 17}
              width="17"
              height="12"
              rx="3"
              fill={hit ? "rgb(var(--color-brand))" : "rgb(var(--color-muted))"}
              opacity={hit ? 1 : 0.22}
              className={hit ? "art-hit" : undefined}
              style={hit ? { animationDelay: `${i * 0.25}s` } : undefined}
            />
          );
        })}
      </g>

      {/* Ranked answer */}
      <g>
        <rect x="118" y="48" width="60" height="63" rx="6" fill="rgb(var(--color-surface))" stroke="rgb(var(--color-border))" />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x="126" y={57 + i * 19} width={40 - i * 8} height="4" rx="2" fill="rgb(var(--color-text))" opacity="0.55" />
            <rect x="126" y={65 + i * 19} width="13" height="8" rx="2.5" fill="rgb(var(--color-brand))" opacity="0.22" />
            <text x="132.5" y={71.5 + i * 19} textAnchor="middle" fontSize="6" fill="rgb(var(--color-link))" fontFamily="var(--font-mono, monospace)">
              {i + 1}
            </text>
          </g>
        ))}
      </g>

      <text x="22" y="128" fontSize="7.5" fill="rgb(var(--color-muted))" fontFamily="var(--font-mono, monospace)">
        hybrid bm25 + vector
      </text>
      <text x="118" y="128" fontSize="7.5" fill="rgb(var(--color-muted))" fontFamily="var(--font-mono, monospace)">
        re-ranked, cited
      </text>
    </svg>
  );
}
