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
        "rounded-md bg-surface",
        elevation === 1 ? "shadow-1" : "shadow-2",
        interactive && "lift",
        className
      )}
    >
      {children}
    </Tag>
  );
}
