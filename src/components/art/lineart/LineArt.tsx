/**
 * The hero drawing that sits top right on every page, in the slot the
 * looping video occupies on the home page.
 *
 * Drawn rather than exported. The path data in `drawings.ts` is the single
 * source: this component renders it for the site, and scripts/figma-lineart.mjs
 * pushes the same paths into Figma so there is an editable source to work
 * from. Neither is a copy of the other.
 *
 * Why not a flat export from Figma: every raster or baked-SVG asset we have
 * shipped has needed a second dark variant, and four separate bugs in this
 * project came from a near-white image dropped onto the dark theme. These
 * draw from tokens, so both themes come free and there is nothing to
 * regenerate when the palette changes again.
 *
 * Grammar, so 40-odd drawings look like one set:
 *
 *   viewBox      400 x 300, always
 *   structure    1.5px, `--color-text` at 0.55 -- the things that are there
 *   accent       2px, `--color-link` -- the thing the page is about
 *   fill         only for small solid dots, never for areas
 *   no text      labels live in the page, not in the drawing
 */
import { cn } from "@/lib/utils";
import { DRAWINGS, type DrawingKey } from "./drawings";

export function LineArt({
  name,
  label,
  className,
}: {
  name: DrawingKey;
  /** Describes the drawing for anyone who cannot see it. */
  label: string;
  className?: string;
}) {
  const draw = DRAWINGS[name];
  if (!draw) return null;

  return (
    <figure
      className={cn(
        "line-art relative overflow-hidden rounded-lg bg-[color:rgb(var(--art-ground))] p-6 md:p-8",
        className
      )}
    >
      <svg viewBox="0 0 400 300" className="h-auto w-full" role="img" aria-label={label}>
        <g
          fill="none"
          stroke="rgb(var(--color-text))"
          strokeOpacity="0.55"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {draw.structure.map((d, i) => (
            <path key={`s${i}`} d={d} />
          ))}
        </g>

        <g
          fill="none"
          stroke="rgb(var(--color-link))"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {draw.accent.map((d, i) => (
            <path key={`a${i}`} d={d} className={i === 0 ? "line-art__lead" : undefined} />
          ))}
        </g>

        {draw.dots?.map(([cx, cy], i) => (
          <circle key={`d${i}`} cx={cx} cy={cy} r="3.5" fill="rgb(var(--color-link))" />
        ))}
      </svg>
    </figure>
  );
}
