/**
 * Kiln button. Two rules worth keeping in mind:
 *
 * 1. The label colour follows the base, not habit. In the dark theme the
 *    brand hue is light, so the label is ink. White-on-brand is exactly the
 *    3.96:1 failure the old site shipped.
 * 2. Every size clears a 44px hit area even when it looks smaller, because
 *    the audit found 20-40 sub-44px controls per page.
 */
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-brand text-on-brand hover:brightness-110",
  // Fills on hover rather than only tinting its border and label. An
  // outline button that answers a hover with a 1px colour change does not
  // read as pressable, which is what the owner meant by "it does not feel
  // like a button". on-brand is the ink token, not white: white on verdigris
  // is 3.00:1.
  secondary:
    "border border-[color:var(--color-border)] text-text hover:border-brand hover:bg-brand hover:text-on-brand",
  ghost: "text-text hover:text-link",
};

const sizes: Record<Size, string> = {
  sm: "min-h-[44px] px-4 text-sm",
  md: "min-h-[46px] px-5 text-base",
  lg: "min-h-[52px] px-7 text-md",
};

type Common = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

const shell =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold leading-none transition-[filter,border-color,color,background-color] duration-[var(--motion-fast)]";

export function Button(
  props: (Common & { href: string }) | (Common & React.ButtonHTMLAttributes<HTMLButtonElement>)
) {
  const { variant = "primary", size = "md", className, children, ...rest } = props as Common & {
    href?: string;
  };
  const classes = cn(shell, variants[variant], sizes[size], className);

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
