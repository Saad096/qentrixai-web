import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * An unDraw illustration on a plate.
 *
 * unDraw art is drawn for light backgrounds -- figures in #2f2e41, fills in
 * #f2f2f2 -- so dropped straight onto a near-black page the bodies vanish and
 * the highlights glare. Each one therefore sits on its own light plate in
 * both themes, which is a deliberate object rather than a theming failure,
 * and the plate is the Aurora lavender so it belongs to this palette.
 *
 * The accent is rewritten from unDraw's #6c63ff to the brand violet when the
 * file is downloaded, not at runtime.
 *
 * Licence: unDraw is free for commercial use with no attribution required.
 * Sources are recorded in docs/revamp/06-images.md.
 */
export function Illustration({
  src,
  ratio = "aspect-[16/9]",
  className,
  priority = false,
  sizes = "(min-width: 1024px) 33vw, 100vw",
}: {
  src: string;
  ratio?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative w-full overflow-hidden bg-illus-plate",
        ratio,
        className
      )}
    >
      <Image
        src={src}
        alt=""
        fill
        sizes={sizes}
        priority={priority}
        // contain, not cover: these have generous internal margins and a
        // figure near the centre, so cropping to fill decapitates them.
        className="object-contain p-6"
      />
    </div>
  );
}
