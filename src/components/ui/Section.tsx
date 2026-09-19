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
  className,
  headerClassName,
  children,
}: {
  id?: string;
  eyebrow?: string;
  heading?: React.ReactNode;
  lede?: React.ReactNode;
  headingAs?: "h1" | "h2";
  className?: string;
  headerClassName?: string;
  children?: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("section", className)}>
      <Container>
        {(eyebrow || heading || lede) && (
          <header data-reveal className={cn("max-w-measure", headerClassName)}>
            {eyebrow && <p className="mb-4 font-mono text-xs text-muted">{eyebrow}</p>}
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
