import Link from "next/link";
import { DeviceFrame, DevicePlaceholder } from "@/components/ui/DeviceFrame";
import { Section } from "@/components/ui/Section";
import { products } from "@/data/products";
import { SectionCta } from "@/components/ui/SectionCta";

const FEATURED = ["minutely", "neuromesh", "voxroute"];

export function ProductsRow() {
  const shown = FEATURED.map((slug) => products.find((p) => p.slug === slug)).filter(
    (p): p is (typeof products)[number] => Boolean(p)
  );

  return (
    <Section
      eyebrow="Our own products"
      heading="We run the kind of software we sell."
      lede={`${products.length} products built and operated in-house, on the same evals, tracing and on-call discipline we hand to clients.`}
      ground="band"
    >
      <ul className="mt-12 grid gap-9 md:grid-cols-3">
        {shown.map((p, i) => {
          // coverMode "dark" means we have no screenshot for it yet; show a
          // quiet graphite panel rather than another product's screen.
          const shot = p.coverMode === "dark" ? "" : p.cover || p.gallery[0] || "";
          return (
            <li key={p.slug}>
              <div data-reveal data-reveal-delay={i * 70}>
                <Link href={`/products/${p.slug}`} className="group block">
                  {shot ? (
                    <DeviceFrame
                      src={shot}
                      orientation={p.orientation}
                      alt={`${p.name} interface`}
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="lift"
                    />
                  ) : (
                    <DevicePlaceholder name={p.name} className="lift" />
                  )}
                  <h3 className="mt-5 text-lg font-semibold text-text group-hover:text-link">
                    {p.name}
                  </h3>
                  <p className="mt-2 text-base text-text-2">{p.tagline}</p>
                </Link>
              </div>
            </li>
          );
        })}
      </ul>

      <SectionCta href="/products">{`All ${products.length} products`}</SectionCta>
    </Section>
  );
}
