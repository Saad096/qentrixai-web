import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { DeviceFrame, DevicePlaceholder } from "@/components/ui/DeviceFrame";
import { Section } from "@/components/ui/Section";
import { FaqCta } from "@/components/sections/FaqCta";
import { products } from "@/data/products";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Products we build and run ourselves",
  path: "/products",
  description:
    "Minutely, NeuroMesh, SalesPire, ALA, DocumentAI, VoxRoute and more — operated in-house on the same evals, tracing and on-call discipline we hand to clients.",
});

export default function ProductsPage() {
  return (
    <>
      <script id="ld-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Products", path: "/products" },
            ])
          ),
        }}
      />

      <section className="py-16 md:py-24">
        <Container>
          <h1 className="max-w-[18ch] text-hero font-bold text-text">Products we build and run</h1>
          <p className="mt-7 max-w-measure text-md text-muted">
            {products.length} products, operated in-house on the same discipline we sell.
            Several started as client work and earned their own roadmap.
          </p>
        </Container>
      </section>

      <Section className="rule">
        <ul className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">
          {products.map((p) => {
            const shot = p.coverMode === "dark" ? "" : p.cover || p.gallery[0] || "";
            return (
              <li key={p.slug}>
                <Link href={`/products/${p.slug}`} className="group block">
                  {/* Same treatment as the homepage row. The listing used to
                      show a bare flush-cropped screenshot, so the two places
                      a product appears did not look like the same product. */}
                  {shot ? (
                    <DeviceFrame
                      src={shot}
                      orientation={p.orientation}
                      alt={`${p.name} interface`}
                      sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="lift"
                    />
                  ) : (
                    <DevicePlaceholder name={p.name} className="lift" />
                  )}
                  <div className="mt-5 flex items-baseline gap-3">
                    <h2 className="text-lg font-semibold text-text group-hover:text-link">
                      {p.name}
                    </h2>
                    <span className="font-mono text-xs text-muted">{p.category}</span>
                  </div>
                  <p className="mt-2 text-base text-muted">{p.tagline}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </Section>

      <FaqCta />
    </>
  );
}
