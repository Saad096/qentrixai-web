import Image from "next/image";
import { Check } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { DeviceFrame } from "@/components/ui/DeviceFrame";
import { HowWeWork } from "@/components/sections/HowWeWork";
import { StackTabs } from "@/components/sections/StackTabs";
import { Testimonials } from "@/components/sections/Testimonials";
import { FaqCta } from "@/components/sections/FaqCta";
import { company } from "@/data/company";
import { services, SERVICE_GROUPS } from "@/data/services";
import { caseStudies } from "@/data/caseStudies";
import { products } from "@/data/products";
import { clients } from "@/data/clients";
import { publicEnv } from "@/lib/env";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About QentrixAI",
  path: "/about",
  description:
    "An AI product studio in Lahore. Eleven products operated in-house, six production systems shipped for clients, and a handover at the end of every engagement.",
});

/**
 * Structured on the reference the owner supplied, filled with our own facts.
 *
 * Two sections from that structure are deliberately absent. It has an
 * open-source section built around a project with 580+ GitHub stars -- we do
 * not have one, and inventing a repo is the easiest lie on this page to
 * check, so the handover artifacts take that slot instead. And its client
 * wall is fourteen named logos; ours is three, because three is how many we
 * can name.
 */
const FOCUS = [
  {
    slug: "sovereign-ai",
    title: "Sovereign and private deployment",
    line: "The whole lifecycle inside a boundary you own, inference included — not just storage residency.",
  },
  {
    slug: "inference-engineering",
    title: "Inference economics",
    line: "Batching, cache reuse, quantisation and routing, for the point where the API bill overtakes self-hosting.",
  },
  {
    slug: "voice-ai",
    title: "Voice AI in production",
    line: "Streaming agents that hold a real conversation and hand to a human when confidence drops.",
  },
  {
    slug: "rag-enterprise-search",
    title: "Retrieval you can audit",
    line: "Hybrid retrieval with citations, measured against an eval set on every change.",
  },
];

const GALLERY = ["minutely", "neuromesh", "fintelia", "medaculous"];

export default function AboutPage() {
  const shots = GALLERY.map((slug) => products.find((p) => p.slug === slug)).filter(
    (p): p is (typeof products)[number] => Boolean(p)
  );

  return (
    <>
      <script
        id="ld-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "About", path: "/about" },
            ])
          ),
        }}
      />

      {/* Split hero, on the reference's pattern: the argument on the left,
          the evidence on the right. The four tiles are real interfaces from
          products we operate, which is why they can sit in the first
          viewport -- there is nothing to caption around. */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-6">
              <p className="font-mono text-xs text-muted">About us</p>
              <h1 className="mt-4 max-w-[20ch] text-hero font-bold text-text">
                We build AI products <span className="text-link">and then run them</span>
              </h1>
              <p className="mt-7 max-w-measure text-md text-muted">{company.mission}</p>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Button href="/book" size="lg">
                  Book a strategy call
                </Button>
                <Button href="/case-studies" size="lg" variant="secondary">
                  See the work
                </Button>
              </div>

              <ul className="mt-9 flex flex-wrap gap-x-8 gap-y-3">
                {[
                  "Senior engineers only, no junior bench",
                  "Lahore, serving 12 geographies",
                  "You own the code and the weights",
                ].map((c) => (
                  <li key={c} className="flex items-center gap-2.5 text-base text-text">
                    <Check aria-hidden className="size-4 shrink-0 text-link" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            <figure className="m-0 lg:col-span-6">
              <ul className="grid grid-cols-2 gap-4">
                {shots.map((p, i) => (
                  <li key={p.slug}>
                    <Link
                      href={`/products/${p.slug}`}
                      data-reveal
                      data-reveal-delay={i * 60}
                      className="group relative block overflow-hidden rounded-md"
                    >
                      <DeviceFrame
                        src={p.cover}
                        alt={`${p.name} interface`}
                        orientation={p.orientation}
                        sizes="(min-width: 1024px) 25vw, 45vw"
                        priority={i < 2}
                      />
                      <span className="absolute bottom-3 left-3 rounded-full bg-surface px-3 py-1 font-mono text-xs text-text shadow-1 group-hover:text-link">
                        {p.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <figcaption className="mt-4 font-mono text-xs text-muted">
                Interfaces from four of the {products.length} products we build and operate
                in-house.
              </figcaption>
            </figure>
          </div>
        </Container>
      </section>

      <Section eyebrow="How we started" heading="Founded in 2024, in Lahore." ground="base">
        <div className="mt-8 max-w-measure space-y-5 text-md text-muted">
          <p>
            QentrixAI began as a small senior team doing the part of AI work that nobody demos: the
            evaluation harness, the tracing, the rollback path. The engagements that followed were
            mostly rescues — systems that answered well in a notebook and fell over under real load.
          </p>
          <p>
            We started building our own products for the same reason. Operating {products.length} of
            them means we live with our own architecture decisions, which is why we argue about them
            early and why the handover at the end of a client engagement is a deliverable rather
            than a formality.
          </p>
        </div>
      </Section>

      {/* One bar rather than a row of separate cards: four figures that
          belong to the same claim read as one object, and each is derived
          from the data file behind it rather than typed in here. */}
      <section className="pb-4">
        <Container>
          <Card>
            <dl className="grid gap-px sm:grid-cols-2 xl:grid-cols-4">
              {[
                [`${products.length}`, "products built and operated in-house"],
                [`${caseStudies.length}`, "client systems in production"],
                [`${services.length}`, "capabilities across four groups"],
                ["12", "geographies served from one hub"],
              ].map(([v, k], i) => (
                <div
                  key={k}
                  data-reveal
                  data-reveal-delay={i * 60}
                  className="p-7 xl:border-l xl:border-[color:var(--color-border)] xl:first:border-l-0"
                >
                  <dt className="sr-only">{k}</dt>
                  <dd>
                    <span className="block text-2xl font-bold text-text">{v}</span>
                    <span className="mt-2 block text-base text-muted">{k}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </Card>
        </Container>
      </section>

      <Section eyebrow="Teams we have built for" heading="Named, because they said yes." ground="band">
        {/* Names and sectors, not logo files. The marks sit in
            /public/products from the original media drop, but a logo wall is
            a use of someone else's trademark and we have no written
            permission on file for it. The names are already public on the
            case studies. */}
        <ul className="mt-12 grid gap-5 sm:grid-cols-3">
          {clients.map((c, i) => (
            <Card as="li" key={c.name}>
              <div data-reveal data-reveal-delay={i * 60} className="p-7">
                <span className="block text-xl font-bold text-text">{c.name}</span>
                {c.industry && (
                  <span className="mt-2 block font-mono text-xs text-muted">{c.industry}</span>
                )}
              </div>
            </Card>
          ))}
        </ul>
        <p className="mt-6 max-w-measure text-base text-muted">
          Several more engagements are under NDA and appear in the case studies described by sector
          rather than by name.
        </p>
      </Section>

      <Testimonials />
      <Section
        eyebrow="What we build"
        heading={`${services.length} capabilities, in four groups.`}
        ground="band"
      >
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {SERVICE_GROUPS.map((group, i) => {
            const inGroup = services.filter((s) => s.group === group);
            return (
              <Card as="li" key={group}>
                <div data-reveal data-reveal-delay={i * 60} className="flex h-full flex-col gap-3 p-7">
                  <h3 className="text-lg font-semibold text-text">{group}</h3>
                  <p className="font-mono text-xs text-muted">{inGroup.length} capabilities</p>
                  <ul className="mt-2 space-y-1">
                    {inGroup.slice(0, 4).map((s) => (
                      <li key={s.slug} className="text-base text-muted">
                        {s.title}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            );
          })}
        </ul>
        <p className="mt-9">
          <Link
            href="/services"
            className="inline-flex min-h-[44px] items-center text-base font-semibold text-link underline-offset-4 hover:underline"
          >
            {`All ${services.length} capabilities →`}
          </Link>
        </p>
      </Section>

      <StackTabs />

      <Section
        eyebrow="Where we go deepest"
        heading="Four things we are asked to fix most."
        ground="band"
      >
        <ul className="mt-12 grid gap-5 sm:grid-cols-2">
          {FOCUS.map((f, i) => (
            <Card as="li" key={f.slug} interactive>
              <Link
                href={`/services/${f.slug}`}
                data-reveal
                data-reveal-delay={i * 60}
                className="flex h-full flex-col gap-3 p-7"
              >
                <h3 className="text-lg font-semibold text-text">{f.title}</h3>
                <p className="text-base text-muted">{f.line}</p>
              </Link>
            </Card>
          ))}
        </ul>
      </Section>

      <HowWeWork />

      <Section eyebrow="Who you will work with" heading="Senior people, named." ground="band">
        <div className="mt-10 grid gap-9 md:grid-cols-12">
          <div className="md:col-span-4">
            {/* Line art the owner supplied, not the photograph and not the
                colour-dodge sketch that stood in for it. Kept on a paper
                plate for the same reason as before: a near-white image
                dropped straight onto the dark theme glares, and inverting
                line art to white-on-black stops reading as a drawing.

                The source lives in media/source/ so the derivative can be
                regenerated. */}
            <figure className="m-0 w-full max-w-[340px]">
              <div className="rounded-md bg-[#FCFAF4] p-3 shadow-2 ring-1 ring-[color:var(--color-border)]">
                <Image
                  src="/team/saad-alam-portrait.webp"
                  alt="Saad Alam, drawn in line art"
                  width={1074}
                  height={1535}
                  sizes="(min-width: 768px) 30vw, 100vw"
                  className="aspect-[3/4] w-full rounded-sm object-cover object-top"
                />
              </div>
            </figure>
          </div>
          <div className="md:col-span-8">
            <h3 className="text-lg font-semibold text-text">{publicEnv.profile.name}</h3>
            <p className="mt-1 font-mono text-xs text-muted">CEO and AI lead</p>
            <p className="mt-5 max-w-measure text-md text-muted">
              Five years across enterprise AI delivery: generative and agentic systems, retrieval,
              voice automation, document intelligence and the MLOps that keeps them running. Saad
              scopes the work and stays on it through handover.
            </p>
            <p className="mt-5 max-w-measure text-md text-muted">
              Behind him is a senior team across platform engineering, cloud and product. There is
              no junior bench: the people who scope an engagement are the people who build it.
            </p>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-1">
              {[
                { label: "LinkedIn", href: publicEnv.team.saadLinkedIn || publicEnv.socials.linkedin },
                { label: "GitHub", href: publicEnv.socials.github },
                { label: "Upwork", href: publicEnv.socials.upwork },
              ]
                .filter((l) => l.href)
                .map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] min-w-[44px] items-center font-mono text-xs text-link underline underline-offset-4 hover:brightness-110"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section eyebrow="Where we are" heading="One hub, twelve time zones." ground="base">
        <dl className="mt-8 grid max-w-measure gap-px">
          {[
            ["Based in", company.location],
            ["Founded", company.founded],
            ["Hours", company.hours],
            ["Email", publicEnv.profile.email],
            ["Phone", publicEnv.profile.phone],
          ].map(([k, v]) => (
            <div
              key={k}
              className="flex flex-wrap justify-between gap-4 border-t border-[color:var(--color-border)] py-4"
            >
              <dt className="font-mono text-xs text-muted">{k}</dt>
              <dd className="text-base text-text">{v}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <FaqCta />
    </>
  );
}
