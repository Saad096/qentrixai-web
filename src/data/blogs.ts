export type Blog = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  date: string;
  readingTime: string;
  cover: string;
  author: string;
  content: string[];
};

export const blogs: Blog[] = [
  {
    slug: "jev-typed-decisions-not-text",
    title: "Jev, and the case for models that do not talk",
    category: "Inference",
    excerpt:
      "TypeSafe AI shipped a model that cannot write a sentence. It returns a typed value and a calibrated confidence, in 70 to 500ms. Here is where that belongs in a production system, and where it does not.",
    date: "2026-09-22",
    readingTime: "7 min read",
    cover: "/images/insights/jev-typed-decisions-not-text.webp",
    author: "Saad Alam",
    content: [
      "TypeSafe AI released Jev on 15 September and dropped the waitlist five days later. It is a transformer that does not generate text. You hand it unstructured input plus a schema you defined in advance, and it hands back a typed value with a calibrated confidence score. It cannot write an article, generate code, or explain itself.",
      "That sounds like a limitation until you count how much of a production system is not a conversation. Three primitives cover most of it. Choice picks one option from up to 255. Score rates against ordered levels. Noul returns a probability between zero and one. Every answer carries a confidence derived from the shape of the probability distribution, which is the part that matters.",
      "The numbers TypeSafe publishes are 70 to 500ms end to end, $42 per billion input tokens, and output tokens free. They claim 193.6 times faster and 444.6 times cheaper than GPT-5.6 Terra on their own benchmarks. Treat a vendor benchmark as a hypothesis, not a result. The shape of the claim is credible though: a model that emits one typed value instead of a paragraph is not doing the expensive part of generation.",
      "Here is why we care. Most of the retrieval and agent systems we run do not fail because the prose was poor. They fail at a decision. Is this ticket about billing. Is this command safe to execute. Does this passage answer the question. Should this call go to a human. Each is a classification with a confidence threshold behind it. Today each is answered by asking a large language model to write the word yes, then parsing it.",
      "Parsing a model's prose to recover a decision is the weakest joint in most AI systems we are asked to fix. The model says Yes, definitely, though it depends on the account tier and the code takes the first three characters. A typed return removes that joint. So does a calibrated confidence: escalation stops being a regex over hedging language and becomes a number you can threshold and tune.",
      "The catch, and it is a real one, is deployment. Jev is an early-access API with no open weights and no self-hosting. For a client with residency obligations, or one running air-gapped, that rules it out no matter how fast it is. This is the trade we spend most of our time on. The cheapest token is the one you never send. The cheapest token you cannot send at all is worth nothing.",
      "Where we would reach for it today: high-volume routing and triage in a system that already calls hosted APIs, where a user feels the latency and the decision is small and well specified. Where we would not: inside a boundary that cannot make outbound calls, or anywhere the decision has to be explained to a regulator rather than merely logged.",
      "The broader point outlives this particular model. Classification, scoring, routing and extraction are decisions, not essays, and the industry has spent three years paying generation prices for them. Whether Jev is the model that wins is a separate question from whether that pattern is correct. It is correct. We are already sizing small typed models against the large ones in client systems, and the gap is not close on the decisions that do not need prose.",
      "If you are running a large model for something that could return an enum, that is worth measuring before your next invoice. We do that as part of inference engineering, and it is usually the largest single saving on the list.",
    ],
  },
  {
    slug: "mcp-how-agents-reach-your-systems",
    title: "MCP is now how agents reach your systems",
    category: "MCP",
    excerpt:
      "The Model Context Protocol went from Anthropic side project to Linux Foundation standard with over 10,000 public servers. What the new stateless spec and enterprise auth mean for your stack.",
    date: "2026-07-15",
    readingTime: "8 min read",
    cover: "/images/insights/mcp-how-agents-reach-your-systems.webp",
    author: "Saad Alam",
    content: [
      "In December 2025 Anthropic donated MCP to the Agentic AI Foundation under the Linux Foundation, and adoption followed fast. There are now more than 10,000 public MCP servers, the SDKs see close to 100 million downloads a month, and around 4 in 10 software organisations report MCP servers in production.",
      "The July 2026 specification is the one that matters for enterprises. The protocol core is now stateless, so gateways, load balancers and rate limiters can route MCP traffic like any other API traffic. Tasks, Extensions and a formal deprecation policy landed alongside it.",
      "Enterprise-Managed Authorization is the sleeper feature. Access to MCP servers now flows through your identity provider, the same way SSO gates your SaaS. Asana, Atlassian, Linear, Figma and Supabase already support it.",
      "Our advice to clients: treat every MCP server you expose as production API surface. That means authentication through your IdP, a tool-safety review before anything ships, and the same observability you would demand from a public endpoint. We wire MCP servers into client stacks with exactly that posture.",
    ],
  },
  {
    slug: "context-engineering-beat-prompting",
    title: "Context engineering beat prompt engineering",
    category: "Agentic AI",
    excerpt:
      "The defining AI skill of 2026 is not writing clever prompts. It is architecting what the model sees: memory, retrieval, tools, and state, delivered at the right moment.",
    date: "2026-07-02",
    readingTime: "7 min read",
    cover: "/images/insights/context-engineering-beat-prompting.webp",
    author: "Saad Alam",
    content: [
      "Prompt engineering optimised a single message. Context engineering architects the entire information environment an agent operates in: what it remembers, what it retrieves, which tools it sees, and what state it carries between steps.",
      "The practical levers are unglamorous. Compress aggressively so long sessions do not drown the model in stale history. Scope tool lists per task instead of exposing everything. Separate durable memory from working context, and be deliberate about what earns a place in each.",
      "The harness now matters as much as the model. Permissions, evaluation, persistent state and continuous improvement live outside the model call, and that surrounding system is where production agents win or lose.",
      "A test we apply on every engagement: take a failing agent transcript and ask what the model could actually see at the failing step. In most cases the model was fine and the context was wrong. Fix the information diet before reaching for a bigger model.",
    ],
  },
  {
    slug: "computer-use-agents-narrow-work",
    title: "Computer-use agents are ready for narrow work",
    category: "Agentic AI",
    excerpt:
      "Agents that drive a real screen now clear 85 percent on OS-level benchmarks. That is good enough for the ugly middle of enterprise work, if you scope them honestly.",
    date: "2026-06-18",
    readingTime: "6 min read",
    cover: "",
    author: "Saad Alam",
    content: [
      "Computer-use agents click, type and read screens the way a person does. The leading platforms now score above 85 percent on OSWorld-style benchmarks, up from roughly half that two years ago.",
      "The honest use case is the ugly middle of enterprise work: legacy desktop tools, portals without APIs, and vendor systems you will never be allowed to integrate with properly. If an API exists, use the API. The screen is the integration of last resort, and it is finally a workable one.",
      "Scope is everything. A computer-use agent doing one rehearsed workflow with a defined start, a defined finish and a human checkpoint before anything irreversible is a dependable worker. The same agent given a vague goal and an open desktop is an incident report.",
      "We deploy them the way we deploy any agent: recorded runs, evals on task completion, and containment metrics from day one. The screen recording becomes your trace. If you cannot replay why the agent clicked what it clicked, you are not ready to scale it.",
    ],
  },
  {
    slug: "production-ready-ai-not-demos",
    title: "Why Businesses Need Production-Ready AI, Not Just Demos",
    category: "AI Strategy",
    excerpt:
      "A polished demo means almost nothing. A production AI system means architecture, eval, observability, and a rollback path. Here's the difference, and why it matters for ROI.",
    date: "2026-04-22",
    readingTime: "7 min read",
    cover: "",
    author: "Saad Alam",
    content: [
      "Most failed AI projects don't fail because the model is bad. They fail because no one designed the path from a notebook to a service that survives Monday morning traffic.",
      "Production-ready means four things: a clean data path with monitoring, evaluation that runs on every change, observability that catches drift, and a rollback plan that is rehearsed, not theoretical.",
      "If your team can answer 'how do we know quality dropped 4% last week' in less than five minutes, you're production-ready. Otherwise you're shipping vibes.",
      "At QentrixAI we treat eval harnesses, Langfuse traces, and CI/CD as part of the deliverable, not an afterthought. The teams who succeed with AI invest in the boring layer before chasing the shiny one.",
    ],
  },
  {
    slug: "agentic-ai-business-automation",
    title: "How Agentic AI Is Quietly Rewiring Business Automation",
    category: "Agentic AI",
    excerpt:
      "Single-prompt chatbots are giving way to agents that take real actions across CRMs, helpdesks, and back-office tools. Where it works, where it doesn't, and how to design it safely.",
    date: "2026-04-08",
    readingTime: "9 min read",
    cover: "",
    author: "Saad Alam",
    content: [
      "A useful definition of an agent: a system that can plan, pick tools, take actions, observe results, and decide what to do next, repeatedly, with state.",
      "Where it works today: structured operational workflows with clear success signals. Lead routing, ticket triage, recruitment screening, expense categorisation.",
      "Where it still struggles: open-ended creative or strategic work without an authoritative truth source. Don't put an agent in charge of brand voice; put it in charge of work that has a right answer.",
      "Design principles we use at QentrixAI: typed tools, retries with backoff, human-in-the-loop checkpoints on irreversible actions, and end-to-end tracing on every run.",
    ],
  },
  {
    slug: "rag-enterprise-knowledge-search",
    title: "RAG for enterprise knowledge search: what actually works",
    category: "RAG",
    excerpt:
      "Vector databases are not magic. Real enterprise RAG needs hybrid retrieval, re-rankers, and a measurable eval suite. A field guide from real deployments.",
    date: "2026-03-26",
    readingTime: "8 min read",
    cover: "",
    author: "Saad Alam",
    content: [
      "If your RAG system can't answer 'how good is retrieval today vs last week' with numbers, you don't have a system, you have a pipeline.",
      "Hybrid search (BM25 + dense + re-rank) consistently outperforms pure vector search on enterprise content. The bias toward exact-token matching matters in legal, finance and engineering docs.",
      "Chunking is underrated. Naïve fixed-window chunking destroys semantic units. Use semantic chunking, retain heading context, and store paragraph + heading metadata.",
      "Build an eval set on day one. 100 question/answer/citation triples is enough to start. Every retrieval change ships with a regression report.",
    ],
  },
  {
    slug: "voice-ai-call-centers",
    title: "Voice AI for Call Centers and Customer Support",
    category: "Voice AI",
    excerpt:
      "Modern voice agents can handle real conversations on phone lines. The trick is sub-second latency, strict guardrails, and smart escalation.",
    date: "2026-03-12",
    readingTime: "6 min read",
    cover: "",
    author: "Saad Alam",
    content: [
      "The unlock for voice AI in 2026 was streaming ASR + streaming TTS + interruption handling. Without those three together, conversations feel robotic.",
      "Phone-line audio is messy: codec compression, packet loss, noise. Build for that: train and eval on phone-grade audio, not studio recordings.",
      "Escalation policy beats accuracy. A voice agent that confidently says 'let me transfer you to a human' is better than one that hallucinates with confidence.",
      "Measure containment rate (calls resolved without human transfer), CSAT, and per-call cost. AI should beat IVR on all three, not just one.",
    ],
  },
  {
    slug: "mlops-observability-llm-systems",
    title: "MLOps & Observability for LLM Systems",
    category: "MLOps",
    excerpt:
      "Traditional MLOps tooling under-serves LLM workloads. Langfuse, LangSmith and prompt-level evals are the new observability stack.",
    date: "2026-02-28",
    readingTime: "10 min read",
    cover: "",
    author: "Saad Alam",
    content: [
      "Classic MLOps assumed batch training and offline eval. LLM workloads are online, prompt-driven, and dependent on third-party model APIs.",
      "What changes: every prompt is a versioned artifact. Every tool call is an observable span. Every output gets an eval, automated where possible and human-graded where it matters.",
      "Build a token-cost dashboard early. The teams that get burned are the ones who discover token spend two weeks after going viral, not before.",
      "Pair LLM observability (Langfuse / LangSmith) with system observability (Grafana / Prometheus). Both stacks, side by side, is the configuration that holds up under real load.",
    ],
  },
  {
    slug: "build-ai-mvp-safely",
    title: "How to Build an AI MVP Safely and Efficiently",
    category: "Product",
    excerpt:
      "A 6–10 week recipe for going from idea to a deployable AI MVP without the usual sprawl, scope creep, and demo-only deliverables.",
    date: "2026-02-14",
    readingTime: "7 min read",
    cover: "",
    author: "Saad Alam",
    content: [
      "Week 1 is discovery: stakeholders, success metric, data audit, risk map. Skip this and you'll rebuild in week 6.",
      "Weeks 2-4 are vertical slices: end-to-end working features (UI + backend + model + deploy), one at a time. Avoid building the entire backend before any model integration.",
      "Weeks 5-6 are productionisation: Docker, CI/CD, monitoring, secrets, runbook. This is the work that converts a demo into a product.",
      "Always reserve the last week for handover: docs, runbook, eval suite, a recorded walkthrough. Founder-friendly handover is what makes a vendor worth a second project.",
    ],
  },
  {
    slug: "ai-product-roadmap-startups",
    title: "An AI Product Development Roadmap for Startups",
    category: "Strategy",
    excerpt:
      "Startups don't have time to play AI lab. Here's a pragmatic 6-month roadmap that balances learning, shipping, and not burning your runway.",
    date: "2026-01-30",
    readingTime: "8 min read",
    cover: "",
    author: "Saad Alam",
    content: [
      "Month 1: pick one painful workflow you understand cold. Build the dumbest possible AI solution for it. Ship it to 5 users.",
      "Month 2-3: instrument everything. Add an eval set. Tighten the loop between user behaviour and model behaviour.",
      "Month 4: pick the second feature only after the first one moves a real number. Resist the urge to ship features that demo well but don't measure.",
      "Month 5-6: harden, scale, hire. Move to multi-tenant infra, add SSO/security, write the runbook. By now you've earned the right to chase ambitious features.",
    ],
  },
  {
    slug: "edge-ai-when-cloud-isnt-enough",
    title: "Edge AI: when the cloud isn't fast or private enough",
    category: "Edge AI",
    excerpt:
      "Latency, privacy, and offline use-cases push models out of the cloud. A practical guide to quantization, on-device inference, and hybrid routing.",
    date: "2026-01-16",
    readingTime: "6 min read",
    cover: "",
    author: "Saad Alam",
    content: [
      "Edge AI isn't 'AI but slower'. It's a deployment topology where models run close to the data: phones, kiosks, cameras, factory floors, vehicles.",
      "Three reasons to choose edge: hard latency budgets (under 100ms), strict privacy/compliance, or expensive/unreliable connectivity.",
      "The stack is converging: ONNX Runtime, TensorRT, OpenVINO, Core ML, TFLite. Pick by device class, then optimize: quantize, prune, distill.",
      "Hybrid edge–cloud is the realistic shape: lightweight inference on-device, heavier reasoning offloaded to the cloud when network and policy allow.",
    ],
  },
];

export function getBlog(slug: string): Blog | undefined {
  return blogs.find((b) => b.slug === slug);
}
