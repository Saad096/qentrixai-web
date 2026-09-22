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
          <header data-reveal className={cn("max-w-measure", headerClassName)}>
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
              <Heading className="text-3xl font-bold text-text">{heading}</Heading>
            )}
            {lede && <p className="mt-5 text-md text-muted">{lede}</p>}
          </header>
        )}
        {children}
      </Container>
    </section>
  );
}
