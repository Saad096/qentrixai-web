import { cn } from "@/lib/utils";

/**
 * An unDraw illustration, themed.
 *
 * unDraw art is drawn for light grounds -- figures in #2f2e41, fills in
 * #f2f2f2 -- so it used to sit on a light plate in both themes. On a
 * near-black page that reads as a near-white rectangle with a hard seam
 * against the card body, which is what it looked like: a bug.
 *
 * Every file therefore has a `-dark` twin whose greyscale ramp is swapped end
 * for end (figures go light, fills go dark) while the brand accent and the
 * skin tones are left alone. Generated at build-prep time, not at runtime.
 *
 * The two variants are swapped with a CSS custom property rather than two
 * <img> tags, because a browser only fetches the background-image it actually
 * resolves -- so the inactive theme's file is never downloaded. next/image
 * passes SVGs through unoptimised anyway, so nothing is lost.
 */
export function Illustration({
  src,
  ratio = "aspect-[16/9]",
  scale,
  className,
}: {
  src: string;
  ratio?: string;
  /** Art size as a percentage of the plate. Wide panels need less. */
  scale?: string;
  /** `priority` and `sizes` are accepted for call-site compatibility and
   *  ignored: a CSS background has no preload or srcset to steer. */
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  const dark = src.replace(/\.svg$/, "-dark.svg");

  return (
    <div
      aria-hidden="true"
      className={cn("illus-plate relative w-full overflow-hidden", ratio, className)}
      style={
        {
          "--illus-light": `url("${src}")`,
          "--illus-dark": `url("${dark}")`,
          ...(scale ? { "--illus-scale": scale } : {}),
        } as React.CSSProperties
      }
    />
  );
}
