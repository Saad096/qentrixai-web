import { Button } from "./Button";

/**
 * The link that closes a section: "All six case studies", "All 21
 * capabilities", "All industries".
 *
 * These were six near-identical inline Links, left-aligned under the grid
 * and styled as coloured text. The owner read them as headings rather than
 * as something to click, which is fair -- a bare coloured phrase sitting at
 * the bottom of a section has no affordance at all, and at the left edge it
 * lines up with the h2 above it.
 *
 * One centred secondary button now, identical on every section, so the end
 * of a section always looks the same and always looks pressable.
 */
export function SectionCta({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-11 flex justify-center">
      <Button href={href} variant="secondary">
        {children}
      </Button>
    </div>
  );
}
