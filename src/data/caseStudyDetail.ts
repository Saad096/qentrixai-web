/**
 * Depth for /case-studies/[slug].
 *
 * The template rendered three one-paragraph sections and a row of stack
 * chips, with a 21:9 illustration above them that was mostly empty. Measured
 * at 782px of blank on one route, which is what the owner was pointing at.
 *
 * What is added here is engineering, not outcomes. Constraints, the
 * architecture, the decisions we took and what we rejected, and what we put
 * instrumentation on. All of that is ours to describe.
 *
 * What is NOT added is numbers. Five of the six engagements have no
 * published figure and inventing one is the single easiest lie on this site
 * to check. `measured` says what we instrumented, never what it read. When
 * the owner supplies figures they go in `caseStudies.metric`, which already
 * has a slot and already renders.
 *
 * `flow` feeds the drawn architecture diagram, which replaced the
 * illustration. Four stages, because that is the shape it is drawn for.
 */
export type CaseStudyDetail = {
  /** Two or three sentences. The situation, not the sales pitch. */
  context: string;
  /** What made it hard before any model was chosen. */
  constraints: string[];
  /** Feeds the drawn pipeline. */
  flow: { label: string; sub: string }[];
  /** Choices worth defending, and the option we turned down. */
  decisions: { choice: string; why: string; rejected: string }[];
  /** What carries instrumentation. Never what it reported. */
  measured: string[];
};

export const caseStudyDetail: Record<string, CaseStudyDetail> = {
  "multi-agent-ai-platform": {
    context:
      "An operations team ran the same process dozens of times a day across a CRM, a helpdesk and two back-office tools, with a human carrying the state between them. It was already documented, which is the signal that it can be automated. What made it a project rather than a script: four of the steps needed judgement and the rest did not.",
    constraints: [
      "Several steps write to systems of record, so a retry could double-charge or double-notify. Idempotency was a requirement, not a refinement.",
      "The team needed to know afterwards why a run did what it did, at the level of individual tool calls, months later.",
      "Failure had to be partial. A run that stalls on step four cannot undo steps one to three or leave the record half-written.",
    ],
    flow: [
      { label: "Trigger", sub: "queue or webhook" },
      { label: "Plan", sub: "graph, not prompt" },
      { label: "Act", sub: "typed tools" },
      { label: "Settle", sub: "or escalate" },
    ],
    decisions: [
      {
        choice: "An explicit state graph rather than a free-running agent loop",
        why: "Most of a reliable agent is not model-driven. Transitions that are rules stay rules, and the model is asked only where judgement is genuinely needed.",
        rejected: "A single planner prompt with tool access, which demos well and cannot be reasoned about when it misfires at 3am.",
      },
      {
        choice: "A contract per tool, with idempotency keys on anything that writes",
        why: "A retry is normal operation in a queue-driven system. Without keys, the recovery path is the thing that causes the incident.",
        rejected: "Relying on the model not to retry, which is not a control.",
      },
      {
        choice: "Human approval on the actions with consequences",
        why: "Reversible steps run unattended. Anything that spends money or contacts a customer waits, and the approval is part of the trace.",
        rejected: "Full autonomy with a post-hoc review queue nobody reads.",
      },
    ],
    measured: [
      "Per-run traces with every decision, tool call and result, replayable",
      "Step-level success and retry rates, so a flaky integration is visible before it is reported",
      "Cost per run attributed by step",
      "An eval suite over the judgement steps, running in CI",
    ],
  },

  "enterprise-document-intelligence": {
    context:
      "Six figures worth of contracts, SOPs and manuals sat behind a keyword search that could only find documents people already knew existed. The visible symptom was ticket volume to legal and operations, most of it questions the corpus already answered.",
    constraints: [
      "Answers had to be checkable. In a regulated setting a fluent summary with no source attached is not usable, however correct it is.",
      "The corpus moves. A document set that is re-indexed quarterly is wrong for most of the quarter.",
      "Retrieval had to respect permissions, because a passage the asker cannot open must never reach the model.",
    ],
    flow: [
      { label: "Ingest", sub: "structure-aware" },
      { label: "Index", sub: "hybrid + rerank" },
      { label: "Answer", sub: "with citation" },
      { label: "Evaluate", sub: "on every change" },
    ],
    decisions: [
      {
        choice: "Chunking that follows document structure rather than a token window",
        why: "Most retrieval quality is decided at ingestion. A clause split across two chunks is a clause the system cannot cite correctly.",
        rejected: "Fixed-size chunks with overlap, which is faster to build and loses exactly the documents that matter.",
      },
      {
        choice: "Hybrid retrieval with a reranker over dense-only search",
        why: "Dense and keyword search fail on different queries. Identifiers, clause numbers and rare terms are where dense-only search quietly degrades.",
        rejected: "Vector search alone, which benchmarks well and misses the lookup-shaped questions users actually ask.",
      },
      {
        choice: "Permission filtering at retrieval, not after generation",
        why: "Filtering the answer afterwards means the model already saw the passage. That is not a control anyone will sign off.",
        rejected: "Post-generation redaction.",
      },
    ],
    measured: [
      "Retrieval recall against a labelled question set, reported separately from answer quality",
      "Citation coverage, so an uncited answer is a failure rather than a style choice",
      "Index freshness per source",
      "Escalations to subject-matter experts, as the number the system exists to move",
    ],
  },

  "voice-recruitment-automation": {
    context:
      "First-round screening is the same ten questions, asked hundreds of times a month, followed by note-taking that arrives in the applicant tracking system hours later if at all. The recruiters were not short of judgement, they were short of the time that the repetitive half consumed.",
    constraints: [
      "Latency is the product. A pause that would pass unnoticed in chat reads as a broken line on a phone call.",
      "Candidates interrupt, restate and talk over the agent, so turn-taking had to be designed rather than assumed.",
      "A screening call is a candidate's first impression of the employer, so the handoff to a human had to be clean rather than apologetic.",
    ],
    flow: [
      { label: "Call", sub: "SIP via Twilio" },
      { label: "Stream", sub: "ASR with barge-in" },
      { label: "Screen", sub: "scripted + judged" },
      { label: "Write", sub: "structured to ATS" },
    ],
    decisions: [
      {
        choice: "Streaming speech throughout, with barge-in as a first-class case",
        why: "Anything that waits for a complete utterance has already spent the latency budget. Handling interruption is most of what makes an agent feel like a conversation.",
        rejected: "Turn-based request and response, which is far simpler and sounds like an IVR.",
      },
      {
        choice: "Two ASR paths rather than one",
        why: "Accent and line quality vary more than any single model handles well, and the cost of a mis-transcribed name in recruitment is not symmetric.",
        rejected: "A single hosted transcription endpoint chosen on headline benchmark accuracy.",
      },
      {
        choice: "Structured output into the ATS, not a transcript attachment",
        why: "A transcript moves the reading problem rather than solving it. Typed fields are what let a recruiter triage a morning's calls in minutes.",
        rejected: "Summaries as free text, which nobody can filter or sort.",
      },
    ],
    measured: [
      "End-to-end turn latency, p50 and p99 separately",
      "Barge-in recovery rate",
      "Transfer rate to a human, and the confidence threshold that triggered each one",
      "Field-level accuracy of what lands in the ATS, sampled against the recording",
    ],
  },

  "meeting-intelligence-platform": {
    context:
      "A consulting firm was losing decisions between the call and the file. Notes were scattered, minutes arrived days late, and when a commitment was disputed there was no record anyone trusted. The work is not transcription, which is solved, but attribution and approval, which are not.",
    constraints: [
      "Attribution matters more than accuracy. A summary that assigns a commitment to the wrong person is worse than no summary.",
      "Nothing client-facing could publish automatically, because anything leaving the firm carries the firm's name.",
      "Domain vocabulary, client names and acronyms are exactly the words a general model gets wrong.",
    ],
    flow: [
      { label: "Record", sub: "consented" },
      { label: "Diarise", sub: "speaker-aware" },
      { label: "Extract", sub: "typed records" },
      { label: "Approve", sub: "human releases" },
    ],
    decisions: [
      {
        choice: "Diarisation tuned on the firm's own recordings",
        why: "Off-the-shelf speaker separation degrades on conference-room audio with overlapping speech, which is every meeting that matters.",
        rejected: "Generic diarisation accepted at its published accuracy.",
      },
      {
        choice: "Decisions and actions as typed records, not prose",
        why: "A system of record can accept a typed action. It cannot accept a paragraph, so a human ends up retyping it, which is the work we were asked to remove.",
        rejected: "A well-written summary, which is what most tools in this category ship.",
      },
      {
        choice: "An explicit approval gate before anything publishes",
        why: "The reviewer is the product here. The system drafts and waits; the trail records who released it.",
        rejected: "Auto-publish with an undo.",
      },
    ],
    measured: [
      "Speaker attribution accuracy on a labelled internal set",
      "Time from meeting end to approved minutes",
      "Edit distance between draft and released version, as the honest measure of draft quality",
      "Proportion of actions that reach the system of record without retyping",
    ],
  },

  "ai-ivr-platform": {
    context:
      "A legacy IVR was containing a small fraction of calls, and the live agents behind it spent their day repeating the same handful of resolutions. The opportunity was not clever conversation, it was that most calls were one of ten known intents and the tree in front of them was not.",
    constraints: [
      "Callers press zero. Any system that makes escaping harder than the old tree fails regardless of its containment rate.",
      "Peak load is the hour nobody is rostered for, so capacity had to absorb spikes rather than queue them.",
      "The business needed containment reported by intent, not in aggregate, or improvements are invisible.",
    ],
    flow: [
      { label: "Answer", sub: "intent first" },
      { label: "Resolve", sub: "known paths" },
      { label: "Confirm", sub: "read back" },
      { label: "Hand off", sub: "with context" },
    ],
    decisions: [
      {
        choice: "Intent classification before conversation",
        why: "Most calls are one of ten things. Routing them in the first turn is cheaper and faster than letting a general model discover it over four.",
        rejected: "A single conversational agent handling everything, which costs more per call and is harder to measure.",
      },
      {
        choice: "Read-back confirmation on anything that changes an account",
        why: "The expensive failure in voice is a confident mishearing acted on silently. Reading it back is the cheapest control available.",
        rejected: "Trusting the transcription confidence score alone.",
      },
      {
        choice: "Transfer carries the transcript and the intent",
        why: "Making the caller repeat themselves is the thing people hate most about automated lines, and it is entirely avoidable.",
        rejected: "A cold transfer to the next available agent.",
      },
    ],
    measured: [
      "Containment by intent, not in aggregate",
      "Zero-press rate, as the honest counter-metric to containment",
      "Time to resolution against the previous tree",
      "Per-intent cost per call",
    ],
  },

  "computer-vision-systems": {
    context:
      "Attendance across multiple sites was verified by people looking at people, which is slow, inconsistent and almost impossible to audit after the fact. The interesting constraint was not recognition accuracy, it was that the data involved is biometric and most of the obvious architectures move it somewhere it should not go.",
    constraints: [
      "Biometric templates must not cross the network, which rules out the straightforward client-server design before anything else is decided.",
      "Sites lose connectivity, and attendance cannot stop because the link did.",
      "A photograph held up to a camera defeats a naive matcher, and the failure is silent.",
    ],
    flow: [
      { label: "Capture", sub: "on device" },
      { label: "Verify", sub: "local match" },
      { label: "Attest", sub: "liveness check" },
      { label: "Log", sub: "event, not face" },
    ],
    decisions: [
      {
        choice: "Matching on the device, templates encrypted at rest",
        why: "If the biometric never leaves, most of the regulatory surface disappears with it. This is a design decision, not a configuration one.",
        rejected: "Central matching with encrypted transit, which is easier to build and leaves the template in a database.",
      },
      {
        choice: "Presentation-attack detection tuned on the deployed hardware",
        why: "Liveness models degrade badly across camera sensors and lighting. Tuning on a reference device and shipping to the estate is how this fails quietly.",
        rejected: "A published liveness model accepted at its benchmark figure.",
      },
      {
        choice: "Offline-first, reconciling after an outage",
        why: "The device decides locally and syncs later, so a dropped link degrades nothing an operator can see.",
        rejected: "Requiring connectivity, with a queue and an apology.",
      },
    ],
    measured: [
      "False accept and false reject rates on site footage, not a public dataset",
      "Spoof detection rate against printed and screen replays",
      "Sync lag after an outage",
      "An audit trail of events with no biometric in it",
    ],
  },
};
