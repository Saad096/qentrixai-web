import { Cpu, Database, FileText, KeyRound, ShieldOff } from "lucide-react";

/**
 * The hero visual for /services/sovereign-ai.
 *
 * Drawn rather than photographed, and drawn rather than screenshotted. The
 * reference page puts a mock application window here with invented file
 * names in it; a mock of a client system is the one thing this site cannot
 * show, so this is a diagram of the argument instead: every stage that
 * touches the data sits inside one dashed boundary, and the row that would
 * normally leave it is struck out below the line.
 *
 * Nothing here is a measurement, so there is no number to be wrong. The
 * caption says so out loud.
 */
const INSIDE = [
  { Icon: FileText, label: "Documents and source data", note: "Your storage" },
  { Icon: Database, label: "Embeddings and vector index", note: "Your database" },
  { Icon: Cpu, label: "Model weights and inference", note: "Your GPUs" },
  { Icon: KeyRound, label: "Keys, logs and audit trail", note: "Your KMS" },
];

export function SovereignBoundary() {
  return (
    <figure className="m-0">
      <div className="rounded-lg bg-surface p-5 shadow-2 ring-1 ring-[color:var(--color-border)] md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="font-mono text-xs text-muted">Request path</span>
          <span className="rounded-full bg-brand/12 px-3 py-1 font-mono text-xs text-link">
            In-region
          </span>
        </div>

        {/* The dashed rule is the whole point of the picture, so it is the
            only dashed thing on the page. */}
        <div className="mt-4 rounded-md border border-dashed border-[color:rgb(var(--color-link))] p-4">
          <p className="font-mono text-xs text-link">Inside the boundary you own</p>
          <ul className="mt-3 space-y-2">
            {INSIDE.map(({ Icon, label, note }) => (
              <li
                key={label}
                className="flex items-center gap-3 rounded-md bg-bg px-3.5 py-3"
              >
                <Icon aria-hidden className="size-[18px] shrink-0 text-link" />
                <span className="flex-1 text-base text-text">{label}</span>
                <span className="shrink-0 font-mono text-xs text-muted">{note}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 flex items-center gap-3 rounded-md px-3.5 py-3 ring-1 ring-[color:var(--color-border)]">
          <ShieldOff aria-hidden className="size-[18px] shrink-0 text-muted" />
          <span className="flex-1 text-base text-muted line-through">
            Third-party model API
          </span>
          <span className="shrink-0 font-mono text-xs text-muted">Not in the path</span>
        </div>
      </div>

      <figcaption className="mt-3 font-mono text-xs text-muted">
        Illustrative diagram, not a screenshot of a client system.
      </figcaption>
    </figure>
  );
}
