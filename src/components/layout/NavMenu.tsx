"use client";

/**
 * The shared nav dropdown.
 *
 * Extracted from the services mega-menu when the owner asked for the same
 * behaviour on every tab. Four copies of this interaction would have been
 * four places to get the hover/click race wrong, and that race has already
 * been a bug here once.
 *
 * Behaviour, because a hover-only dropdown is unusable on touch and with a
 * keyboard: it opens on click, closes on Escape with focus returned to the
 * trigger, closes on outside pointerdown and on route change, and traps
 * nothing -- Tab walks out of it naturally, which is what a menu of links
 * should do. Pointer users also get hover-to-open, with a close delay so
 * the diagonal from trigger to panel does not dismiss it.
 *
 * The trigger is a button, not a link. A control that opens something is a
 * button; the destination is the first item inside the panel, so keyboard
 * and screen-reader users can still get to the hub page.
 */
import * as React from "react";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const CLOSE_DELAY = 140;

export function NavMenu({
  id,
  label,
  active,
  width = "w-[min(94vw,760px)]",
  children,
}: {
  id: string;
  label: string;
  active: boolean;
  /** Panels differ in how much they hold; the services one is the widest. */
  width?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const closeTimer = React.useRef<number | undefined>(undefined);
  /* Hover opens the panel, and the click that follows would toggle it
     straight back shut. This records that the pointer opened it, so the
     first click after a hover-open is a no-op rather than a dismiss. */
  const openedByHover = React.useRef(false);

  React.useEffect(() => setOpen(false), [pathname]);

  React.useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      setOpen(false);
      triggerRef.current?.focus();
    }
    function onPointerDown(e: PointerEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  const cancelClose = () => window.clearTimeout(closeTimer.current);
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => {
      openedByHover.current = false;
      setOpen(false);
    }, CLOSE_DELAY);
  };

  return (
    <div
      ref={wrapRef}
      className="relative"
      onPointerEnter={(e) => {
        if (e.pointerType !== "mouse") return;
        cancelClose();
        if (!open) openedByHover.current = true;
        setOpen(true);
      }}
      onPointerLeave={scheduleClose}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => {
          if (openedByHover.current) {
            openedByHover.current = false;
            return;
          }
          setOpen((v) => !v);
        }}
        className={cn(
          "inline-flex min-h-[44px] items-center gap-1.5 whitespace-nowrap text-sm transition-colors xl:text-base",
          // text-2, not muted. The header pill is translucent, so the nav
          // sits on whatever band the page has scrolled under it. On the
          // pale green of the sovereign-ai hero, muted measured 4.34:1 and
          // failed. text-2 is the darkest of the secondary tokens and clears
          // it on every ground the site has.
          active || open ? "text-text" : "text-text-2 hover:text-text"
        )}
      >
        {label}
        <ChevronDown
          aria-hidden="true"
          className={cn("size-4 transition-transform duration-200", open && "rotate-180")}
        />
      </button>

      {open && (
        <div
          id={id}
          onPointerEnter={cancelClose}
          onPointerLeave={scheduleClose}
          /* Fixed and centred on the viewport, not on the trigger. Anchored
             to the trigger a wide panel hangs off the left edge, because the
             triggers sit left of centre in the bar. */
          className={cn(
            "menu-pop fixed left-1/2 top-[var(--menu-top,72px)] z-50 -translate-x-1/2 rounded-lg bg-surface p-7 shadow-3 ring-1 ring-[color:var(--color-border)]",
            width
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}

/** A column of links inside a panel. */
export function NavColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.1em] text-link">{title}</p>
      <ul className="mt-3">{children}</ul>
    </div>
  );
}
