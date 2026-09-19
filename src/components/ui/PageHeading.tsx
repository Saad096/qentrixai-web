import { Container } from "./Container";

/**
 * Page-level heading. Every page opens with exactly one h1 -- nine of the old
 * site's fourteen routes had none at all (audit A-02).
 */
export function PageHeading({
  eyebrow,
  title,
  lede,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
}) {
  return (
    <section className="py-16 md:py-24">
      <Container>
        {eyebrow && <p className="mb-4 font-mono text-xs text-muted">{eyebrow}</p>}
        <h1 className="max-w-[18ch] text-hero font-bold text-text">{title}</h1>
        {lede && <p className="mt-7 max-w-measure text-md text-muted">{lede}</p>}
      </Container>
    </section>
  );
}
