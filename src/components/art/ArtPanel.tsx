import { cn } from "@/lib/utils";

/**
 * The inset stage every card illustration is drawn on.
 *
 * The art needs a ground of its own: on the card surface alone these
 * diagrams float, and on the page ground they compete with the copy. A
 * recessed panel with a brand radial behind it reads as a viewport onto the
 * system, which is what each of them is a picture of.
 *
 * Fixed aspect ratio, so four cards in a row keep their titles on the same
 * baseline regardless of how tall the art inside wants to be.
 */
export function ArtPanel({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative isolate aspect-[4/3] w-full overflow-hidden rounded-md",
        "bg-[color:rgb(var(--art-ground))] ring-1 ring-[color:var(--color-border)]",
        className
      )}
    >
      <span className="art-glow" />
      <span className="art-grid" />
      <div className="relative z-10 size-full">{children}</div>
    </div>
  );
}
