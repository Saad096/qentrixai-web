import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { ArtPanel } from "@/components/art/ArtPanel";
import { ModelOrbit } from "@/components/art/ModelOrbit";
import { AgentGraph } from "@/components/art/AgentGraph";
import { RetrievalFlow } from "@/components/art/RetrievalFlow";
import { VoiceWave } from "@/components/art/VoiceWave";
import { services } from "@/data/services";

/**
 * Four illustrated cards, 2026-09-21, replacing a two-column text list of six
 * services beside one framed stock render.
 *
 * Four rather than six because each card carries a bespoke diagram, and the
 * diagram is the point: a row of cards distinguished only by a line-icon is
 * the pattern DESIGN.md bans, and it is what the six-item list amounted to.
 * The two featured services that come off the row are still reachable, and
 * the link below still leads to all fourteen.
 *
 * Which four: the capabilities buyers open a conversation with, and which
 * each have something specific to draw. Cloud/MLOps is deliberately not here
 * -- "evals and tracing before launch" is the Why-us section's argument, and
 * saying it twice on one page is what the revamp was for.
 */
const CARDS = [
  { slug: "generative-ai", Art: ModelOrbit },
  { slug: "agentic-ai", Art: AgentGraph },
  { slug: "rag-enterprise-search", Art: RetrievalFlow },
  { slug: "voice-ai", Art: VoiceWave },
] as const;

export function WhatWeBuild() {
  const cards = CARDS.map(({ slug, Art }) => {
    const service = services.find((s) => s.slug === slug);
    if (!service) throw new Error(`WhatWeBuild: no service "${slug}"`);
    return { service, Art };
  });

  return (
    <Section
      eyebrow="What we build"
      heading="Four things we are asked for most."
      lede="Fourteen capabilities in total. These are the ones that start most engagements."
      ground="base"
      headerClassName="mx-auto text-center"
    >
      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(({ service, Art }, i) => (
          <Card as="li" key={service.slug} interactive>
            <Link
              href={`/services/${service.slug}`}
              data-reveal
              data-reveal-delay={i * 70}
              className="flex h-full flex-col p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:rgb(var(--color-link))]"
            >
              <ArtPanel>
                <Art />
              </ArtPanel>
              <h3 className="mt-6 px-2 text-center text-lg font-semibold text-text">
                {service.title}
              </h3>
              <p className="mb-2 mt-3 px-2 pb-2 text-center text-base text-muted">
                {service.short}
              </p>
            </Link>
          </Card>
        ))}
      </ul>

      <p className="mt-9 text-center">
        <Link
          href="/services"
          className="inline-flex min-h-[44px] items-center text-base font-semibold text-link hover:brightness-110"
        >
          All fourteen capabilities
        </Link>
      </p>
    </Section>
  );
}
