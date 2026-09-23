import { Container } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import Image from "next/image";
import { Scene, type SceneKey } from "@/components/art/scenes";

/**
 * The shared page hero: argument on the left, drawing on the right.
 *
 * Every top-level route was a headline and a paragraph pinned to the left of
 * a full-width container, with the right half empty from the masthead down.
 * That is the slot the home page gives its video, and the owner's note was
 * that it should carry something on every page rather than only that one.
 *
 * The drawing is optional. A page with nothing honest to draw gets a single
 * column rather than a placeholder, because a filler image is worse than
 * space.
 *
 * `photo` takes precedence over `art` where the owner has supplied a render
 * for a page. It is the LCP element when present, so it carries `priority`.
 * `visual` beats both, for a hero that is a live component.
 */
export function PageHero({
  eyebrow,
  title,
  lede,
  art,
  photo,
  visual,
  trail,
  children,
}: {
  eyebrow?: string;
  title: string;
  lede?: React.ReactNode;
  art?: SceneKey;
  photo?: { src: string; width: number; height: number; alt: string };
  /** A live component in the art slot, for pages whose hero is interactive
      or animated rather than a still. Wins over `photo` and `art`. */
  visual?: React.ReactNode;
  trail?: { name: string; href?: string }[];
  /** Buttons, stats, anything that belongs under the lede. */
  children?: React.ReactNode;
}) {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div
          className={
            art || photo || visual
              ? "grid items-center gap-12 lg:grid-cols-12 lg:gap-14"
              : undefined
          }
        >
          <div className={art || photo || visual ? "lg:col-span-6" : undefined}>
            {trail && <Breadcrumb trail={trail} />}
            {eyebrow && (
              <p
                className={`text-xs font-semibold uppercase tracking-[0.1em] text-text-2 ${
                  trail ? "mt-4" : ""
                }`}
              >
                {eyebrow}
              </p>
            )}
            <h1 className="mt-4 max-w-[18ch] text-hero font-bold text-text">{title}</h1>
            {lede && <p className="mt-7 max-w-measure text-md text-text-2">{lede}</p>}
            {children}
          </div>

          {visual ? (
            <div className="lg:col-span-6">{visual}</div>
          ) : photo ? (
            <div className="lg:col-span-6">
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="h-auto w-full rounded-lg"
              />
            </div>
          ) : art ? (
            <div className="lg:col-span-6">
              <Scene name={art} />
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
