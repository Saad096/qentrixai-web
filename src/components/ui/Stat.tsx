/**
 * No opacity on the label. Ink at 80% over verdigris measures 4.19:1 --
 * the same alpha-text mistake the old site made 41 times.
 */
import { CountUp } from "@/components/motion/CountUp";

export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-2xl font-bold leading-none">
        <CountUp value={value} />
      </div>
      <div className="mt-2.5 max-w-[16ch] font-mono text-xs leading-snug">{label}</div>
    </div>
  );
}
