/**
 * The ambient gradient orbs, taken from the reference sites' treatment.
 *
 * Pure CSS, animating transform only, so the whole field stays on the
 * compositor and costs no main-thread time. Decorative and inert to
 * assistive tech.
 */
export function OrbField({ className }: { className?: string }) {
  return (
    <div className={`orb-field ${className ?? ""}`} aria-hidden="true">
      <span className="orb orb-a" />
      <span className="orb orb-b" />
      <span className="orb orb-c" />
    </div>
  );
}
