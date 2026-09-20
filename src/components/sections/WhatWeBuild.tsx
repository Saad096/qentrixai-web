import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { services } from "@/data/services";

export function WhatWeBuild() {
  const featured = services.filter((s) => s.featured);

  return (
    <Section
      eyebrow="What we build"
      heading="Six things we are asked for most."
      lede="Fourteen capabilities in total. These are the ones that start most engagements."
      ground="base"
    >
      <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-14">
      <ul className="grid gap-x-10 gap-y-px sm:grid-cols-2 lg:col-span-8">
        {featured.map((s, i) => (
          <li key={s.slug} className="border-t border-[color:var(--color-border)]">
            <div data-reveal data-reveal-delay={i * 50}>
              <Link href={`/services/${s.slug}`} className="group flex gap-5 py-7">
                <s.icon className="mt-0.5 size-5 shrink-0 text-link" aria-hidden />
                <span>
                  <span className="block text-lg font-semibold text-text group-hover:text-link">
                    {s.title}
                  </span>
                  <span className="mt-2 block text-base text-muted">{s.short}</span>
                </span>
              </Link>
            </div>
          </li>
        ))}
      </ul>

      <div className="lg:col-span-4">
        {/* The artwork is light vendor marks on dark chips with a transparent
            ground, so it can only ever sit on something dark. On the light
            theme it first floated as unexplained black blobs on white; a bare
            black box then read as a rendering fault rather than a choice.
            It is framed as a deliberate object instead: a dark panel with a
            brand-tinted edge, a glow, and a caption that says what it is. */}
        <figure className="hidden overflow-hidden rounded-lg bg-n-950 shadow-3 ring-1 ring-brand/25 lg:block">
          <div className="relative">
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_45%,rgb(var(--color-brand)/0.28),transparent_70%)]"
              aria-hidden="true"
            />
            <Image
              src="/images/abstract/system-cluster.png"
              alt=""
              width={900}
              height={900}
              sizes="(min-width: 1024px) 32vw, 0px"
              className="relative w-full"
            />
          </div>
          <figcaption className="border-t border-white/10 px-5 py-3.5 font-mono text-xs text-n-400">
            Models we run in production
          </figcaption>
        </figure>
      </div>
      </div>

      <p className="mt-9">
        <Link href="/services" className="inline-flex min-h-[44px] items-center text-base font-semibold text-link hover:brightness-110">
          All fourteen capabilities
        </Link>
      </p>
    </Section>
  );
}
