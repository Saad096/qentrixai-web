/**
 * The mark, 2026-09-23: the owner replaced the blue-violet ribbon with the
 * teal one.
 *
 * The light chip that used to sit behind it is gone with it. That chip
 * existed because the old mark was an opaque square that had to be isolated
 * from verdigris; this one is a circular ribbon with everything outside it
 * transparent, so a chip behind it would draw a second, paler circle around
 * the first. It also carries the brand hue itself now, which is why it no
 * longer needs isolating from it.
 */
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className, size = "md" }: { className?: string; size?: "sm" | "md" }) {
  const dim = size === "sm" ? 28 : 32;

  return (
    <Link
      href="/"
      aria-label="QentrixAI home"
      className={cn("inline-flex min-h-[44px] items-center gap-2.5 rounded-sm", className)}
    >
      <Image
        src="/logo/qentrix-mark.png"
        alt=""
        width={dim}
        height={dim}
        priority
        className="shrink-0 object-contain"
        style={{ width: dim, height: dim }}
      />
      <span className="text-md font-semibold tracking-[-0.02em] text-text">QentrixAI</span>
    </Link>
  );
}
