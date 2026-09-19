/**
 * The mark is fixed (owner decision, GATE 3): the blue-violet ribbon ships
 * unchanged. It sits in a neutral chip so it never has to harmonise with
 * verdigris — it reads as a mark, not as a colour that lost an argument.
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
      <span
        className="grid shrink-0 place-items-center rounded-full bg-n-50 p-[2px]"
        style={{ width: dim, height: dim }}
      >
        <Image
          src="/logo/qentrix-mark.png"
          alt=""
          width={dim}
          height={dim}
          priority
          className="size-full rounded-full object-contain"
        />
      </span>
      <span className="text-md font-semibold tracking-[-0.02em] text-text">QentrixAI</span>
    </Link>
  );
}
