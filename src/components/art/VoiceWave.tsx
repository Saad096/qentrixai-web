/**
 * Voice wave — the artwork for "Automate calls with voice AI".
 *
 * A live waveform under a confidence threshold. Where confidence drops below
 * the line the bars go quiet and the call hands to a person -- which is the
 * one thing the copy promises and the one thing buyers ask about.
 */
const BARS = [
  0.45, 0.72, 0.5, 0.9, 0.62, 1, 0.55, 0.82, 0.68, 0.95, 0.6, 0.78,
  0.42, 0.3, 0.22, 0.16,
];
const HANDOFF_FROM = 12;

export function VoiceWave() {
  return (
    <svg viewBox="0 0 200 150" className="size-full" role="presentation">
      {/* Confidence threshold */}
      <line x1="18" y1="44" x2="182" y2="44" stroke="rgb(var(--color-link))" strokeWidth="1" strokeDasharray="4 4" opacity="0.7" />
      <text x="18" y="38" fontSize="7.5" fill="rgb(var(--color-link))" fontFamily="var(--font-mono, monospace)">
        confidence
      </text>

      {/* Waveform, mirrored around the midline. */}
      <g>
        {BARS.map((h, i) => {
          const quiet = i >= HANDOFF_FROM;
          const height = h * 54;
          return (
            <rect
              key={i}
              x={20 + i * 10.4}
              y={86 - height / 2}
              width="5"
              height={height}
              rx="2.5"
              fill={quiet ? "rgb(var(--color-muted))" : "rgb(var(--color-brand))"}
              opacity={quiet ? 0.45 : 1}
              className={quiet ? undefined : "art-bar"}
              style={quiet ? undefined : { animationDelay: `${i * 0.09}s` }}
            />
          );
        })}
      </g>

      {/* Handoff marker */}
      <line x1="143" y1="52" x2="143" y2="120" stroke="rgb(var(--color-border))" strokeWidth="1" />
      <g>
        <rect x="147" y="106" width="35" height="14" rx="7" fill="rgb(var(--color-surface))" stroke="rgb(var(--color-border))" />
        <circle cx="155" cy="113" r="2.6" fill="rgb(var(--color-link))" />
        <text x="161" y="116" fontSize="6.5" fill="rgb(var(--color-muted))" fontFamily="var(--font-mono, monospace)">
          human
        </text>
      </g>
    </svg>
  );
}
