import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Browser chrome around a product screenshot.
 *
 * A bare rounded rectangle reads as "an image we had lying around". The same
 * shot inside a window frame reads as software that exists and is running.
 * The chrome is three dots and a bar — enough to signal a window, deliberately
 * not enough to imitate a particular operating system.
 *
 * The frame is decorative and aria-hidden; the screenshot carries the alt.
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
    <div className={cn("overflow-hidden rounded-md bg-surface shadow-2", className)}>
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
  );
}
