"use client";

/**
 * Kiln header: a floating pill that widens to a flat, full-bleed bar as you
 * scroll and narrows back to centre as you scroll up, in proportion.
 *
 * The owner asked for this and the old build already had a version of it --
 * animated on a GSAP ticker, writing `width`, `top` and `border-radius`
 * every frame. Those are layout properties, so every frame of every scroll
 * hit layout on the whole document. It was one of the P0s in the audit.
 *
 * This is the same effect with none of that cost. The interpolation is a
 * scroll-driven CSS animation (`animation-timeline: scroll()`), which the
 * browser runs off the main thread and reverses for free when you scroll
 * back up -- "the same ratio" is not something the code has to arrange,
 * it is what a scroll timeline is. There is no scroll listener, no rAF
 * loop and no JavaScript in the path at all.
 *
 * Three things the owner corrected after the first pass: the transition
 * finished inside half a screen, which made it read as a twitch rather than
 * a response; the widened bar kept a gap above it, so it never actually
 * docked; and the bar was too short to look like a masthead. The range is
 * longer now, the top inset and the corner radius both animate to zero, and
 * the bar loses height rather than starting short.
 *
 * Browsers without scroll timelines get the bar at its widened state and
 * no animation, which is a resting layout rather than a broken one. The
 * rule lives in globals.css under @supports.
 *
 * Accessibility fixes from audit B-10 are unchanged: the panel is rendered
 * only when open, Escape closes, focus is trapped while open, and the
 * trigger carries `aria-controls`.
 */
import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { primaryNav, PRIMARY_CTA } from "@/data/navigation";
import { NAV_MENUS } from "./NavPanels";
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
   * One boolean, crossing a threshold, for the things a scroll timeline
   * cannot express: the shadow under the pill. Passive, so it cannot block
   * scrolling, and it changes twice per page rather than every frame.
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
    <header className="header-shell sticky top-0 z-50">
      {/* The pill. `header-pill` owns the width and radius interpolation;
          everything inside it is ordinary layout. */}
      <div
        className={cn(
          "header-pill mx-auto flex items-center gap-4 bg-bg/80 px-3.5 backdrop-blur-md md:px-5",
          "supports-[not(backdrop-filter:blur(0))]:bg-bg",
          scrolled || open ? "shadow-1" : "shadow-none",
          open && "bg-bg"
        )}
      >
        <div className="header-row flex flex-1 items-center gap-4">
          <Logo />

          <nav
            aria-label="Primary"
            className="mx-auto hidden items-center gap-3.5 pl-6 lg:flex xl:gap-5"
          >
            {primaryNav.map((item) => {
              const Menu = NAV_MENUS[item.href];
              return Menu ? (
                <Menu key={item.href} active={isActive(item.href)} />
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "inline-flex min-h-[44px] items-center whitespace-nowrap text-sm transition-colors xl:text-base",
                    isActive(item.href) ? "text-text" : "text-muted hover:text-text"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-1.5 lg:ml-0">
            <ThemeToggle />
            <Button
              href={PRIMARY_CTA.href}
              size="sm"
              className="hidden whitespace-nowrap sm:inline-flex"
            >
              {PRIMARY_CTA.label}
            </Button>
            <button
              ref={triggerRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid size-10 place-items-center rounded-full text-text lg:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Rendered only while open. Keeping it in the DOM behind aria-hidden
          duplicates every nav link and trips aria-hidden-focus; the old header
          did exactly that at max-height:0. */}
      {open && (
      <div
        id="mobile-menu"
        ref={panelRef}
        className="header-pill mx-auto mt-2 overflow-hidden bg-bg shadow-2 lg:hidden"
      >
        <div className="px-5">
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
        </div>
      </div>
      )}
    </header>
  );
}
