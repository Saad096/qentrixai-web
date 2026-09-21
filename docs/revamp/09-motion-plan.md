# 09 — Motion plan

**Date:** 2026-09-21 · Written before implementation, at the owner's request.

## Rules that bound every item below

1. **The hero `<h1>` is never animated.** It is the LCP element. Framer Motion gating it is what made LCP 3.71 s on the old site.
2. **Transform and opacity only.** Anything animating `width`, `top`, `height` or `filter` on a loop goes back on the main thread — that was 1.1 s of blocking time on the old build.
3. **GSAP stays lazy.** Imported on idle or first scroll, never in the initial bundle. Current cost: 2–99 ms total blocking time against a 200 ms budget.
4. **`prefers-reduced-motion` turns every item into its end state.** Nothing below is load-bearing for comprehension.
5. **Scrubbed animations must be readable when paused.** If a frame mid-scroll is meaningless, the animation is decoration.

---

## A. Hero — arrival sequence

**Trigger:** page load, once.
**What moves:** proof line, lede, CTA row, then the stat slab, each 60 ms apart, 18 px rise + fade. The `<h1>` is already painted and does not participate. Stat numerals count from 0 to value over 900 ms, easing out.
**Why:** the reference hero (Quixlab) lands proof first and one CTA. We have the same order; it currently arrives all at once, so nothing leads the eye.
**Cost:** CSS keyframes, no JS. Counters are one `requestAnimationFrame` loop that stops on completion.

## B. Model orbit — "Ship custom LLM products"

**Current:** five vendor names pinned at fixed angles. Static.
**Change:** the ring rotates continuously, one revolution per 48 s. Each label counter-rotates by the same amount so the text stays upright and readable. The centre mark pulses once per revolution as each model passes the top.
**Model list refreshed** to what buyers are actually choosing now: GPT-5, Claude, Gemini, Llama, DeepSeek, Qwen, Kimi. Seven, not five — the point of the picture is that the model is a swappable component.
**Interaction:** rotation pauses on hover and on focus-within, so a name can be read deliberately.
**Cost:** one CSS rotation on a wrapper, one counter-rotation per chip. Compositor only.

## C. Inference economics — new artwork for "Make inference cost what it should"

This is the "100% that comes down" idea, and it is the most useful animation on the page because it teaches the thing we are selling.

**Form:** a dial starting at **100%** — cost per thousand requests, indexed — with a caption rail beside it.
**Scrub:** tied to scroll through the section. Four stops, each naming the technique and dropping the dial:

| Stop | Technique | Dial |
|---|---|---|
| 1 | Baseline: one large model, one request at a time | 100% |
| 2 | Continuous batching | ~62% |
| 3 | KV-cache reuse | ~48% |
| 4 | Quantisation, with a quality gate on the eval suite | ~31% |
| 5 | Model routing: small model first, escalate on failure | ~18% |

A second, smaller readout tracks **p99 latency** alongside, because the honest story is that these trade against each other — batching helps cost and hurts tail latency, and the page should say so rather than imply everything improves at once.

**Numbers are illustrative and the caption says so.** They are the shape of the curve, not a measured client result. Real figures replace them the moment we can publish one.
**Reduced motion / no JS:** renders at the final stop with all five captions listed.

## D. How we work — pinned progression

**Trigger:** the four phase cards pin for roughly one viewport of scroll while the active phase advances 1 → 4.
**What moves:** the active card lifts and its artifact line fades in; the others recede to 55% opacity. A progress rail fills alongside.
**Why:** this is the "feels good to scroll" moment. It is a genuine sequence, so scroll-as-time is honest here — which is exactly why it is the only pinned section on the page.
**Guard:** disabled below 1024 px. Pinning on a phone fights the browser's own scroll and is the most common way this pattern goes wrong.

## E. Domain tabs — panel transition

**Current:** the panel swaps instantly.
**Change:** outgoing copy and art fade and slide 12 px on exit, incoming enters from the opposite side, 220 ms. The active pill's background slides between positions rather than cutting.
**Why:** this is the "sliding experience" from the reference. It also signals that the tabs are a control and not links.

## F. Kept as-is

The voice confidence wave and the agent graph read well already and are not being touched.

---

## What I am not doing, and why

**No auto-advancing carousels.** A panel that changes while someone is reading it is the single most complained-about pattern in this category. The tabs slide when clicked, not on a timer.

**No scroll-jacking.** Section D pins; it does not take over the scroll speed or hijack the wheel.

**No parallax on text.** Moving copy at a different rate from its container is the fastest way to make a page feel cheap and hurt reading.
