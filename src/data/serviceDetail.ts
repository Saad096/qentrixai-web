/**
 * Page-length copy for /services/[slug].
 *
 * The capability pages rendered about 95 words each: a description, three
 * outcomes, five build bullets and a row of tool chips. That is a spec
 * sheet, not a page, and twenty of them read as one spec sheet printed
 * twenty times.
 *
 * Four fields, in the order a buyer actually reads:
 *
 *   problem  -- what goes wrong without this, in their words not ours
 *   signals  -- how they know this is the page they wanted
 *   stages   -- what the work is, in sequence
 *   faqs     -- the two questions that always come up, answered here
 *
 * `problem` is about the reader's situation and never about us. A
 * capability page that opens with what we offer is a brochure; one that
 * opens by describing the failure the reader is living with is worth the
 * scroll.
 *
 * Sovereign AI is absent on purpose -- it has its own hand-built page at
 * /services/sovereign-ai, which supersedes this template.
 *
 * Nothing here states a client result. Figures belong on case studies,
 * where they can be attributed.
 */
export type ServiceDetail = {
  problem: string;
  signals: string[];
  stages: { title: string; body: string }[];
  faqs: { question: string; answer: string }[];
};

export const serviceDetail: Record<string, ServiceDetail> = {
  "generative-ai": {
    problem:
      "A wrapper around a chat API demos beautifully and then meets real inputs. The failure is rarely the model: it is that nobody defined what a correct answer looks like, so there is no way to tell whether a prompt change made things better or worse. Six weeks later the team is tuning by vibes and nobody will sign off on a release.",
    signals: [
      "The prototype works and nobody can say by how much",
      "Prompt changes fix one case and quietly break two others",
      "Token spend is a single line on a monthly invoice",
    ],
    stages: [
      {
        title: "Define correct before building",
        body: "An eval set drawn from your real inputs, with the failure modes that actually matter labelled. This is the artifact the rest of the work is measured against, and it is yours.",
      },
      {
        title: "Build the system around the model",
        body: "Structured output, retrieval where the model needs grounding, and a fallback path for the cases it should refuse. The model is one component, not the architecture.",
      },
      {
        title: "Ship it with the instruments attached",
        body: "Tracing on every call, cost attributed per route, and the eval suite running in your CI so a regression fails the build rather than the user.",
      },
    ],
    faqs: [
      {
        question: "Which model do you use?",
        answer:
          "Whichever one clears your accuracy bar at the lowest cost, decided by the eval set rather than by preference. Model access sits behind an interface, so changing it later is configuration rather than a rewrite.",
      },
      {
        question: "Can this run on our own infrastructure?",
        answer:
          "Yes. Open-weight models served on your hardware or in your VPC, which is a separate capability in its own right -- see sovereign AI for how that is built.",
      },
    ],
  },

  "agentic-ai": {
    problem:
      "An agent that can call tools can also call them wrongly, in a loop, at three in the morning. Most agent projects stall at the same point: the happy path works, and there is no answer for what happens when a step fails, when the model picks the wrong tool, or when someone needs to know afterwards what it did and why.",
    signals: [
      "A multi-step process where each step is simple and the sequence is not",
      "Work that already has a runbook a human follows",
      "A prototype agent that nobody will let near production data",
    ],
    stages: [
      {
        title: "Draw the graph before the prompt",
        body: "Explicit state, explicit transitions, and the boundary between what the model decides and what code decides. Most of a reliable agent is not model-driven at all.",
      },
      {
        title: "Give every tool a contract",
        body: "Typed inputs and outputs, idempotency where a retry could double-charge something, and a permission scope per tool rather than one key that opens everything.",
      },
      {
        title: "Make the run inspectable",
        body: "A trace per run showing every decision, tool call and result, plus a replay path. When it does something surprising, you read the trace instead of guessing.",
      },
    ],
    faqs: [
      {
        question: "How do you stop it looping or running up a bill?",
        answer:
          "Step budgets, a cost ceiling per run, and a supervisor that ends the run rather than letting it retry indefinitely. Both are enforced in code, not asked for in a prompt.",
      },
      {
        question: "Where does a human sit in this?",
        answer:
          "At the actions with consequences. Reversible steps run unattended; anything that spends money, contacts a customer or changes a record of account waits for approval, and the approval is logged.",
      },
    ],
  },

  "rag-enterprise-search": {
    problem:
      "Retrieval systems fail quietly. The answer looks plausible, the source it cites is the wrong document, and nobody notices until a decision has been made on it. The usual cause is that the system was evaluated on whether it produced fluent text rather than on whether it retrieved the right passage.",
    signals: [
      "Knowledge spread across a wiki, a drive and six years of PDFs",
      "An existing search tool that people have stopped using",
      "Answers that need a citation someone can open and check",
    ],
    stages: [
      {
        title: "Fix the ingestion first",
        body: "Chunking that respects document structure, metadata that survives the pipeline, and a handling path for the scans and tables that break naive extraction. Most retrieval quality is decided here.",
      },
      {
        title: "Hybrid retrieval, then rerank",
        body: "Dense and keyword search together, because each fails on cases the other handles, with a reranker on top. Measured against a labelled question set, not judged by reading a few answers.",
      },
      {
        title: "Cite, scope and measure",
        body: "Every answer carries its passage. Retrieval is scoped to the identity asking. Recall and answer accuracy run as a suite on every change.",
      },
    ],
    faqs: [
      {
        question: "How do you know retrieval is actually working?",
        answer:
          "A question set built from your documents with the correct passages labelled, run on every change. It reports retrieval recall separately from answer quality, because a fluent answer over the wrong passage is the failure mode that matters.",
      },
      {
        question: "What about permissions?",
        answer:
          "Filtering happens at retrieval, against your identity provider, so a passage the asker cannot open never reaches the model. Filtering the answer afterwards is not the same thing and does not hold up.",
      },
    ],
  },

  "voice-ai": {
    problem:
      "Voice is the one interface where latency is the product. A pause that would be invisible in chat reads as a broken system on a phone call, and a model that cannot be interrupted feels like an IVR with a larger vocabulary. Most voice projects fail on the turn-taking, not on the transcription.",
    signals: [
      "A phone queue where most calls are a handful of intents",
      "An IVR tree customers press zero to escape",
      "Screening or intake calls that follow a script a person reads",
    ],
    stages: [
      {
        title: "Budget the latency end to end",
        body: "Speech in, model, speech out, each with a target. Streaming throughout, because anything that waits for a complete utterance has already lost the budget.",
      },
      {
        title: "Handle interruption as a first-class case",
        body: "Barge-in, partial transcripts and recovery when the caller talks over the agent. This is most of what makes a voice agent feel like a conversation.",
      },
      {
        title: "Design the handoff, not just the deflection",
        body: "A confidence threshold that transfers to a human and carries the transcript and the intent with it, so the caller does not repeat themselves.",
      },
    ],
    faqs: [
      {
        question: "What latency is achievable?",
        answer:
          "It depends on the model, the hosting and the telephony path, so we measure it on your setup during the design phase and give you the number rather than quoting someone else's benchmark.",
      },
      {
        question: "Does it integrate with our telephony?",
        answer:
          "Typically through Twilio or SIP into whatever you run today. The agent is a participant on the call, not a replacement for the stack around it.",
      },
    ],
  },

  "computer-vision": {
    problem:
      "A vision model that scores well on a public benchmark can be useless on your cameras, because your cameras have your lighting, your angles and your occlusion. The gap between benchmark accuracy and site accuracy is where most of these projects are lost, and it is only visible if you measure on footage from the actual deployment.",
    signals: [
      "Cameras already installed and generating footage nobody watches",
      "Manual inspection or counting that a person does by eye",
      "A requirement that video not leave the site",
    ],
    stages: [
      {
        title: "Measure on your footage",
        body: "A labelled set from the real cameras, in the real conditions, including night, glare and the awkward angle. Accuracy claims mean nothing anywhere else.",
      },
      {
        title: "Optimise for the hardware it will run on",
        body: "Quantisation and compilation targeted at the device, with the quality cost measured rather than assumed. A model that needs a datacentre GPU is not deployable to a factory line.",
      },
      {
        title: "Build for the failure case",
        body: "What happens when the camera is knocked, the lens fogs or the stream drops. Detection of the degraded state matters as much as detection of the object.",
      },
    ],
    faqs: [
      {
        question: "Does the video have to leave the site?",
        answer:
          "No. Edge deployment runs the model on the device or on a local box, sending events rather than footage. For biometric work that is the only architecture we recommend.",
      },
      {
        question: "How many streams can one device handle?",
        answer:
          "It depends on resolution, frame rate and the model size, so it is sized against your actual streams during design. Quantisation usually moves the answer up.",
      },
    ],
  },

  "nlp-document-ai": {
    problem:
      "Document extraction is usually reported as one accuracy number, and that number hides everything. A 96% average across twenty fields can mean nineteen fields are perfect and one is coin-flip, and it is always the one that matters. Meanwhile the documents that make up the volume are the scans, the photographs and the forms filled in by hand.",
    signals: [
      "A team keying values from PDFs into another system",
      "Invoices, contracts or forms arriving in formats you do not control",
      "An existing OCR tool that handles the clean documents only",
    ],
    stages: [
      {
        title: "Score every field separately",
        body: "Per-field accuracy and per-field confidence, so the one that fails is visible on day one rather than after an audit.",
      },
      {
        title: "Route the uncertain to a human",
        body: "Low-confidence values go to review instead of downstream. The system's job is to make a reviewer faster, and the review queue is part of the design, not an admission of failure.",
      },
      {
        title: "Ship the eval corpus with it",
        body: "Your own labelled documents in your CI, so a model or prompt change that drops a field fails the build.",
      },
    ],
    faqs: [
      {
        question: "Can it handle scans and photographs?",
        answer:
          "Yes, and those are usually the volume rather than the exception. The pipeline treats layout as a variable rather than an assumption, and the eval corpus includes the bad inputs deliberately.",
      },
      {
        question: "What accuracy can we expect?",
        answer:
          "Not quotable in advance honestly, because it depends on your documents. We measure against a labelled sample of your own paperwork during the design phase and tell you the per-field number before you commit to the build.",
      },
    ],
  },

  "ai-mvp-development": {
    problem:
      "Most AI MVPs are prototypes with a deployment URL. They have no tests, no tracing, no rollback and no cost ceiling, which means the first real user is also the first load test. The point of a six-week MVP is not to build less; it is to build the smallest thing that can survive contact with production.",
    signals: [
      "A funding milestone or a board demo with a date on it",
      "An idea that needs to be proven with real users, not a deck",
      "A team who will have to own the code afterwards",
    ],
    stages: [
      {
        title: "Weeks 1 and 2: framing and architecture",
        body: "The success metric agreed in writing, the data audited, the architecture chosen and the rejected options recorded. Scope is cut here, where cutting is cheap.",
      },
      {
        title: "Weeks 3 and 4: build against the metric",
        body: "Weekly demos on real data. Typed code, clean repo, evaluation harness for prompts and agents from the first week rather than the last.",
      },
      {
        title: "Weeks 5 and 6: make it production",
        body: "Docker, CI/CD, monitoring, secrets, cost ceilings and the runbook. You end with something deployed and a team who can deploy it again.",
      },
    ],
    faqs: [
      {
        question: "What is not in a six-week MVP?",
        answer:
          "Breadth. One workflow done properly rather than four done partially. Admin tooling, second integrations and edge-case coverage are the things we cut first, and we say which in week one.",
      },
      {
        question: "What do we have at the end?",
        answer:
          "A deployed system, the repo, the eval suite running in your CI, the architecture decision record and a runbook. Everything is yours and none of it requires us to keep running.",
      },
    ],
  },

  "ai-saas-and-mobile": {
    problem:
      "The model is usually the part that works. What sinks an AI product is everything around it: auth, billing, quotas, the streaming UI that has to stay responsive while a response is generated, and the mobile client that has to behave when the network is bad. That is ordinary product engineering, and it is most of the build.",
    signals: [
      "A working model and no product around it",
      "A SaaS or mobile app that needs AI as a feature, not as the pitch",
      "Usage-based pricing that has to be metered accurately",
    ],
    stages: [
      {
        title: "Product surface first",
        body: "Auth, tenancy, roles, billing and quotas. These decide the data model, and retrofitting tenancy into a product that shipped without it is a rewrite.",
      },
      {
        title: "Streaming as a UI problem",
        body: "Token streaming, optimistic states, cancellation and a sensible failure message. A response that takes eight seconds is fine if the interface is honest about it.",
      },
      {
        title: "Mobile that survives a bad network",
        body: "Offline states, retry, and background work that does not assume a connection. Flutter or React Native depending on what your team can maintain.",
      },
    ],
    faqs: [
      {
        question: "Flutter or React Native?",
        answer:
          "Whichever your team can maintain after we leave. If there is no in-house mobile experience either way, we will recommend one and say why rather than defaulting to the one we prefer.",
      },
      {
        question: "Can you work in our existing codebase?",
        answer:
          "Yes, and it is usually better. We work in your repo, your review process and your CI, and we are explicit about which parts your team should own from the first week.",
      },
    ],
  },

  "inference-engineering": {
    problem:
      "Past a certain volume the API bill overtakes the cost of running the model yourself, and most teams find out from an invoice rather than from a dashboard. The bill is also usually reported in aggregate, which hides the fact that one route with a large model is carrying a cost the traffic never justified.",
    signals: [
      "A token bill growing faster than usage",
      "P99 latency that nobody can explain",
      "One large model serving every request regardless of difficulty",
    ],
    stages: [
      {
        title: "Measure before optimising",
        body: "Throughput, p50 and p99, and cost per thousand requests, attributed per route. Optimising without this is guesswork that occasionally works.",
      },
      {
        title: "Serve it properly",
        body: "Continuous batching, KV-cache reuse and speculative decoding where the traffic shape supports it. Quantisation behind a quality gate on the eval suite, so a cheaper model that got worse does not ship.",
      },
      {
        title: "Route by difficulty",
        body: "A small model takes the requests that do not need a large one, escalating on a measured trigger. This is usually the single largest saving and the easiest one to get wrong.",
      },
    ],
    faqs: [
      {
        question: "At what volume does self-hosting pay?",
        answer:
          "It depends on your traffic shape, your latency target and what hardware you can get. We model the crossover during the design phase with your numbers, and sometimes the answer is that you are not there yet.",
      },
      {
        question: "Does quantisation hurt quality?",
        answer:
          "Sometimes, which is why it goes through a quality gate. The eval suite runs before and after, and if the drop is outside the agreed tolerance the quantised model does not ship.",
      },
    ],
  },

  "managed-ai-services": {
    problem:
      "AI systems degrade in ways ordinary software does not. The code is unchanged, the traffic looks normal, and the answers have quietly got worse because the underlying data moved. Without drift detection and an eval suite running on a schedule, the first signal is a complaint.",
    signals: [
      "A system live for months with nobody watching its quality",
      "No in-house MLOps capacity and no plan to hire it",
      "A model provider deprecating a version you depend on",
    ],
    stages: [
      {
        title: "Instrument what is already running",
        body: "Tracing, cost attribution and quality metrics on the live system, plus alerting with thresholds that mean something rather than defaults.",
      },
      {
        title: "Run the evals on a schedule",
        body: "The suite runs against production traffic samples, not only in CI, so drift is caught by a report rather than by a user.",
      },
      {
        title: "Own the on-call path",
        body: "A runbook, a rollback that has been tested, and a named response window. The point is that a bad deploy is reversible in minutes.",
      },
    ],
    faqs: [
      {
        question: "Do you have to have built it?",
        answer:
          "No. We take over systems we did not write, and the first two weeks are usually instrumentation and a written assessment of what is fragile.",
      },
      {
        question: "Can we take it back in-house later?",
        answer:
          "That is the intended outcome. Everything runs in your accounts under your keys, the runbook is yours, and the handover is a scheduled piece of work rather than a negotiation.",
      },
    ],
  },

  "edge-ai": {
    problem:
      "Cloud inference assumes a connection, a round trip and a per-request cost. On a factory line, a camera or a phone, at least one of those assumptions is wrong. Edge work is mostly about making a model small enough and robust enough to run where the data is, without pretending the quality cost is zero.",
    signals: [
      "Data that must not leave the device or the site",
      "A latency requirement a round trip cannot meet",
      "Sites that lose connectivity and still have to work",
    ],
    stages: [
      {
        title: "Size the model to the hardware",
        body: "Quantisation, pruning and compilation targeted at the actual device, with the accuracy cost measured against your own data rather than a published figure.",
      },
      {
        title: "Design offline-first",
        body: "Local decisions, queued events and reconciliation when the link returns. A dropped connection should degrade nothing the operator can see.",
      },
      {
        title: "Solve updates before launch",
        body: "Signed over-the-air model updates with a rollback, because a fleet you cannot update is a fleet frozen at version one.",
      },
    ],
    faqs: [
      {
        question: "Which hardware do you target?",
        answer:
          "Commonly NVIDIA Jetson for vision, plus phones and ordinary on-prem boxes. The target is chosen against your latency, stream count and budget rather than assumed up front.",
      },
      {
        question: "How much accuracy does quantisation cost?",
        answer:
          "Measurable and usually small, but it is measured rather than assumed, on your data, and the result is a number you see before committing to the hardware.",
      },
    ],
  },

  "cloud-devops-mlops": {
    problem:
      "A model in a notebook and a model in production are different artifacts with different failure modes. The gap is usually filled at the last minute by one person who knows how the deploy works, which is a single point of failure disguised as a capability.",
    signals: [
      "A deploy only one person can do",
      "No rollback path anyone has tested",
      "Model versions tracked in a spreadsheet or in someone's memory",
    ],
    stages: [
      {
        title: "Containerise and version everything",
        body: "Model, dependencies and config as one reproducible artifact. Reproducibility is what makes rollback possible.",
      },
      {
        title: "Wire the pipeline",
        body: "CI that runs the eval suite, CD that can deploy and revert, secrets managed properly, and infrastructure described in code rather than in a wiki.",
      },
      {
        title: "Make failure visible",
        body: "Tracing, dashboards, alerting on the metrics that matter, and a runbook that someone other than the author can follow at 2am.",
      },
    ],
    faqs: [
      {
        question: "Which cloud?",
        answer:
          "AWS, GCP or Azure, plus on-prem and private VPC. Everything is Dockerised, so the target is a deployment decision rather than an architectural one.",
      },
      {
        question: "Can you work with our platform team?",
        answer:
          "Yes, and it is the better outcome. We follow your conventions rather than importing ours, and we are explicit about what your team should own from the start.",
      },
    ],
  },

  "model-training": {
    problem:
      "Fine-tuning gets reached for too early. Most of the time the problem is retrieval, prompting or data quality, and a fine-tune on top of those makes a bad system expensive as well as bad. When training is the right answer it is because you need a behaviour or a domain a general model does not have, and that case is worth doing properly.",
    signals: [
      "A domain vocabulary general models consistently get wrong",
      "A latency or cost target a large model cannot meet",
      "Labelled data you already own and are not using",
    ],
    stages: [
      {
        title: "Decide whether to train at all",
        body: "Baselines with retrieval and prompting first. If those clear the bar, we say so and the training work does not happen.",
      },
      {
        title: "Build the dataset honestly",
        body: "Splits that do not leak, labels checked rather than assumed, and a held-out set that stays held out. Most training failures are dataset failures.",
      },
      {
        title: "Train, evaluate, and keep the artifacts",
        body: "Fine-tuning or adapters against a measured baseline, with the weights, the dataset and the training config handed over as yours.",
      },
    ],
    faqs: [
      {
        question: "Who owns the resulting model?",
        answer:
          "You do, including the weights, the dataset and anything derived from your data. We keep no licence to reuse them.",
      },
      {
        question: "How much data do we need?",
        answer:
          "Less than most people expect for adapters, more than most expect for full fine-tuning, and the honest answer depends on the task. We size it against a baseline rather than quoting a rule of thumb.",
      },
    ],
  },

  "data-science-ml": {
    problem:
      "Not every prediction problem needs a language model, and a lot of them are actively worse with one. Forecasting, churn, anomaly detection and scoring are classical problems with decades of well-understood methods, and reaching for an LLM makes them slower, more expensive and harder to explain.",
    signals: [
      "A forecasting or scoring problem currently done in spreadsheets",
      "A requirement to explain why a prediction was made",
      "Tabular or time-series data rather than text",
    ],
    stages: [
      {
        title: "Establish a baseline worth beating",
        body: "The naive forecast, the current spreadsheet, the existing rule. A model that does not beat the baseline is a finding, and we report it.",
      },
      {
        title: "Model with the simplest thing that works",
        body: "Gradient boosting before deep learning, and interpretable before opaque, because a model someone has to defend in a meeting needs to be defensible.",
      },
      {
        title: "Monitor for drift",
        body: "Data distributions move. The system reports when the inputs stop looking like the training set, rather than silently getting worse.",
      },
    ],
    faqs: [
      {
        question: "Why not just use an LLM?",
        answer:
          "On tabular and time-series problems a gradient-boosted model is usually more accurate, far cheaper and explainable. We use the right tool and will tell you when the fashionable one is wrong.",
      },
      {
        question: "Can you explain the predictions?",
        answer:
          "Yes, with feature attributions per prediction, which matters when a decision affects a customer and has to be justified.",
      },
    ],
  },

  "responsible-ai": {
    problem:
      "Safety and evaluation get treated as a pre-launch checklist, which is the one time they are least useful. A system that was fair and accurate at launch drifts, and without ongoing measurement the first evidence is an incident. The work is building the measurement in, not writing a policy document about it.",
    signals: [
      "A procurement or compliance review asking for evidence",
      "A model making decisions that affect people",
      "No current way to answer why did it do that",
    ],
    stages: [
      {
        title: "Define the harms specifically",
        body: "Not a generic policy. Which failure, for which group, at which point in the system, and what the acceptable rate is.",
      },
      {
        title: "Measure them continuously",
        body: "Bias and safety checks in the eval suite alongside accuracy, running in CI and on production samples rather than once before launch.",
      },
      {
        title: "Produce the evidence",
        body: "Model cards, decision traces and audit logs that answer a reviewer's question with a query rather than a reconstruction.",
      },
    ],
    faqs: [
      {
        question: "Does this map to the EU AI Act?",
        answer:
          "The documentation and logging we produce are built to answer that class of question, and we map obligations to your specific use case during design rather than claiming blanket compliance.",
      },
      {
        question: "Is this a separate engagement?",
        answer:
          "It can be, but it is better built in. Retrofitting evaluation into a system that shipped without it usually means rebuilding the parts that made it unmeasurable.",
      },
    ],
  },

  "hire-ai-engineers": {
    problem:
      "Hiring senior AI engineers takes months and the market is thin, so teams either wait or hire someone who interviews well on model theory and has never taken a system to production. Augmentation solves the timing problem, but only if the people arriving actually transfer what they know instead of building something nobody else can maintain.",
    signals: [
      "A roadmap blocked on capacity rather than on clarity",
      "An open senior role that has been open for a quarter",
      "A team who can build the product but not the AI layer",
    ],
    stages: [
      {
        title: "Scope the gap, not the headcount",
        body: "What the work actually needs. Sometimes that is one senior engineer for eight weeks rather than a pod for six months, and we will say so.",
      },
      {
        title: "Work in your process",
        body: "Your repo, your review, your CI, your standups. Engineers who operate as a separate team produce a codebase your team inherits rather than owns.",
      },
      {
        title: "Transfer as you go",
        body: "Pairing, written decisions and an explicit list of what your team owns from week one. The engagement should be shorter than you expect.",
      },
    ],
    faqs: [
      {
        question: "How senior is senior?",
        answer:
          "People who have operated AI systems in production, not only built them. There is no junior bench: the people who scope the work are the people who do it.",
      },
      {
        question: "What happens when the engagement ends?",
        answer:
          "Your team keeps the code, the decisions and the runbook. If knowledge transfer did not happen, the engagement failed regardless of what shipped.",
      },
    ],
  },

  "aeo-and-geo": {
    problem:
      "A growing share of buyers now get an answer from an assistant rather than a results page, and never see the site that supplied it. Being the source that gets cited is a different problem from ranking: it depends on whether your content is structured, attributable and specific enough for a model to quote with confidence.",
    signals: [
      "Traffic falling while brand searches hold steady",
      "Competitors named in assistant answers and you are not",
      "Content written for keyword density rather than for a question",
    ],
    stages: [
      {
        title: "Find out what is said about you now",
        body: "What the assistants actually answer for your category and your name, recorded as a baseline rather than assumed.",
      },
      {
        title: "Make the content quotable",
        body: "Question-shaped headings, specific and checkable claims, structured data, and a clear entity for the organisation. Vague copy does not get cited because it cannot be.",
      },
      {
        title: "Measure citation, not position",
        body: "Tracking whether you appear in answers over time. Rank is the wrong metric for a surface that has no ranks.",
      },
    ],
    faqs: [
      {
        question: "Is this just SEO with a new name?",
        answer:
          "It overlaps and it is not the same. Ranking rewards coverage; citation rewards specificity and structure. A page that ranks well can be entirely unquotable.",
      },
      {
        question: "Can you guarantee we get cited?",
        answer:
          "No, and nobody honestly can. What is controllable is whether your content is structured, specific and attributable enough to be a good source, and whether you are measuring it.",
      },
    ],
  },

  "blockchain-web3": {
    problem:
      "Most things described as needing a blockchain need a database and an audit log. When a chain genuinely is the right answer -- shared state between parties who do not trust each other -- the engineering bar is unusually high, because the bugs are public, permanent and directly monetisable.",
    signals: [
      "Multiple parties who need one record and do not trust one operator",
      "An existing contract that has never been audited",
      "A token or settlement flow with real value moving through it",
    ],
    stages: [
      {
        title: "Challenge the premise first",
        body: "If a database and a signed audit log solve it, we will say so before taking the work. That conversation is cheaper than the alternative.",
      },
      {
        title: "Write contracts to be reviewed",
        body: "Small, readable, tested to the edge cases, with the upgrade path and the failure path designed rather than discovered.",
      },
      {
        title: "Test like the bugs are permanent",
        body: "Property-based tests, fork testing against mainnet state, and an external audit before anything holds value.",
      },
    ],
    faqs: [
      {
        question: "Do we actually need a blockchain?",
        answer:
          "Usually not, and we would rather tell you in the first call than after the build. The cases where the answer is yes are real but narrower than the market suggests.",
      },
      {
        question: "Do you audit existing contracts?",
        answer:
          "We review them and we are clear about the limits of a review. Anything holding significant value should also go through a dedicated audit firm, and we will say when that line is crossed.",
      },
    ],
  },

  "no-code-automation": {
    problem:
      "There is a layer of work that is too small for a project and too repetitive to keep doing by hand: the handoff between two systems, the weekly report, the ticket that always gets routed the same way. Building custom software for it is disproportionate, and leaving it manual is a tax nobody measures.",
    signals: [
      "A process documented in a shared doc that a person follows weekly",
      "Two systems someone copies data between",
      "Requests too small to reach the engineering backlog",
    ],
    stages: [
      {
        title: "Map what actually happens",
        body: "Not the documented process, the real one, including the exceptions people handle silently. That is usually where the value is.",
      },
      {
        title: "Automate the deterministic parts",
        body: "Workflow tooling for the steps that are rules, with a model only where judgement is genuinely required. Most of this work needs no model at all.",
      },
      {
        title: "Make it visible when it breaks",
        body: "Alerting and a manual fallback, because a silent automation failure is worse than the manual process it replaced.",
      },
    ],
    faqs: [
      {
        question: "Will this need rebuilding later?",
        answer:
          "Some of it, and that is fine. The point is to find out what the process should be before committing engineering time to it. We flag which parts are disposable when we build them.",
      },
      {
        question: "Which tools?",
        answer:
          "Whatever your team already administers, where possible. Introducing a new platform for one workflow is how organisations end up with six of them.",
      },
    ],
  },

  "ai-strategy-consulting": {
    problem:
      "The expensive mistake is not picking the wrong model, it is spending two quarters building the wrong thing. That usually happens because the problem was never framed in terms of a measurable outcome, so there was no point at which anyone could say this is not working.",
    signals: [
      "A mandate to do something with AI and no specific problem",
      "Several candidate projects and no way to compare them",
      "A previous AI project that quietly stopped",
    ],
    stages: [
      {
        title: "Frame the problem in numbers",
        body: "What would have to change, by how much, for this to be worth doing. If that cannot be written down, that is the finding.",
      },
      {
        title: "Audit the data and the constraints",
        body: "What exists, what is usable, where it may be processed and what that rules out. This is where most roadmaps get shorter and more realistic.",
      },
      {
        title: "Sequence by evidence",
        body: "A roadmap ordered so the cheapest thing that could invalidate the plan happens first, with the rejected options recorded and why.",
      },
    ],
    faqs: [
      {
        question: "Do we have to build with you afterwards?",
        answer:
          "No. The output is a document you own and can hand to anyone, including your own team or another firm. A strategy sprint that only works if we do the build is a sales process.",
      },
      {
        question: "How long does it take?",
        answer:
          "Usually two to three weeks. Longer than that and it is a project rather than a decision, which means the framing question was not the blocker.",
      },
    ],
  },
};
