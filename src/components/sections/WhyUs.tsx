import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { pillars } from "@/data/company";

export function WhyUs() {
  return (
    <Section eyebrow="Why QentrixAI" heading="Three reasons, and the receipts for each." ground="band">
      <ul className="mt-12 grid gap-10 md:grid-cols-3">
        {pillars.map((p) => (
          <li key={p.title}>
            <h3 className="text-lg font-semibold text-text">{p.title}</h3>
            <p className="mt-3 text-base text-muted">{p.body}</p>
            <p className="mt-4 font-mono text-xs text-muted">
              {p.proofHref ? (
                <Link href={p.proofHref} className="inline-flex min-h-[44px] items-center text-link hover:brightness-110">
                  {p.proof}
                </Link>
              ) : (
                p.proof
              )}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
