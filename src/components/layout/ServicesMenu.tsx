"use client";

/**
 * The services mega-menu.
 *
 * Twenty-one capabilities cannot be a single nav link -- the hub page is one
 * long list and nobody scans it from the header. Four grouped columns let
 * someone find the one they came for without leaving the page they are on.
 *
 * Behaviour, because a hover-only dropdown is unusable on touch and with a
 * keyboard: it opens on click, closes on Escape with focus returned to the
 * trigger, closes on outside click and on route change, and traps nothing --
 * Tab walks out of it naturally, which is what a menu of links should do.
 * Pointer users also get hover-to-open, with a close delay so the diagonal
 * from trigger to panel does not dismiss it.
 */
import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ShieldCheck } from "lucide-react";
import { services, SERVICE_GROUPS } from "@/data/services";
import { cn } from "@/lib/utils";

const CLOSE_DELAY = 140;

export function ServicesMenu({ active }: { active: boolean }) {
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
        aria-controls="services-menu"
        onClick={() => {
          if (openedByHover.current) {
            openedByHover.current = false;
            return;
          }
          setOpen((v) => !v);
        }}
        className={cn(
          "inline-flex min-h-[44px] items-center gap-1.5 text-base transition-colors",
          active || open ? "text-text" : "text-muted hover:text-text"
        )}
      >
        What we build
        <ChevronDown
          aria-hidden="true"
          className={cn("size-4 transition-transform duration-200", open && "rotate-180")}
        />
      </button>

      {open && (
        <div
          id="services-menu"
          onPointerEnter={cancelClose}
          onPointerLeave={scheduleClose}
          /* Fixed and centred on the viewport, not on the trigger. Anchored
             to the trigger the 960px panel hangs off the left edge, because
             the trigger sits at about x=400 in a 1440 window. */
          className="menu-pop fixed left-1/2 top-[76px] z-50 w-[min(94vw,980px)] -translate-x-1/2 rounded-lg bg-surface p-7 shadow-3 ring-1 ring-[color:var(--color-border)]"
        >
          <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICE_GROUPS.map((group) => (
              <div key={group}>
                <p className="text-xs font-bold uppercase tracking-[0.1em] text-link">{group}</p>
                <ul className="mt-3">
                  {services
                    .filter((s) => s.group === group)
                    .map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={`/services/${s.slug}`}
                          className="flex min-h-[40px] items-center rounded-sm text-base font-medium text-text transition-colors hover:text-link"
                        >
                          {s.title}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Sovereign AI was one line in a list of twenty-one, which is not
              where the market is. It gets the promoted slot: the one card in
              the panel, with its own page behind it. */}
          <Link
            href="/services/sovereign-ai"
            className="mt-7 flex flex-col gap-1.5 rounded-md bg-brand p-5 text-on-brand transition-[filter] hover:brightness-110 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
          >
            <span>
              <span className="flex items-center gap-2.5">
                <ShieldCheck aria-hidden="true" className="size-[18px]" />
                <span className="text-md font-bold">Sovereign and private AI</span>
              </span>
              {/* No opacity. Ink on verdigris at 90% measures 4.32:1 -- under the
                  floor, and introduced in the same pass that promoted this
                  card. */}
              <span className="mt-1.5 block text-base">
                Open-weight models air-gapped on your servers, in your own cloud account, or at
                the edge. Inference stays inside your boundary, not just storage.
              </span>
            </span>
            <span className="shrink-0 whitespace-nowrap font-mono text-xs">{"Read more \u2192"}</span>
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-x-8 border-t border-[color:var(--color-border)] pt-4">
            <Link
              href="/services"
              className="inline-flex min-h-[44px] items-center text-base font-semibold text-link underline-offset-4 hover:underline"
            >
              {`View all ${services.length} capabilities \u2192`}
            </Link>
            <Link
              href="/industries"
              className="inline-flex min-h-[44px] items-center text-base font-semibold text-link underline-offset-4 hover:underline"
            >
              {"Browse by industry \u2192"}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
