import { cn } from "@/lib/utils";
import { Container } from "./Container";

/**
 * One section shell. The eyebrow is sentence case on purpose — tracked-out
 * ALL-CAPS labels above every heading are the clearest tell of a generated
 * page, and the old site used them everywhere.
 */
export function Section({
  id,
  eyebrow,
  heading,
  lede,
  headingAs: Heading = "h2",
  ground = "base",
  className,
  headerClassName,
  children,
}: {
  id?: string;
  eyebrow?: string;
  heading?: React.ReactNode;
  lede?: React.ReactNode;
  headingAs?: "h1" | "h2";
  /**
   * The surface the section sits on. Alternating these is what gives the page
   * vertical rhythm — with every section on the same ground, the homepage read
   * as one strip nearly ten thousand pixels long.
   *
   * `band` draws its own rules, so do not also pass `rule` in className.
   */
  ground?: "base" | "wash" | "band";
  className?: string;
  headerClassName?: string;
  children?: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "section",
        ground === "wash" && "ground-wash grain",
        ground === "band" && "ground-band",
        className
      )}
    >
      <Container>
        {(eyebrow || heading || lede) && (
          /* Heading and lede sit side by side once there is room for it.
             Stacked and capped at a 62ch measure, the header used less than
             half the container and left a hole the width of a column beside
             it -- which got worse when the container widened to 1440. The
             measure still caps each column, so nothing gets harder to read;
             the second column just uses the space the first one was not.

             A caller that passes headerClassName is opting out: it wants a
             particular width, so the split would fight it. */
          <header
            data-reveal
            className={cn(
              headerClassName
                ? cn("max-w-measure", headerClassName)
                : lede && heading
                  ? "grid grid-cols-1 gap-x-12 gap-y-5 lg:grid-cols-12"
                  : "max-w-measure"
            )}
          >
            <div className={cn(!headerClassName && lede && heading && "lg:col-span-7")}>
              {/* Not mono. A section label was 13px, monospaced and muted --
                  three legibility penalties on the same four words, and mono
                  is meant to be reserved for figures, identifiers and machine
                  strings. Uppercase sans with tracking reads as a label
                  without any of that. */}
              {eyebrow && (
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.1em] text-text-2">
                  {eyebrow}
                </p>
              )}
              {heading && (
                <Heading className="max-w-measure text-3xl font-bold text-text">{heading}</Heading>
              )}
              {/* Stacked layout keeps the lede under the heading. */}
              {lede && (!heading || headerClassName) && (
                <p className="mt-5 max-w-measure text-md text-muted">{lede}</p>
              )}
            </div>

            {lede && heading && !headerClassName && (
              <p className="max-w-measure self-end text-md text-muted lg:col-span-5">{lede}</p>
            )}
          </header>
        )}
        {children}
      </Container>
    </section>
  );
}
