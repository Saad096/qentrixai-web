/**
 * Kiln hero. A server component on purpose: the old hero was a client
 * component whose <h1> was animated by Framer Motion, which made the headline
 * the LCP element *and* gated it behind hydration -- 3.71s on mobile.
 *
 * Arrival is staggered (motion plan A) across the proof line, the lede and
 * the slab -- everything except the <h1>, which stays untouched because it
 * is the LCP element. Stat numerals count up via CountUp.
 */
import { Container } from "@/components/ui/Container";
import { OrbField } from "@/components/ui/OrbField";
import { Button } from "@/components/ui/Button";
import { Stat } from "@/components/ui/Stat";
import { company } from "@/data/company";
import { clients } from "@/data/clients";
import { products } from "@/data/products";
import { PRIMARY_CTA } from "@/data/navigation";

export function Hero() {
  const names = clients.map((c) => c.name);
  const trustedBy =
    names.length > 1 ? `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}` : names[0];

  return (
    /* The header is transparent until you scroll, and it is sticky rather
       than fixed — so it sits in normal flow and would otherwise show plain
       page background. Pulling the hero up by the header's height puts the
       orb field and grain behind the bar, which is the point of making it
       transparent at all. The same amount goes back on as top padding, so
       nothing lands underneath the nav. */
    <section className="grain relative isolate -mt-[68px] overflow-hidden pb-16 pt-[calc(4rem+68px)] md:pb-28 md:pt-[calc(6rem+68px)]">
      {/* The orb field is the hero's background (owner direction) — no
          photograph, no frame. The `hero` variant scales the orbs up and
          raises their opacity so they carry the whole section rather than
          sitting as faint atmosphere behind a picture.
          It animates transform only, so it stays on the compositor. */}
      <OrbField className="orb-field--hero" />
      <Container className="above-orbs">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-8">
            {/* Proof, then claim. Both reference sites lead with evidence and
                put the headline second; the trusted-by line used to sit below
                the fold where nobody weighing us up would reach it. */}
            <p className="hero-in mb-7 flex flex-wrap items-center gap-x-3 gap-y-2 text-base text-muted">
              <span className="inline-flex items-center gap-2 rounded-full bg-surface px-3.5 py-1.5 shadow-1">
                <span className="size-1.5 rounded-full bg-link" aria-hidden="true" />
                <span className="font-mono text-xs text-text">
                  {company.stats[1].value} {company.stats[1].label}
                </span>
              </span>
              <span>
                Shipping for <span className="font-semibold text-text">{trustedBy}</span>
              </span>
            </p>

            <h1 className="max-w-[17ch] text-hero font-bold text-text">
              AI systems that survive real users, real load, and handover.
            </h1>

            <p className="hero-in hero-in-1 mt-7 max-w-[52ch] text-md text-muted">
              We design, build and run agentic systems, retrieval pipelines and voice AI — and we
              operate {products.length} of our own products on the same discipline we sell.
            </p>
          </div>

        </div>

        {/* The hero needs vertical room for the background art to read at all
            on a short viewport. */}
        <div className="h-8 md:h-24" aria-hidden="true" />

        <div className="hero-in hero-in-3 slab-fill brand-gradient mt-12 rounded-lg p-7 text-on-brand md:mt-14 md:p-9">
          <div className="flex flex-col gap-9 lg:flex-row lg:items-center lg:justify-between">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:gap-10">
              {company.stats.map((s) => (
                <Stat key={s.label} value={s.value} label={s.label} />
              ))}
            </div>

            <div className="flex flex-col items-start gap-2.5 lg:items-end">
              <Button
                href={PRIMARY_CTA.href}
                size="lg"
                className="w-full bg-on-brand text-brand hover:brightness-100 sm:w-auto"
              >
                {PRIMARY_CTA.label}
              </Button>
              <span className="font-mono text-xs">30 min, no deck</span>
            </div>
          </div>
        </div>

        <div className="rule mt-7 pt-6">
          <span className="font-mono text-xs text-muted">Lahore, working across 12 time zones</span>
        </div>
      </Container>
    </section>
  );
}
