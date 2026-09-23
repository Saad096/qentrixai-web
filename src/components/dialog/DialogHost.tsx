"use client";

/**
 * Opens booking and the brief form over the page instead of navigating away.
 *
 * Mounted once in the root layout, it listens for clicks on the document and
 * takes over any link to /book or /contact, plus anything carrying
 * data-dialog="book" | "brief".
 *
 * Interception rather than swapping every call site for a button, for three
 * reasons:
 *
 *   1. /book and /contact stay real routes. Without JS, on a crawler, from a
 *      shared link or in a new tab they still work and still render. The
 *      dialog is an enhancement, not a replacement, which is why the links
 *      stay <a href> and keep their href.
 *   2. There are more than thirty of these links across the site, in the
 *      header, the footer, hero sections and every CTA block. One listener
 *      cannot drift out of sync with them the way thirty call sites can.
 *   3. Modified clicks are left alone. Cmd/Ctrl/shift/middle-click, and any
 *      link that opts out with data-no-dialog, navigate normally -- taking
 *      those over is the thing that makes an intercepted link feel broken.
 *
 * The hash is written so the dialog survives a reload and can be linked to
 * directly (/#book), and the back button closes it rather than leaving the
 * page.
 */
import * as React from "react";
import { BookingDialog } from "./BookingDialog";
import { BriefDialog } from "./BriefDialog";

type Which = "book" | "brief" | null;

/** Claim the click outright: no navigation, and no next/link handler after. */
function take(e: MouseEvent) {
  e.preventDefault();
  e.stopPropagation();
  e.stopImmediatePropagation();
}

const ROUTE_FOR: Record<string, Exclude<Which, null>> = {
  "/book": "book",
  "/contact": "brief",
};

export function DialogHost() {
  const [which, setWhich] = React.useState<Which>(null);

  React.useEffect(() => {
    const onClick = (e: MouseEvent) => {
      // Let the browser have modified clicks: new tab, new window, download.
      if (e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        "a[href], [data-dialog]"
      );
      if (!el || el.hasAttribute("data-no-dialog")) return;

      const explicit = el.dataset.dialog;
      if (explicit === "book" || explicit === "brief") {
        take(e);
        setWhich(explicit);
        return;
      }

      const href = el.getAttribute("href");
      if (!href) return;
      // Same-origin, and only the two routes. An absolute URL to another
      // host, a mailto: or a tel: must never be swallowed here.
      let path: string;
      try {
        path = new URL(href, window.location.href).pathname.replace(/\/$/, "") || "/";
      } catch {
        return;
      }
      if (el.getAttribute("target") === "_blank") return;

      const target = ROUTE_FOR[path];
      if (!target) return;

      // On the page itself, the link should scroll or reload as usual --
      // a dialog over /contact showing the same form is a loop.
      if (window.location.pathname.replace(/\/$/, "") === path) return;

      take(e);
      setWhich(target);
    };

    /* Capture phase, and stopPropagation. React attaches its listeners at
       the app root, so a bubble-phase listener on the document runs *after*
       next/link has already called preventDefault and begun the navigation
       -- the dialog never opened and the route loaded instead. Capturing at
       the document means this runs first, and stopping propagation is what
       keeps next/link from handling the same click afterwards. */
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  /* Back closes the dialog rather than leaving the page. Pushing state on
     open is what makes that possible, and popstate is what the back button
     fires. */
  React.useEffect(() => {
    if (!which) return;
    window.history.pushState({ qxDialog: which }, "");
    const onPop = () => setWhich(null);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [which]);

  const close = React.useCallback(() => {
    setWhich((current) => {
      // Only unwind history if we are the ones who pushed it.
      if (current && window.history.state?.qxDialog) window.history.back();
      return null;
    });
  }, []);

  return (
    <>
      <BookingDialog open={which === "book"} onClose={close} />
      <BriefDialog open={which === "brief"} onClose={close} />
    </>
  );
}
