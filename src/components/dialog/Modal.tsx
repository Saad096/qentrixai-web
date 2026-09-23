"use client";

/**
 * The one modal shell.
 *
 * Built on <dialog showModal()> rather than a hand-rolled overlay, because
 * the platform already does the three things that are usually got wrong:
 * the top layer (so nothing on the page can paint over it), the focus trap,
 * and inertness of everything behind it. What is left to do by hand is the
 * backdrop blur, Escape reporting, scroll lock and the close button.
 *
 * Backdrop blur is on ::backdrop. `backdrop-filter` there is supported in
 * every current engine; where it is not, the plain tint still reads as an
 * overlay, so nothing depends on it.
 */
import * as React from "react";
import { X } from "lucide-react";

export function Modal({
  open,
  onClose,
  title,
  description,
  size = "md",
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  /** Screen-reader description; also rendered under the title when short. */
  description?: string;
  size?: "md" | "lg";
  children: React.ReactNode;
}) {
  const ref = React.useRef<HTMLDialogElement>(null);
  const titleId = React.useId();
  const descId = React.useId();

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  // The page behind must not scroll while the dialog is up. <dialog> makes it
  // inert but does not stop the wheel.
  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      aria-describedby={description ? descId : undefined}
      // Escape fires `cancel`, and the close button fires `close`. Both have
      // to tell the owner, or the dialog closes while state says it is open
      // and it can never be reopened.
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClose={onClose}
      // A click that lands on the dialog element itself is a click on the
      // backdrop: the content sits in a child that stops it going further.
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      className="qx-modal"
    >
      <div
        className={
          "qx-modal__panel " + (size === "lg" ? "qx-modal__panel--lg" : "")
        }
      >
        <div className="flex items-start justify-between gap-6 border-b border-[color:var(--color-border)] px-6 py-5 md:px-8">
          <div>
            <h2 id={titleId} className="text-lg font-bold text-text">
              {title}
            </h2>
            {description && (
              <p id={descId} className="mt-1.5 text-base text-muted">
                {description}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="-mr-2 -mt-1 grid size-11 shrink-0 place-items-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-text"
          >
            <X aria-hidden className="size-5" />
          </button>
        </div>

        {/* Mounted only while open. A closed <dialog> is display:none but it
            is still in the DOM, so the brief form -- a full set of fields, a
            second submit button and a second set of labels -- was present on
            every page of the site, and /contact carried two identical forms.
            Nothing here needs to persist between openings. */}
        <div className="qx-modal__body">{open ? children : null}</div>
      </div>
    </dialog>
  );
}
