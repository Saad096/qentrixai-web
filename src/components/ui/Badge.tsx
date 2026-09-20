import { cn } from "@/lib/utils";

/**
 * Migrated to Aurora. Every tone here previously named a colour from the old
 * iris palette — `ink`, `accent-violet`, `accent-sky`, `accent-mint`,
 * `brand-400` — none of which survive in `tailwind.config.ts`. Tailwind emits
 * nothing for a class it cannot resolve, so these badges were rendering with
 * no border, no background and inherited text colour.
 *
 * Tones now map onto the semantic tokens, so both themes come free.
 *
 * `violet` is kept as an alias of `brand` rather than removed: Aurora's brand
 * hue *is* violet, and several pages already ask for it by that name.
 */
const tones = {
  default: "border-[color:var(--color-border)] bg-surface text-muted",
  brand: "border-brand/35 bg-brand/10 text-link",
  violet: "border-brand/35 bg-brand/10 text-link",
  cyan: "border-info/40 bg-info/10 text-text",
  mint: "border-success/40 bg-success/10 text-text",
  amber: "border-warn/40 bg-warn/10 text-text",
};

export function Badge({
  children,
  tone = "default",
  className,
}: {
  children: React.ReactNode;
  tone?: keyof typeof tones;
  className?: string;
}) {
  return (
    <span
      className={cn(
        // Sentence case, normal tracking. The previous uppercase +
        // 0.12em tracking is the label treatment DESIGN.md calls out as a
        // generated-page tell.
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
