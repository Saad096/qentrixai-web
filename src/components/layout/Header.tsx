"use client";

/**
 * Kiln header. Deliberately boring: a sticky bar with a rule under it.
 *
 * What the old header did and this one does not: animate `width`, `top` and
 * `borderRadius` on a GSAP ticker every frame (non-composited properties, so
 * every frame hit layout), and leave the closed mobile panel focusable.
 *
 * Accessibility fixes from audit B-10: `inert` when closed, Escape to close,
 * a focus trap while open, and `aria-controls` on the trigger.
 */
import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Container } from "@/components/ui/Container";
import { primaryNav, PRIMARY_CTA } from "@/data/navigation";
import { ServicesMenu } from "./ServicesMenu";
import { cn } from "@/lib/utils";

const FOCUSABLE = 'a[href], button:not([disabled])';

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => setOpen(false), [pathname]);

  /**
   * Transparent at the top of the page, glass once scrolled.
   *
   * Passive listener writing a boolean, so it cannot block scrolling, and the
   * state only changes twice per page — crossing the threshold in either
   * direction — rather than on every frame.
   */
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";

    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-colors duration-200",
        // Transparent over the hero, glass once you have scrolled past it.
        // While the mobile panel is open the bar must be opaque regardless,
        // or the menu reads on top of the page content behind it.
        scrolled || open
          ? "border-b border-[color:var(--color-border)] bg-bg/80 backdrop-blur-md supports-[not(backdrop-filter:blur(0))]:bg-bg"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <Container>
        <div className="flex h-[68px] items-center justify-between gap-4">
          <Logo />

          <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
            {primaryNav.map((item) =>
              item.href === "/services" ? (
                <ServicesMenu key={item.href} active={isActive(item.href)} />
              ) : (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "inline-flex min-h-[44px] items-center text-base transition-colors",
                  isActive(item.href) ? "text-text" : "text-muted hover:text-text"
                )}
              >
                {item.label}
              </Link>
              )
            )}
          </nav>

          <div className="flex items-center gap-1.5">
            <ThemeToggle />
            <Button href={PRIMARY_CTA.href} size="sm" className="hidden lg:inline-flex">
              {PRIMARY_CTA.label}
            </Button>
            <button
              ref={triggerRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid size-11 place-items-center rounded-full text-text lg:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </Container>

      {/* Rendered only while open. Keeping it in the DOM behind aria-hidden
          duplicates every nav link and trips aria-hidden-focus; the old header
          did exactly that at max-height:0. */}
      {open && (
      <div
        id="mobile-menu"
        ref={panelRef}
        className="overflow-hidden border-t border-[color:var(--color-border)] bg-bg lg:hidden"
      >
        <Container>
          <nav aria-label="Primary" className="flex flex-col py-3">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "flex min-h-[52px] items-center text-md",
                  isActive(item.href) ? "text-text" : "text-muted"
                )}
              >
                {item.label}
              </Link>
            ))}
            <Button href={PRIMARY_CTA.href} size="lg" className="mt-3 w-full">
              {PRIMARY_CTA.label}
            </Button>
          </nav>
        </Container>
      </div>
      )}
    </header>
  );
}
