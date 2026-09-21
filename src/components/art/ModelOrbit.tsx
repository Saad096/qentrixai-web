/**
 * Model orbit — the artwork for "Ship custom LLM products".
 *
 * Replaces `/images/abstract/system-cluster.png`, a raster of light vendor
 * marks on dark chips with a transparent ground. It could only ever sit on
 * something dark, so on the light theme it had to be boxed inside a black
 * panel with a caption explaining itself.
 *
 * Vendor names are set in type rather than drawn as logos. Redrawing the
 * OpenAI, Anthropic and Google marks from memory gets them subtly wrong, they
 * are trademarks, and a raster of them is what broke the light theme in the
 * first place. Mono-set names theme perfectly and read as a stack list, which
 * is what they are.
 */
/* Seven, not five, and refreshed to what buyers are actually weighing now.
   The point of the picture is that the model is a swappable component, and
   five names understated the choice. Evenly spaced, so the ring reads as a
   rotation rather than a cluster. */
const MODELS = ["GPT-5", "Claude", "Gemini", "Llama", "DeepSeek", "Qwen", "Kimi"];

/* Separate radii per axis. A percentage margin resolves against the
   containing block's WIDTH on every side, top included, so one radius on a
   4:3 panel throws the vertical chips 33% further out than the horizontal
   ones and clips them on the frame. `left`/`top` percentages resolve against
   width and height respectively, which is what the geometry wants. */
const RADIUS_X = 36;
const RADIUS_Y = 31;

export function ModelOrbit() {
  return (
    /* `group` so the whole orbit pauses when the pointer is anywhere on the
       card, and `focus-within` so it also pauses for a keyboard user who has
       tabbed into the card. A name you cannot stop to read is decoration. */
    <div className="orbit group relative size-full">
      {/* Two dashed rings, turning at different rates. Decorative: the chips
          are positioned against the panel, not against the rings, so their
          labels never rotate. */}
      <span className="absolute inset-[16%] rounded-full border border-dashed border-[color:var(--color-border)]" />
      <span className="art-ring absolute inset-[16%] rounded-full border border-dashed border-brand/35" />
      <span className="art-ring-slow absolute inset-[31%] rounded-full border border-dashed border-brand/25" />

      {/* Core */}
      <span className="absolute left-1/2 top-1/2 grid size-[19%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-lg bg-brand text-on-brand shadow-3">
        <svg viewBox="0 0 24 24" className="size-1/2" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 3v6m0 6v6M3 12h6m6 0h6" strokeLinecap="round" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </span>

      {/* The chips ride a rotating layer; each chip then counter-rotates by
          the same amount so the type stays upright and readable the whole way
          round. Both are transforms, so the orbit stays on the compositor. */}
      <span className="orbit-ring absolute inset-0 block">
        {MODELS.map((label, i) => {
          const deg = (360 / MODELS.length) * i - 90;
          const rad = (deg * Math.PI) / 180;
          return (
            <span
              key={label}
              /* Positioning only. The counter-rotation lives on the inner
                 span: both would write `transform`, and the animation wins,
                 which would drop the centring translate. */
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${50 + Math.cos(rad) * RADIUS_X}%`,
                top: `${50 + Math.sin(rad) * RADIUS_Y}%`,
              }}
            >
              <span className="orbit-chip block whitespace-nowrap rounded-full bg-surface px-2.5 py-1 font-mono text-[10px] text-text shadow-1">
                {label}
              </span>
            </span>
          );
        })}
      </span>
    </div>
  );
}
