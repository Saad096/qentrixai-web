"use client";

/**
 * Calendly, in a dialog on the page the visitor was already reading.
 *
 * A plain iframe rather than Calendly's widget.js. The script is a
 * third-party bundle that writes its own overlay, and every embed feature we
 * want is reachable through query parameters instead:
 *
 *   embed_type=Inline + embed_domain   Calendly only treats the page as an
 *                                      embed when BOTH are present, and
 *                                      without that hide_gdpr_banner is
 *                                      ignored. Verified against their docs.
 *   hide_gdpr_banner=1                 their cookie banner inside our dialog
 *                                      would be a second consent surface.
 *   hide_event_type_details=1          otherwise it leads with the avatar,
 *                                      name, duration and description, and
 *                                      the calendar starts below the fold.
 *                                      Our dialog header already says all of
 *                                      that.
 *   background_color / text_color /    so it is our palette, not Calendly's
 *   primary_color                      white. Hex without the #.
 *
 * The colours are read from the live tokens rather than hard-coded, so the
 * embed follows the theme. Changing theme remounts the iframe by key, which
 * is the only way -- Calendly reads these once at load.
 */
import * as React from "react";
import { Modal } from "./Modal";
import { publicEnv } from "@/lib/env";

function hexFromToken(name: string, fallback: string) {
  if (typeof window === "undefined") return fallback;
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const parts = raw.split(/[\s,]+/).map(Number);
  if (parts.length < 3 || parts.some(Number.isNaN)) return fallback;
  return parts
    .slice(0, 3)
    .map((n) => Math.max(0, Math.min(255, n)).toString(16).padStart(2, "0"))
    .join("");
}

export function BookingDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [src, setSrc] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!open) return;
    const url = new URL(publicEnv.calendlyUrl);
    url.searchParams.set("embed_domain", window.location.hostname);
    url.searchParams.set("embed_type", "Inline");
    url.searchParams.set("hide_gdpr_banner", "1");
    /* Opens straight on "Select a Date & Time". Without this the widget
       leads with the avatar, the event name, the duration and the full
       description, so the calendar starts below the fold of the dialog and
       the first thing a visitor has to do is scroll -- which is what the
       owner reported. Our own dialog header already says what the call is
       and how long it takes, so the widget repeating it costs a screen. */
    url.searchParams.set("hide_event_type_details", "1");
    url.searchParams.set("background_color", hexFromToken("--color-surface", "ffffff"));
    url.searchParams.set("text_color", hexFromToken("--color-text", "1a1a1c"));
    url.searchParams.set("primary_color", hexFromToken("--color-brand", "0fa88c"));
    setSrc(url.toString());
  }, [open]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="lg"
      title="Book a strategy call"
      description="Thirty minutes, no pitch deck. If we are not the right fit, we will say so on the call."
    >
      {src ? (
        <iframe
          key={src}
          src={src}
          title="Select a date and time"
          className="qx-calendly"
          loading="lazy"
        />
      ) : (
        /* Only ever visible for the frame before the effect runs. It holds
           the height so the panel does not snap open at zero and resize. */
        <div className="qx-calendly grid place-items-center">
          <p className="font-mono text-xs text-muted">Loading the calendar…</p>
        </div>
      )}
    </Modal>
  );
}
