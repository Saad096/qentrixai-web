import { ArrowRight, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHeading } from "@/components/ui/PageHeading";
import { Button } from "@/components/ui/Button";
import { CtaBlock } from "@/components/sections/FaqCta";
import { buildMetadata } from "@/lib/seo";
import { publicEnv } from "@/lib/env";

export const metadata = buildMetadata({
  title: "Careers",
  path: "/careers",
  description:
    "Join QentrixAI. We hire senior AI engineers, platform engineers, and product operators who care about shipping production-grade systems.",
});

const principles = [
  {
    title: "Senior-only bench",
    body: "We keep the team small and senior on purpose. If you've shipped production AI systems and want a clean engineering culture, we'll talk.",
  },
  {
    title: "Production over polish",
    body: "Demos are easy. Surviving Monday morning is hard. We hire people who think about eval, observability, and rollback as features, not chores.",
  },
  {
    title: "Async-first, remote-friendly",
    body: "We work async by default, meet on purpose, and document everything. Time-zone tolerant. Lahore-based core team, global collaborators.",
  },
  {
    title: "Skin in the game",
    body: "Senior engineers and product operators have access to project-level upside on partnership-style engagements.",
  },
];

const openRoles = [
  {
    title: "Senior AI Engineer (GenAI / Agentic)",
    location: "Remote / Lahore · Full-time",
    summary:
      "Lead delivery on agentic and GenAI client engagements. Strong LangChain / LangGraph, eval, and production deployment background expected.",
  },
  {
    title: "Voice AI Engineer",
    location: "Remote · Full-time or Contract",
    summary:
      "Build streaming ASR + TTS systems on phone-grade audio. Whisper / WhisperX / Parakeet experience strongly preferred.",
  },
  {
    title: "Cloud & DevOps Engineer",
    location: "Remote / Lahore · Full-time",
    summary:
      "Own the deployment layer across client engagements. Docker, Kubernetes-ready architecture, CI/CD and observability.",
  },
  {
    title: "Product Designer (UI/UX)",
    location: "Remote · Contract",
    summary:
      "Design product surfaces for AI applications. Comfortable with bento layouts, dense data UI, and motion that respects users.",
  },
];

export default function CareersPage() {
  return (
    <>
      <section className="pt-16 md:pt-24 pb-12">
        <Container>
          <PageHeading
            eyebrow="Careers"
            title="Work with senior people on AI systems that ship."
            lede="No army-of-juniors model, no busywork. Real engineering, real outcomes, real upside."
            art="index-careers"
          />
        </Container>
      </section>

      <section className="pb-12">
        <Container>
          <h2 className="text-2xl font-semibold tracking-tight text-text">How we hire</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {principles.map((p) => (
              <div
                key={p.title}
                className="rounded-lg border border-[color:var(--color-border)] bg-surface p-6"
              >
                <div className="inline-flex size-9 items-center justify-center rounded-lg border border-[color:var(--color-border)] bg-brand/10 text-link">
                  <Sparkles className="size-4" />
                </div>
                <h3 className="mt-4  text-base font-semibold text-text">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          <h2 className=" text-2xl font-semibold tracking-tight text-text md:text-3xl">
            Open roles
          </h2>
          <div className="mt-6 divide-y divide-[color:var(--color-border)] rounded-lg border border-[color:var(--color-border)] bg-surface">
            {openRoles.map((r) => (
              <div
                key={r.title}
                className="flex flex-col items-start gap-3 p-6 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <h3 className=" text-base font-semibold text-text">{r.title}</h3>
                  <p className="mt-1 text-[13.5px] text-muted">{r.location}</p>
                  <p className="mt-2 max-w-2xl text-sm text-muted">{r.summary}</p>
                </div>
                <Button
                  href={`mailto:${publicEnv.profile.email}?subject=Career: ${encodeURIComponent(r.title)}`}
                  variant="secondary"
                  size="sm"
                >
                  Apply <ArrowRight className="size-4" />
                </Button>
              </div>
            ))}
            <div className="p-6 text-[13.5px] text-muted">
              Don't see the right fit? Email{" "}
              <a href={`mailto:${publicEnv.profile.email}`} className="text-link underline underline-offset-4">
                {publicEnv.profile.email}
              </a>{" "}
              with what you do best and a few links.
            </div>
          </div>
        </Container>
      </section>

      <CtaBlock />
    </>
  );
}
