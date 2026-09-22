/**
 * The coloured, animated scene that sits in a page hero.
 *
 * Replaces the line-art pass and the unDraw set before it. The owner's note
 * was that flat drawings "present no sense" -- fair: a single-weight outline
 * of a camera says camera, and says nothing about what we do with one.
 * These are full scenes with a palette, depth and one moving idea.
 *
 * Still drawn rather than exported. The reason has not changed and has cost
 * this project four separate bugs: a baked image needs a second dark variant
 * and gets stale the next time the palette moves. Scenes read `--ill-*`,
 * which is defined per theme, so both come free. They also weigh nothing and
 * stay sharp at any density.
 *
 * Every scene:
 *   - is 400x300, on its own ground plate
 *   - uses the six `--ill-*` hues, never the UI tokens
 *   - reads completely when still; motion is a second beat, never the meaning
 *   - animates transform and opacity only, and stops under reduced motion
 *   - contains no text, because text in artwork cannot be read aloud
 */
import { cn } from "@/lib/utils";

export function SceneFrame({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <figure
      className={cn(
        "scene relative overflow-hidden rounded-lg bg-[color:rgb(var(--art-ground))] p-5 md:p-7",
        className
      )}
    >
      <svg viewBox="0 0 400 300" className="h-auto w-full" role="img" aria-label={label}>
        {children}
      </svg>
    </figure>
  );
}

/** Shorthands so a scene reads as a drawing rather than as CSS. */
export const ill = (n: 1 | 2 | 3 | 4 | 5 | 6) => `rgb(var(--ill-${n}))`;
export const panel = "rgb(var(--ill-panel))";
export const line = (o: number) => `rgb(var(--ill-line) / ${o})`;
