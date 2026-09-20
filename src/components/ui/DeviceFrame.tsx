import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * A product screenshot on a gradient plate.
 *
 * Two layers, and each does a job:
 *
 * The plate is a brand gradient with padding, so the shot sits inset rather
 * than running to the card edge. Flush to the edge a screenshot reads as "an
 * image we had lying around"; floating on a coloured ground with air around
 * it reads as a product shot. The inset is also what lets the shot have its
 * own corner radius -- a rounded image needs something behind it to be
 * rounded against.
 *
 * Inside it is the window chrome: three dots and a bar. Enough to signal a
 * running application, deliberately not enough to imitate any particular
 * operating system.
 *
 * The plate and the chrome are decorative and aria-hidden; the screenshot
 * carries the alt text.
 */
export function DeviceFrame({
  src,
  alt,
  sizes,
  priority = false,
  className,
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("product-plate rounded-lg p-3 md:p-4", className)}>
      <div className="overflow-hidden rounded-md bg-surface shadow-2">
        <div
          className="flex items-center gap-1.5 border-b border-[color:var(--color-border)] px-3.5 py-2.5"
          aria-hidden="true"
        >
          <span className="size-2 rounded-full bg-text/20" />
          <span className="size-2 rounded-full bg-text/20" />
          <span className="size-2 rounded-full bg-text/20" />
        </div>
        <div className="relative aspect-[16/10] w-full">
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover object-top"
          />
        </div>
      </div>
    </div>
  );
}

/**
 * The same plate for a product with no screenshot yet (`coverMode: "dark"`).
 *
 * It has to be the same object as DeviceFrame or the grid goes ragged: a
 * flat panel beside two gradient plates reads as one that failed to load.
 */
export function DevicePlaceholder({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  return (
    <div className={cn("product-plate rounded-lg p-3 md:p-4", className)}>
      <div className="grid aspect-[16/10] w-full place-items-center rounded-md bg-surface shadow-2">
        <span className="text-xl font-bold text-muted">{name}</span>
      </div>
    </div>
  );
}
