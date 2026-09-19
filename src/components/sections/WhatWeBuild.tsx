import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/data/services";

export function WhatWeBuild() {
  const featured = services.filter((s) => s.featured);

  return (
    <Section
      eyebrow="What we build"
      heading="Six things we are asked for most."
      lede="Fourteen capabilities in total. These are the ones that start most engagements."
      className="rule"
    >
      <ul className="mt-12 grid gap-x-10 gap-y-px sm:grid-cols-2">
        {featured.map((s, i) => (
          <li key={s.slug} className="border-t border-[color:var(--color-border)]">
            <Reveal delay={i * 50}>
              <Link href={`/services/${s.slug}`} className="group flex gap-5 py-7">
                <s.icon className="mt-0.5 size-5 shrink-0 text-link" aria-hidden />
                <span>
                  <span className="block text-lg font-semibold text-text group-hover:text-link">
                    {s.title}
                  </span>
                  <span className="mt-2 block text-base text-muted">{s.short}</span>
                </span>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>

      <p className="mt-9">
        <Link href="/services" className="inline-flex min-h-[44px] items-center text-base font-semibold text-link hover:brightness-110">
          All fourteen capabilities
        </Link>
      </p>
    </Section>
  );
}
