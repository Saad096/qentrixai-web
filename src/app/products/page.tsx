import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { DeviceFrame, DevicePlaceholder } from "@/components/ui/DeviceFrame";
import { Section } from "@/components/ui/Section";
import { FaqCta } from "@/components/sections/FaqCta";
import { products } from "@/data/products";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Products we build and run ourselves",
  path: "/products",
  description:
    "Minutely, NeuroMesh, SalesPire, ALA, DocumentAI, VoxRoute and more, operated in-house on the same evals, tracing and on-call discipline we hand to clients.",
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

      <PageHero
        title="Products we build and run"
        art="device-shelf"
        artLabel="A laptop, a tablet and a phone on a shelf, screens blank"
        lede={
          <>
            {products.length} products, operated in-house on the same discipline we sell.
            Several started as client work and earned their own roadmap.
          </>
        }
      />


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
                  <p className="mt-2 text-base text-text-2">{p.tagline}</p>
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
