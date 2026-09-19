/**
 * Kiln hero. A server component on purpose: the old hero was a client
 * component whose <h1> was animated by Framer Motion, which made the headline
 * the LCP element *and* gated it behind hydration -- 3.71s on mobile.
 *
 * The slab is the only thing that performs, and it animates clip-path, which
 * the compositor handles without touching layout.
 */
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { OrbField } from "@/components/ui/OrbField";
import { Button } from "@/components/ui/Button";
import { Stat } from "@/components/ui/Stat";
import { company } from "@/data/company";
import { clients } from "@/data/clients";
import { PRIMARY_CTA } from "@/data/navigation";

export function Hero() {
  const names = clients.map((c) => c.name);
  const trustedBy =
    names.length > 1 ? `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}` : names[0];

  return (
    <section className="relative isolate overflow-hidden pb-16 pt-16 md:pb-28 md:pt-24">
      <OrbField />
      <Container className="above-orbs">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <h1 className="max-w-[17ch] text-hero font-bold text-text">
              AI systems that survive real users, real load, and handover.
            </h1>

            <p className="mt-7 max-w-[52ch] text-md text-muted">
              We design, build and run agentic systems, retrieval pipelines and voice AI — and we
              operate nine of our own products on the same discipline we sell.
            </p>
          </div>

          <div className="lg:col-span-5">
            {/* Shorter on phones: stacked full-width it becomes the LCP
                element, and a square crop pushed LCP to 2.5s. */}
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg lg:aspect-square">
              <Image
                src="/images/abstract/aurora-ripple.jpg"
                alt=""
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 92vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="slab-fill mt-12 rounded-lg bg-brand p-7 text-on-brand md:mt-14 md:p-9">
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

        <div className="rule mt-7 flex flex-col gap-2 pt-6 sm:flex-row sm:items-baseline sm:justify-between">
          <p className="text-base text-muted">
            Shipping for <span className="font-semibold text-text">{trustedBy}</span>.
          </p>
          <span className="font-mono text-xs text-muted">Lahore, working across 12 time zones</span>
        </div>
      </Container>
    </section>
  );
}
