import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SCENES, type SceneKey } from "@/components/art/scenes";

/**
 * Contact sheet for the scene set. A working tool, not a page: it is kept
 * out of the sitemap and marked noindex so it cannot be landed on from
 * search. Delete it once the set stops changing.
 */
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function ScenePreview() {
  const keys = Object.keys(SCENES) as SceneKey[];
  return (
    <section className="py-16">
      <Container>
        <h1 className="text-3xl font-bold text-text">Scenes ({keys.length})</h1>
        <ul className="mt-10 grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
          {keys.map((k) => {
            const S = SCENES[k];
            return (
              <li key={k}>
                <S />
                <p className="mt-3 font-mono text-xs text-muted">{k}</p>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
