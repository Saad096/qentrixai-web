/**
 * Page-length copy for /industries/[slug].
 *
 * Kept separate from industries.ts because that file feeds the homepage tab
 * strip and the footer, where only `name`, `line` and the photograph are
 * read. Loading three paragraphs of domain writing into those components to
 * render one sentence would be the wrong trade.
 *
 * The honesty rule from industries.ts carries over unchanged. Public sector
 * and Logistics have no published engagement, so their pages say what we
 * would build and say it in the first paragraph, not in a footnote. Every
 * other page's evidence section is generated from the `cases` and `products`
 * arrays, so a page cannot claim work that is not in the data.
 *
 * `pressures` is deliberately about the domain rather than about us: what
 * goes wrong in this work before any model is involved. A page that opens by
 * describing our capabilities is a brochure; one that opens by describing
 * the reader's week is worth reading.
 */
export type IndustryDetail = {
  /** Two or three sentences. Sets the constraint that shapes the work. */
  intro: string;
  /** What actually goes wrong in this domain. */
  pressures: { title: string; body: string }[];
  /** What we build against those pressures. */
  build: { title: string; body: string }[];
  /** Capability slugs from services.ts that this domain draws on most. */
  services: string[];
};

export const industryDetail: Record<string, IndustryDetail> = {
  "customer-operations": {
    intro:
      "Support and service teams are measured on two numbers that pull against each other: how fast a contact is resolved, and how often it is resolved correctly. Automation usually improves the first and quietly damages the second, because a model that cannot say it does not know will always say something. The systems we build here are shaped around the handoff rather than around the deflection rate.",
    pressures: [
      {
        title: "Volume arrives in spikes",
        body: "Headcount is sized for the average and the queue is set by the peak. The hour that hurts is the hour nobody is rostered for.",
      },
      {
        title: "Confidence is rarely measured",
        body: "Most deployed assistants have no calibrated sense of when they are wrong, so escalation gets triggered by the customer giving up rather than by the system noticing.",
      },
      {
        title: "Context lives in four systems",
        body: "The CRM, the ticketing tool, the knowledge base and billing each hold a piece. An answer assembled from one of them is usually wrong in a way that costs money.",
      },
    ],
    build: [
      {
        title: "Voice agents that hand off cleanly",
        body: "Streaming speech with barge-in, a confidence threshold, and a transfer that carries the transcript and the caller's intent so the human does not start from zero.",
      },
      {
        title: "Retrieval over the knowledge base",
        body: "Answers cite the article they came from, which is what lets a supervisor audit a week of conversations instead of spot-checking three.",
      },
      {
        title: "Agents for the back-office half",
        body: "The part after the call: updating records, raising the follow-up, routing the exception. Deterministic where it can be, model-driven only where it has to be.",
      },
    ],
    services: ["voice-ai", "agentic-ai", "rag-enterprise-search"],
  },

  healthcare: {
    intro:
      "Clinical software gets one shot at a two-minute window on a ward round. It has to answer from a source the clinician already trusts, show where the answer came from, and keep working when the hospital network does not. The regulatory constraints are not an afterthought here: they decide the architecture before a model is chosen.",
    pressures: [
      {
        title: "The data cannot leave",
        body: "Protected health information carries rules about where it is stored and who may process it. A hosted assistant is the wrong shape for it regardless of how the contract is worded.",
      },
      {
        title: "Wrong is worse than slow",
        body: "A confident answer with no source attached is a liability. Every response needs a citation a clinician can open in one tap.",
      },
      {
        title: "Connectivity is not a given",
        body: "Wards, theatres and field sites lose the network. A tool that stops answering at that moment stops being used at all.",
      },
    ],
    build: [
      {
        title: "Private clinical retrieval",
        body: "Guidelines, formularies and internal protocols indexed on your own hardware, answering with the passage and the page rather than a paraphrase.",
      },
      {
        title: "Offline-first delivery",
        body: "The model and the index on the device, with signed updates, so a round is not interrupted by a dropped connection.",
      },
      {
        title: "An audit trail by default",
        body: "Every prompt, retrieved source and answer logged in your systems, because show us how it reached that is a question that will be asked.",
      },
    ],
    services: ["sovereign-ai", "rag-enterprise-search", "edge-ai"],
  },

  "financial-services": {
    intro:
      "Finance teams do not want a chatbot with opinions about money. They want a workspace where every figure on screen traces back to the input and the formula that produced it, and where the model fetches, structures and explains rather than estimates. Traceability is the product.",
    pressures: [
      {
        title: "An unsourced number is unusable",
        body: "A projection nobody can reconstruct will not clear review, however good it is.",
      },
      {
        title: "Market context goes stale fast",
        body: "Research that was current last quarter is actively misleading this one, and a static index does not know the difference.",
      },
      {
        title: "The rules differ per jurisdiction",
        body: "What may be stored, shown and advised changes by market, and the system has to know which set it is operating under.",
      },
    ],
    build: [
      {
        title: "Calculators with a visible derivation",
        body: "Every output carries its inputs and its steps, so the number and the working arrive together.",
      },
      {
        title: "Retrieval over filings and research",
        body: "Hybrid search across your own documents and the public record, answering with citations and dates rather than a summary.",
      },
      {
        title: "Freshness as an engineering concern",
        body: "Re-indexing on a schedule that matches how fast the underlying material moves, with staleness surfaced rather than hidden.",
      },
    ],
    services: ["rag-enterprise-search", "nlp-document-ai", "data-science-ml"],
  },

  "regulated-industries": {
    intro:
      "In regulated work the answer matters less than the evidence behind it. Extraction accuracy quoted in aggregate hides the one field that fails a third of the time and costs you the audit, so we measure per field and per document type. The system's job is to make a reviewer faster, not to remove them.",
    pressures: [
      {
        title: "Aggregate accuracy hides the failure",
        body: "A 96% average across twenty fields can mean one field is nearly useless. Nobody finds out until a filing is wrong.",
      },
      {
        title: "Documents are not uniform",
        body: "Scans, photographs, hand-filled forms, and PDFs with three layouts inside one file. The edge cases are the volume.",
      },
      {
        title: "Evidence is requested months later",
        body: "Why did the system extract this arrives long after the run, and a reconstruction is not an answer.",
      },
    ],
    build: [
      {
        title: "Per-field extraction with confidence",
        body: "Each field scored on its own, with low-confidence values routed to a human instead of passed downstream silently.",
      },
      {
        title: "Retrieval that cites the passage",
        body: "Answers point at the paragraph and the page, so a reviewer checks rather than trusts.",
      },
      {
        title: "An eval set that ships with the system",
        body: "A labelled corpus running in your CI, so a model change that drops a field's accuracy fails the build rather than the audit.",
      },
    ],
    services: ["nlp-document-ai", "rag-enterprise-search", "responsible-ai"],
  },

  "professional-services": {
    intro:
      "Firms that bill for judgement lose hours to recording it. Meetings, minutes, decisions and the follow-through are real work that nobody is paid for, and the tools that automate them tend to publish confidently wrong summaries to the whole client. The reviewer stays in the loop here by design.",
    pressures: [
      {
        title: "Decisions get lost between the call and the file",
        body: "What was agreed sits in someone's notes, someone else's memory, and nowhere in the system of record.",
      },
      {
        title: "Attribution is harder than transcription",
        body: "A summary that assigns a commitment to the wrong person is worse than no summary at all.",
      },
      {
        title: "Client-facing output cannot be a first draft",
        body: "Anything that leaves the firm carries the firm's name, so nothing publishes without a human releasing it.",
      },
    ],
    build: [
      {
        title: "Transcription with diarisation that holds up",
        body: "Speaker separation and terminology tuned to your domain, not a general model's best guess at both.",
      },
      {
        title: "Minutes, actions and decisions as structured output",
        body: "Not a paragraph of prose: typed records a system of record can accept without a human retyping them.",
      },
      {
        title: "An approval step before anything is published",
        body: "The draft waits. The reviewer edits and releases. The trail records who did.",
      },
    ],
    services: ["generative-ai", "agentic-ai", "ai-saas-and-mobile"],
  },

  "sales-and-revenue": {
    intro:
      "Revenue teams already have a CRM they do not fully keep up to date. A second system that also needs feeding makes that worse. The work here is enrichment, signal and sequencing wired into the tool the team is already in, with the model doing the reading rather than the deciding.",
    pressures: [
      {
        title: "The CRM is only as good as the data entry",
        body: "Every automation built on top of it inherits whatever the rep did not type in.",
      },
      {
        title: "Signals arrive scattered",
        body: "Product usage, support tickets, news and inbound each say something about the account, in four places, on four schedules.",
      },
      {
        title: "Generic outreach is now filtered",
        body: "Volume without specificity does not land, and specificity at volume is the thing a model is actually good at.",
      },
    ],
    build: [
      {
        title: "Enrichment that writes back",
        body: "Research and firmographics resolved and pushed into the record, so the CRM improves rather than being bypassed.",
      },
      {
        title: "Signal aggregation with a reason attached",
        body: "A score is useless without the evidence. Each one carries the events that produced it.",
      },
      {
        title: "Drafting with the account's own context",
        body: "Outreach grounded in what is true about that account, drafted for a human to send.",
      },
    ],
    services: ["agentic-ai", "no-code-automation", "rag-enterprise-search"],
  },

  "enterprise-it-and-workforce": {
    intro:
      "Identity, access and attendance systems handle biometric data, which means the interesting engineering constraint is what must never leave the device. We build these edge-first: templates encrypted locally, matching on-device, and a central log that records the event without the biometric.",
    pressures: [
      {
        title: "Biometric data is a liability in transit",
        body: "Anything that sends a face to a server has to defend that decision to a regulator and to the people being scanned.",
      },
      {
        title: "Sites lose connectivity",
        body: "Attendance cannot stop because the link did. The device has to decide locally and reconcile afterwards.",
      },
      {
        title: "Spoofing is the actual threat model",
        body: "A photograph held up to a camera defeats a naive matcher, and the failure is silent.",
      },
    ],
    build: [
      {
        title: "On-device matching",
        body: "Templates generated and compared locally, encrypted at rest, with no plain-text biometric crossing the network.",
      },
      {
        title: "Liveness and anti-spoofing checks",
        body: "Presentation-attack detection inside the pipeline, tuned against the hardware actually deployed rather than a reference device.",
      },
      {
        title: "A central record that holds up",
        body: "Auditable attendance events, reconciled after an outage, without the underlying biometric ever being centralised.",
      },
    ],
    services: ["computer-vision", "edge-ai", "responsible-ai"],
  },

  "consumer-ai": {
    intro:
      "Consumer assistants are an economics problem wearing a product costume. Conversation quality is table stakes; what decides whether the thing survives is cost per message and tail latency, broken down by the kind of conversation driving them. We instrument that in the first week, not after the first invoice.",
    pressures: [
      {
        title: "Cost is invisible until it is enormous",
        body: "A per-token bill aggregated monthly tells you nothing about which conversation type is expensive.",
      },
      {
        title: "P99 is what users feel",
        body: "Median latency looks fine on every dashboard while the slowest one in twenty is the one that gets the app deleted.",
      },
      {
        title: "Safety cannot be bolted on at the end",
        body: "Consumer surface area is unbounded, so the guardrails have to be part of the pipeline rather than a filter after it.",
      },
    ],
    build: [
      {
        title: "Cost attribution per conversation type",
        body: "Spend tracked by route and intent, so the expensive path can be found and then made cheaper.",
      },
      {
        title: "Model routing",
        body: "A small model takes the traffic that does not need a large one, escalating on a measured trigger rather than a guess.",
      },
      {
        title: "Guardrails in the path",
        body: "Input and output policy checks inside the request, with refusals logged and reviewable.",
      },
    ],
    services: ["generative-ai", "inference-engineering", "responsible-ai"],
  },

  "public-sector": {
    intro:
      "We have not published a public-sector engagement, so this page describes what we would build rather than what we have. The constraint that shapes everything here is jurisdiction: not only where data is stored, but where it is processed, and who could be compelled to produce it.",
    pressures: [
      {
        title: "Residency is not sovereignty",
        body: "Storing data in-country while the inference runs elsewhere satisfies the contract and not the requirement.",
      },
      {
        title: "Procurement outlives the vendor",
        body: "A system the department cannot operate after handover is a dependency, not a deliverable.",
      },
      {
        title: "Every decision has to be explainable",
        body: "The model said so is not a defensible basis for an action affecting a citizen.",
      },
    ],
    build: [
      {
        title: "Open weights inside the jurisdiction",
        body: "Models served on infrastructure the department controls, with every sub-processor named before anything ships.",
      },
      {
        title: "Keys and logs held by the department",
        body: "Not by us. The exit plan is written before the build starts, not negotiated at the end of it.",
      },
      {
        title: "A decision trail per output",
        body: "The retrieved sources, the prompt and the answer, logged and queryable months later.",
      },
    ],
    services: ["sovereign-ai", "responsible-ai", "rag-enterprise-search"],
  },

  logistics: {
    intro:
      "We have not published a logistics engagement, so this page describes what we would build. The shape of the problem is document extraction at volume across formats nobody controls, where a single mis-read field can hold a container at a border.",
    pressures: [
      {
        title: "The documents come from everyone else",
        body: "Manifests, customs paperwork and bills of lading arrive in whatever format the counterparty uses, including photographs of printouts.",
      },
      {
        title: "One field failing is the whole shipment",
        body: "Aggregate accuracy is the wrong measure when a single wrong code stops the load.",
      },
      {
        title: "Exceptions are the job",
        body: "The straightforward documents were automated years ago. What is left is the long tail.",
      },
    ],
    build: [
      {
        title: "Per-field extraction with routing",
        body: "Each field scored separately, low-confidence values sent to a human before anything moves downstream.",
      },
      {
        title: "Format-agnostic ingestion",
        body: "Scans, photographs and structured files through one pipeline, with layout treated as a variable rather than an assumption.",
      },
      {
        title: "Measurement against a labelled corpus",
        body: "Your own documents as the eval set, so an accuracy claim is about your paperwork and not a public benchmark.",
      },
    ],
    services: ["nlp-document-ai", "computer-vision", "managed-ai-services"],
  },

  "agriculture-and-agritech": {
    intro:
      "We have not published an agritech engagement, so this page describes what we would build. One constraint shapes everything: the decision is needed in the field. That is where connectivity is worst, on hardware that has to survive being carried around a farm.",
    pressures: [
      {
        title: "The field has no network",
        body: "A model that needs a round trip to a data centre is useless standing in a crop at the moment someone has to decide whether to spray.",
      },
      {
        title: "Training data does not generalise",
        body: "A disease model trained on one region, one variety and one season fails quietly on the next. The labelling cost, not the architecture, is what decides whether it works.",
      },
      {
        title: "A wrong call costs a season",
        body: "Under-detection loses the crop and over-detection wastes chemical and trust. Both failures need to be visible as numbers before anyone acts on the output.",
      },
    ],
    build: [
      {
        title: "Detection on the device",
        body: "Models quantised and compiled to run on the drone, the handset or a local box, so the answer arrives where the decision is made and nothing depends on a signal.",
      },
      {
        title: "An eval set that covers the variance",
        body: "Region, variety, growth stage and light, labelled and held out. Accuracy quoted against anything narrower is a number about a benchmark rather than about your farm.",
      },
      {
        title: "Confidence that routes to an agronomist",
        body: "Low-confidence detections go to a person rather than into a spray plan. The system's job is to shorten the walk, not to replace the judgement.",
      },
    ],
    services: ["computer-vision", "edge-ai", "data-science-ml"],
  },

  "education-and-learning": {
    intro:
      "Learning assistants fail in a way that is specific to the domain: a confident wrong answer teaches the wrong thing, and the learner has no way to tell. So the corpus is vetted before anything is indexed, every answer carries the passage it came from, and the system is built to decline rather than improvise.",
    pressures: [
      {
        title: "A fluent wrong answer is worse than none",
        body: "A learner cannot audit what they are learning. Confidence without a source is the failure mode that matters here, and it is invisible in any demo.",
      },
      {
        title: "The corpus is the product",
        body: "What the assistant is allowed to answer from decides everything about whether it is trustworthy, and that is an editorial decision before it is an engineering one.",
      },
      {
        title: "Sensitive subjects need a refusal path",
        body: "Some questions should be answered with where to look rather than with an answer, and that boundary has to be designed rather than discovered in production.",
      },
    ],
    build: [
      {
        title: "Retrieval over a vetted corpus only",
        body: "Indexed from sources someone signed off, with provenance kept through the pipeline so an answer can always be traced back to a document and an edition.",
      },
      {
        title: "Citations the learner can open",
        body: "The passage travels with the answer. It is what turns the assistant from an oracle into a reading aid.",
      },
      {
        title: "A designed refusal",
        body: "Out-of-corpus questions get a route to a human or a source, not a generated guess. We write that boundary with you before the build.",
      },
    ],
    services: ["rag-enterprise-search", "responsible-ai", "generative-ai"],
  },

  "saas-and-platform": {
    intro:
      "The model is usually the part that works. What decides whether an AI product reaches a user is everything around it: auth, tenancy, billing, the integrations, the mobile client that has to behave on a bad network, and a deployment pipeline someone other than its author can run. That is ordinary software engineering, and it is most of the build.",
    pressures: [
      {
        title: "Tenancy cannot be retrofitted",
        body: "Multi-tenancy decides the data model. Adding it to a product that shipped without it is a rewrite with a migration attached, not a feature.",
      },
      {
        title: "Usage-based pricing needs honest metering",
        body: "If the meter and the invoice disagree, the finance conversation ends the contract faster than any outage.",
      },
      {
        title: "The deploy is a single point of failure",
        body: "In most teams we meet, one person knows how the deploy works. That is a capability on the org chart and a risk in practice.",
      },
    ],
    build: [
      {
        title: "Web and mobile around the model",
        body: "Next.js on the web, Flutter or React Native on mobile, chosen on what your team can maintain after we leave rather than on what we prefer. Streaming, cancellation and offline states designed rather than discovered.",
      },
      {
        title: "The commercial layer",
        body: "Auth, roles, tenancy, quotas and metered billing, wired so the number the customer sees is the number the system counted.",
      },
      {
        title: "A pipeline anyone can run",
        body: "Dockerised, CI that runs the eval suite, CD that can deploy and revert, infrastructure in code. The deploy stops being one person's knowledge.",
      },
    ],
    services: ["ai-saas-and-mobile", "cloud-devops-mlops", "ai-mvp-development"],
  },

  "ai-automation": {
    intro:
      "Every company has a layer of work that is too small for a project and too repetitive to keep doing by hand: the handoff between two systems, the weekly report, the exception that always gets routed the same way. It is documented, it is repeated hundreds of times a month, and almost none of it needs a model. The interesting part is telling which parts do.",
    pressures: [
      {
        title: "It never reaches the backlog",
        body: "Each instance is fifteen minutes, so it never justifies a ticket. The cost only becomes visible when someone adds up the year.",
      },
      {
        title: "The documented process is not the real one",
        body: "The exceptions people handle silently are where the value is, and they are the part no runbook records.",
      },
      {
        title: "A silent failure is worse than the manual version",
        body: "An automation that stops working without telling anyone erodes trust faster than the process it replaced ever cost.",
      },
    ],
    build: [
      {
        title: "Rules where it is rules",
        body: "Most of this work is deterministic and belongs in code. Reaching for a model on a branch that an if-statement handles makes it slower, dearer and harder to debug.",
      },
      {
        title: "A model only at the judgement",
        body: "Classification, extraction and routing, with a confidence threshold and a human on the other side of it. That is usually one or two steps out of a dozen.",
      },
      {
        title: "Loud failure and a manual path",
        body: "Alerting with thresholds that mean something, and the old process still available. An automation you cannot fall back from is a dependency.",
      },
    ],
    services: ["agentic-ai", "no-code-automation", "managed-ai-services"],
  },

  "legal-tech": {
    intro:
      "Legal work is reading under time pressure, and the cost of a miss is asymmetric. A system that summarises a contract confidently and cites nothing is worse than no system, because it produces something that looks checked. Everything here is built so the reviewer can verify in one click rather than re-read.",
    pressures: [
      {
        title: "A summary without a clause is unusable",
        body: "Nobody signs off on a paraphrase. The answer has to arrive with the paragraph it came from, in the version of the document that governs.",
      },
      {
        title: "Obligations hide in the exhibits",
        body: "The terms that matter are rarely in the body. Extraction that only reads the main agreement misses the ones that create liability.",
      },
      {
        title: "Privilege and confidentiality set the architecture",
        body: "Where the documents may be processed is decided before any model is chosen, not configured afterwards.",
      },
    ],
    build: [
      {
        title: "Clause-level retrieval with citations",
        body: "Chunked on document structure so a clause is never split across two passages, with the pin-cite travelling alongside the answer.",
      },
      {
        title: "Obligation and date extraction, scored per field",
        body: "Renewal windows, notice periods, caps and indemnities pulled as typed values, each with its own confidence, low ones routed to review.",
      },
      {
        title: "Deployment inside the firm's boundary",
        body: "On-prem or in your tenant, with an audit trail of every prompt, source and answer, because that is the question a regulator or an opposing party will ask.",
      },
    ],
    services: ["nlp-document-ai", "rag-enterprise-search", "sovereign-ai"],
  },

  "insurance-tech": {
    intro:
      "Insurance runs on documents nobody controls: submissions in whatever format the broker sends, claims with photographs attached, policies with endorsements stacked on top. Accuracy quoted as an average across fields is the wrong measure here, because one wrong value on one claim is not something the other ninety-nine average away.",
    pressures: [
      {
        title: "Submissions arrive in every format there is",
        body: "Spreadsheets, PDFs, scans and email bodies, from hundreds of counterparties, none of whom will change how they send them.",
      },
      {
        title: "Triage is where the loss ratio moves",
        body: "Getting a claim to the right handler on the first pass is worth more than any downstream efficiency, and it is a decision made on incomplete information.",
      },
      {
        title: "Every decision has to be explainable",
        body: "Declines and pricing are regulated outcomes. The system has to show what it read and why, months later, without a reconstruction.",
      },
    ],
    build: [
      {
        title: "Intake that handles the long tail",
        body: "One pipeline for scans, photographs and structured files, with layout treated as a variable rather than an assumption.",
      },
      {
        title: "Per-field extraction with routing",
        body: "Each value scored on its own. Low confidence goes to a human before it reaches a pricing model, not after.",
      },
      {
        title: "A decision trail per outcome",
        body: "Source document, extracted value, confidence and the rule applied, queryable later. That is what makes the system defensible rather than merely fast.",
      },
    ],
    services: ["nlp-document-ai", "responsible-ai", "agentic-ai"],
  },
};
