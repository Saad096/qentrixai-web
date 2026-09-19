import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { HowWeWork } from "@/components/sections/HowWeWork";
import { StackTabs } from "@/components/sections/StackTabs";
import { FaqCta } from "@/components/sections/FaqCta";
import { company } from "@/data/company";
import { publicEnv } from "@/lib/env";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "How we work",
  path: "/about",
  description:
    "Four phases, each ending with an artifact you own: a problem framing, an architecture decision record, an eval harness in your CI, and a runbook.",
});

const beliefs = [
  {
    title: "The metric comes before the model.",
    body: "If we cannot say what number should move, we are not ready to build. That conversation happens in week one, not at the review.",
  },
  {
    title: "A system you cannot observe is a system you do not own.",
    body: "Tracing and evals are part of the build, not a follow-on project. They are the difference between fixing a regression and guessing at one.",
  },
  {
    title: "Handover is the deliverable.",
    body: "The engagement ends with your team able to change the thing without us. Anything else is a dependency we sold you.",
  },
];

export default function AboutPage() {
  return (
    <>
      <script id="ld-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "How we work", path: "/about" },
            ])
          ),
        }}
      />

      <section className="py-16 md:py-24">
        <Container>
          <h1 className="max-w-[16ch] text-hero font-bold text-text">How we work</h1>
          <p className="mt-7 max-w-measure text-md text-muted">{company.mission}</p>
        </Container>
      </section>

      <HowWeWork />

      <Section heading="What we believe" className="rule">
        <ul className="mt-10 grid gap-10 md:grid-cols-3">
          {beliefs.map((b) => (
            <li key={b.title}>
              <h3 className="text-lg font-semibold text-text">{b.title}</h3>
              <p className="mt-3 text-base text-muted">{b.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section heading="Who you will work with" className="rule">
        <div className="mt-10 grid gap-9 md:grid-cols-12">
          <div className="md:col-span-4">
            <Image
              src="/team/saad-alam.jpeg"
              alt="Saad Alam"
              width={853}
              height={1280}
              sizes="(min-width: 768px) 33vw, 100vw"
              className="aspect-square w-full max-w-[360px] rounded-md object-cover object-top"
            />
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

      <StackTabs />

      <Section heading="Where we are" className="rule">
        <dl className="mt-8 grid max-w-measure gap-px">
          {[
            ["Based in", company.location],
            ["Founded", company.founded],
            ["Hours", company.hours],
            ["Email", publicEnv.profile.email],
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
