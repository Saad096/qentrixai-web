import { Container } from "./Container";
import { LineArt } from "@/components/art/lineart/LineArt";
import type { DrawingKey } from "@/components/art/lineart/drawings";

/**
 * Page-level heading. Every page opens with exactly one h1 -- nine of the old
 * site's fourteen routes had none at all (audit A-02).
 *
 * Takes an optional drawing, which moves the heading into the two-column
 * hero the rest of the site uses. Without one it stays a single column:
 * legal pages have nothing honest to draw, and a filler image is worse than
 * space.
 */
export function PageHeading({
  eyebrow,
  title,
  lede,
  art,
  artLabel,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  art?: DrawingKey;
  /** Describes the drawing. Required whenever `art` is set. */
  artLabel?: string;
}) {
  const head = (
    <>
      {eyebrow && (
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.1em] text-text-2">
          {eyebrow}
        </p>
      )}
      <h1 className="max-w-[18ch] text-hero font-bold text-text">{title}</h1>
      {lede && <p className="mt-7 max-w-measure text-md text-text-2">{lede}</p>}
    </>
  );

  return (
    <section className="py-16 md:py-24">
      <Container>
        {art ? (
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-6">{head}</div>
            <div className="lg:col-span-6">
              <LineArt name={art} label={artLabel ?? ""} className="shadow-2" />
            </div>
          </div>
        ) : (
          head
        )}
      </Container>
    </section>
  );
}
