import { Container } from "@/components/ui/Container";
import { ComputerVisionScene } from "@/components/art/scenes/ComputerVisionScene";

/** Throwaway preview while the scene set is being drawn. Delete before ship. */
export default function ScenePreview() {
  return (
    <section className="py-16">
      <Container>
        <h1 className="text-3xl font-bold text-text">Scene preview</h1>
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <ComputerVisionScene />
          <div className="rounded-lg bg-surface p-7 shadow-1">
            <p className="text-md text-text-2">
              Same drawing, on a card, to check it holds up against a different ground.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
