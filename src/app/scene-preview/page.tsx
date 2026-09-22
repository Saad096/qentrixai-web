import { Container } from "@/components/ui/Container";
import { SCENES, type SceneKey } from "@/components/art/scenes";

/** Throwaway contact sheet while the scene set is drawn. Delete before ship. */
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
