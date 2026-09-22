import Link from "next/link";
import { Check, Cloud, Cpu, Gauge, Layers, Lock, MapPin, Wallet, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SovereignBoundary } from "@/components/art/SovereignBoundary";
import { services } from "@/data/services";
import { caseStudies } from "@/data/caseStudies";
import { faqs } from "@/data/faqs";
import { PRIMARY_CTA } from "@/data/navigation";
import { buildMetadata, serviceJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";

/**
 * Sovereign AI gets a hand-built page instead of the /services/[slug]
 * template.
 *
 * A static route wins over the dynamic one in the App Router, so this file
 * simply takes over /services/sovereign-ai; the record in services.ts stays
 * where it is and still feeds the menu, the /services index and the JSON-LD
 * below. Nothing else about the twenty other capabilities changes.
 *
 * It is built on the structure of the reference page the owner supplied:
 * split hero, why-now, a public-API-versus-sovereign comparison, the stages
 * of a private deployment, deployment options, what you keep, shipped work,
 * questions from security teams, and a close.
 *
 * Two things from that page are not reproduced. Its case study carries
 * response-time and model-size figures for a named client -- ours names the
 * one sovereign-shaped system we have actually shipped and quotes only what
 * the case study already says. And its hero carries a mock application
 * window with invented file names; ours carries a diagram instead, captioned
 * as a diagram.
 */
const service = services.find((s) => s.slug === "sovereign-ai")!;

export const metadata = buildMetadata({
  title: "Sovereign AI: private models on infrastructure you own",
  path: "/services/sovereign-ai",
  description:
    "Open-weight models served inside your own estate -- air-gapped, in your VPC or in an in-country region. Inference-time residency, not just storage residency.",
});

const HERO_CHECKS = [
  "You own the weights and the code",
  "Inference stays inside your boundary",
  "Every sub-processor named in writing",
];

const WHY = [
  {
    Icon: Lock,
    title: "Regulated data",
    body: "Health, financial and personal records carry rules about where they are stored and who is allowed to process them.",
  },
  {
    Icon: Cpu,
    title: "Proprietary knowledge",
    body: "Pricing models, research and internal reports are the material a competitor would most like to read.",
  },
  {
    Icon: MapPin,
    title: "Disconnected sites",
    body: "Factories, hospitals and field sites cannot make a system's availability depend on a link to a model provider.",
  },
  {
    Icon: Cloud,
    title: "Jurisdiction risk",
    body: "A hosted platform can change its terms, its region or its ownership. Your workflow ends up on someone else's roadmap.",
  },
];

/** Attributed on the page, because they are other people's research. */
const EVIDENCE = [
  { stat: "83%", line: "treat sovereign AI as at least moderately important to strategy.", source: "Deloitte, 2026" },
  { stat: "77%", line: "factor a vendor's country of origin into the purchasing decision.", source: "Deloitte, 2026" },
  { stat: "65%", line: "have already restructured cloud strategy under geopolitical pressure.", source: "Kyndryl, 2026" },
];

const COMPARE = [
  {
    row: "Where the tokens are processed",
    api: "On the provider's hardware, in whichever region they route to.",
    sov: "On hardware inside the estate and jurisdiction you chose.",
  },
  {
    row: "Network dependency",
    api: "No connection, no answers.",
    sov: "Runs air-gapped; keeps working through an outage.",
  },
  {
    row: "Model ownership",
    api: "Rented access to a model you cannot inspect or keep.",
    sov: "Open weights, your fine-tunes, your artifacts, kept after the engagement.",
  },
  {
    row: "Cost shape",
    api: "Per-token and per-seat, growing with use.",
    sov: "Your own hardware or cloud account, sized against real traffic.",
  },
  {
    row: "Audit trail",
    api: "Whatever the provider chooses to expose.",
    sov: "Every prompt, retrieved source and answer logged in your systems.",
  },
  {
    row: "Exit",
    api: "A rewrite, because the model and the orchestration came together.",
    sov: "An exit plan written before the build starts.",
  },
];

const STAGES = [
  {
    title: "Map the jurisdiction before the architecture",
    body: "Which rules apply, which data classes are in scope, and which sub-processors would touch the path. This is the document your security team reviews, and it is written before any model is chosen.",
    chips: ["EU AI Act", "GDPR", "DPDP", "Sub-processor map"],
  },
  {
    title: "Choose open weights that fit the hardware",
    body: "Model selection runs against your accuracy bar, the licence terms and the GPUs you either have or are willing to buy. Quantisation is tested with a quality gate, not assumed.",
    chips: ["Llama", "Mistral", "Qwen", "Quality-gated quantisation"],
  },
  {
    title: "Serve inference on your own hardware",
    body: "Open-weight models served with vLLM on your GPUs, in your VPC or in an in-country region. Batching and cache reuse are tuned against your traffic shape rather than a benchmark.",
    chips: ["vLLM", "Kubernetes", "Continuous batching"],
  },
  {
    title: "Keep retrieval inside the boundary",
    body: "Documents are chunked and embedded on your machines, the index lives in your database, and answers cite the passage they came from so a reviewer can check them.",
    chips: ["Local embeddings", "Postgres", "Citations"],
  },
  {
    title: "Guardrails, access control and audit logs",
    body: "Input and output filters, retrieval scoped to the identity asking, and a trace for every prompt, source and answer. The evidence a regulator asks for is a query, not a reconstruction.",
    chips: ["Langfuse", "Tenancy isolation", "Key management"],
  },
  {
    title: "Operate it, then hand it over",
    body: "Dashboards, drift checks, a rollback path and a runbook, followed by a supervised handover. The exit plan agreed in stage one is executable, not theoretical.",
    chips: ["Runbook", "Rollback path", "Exit plan"],
  },
];

const DEPLOYMENTS = [
  {
    Icon: Lock,
    title: "Air-gapped on-premises",
    body: "Models run on servers inside your facility with no route to the public internet. Nothing is sent to a third party, and the system keeps answering when the outside network does not.",
    fit: "Regulated data, secure facilities, hospitals",
  },
  {
    Icon: Cloud,
    title: "Private VPC",
    body: "Deployed into your own AWS, GCP or Azure account. Your cloud team keeps networking, identity and keys; the model endpoints are never exposed publicly.",
    fit: "Teams already standardised on one cloud",
  },
  {
    Icon: MapPin,
    title: "In-country region",
    body: "A managed deployment in a region inside the jurisdiction that governs the data, with every sub-processor in the path named in the contract.",
    fit: "Residency obligations without on-prem hardware",
  },
  {
    Icon: Cpu,
    title: "Edge devices",
    body: "Models quantised and compiled to run on the device itself, built offline-first so a dropped connection degrades nothing, with signed model updates.",
    fit: "Cameras, factory lines, field and remote sites",
    href: "/services/edge-ai",
  },
];

/**
 * Running it yourself is where the cost argument is won or lost, so the page
 * says how rather than asserting that it is cheaper.
 *
 * Every figure here belongs to somebody else and is attributed on the card.
 * None of them are our results.
 */
const ECONOMICS = [
  {
    Icon: Layers,
    title: "KV cache, the biggest single lever",
    body:
      "Past about 32K tokens the KV cache outgrows the model weights in memory, and past 128K it dominates. Paged attention, prefix caching, and INT8 or FP8 cache quantisation are what make a long-context workload fit on hardware you can actually buy.",
    note: "Google's TurboQuant reports 3-bit KV at no measured accuracy cost.",
    source: "TurboQuant, March 2026",
  },
  {
    Icon: Wallet,
    title: "Token budgets, not token counts",
    body:
      "Requests are not interchangeable. Routing each one to a right-sized pool by its estimated token budget, rather than sending everything to one large model, is where the savings are. We size the pools against your traffic, not a benchmark.",
    note: "Published pool-routing work reports 17 to 39% GPU reduction at fleet scale.",
    source: "arXiv 2604.09613",
  },
  {
    Icon: Gauge,
    title: "P99, because that is what users feel",
    body:
      "Median latency looks fine on every dashboard while the slowest request in twenty is the one that loses the user. We budget time-to-first-token and inter-token latency separately, then size the prefill budget against your P99 prompt length rather than your average.",
    note: "Continuous batching typically buys 3 to 5x throughput at the same hardware.",
    source: "vLLM continuous batching",
  },
  {
    Icon: Cpu,
    title: "Small typed models where they fit",
    body:
      "Not everything needs a large model. Classification, routing, scoring and extraction are decisions rather than essays, and a small model returning a typed answer with a calibrated confidence is faster and cheaper for them by orders of magnitude.",
    note: "TypeSafe's Jev quotes 70 to 500ms and $42 per billion input tokens. It is API-only with no open weights, so it cannot come inside an air-gapped boundary. That trade is the decision, and we will say which way it falls for you.",
    source: "TypeSafe AI, September 2026",
  },
];

const KEEP = [
  {
    title: "Weights you own outright",
    body: "Custom and fine-tuned models are yours, not a seat licence to a platform we operate. Ownership is written into the contract and survives termination.",
  },
  {
    title: "Data that does not leave",
    body: "A locally deployed model has no dependency on a third-party service, so there is no egress to account for and nothing to explain to a regulator.",
  },
  {
    title: "An NDA before the first data share",
    body: "We sign NDAs routinely, and we can sign one before you show us a single document. Several case studies on this site are anonymised for that reason.",
  },
  {
    title: "No training on your data",
    body: "Your documents, images and logs are used for your project. We keep no licence to reuse them or anything derived from them.",
  },
];

/** Questions a security reviewer opens with, four reused verbatim. */
const PAGE_FAQ_SLUGS = [
  "Where does our data live, and who can compel it?",
  "Can you run entirely on-prem or in our VPC?",
  "Who owns the code, the prompts and the fine-tuned weights?",
  "How do we avoid being locked to you, or to one model vendor?",
];

const EXTRA_FAQ = [
  {
    question: "Which open-weight models do you run?",
    answer:
      "It is chosen per use case, against your accuracy bar, the licence terms and the hardware available. In practice that is usually a Llama, Mistral or Qwen variant served with vLLM. We will tell you when a hosted model would genuinely be better and the data allows it.",
  },
  {
    question: "What hardware do we need?",
    answer:
      "It depends on the model size, the number of concurrent users or video streams, and your latency target. We size it during the design phase and tell you the number before you buy anything. Quantisation often moves a workload onto hardware you already have.",
  },
  {
    question: "Who runs it after launch?",
    answer:
      "Your team, ours, or both. The handover includes the runbook, the dashboards and the rollback path either way, so the choice stays reversible rather than becoming a dependency.",
  },
];

export default function SovereignAiPage() {
  /* Grounds alternate in render order rather than being hard-coded, so
     inserting a section mid-page cannot put two of the same next to each
     other. Same helper as the capability template. */
  let groundIndex = 0;
  const nextGround = (): "band" | "base" => (groundIndex++ % 2 === 0 ? "band" : "base");

  const pageFaqs = [
    ...PAGE_FAQ_SLUGS.map((q) => faqs.find((f) => f.question === q)!),
    ...EXTRA_FAQ,
  ];
  const shipped = caseStudies.find((c) => c.slug === "computer-vision-systems")!;

  return (
    <>
      <script
        id="ld-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceJsonLd({
              title: "Sovereign AI",
              description: service.description,
              slug: "sovereign-ai",
            })
          ),
        }}
      />
      <script
        id="ld-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "What we build", path: "/services" },
              { name: "Sovereign AI", path: "/services/sovereign-ai" },
            ])
          ),
        }}
      />
      <script
        id="ld-faq-sovereign"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(pageFaqs)) }}
      />

      {/* Split hero. The left column carries the argument, the right carries
          the diagram of it. */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <p className="font-mono text-xs text-muted">For regulated and IP-sensitive teams</p>
              <h1 className="mt-4 max-w-[17ch] text-hero font-bold text-text">
                Sovereign AI: <span className="text-link">private models</span> on infrastructure
                you own
              </h1>
              <p className="mt-7 max-w-measure text-md text-text-2">
                When the data cannot go to a public API, the model has to come to the data. We
                build open-weight systems and deploy them air-gapped, inside your VPC or in an
                in-country region. The inference runs there too, not just the storage.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Button href={PRIMARY_CTA.href} size="lg">
                  Book a private AI assessment
                </Button>
                <Button href="/case-studies" size="lg" variant="secondary">
                  See the work
                </Button>
              </div>

              <ul className="mt-9 flex flex-wrap gap-x-8 gap-y-3">
                {HERO_CHECKS.map((c) => (
                  <li key={c} className="flex items-center gap-2.5 text-base text-text">
                    <Check aria-hidden className="size-4 shrink-0 text-link" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-5">
              <SovereignBoundary />
            </div>
          </div>
        </Container>
      </section>

      {/* Why now: argument left, four reasons right. */}
      <Section ground={nextGround()}>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5" data-reveal>
            <p className="mb-4 font-mono text-xs text-muted">Why sovereign AI</p>
            <h2 className="text-3xl font-bold text-text">
              Some data cannot be sent to a public API.
            </h2>
            <p className="mt-6 text-md text-text-2">
              Patient records, unreleased research, contracts and engineering drawings arrive with
              legal or competitive limits on where they can be processed. A hosted chatbot is the
              wrong tool for that data, and no amount of configuration makes it the right one.
            </p>
            <p className="mt-5 text-md text-text-2">
              Storage residency is the half that makes it into contracts. Inference residency is
              the half that gets missed: where the tokens are actually processed, and who could be
              compelled to produce them.
            </p>
          </div>

          <ul className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
            {WHY.map(({ Icon, title, body }, i) => (
              <Card as="li" key={title}>
                <div data-reveal data-reveal-delay={i * 60} className="flex h-full flex-col gap-3 p-7">
                  <span
                    aria-hidden
                    className="grid size-10 place-items-center rounded-full bg-brand/12 text-link"
                  >
                    <Icon className="size-[18px]" />
                  </span>
                  <h3 className="mt-1 text-lg font-semibold text-text">{title}</h3>
                  <p className="text-base text-text-2">{body}</p>
                </div>
              </Card>
            ))}
          </ul>
        </div>

        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {EVIDENCE.map((e, i) => (
            <Card as="li" key={e.stat}>
              <div data-reveal data-reveal-delay={i * 60} className="flex h-full flex-col gap-3 p-7">
                <span className="text-3xl font-bold text-link">{e.stat}</span>
                <p className="text-base text-text">{e.line}</p>
                <p className="mt-auto pt-4 font-mono text-xs text-muted">{e.source}</p>
              </div>
            </Card>
          ))}
        </ul>
      </Section>

      {/* The comparison. A real table, because it is tabular data and a
          screen reader should be told so. */}
      <Section
        eyebrow="The difference"
        heading="Public API against sovereign deployment."
        ground={nextGround()}
      >
        {/* The table scrolls sideways below ~720px, and a scroll container
            with no focusable child is unreachable from the keyboard. tabIndex
            makes it a stop; the role and label say what the stop is. */}
        <div
          className="mt-12 overflow-x-auto"
          tabIndex={0}
          role="region"
          aria-label="Public AI API compared with a sovereign deployment"
        >
          <table className="w-full min-w-[720px] border-collapse text-left">
            <caption className="sr-only">
              Public AI API compared with a sovereign deployment across six dimensions
            </caption>
            <thead>
              <tr>
                <th scope="col" className="w-[22%] py-4 pr-6 font-mono text-xs font-normal text-muted">
                  &nbsp;
                </th>
                <th scope="col" className="w-[39%] py-4 pr-6 text-base font-semibold text-muted">
                  Public AI API
                </th>
                <th scope="col" className="w-[39%] py-4 text-base font-semibold text-link">
                  Sovereign deployment
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARE.map((r) => (
                <tr key={r.row} className="border-t border-[color:var(--color-border)] align-top">
                  <th scope="row" className="py-5 pr-6 text-base font-semibold text-text">
                    {r.row}
                  </th>
                  <td className="py-5 pr-6 text-base text-muted">
                    <span className="flex gap-2.5">
                      <X aria-hidden className="mt-0.5 size-4 shrink-0 text-muted" />
                      {r.api}
                    </span>
                  </td>
                  <td className="py-5 text-base text-text">
                    <span className="flex gap-2.5">
                      <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-link" />
                      {r.sov}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Stages: sticky argument on the left, the sequence on the right. */}
      <Section ground={nextGround()}>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28" data-reveal>
              <p className="mb-4 font-mono text-xs text-muted">How it works</p>
              <h2 className="text-3xl font-bold text-text">
                Six stages, all of them inside your estate.
              </h2>
              <p className="mt-6 text-md text-text-2">
                Most sovereign projects are retrieval systems: an open model that reads your
                documents at question time and cites where each answer came from. Every stage below
                runs on hardware you control.
              </p>
              <p className="mt-7">
                <Link
                  href="/services/rag-enterprise-search"
                  className="inline-flex min-h-[44px] items-center text-base font-semibold text-link underline-offset-4 hover:underline"
                >
                  {"How we build retrieval →"}
                </Link>
              </p>
            </div>
          </div>

          <ol className="grid gap-5 lg:col-span-7">
            {STAGES.map((s, i) => (
              <Card as="li" key={s.title}>
                <div data-reveal data-reveal-delay={i * 50} className="flex flex-col gap-3 p-7">
                  <span className="font-mono text-xs text-link">
                    {`Stage ${String(i + 1).padStart(2, "0")}`}
                  </span>
                  <h3 className="text-lg font-semibold text-text">{s.title}</h3>
                  <p className="text-base text-text-2">{s.body}</p>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {s.chips.map((c) => (
                      <li
                        key={c}
                        className="rounded-full border border-[color:var(--color-border)] px-3 py-1 font-mono text-xs text-muted"
                      >
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </ol>
        </div>
      </Section>

      <Section
        eyebrow="Deployment options"
        heading="Run it where the data already lives."
        lede="Which option fits depends on your rules, your latency target and who will operate it. Teams often mix them: train in a private cloud, serve on-premises or at the edge."
        ground={nextGround()}
      >
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {DEPLOYMENTS.map(({ Icon, title, body, fit, href }, i) => (
            <Card as="li" key={title}>
              <div data-reveal data-reveal-delay={i * 60} className="flex h-full flex-col gap-3 p-7">
                <span
                  aria-hidden
                  className="grid size-10 place-items-center rounded-full bg-brand/12 text-link"
                >
                  <Icon className="size-[18px]" />
                </span>
                <h3 className="mt-1 text-lg font-semibold text-text">{title}</h3>
                <p className="text-base text-text-2">{body}</p>
                <p className="mt-auto border-t border-[color:var(--color-border)] pt-4 text-base text-text">
                  <span className="font-mono text-xs text-muted">Good fit </span>
                  {fit}
                </p>
                {href && (
                  <Link
                    href={href}
                    className="inline-flex min-h-[44px] items-center text-base font-semibold text-link underline-offset-4 hover:underline"
                  >
                    {"Edge deployment →"}
                  </Link>
                )}
              </div>
            </Card>
          ))}
        </ul>
      </Section>

      <Section
        eyebrow="What it costs to run"
        heading="Owning the hardware is the start, not the saving."
        lede="Self-hosting only pays if the serving layer is engineered. These are the four levers that decide whether it does, with the published work behind each one."
        ground={nextGround()}
      >
        <ul className="mt-12 grid gap-5 sm:grid-cols-2">
          {ECONOMICS.map(({ Icon, title, body, note, source }, i) => (
            <Card as="li" key={title}>
              <div data-reveal data-reveal-delay={i * 60} className="flex h-full flex-col gap-3 p-7">
                <span
                  aria-hidden
                  className="grid size-11 place-items-center rounded-md bg-brand/12 text-link"
                >
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-1 text-lg font-semibold text-text">{title}</h3>
                <p className="text-base text-text-2">{body}</p>
                <p className="mt-auto border-t border-[color:var(--color-border)] pt-4 text-base text-text-2">
                  {note}
                </p>
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
                  {source}
                </p>
              </div>
            </Card>
          ))}
        </ul>

        <p className="mt-9">
          <Link
            href="/services/inference-engineering"
            className="inline-flex min-h-[44px] items-center text-base font-semibold text-link underline-offset-4 hover:underline"
          >
            {"How we do inference engineering \u2192"}
          </Link>
        </p>
      </Section>

      <Section
        eyebrow="What you keep"
        heading="Your models, your data, your control."
        ground={nextGround()}
      >
        <ul className="mt-12 grid gap-5 sm:grid-cols-2">
          {KEEP.map((k, i) => (
            <Card as="li" key={k.title}>
              <div data-reveal data-reveal-delay={i * 60} className="flex h-full flex-col gap-3 p-7">
                <h3 className="text-lg font-semibold text-text">{k.title}</h3>
                <p className="text-base text-text-2">{k.body}</p>
              </div>
            </Card>
          ))}
        </ul>
      </Section>

      {/* One case study, because one is how many we have shipped that is
          genuinely sovereign-shaped. The wording is the case study's own. */}
      <Section
        eyebrow="Private AI we have shipped"
        heading="On-device, with nothing sensitive leaving the device."
        ground={nextGround()}
      >
        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <p className="font-mono text-xs text-link">{shipped.category}</p>
            <h3 className="mt-3 text-lg font-semibold text-text">{shipped.title}</h3>
            <dl className="mt-6 max-w-measure space-y-5">
              {[
                ["The constraint", shipped.problem],
                ["What we built", shipped.solution],
                ["The result", shipped.outcome],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="font-mono text-xs text-muted">{k}</dt>
                  <dd className="mt-1.5 text-base text-text">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-7">
              <Link
                href={`/case-studies/${shipped.slug}`}
                className="inline-flex min-h-[44px] items-center text-base font-semibold text-link underline-offset-4 hover:underline"
              >
                {"Read the case study →"}
              </Link>
            </p>
          </div>

          <div className="lg:col-span-5">
            <Card>
              <div data-reveal className="p-7">
                <p className="font-mono text-xs text-muted">What it runs on</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {shipped.stack.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-[color:var(--color-border)] px-3.5 py-1.5 font-mono text-xs text-muted"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 border-t border-[color:var(--color-border)] pt-5 text-base text-muted">
                  No hosted model API anywhere in that list. That is the whole design.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </Section>

      {/* Two columns, same reason as the homepage FAQ: a single left-aligned
          accordion leaves the right half of a 1440 viewport empty. */}
      <Section ground={nextGround()}>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5" data-reveal>
            <p className="mb-4 font-mono text-xs text-muted">
              Questions security and IT teams ask
            </p>
            <h2 className="text-3xl font-bold text-text">
              Answered before there is a contract.
            </h2>
            <p className="mt-5 text-md text-text-2">
              If a reviewer needs something that is not here, ask on the call. We answer
              architecture and data-handling questions before anyone signs anything.
            </p>
          </div>

          <ul className="lg:col-span-7">
          {pageFaqs.map((faq) => (
            <li key={faq.question} className="border-t border-[color:var(--color-border)]">
              <details className="group">
                <summary className="flex min-h-[60px] cursor-pointer list-none items-center justify-between gap-6 py-4 text-md font-semibold text-text marker:content-none">
                  {faq.question}
                  <span aria-hidden className="shrink-0 font-mono text-lg text-muted group-open:hidden">
                    +
                  </span>
                  <span aria-hidden className="hidden shrink-0 font-mono text-lg text-muted group-open:block">
                    -
                  </span>
                </summary>
                <p className="pb-6 pr-10 text-base text-muted">{faq.answer}</p>
              </details>
            </li>
          ))}
          </ul>
        </div>
      </Section>

      <Section eyebrow="Keep reading" heading="Related capabilities." ground={nextGround()}>
        <ul className="mt-10 grid gap-5 sm:grid-cols-3">
          {["inference-engineering", "edge-ai", "responsible-ai"]
            .map((slug) => services.find((s) => s.slug === slug)!)
            .map((s, i) => (
              <Card as="li" key={s.slug} interactive>
                <Link
                  href={`/services/${s.slug}`}
                  data-reveal
                  data-reveal-delay={i * 60}
                  className="flex h-full flex-col gap-3 p-7"
                >
                  <span className="font-mono text-xs text-link">{s.group}</span>
                  <h3 className="text-lg font-semibold text-text">{s.title}</h3>
                  <p className="text-base text-text-2">{s.short}</p>
                </Link>
              </Card>
            ))}
        </ul>
      </Section>

      <Section ground={nextGround()}>
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7" data-reveal>
            <h2 className="text-3xl font-bold text-text">Book a private AI assessment.</h2>
            <p className="mt-5 max-w-measure text-md text-muted">
              Tell us what you need to run privately, where the data lives and which rules apply.
              An engineer answers, under NDA if you need one first.
            </p>
          </div>
          <div className="lg:col-span-5">
            <Button href={PRIMARY_CTA.href} size="lg" className="w-full sm:w-auto">
              {PRIMARY_CTA.label}
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
