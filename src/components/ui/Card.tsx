import { cn } from "@/lib/utils";

/**
 * The one card surface.
 *
 * The previous build drew cards as `gap-px` grids over a border colour, which
 * produces cell dividers rather than objects — there was no elevation to read,
 * so the rows looked like tables.
 *
 * `interactive` adds the hover lift. Use it only where the whole card is a
 * link or a button: a lift on something you cannot click is a lie about
 * affordance.
 *
 * `surface-sheen` is on the base, not opt-in. The card ground went near-black
 * on 2026-09-21 and a flat near-black rectangle reads as a hole punched in
 * the page rather than an object sitting on it. The sheen gives it a light
 * direction. Every card wants that, so none of them should have to ask.
 */
export function Card({
  as: Tag = "div",
  elevation = 1,
  interactive = false,
  className,
  children,
}: {
  as?: "div" | "li" | "article";
  elevation?: 1 | 2;
  interactive?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Tag
      className={cn(
        "rounded-md bg-surface surface-sheen",
        elevation === 1 ? "shadow-1" : "shadow-2",
        interactive && "lift",
        className
      )}
    >
      {children}
    </Tag>
  );
}
