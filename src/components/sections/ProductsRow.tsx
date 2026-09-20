import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { products } from "@/data/products";

const FEATURED = ["minutely", "neuromesh", "voxroute"];

export function ProductsRow() {
  const shown = FEATURED.map((slug) => products.find((p) => p.slug === slug)).filter(
    (p): p is (typeof products)[number] => Boolean(p)
  );

  return (
    <Section
      eyebrow="Our own products"
      heading="We run the kind of software we sell."
      lede="Nine products built and operated in-house, on the same evals, tracing and on-call discipline we hand to clients."
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
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-md">
                      <Image
                        src={shot}
                        alt={`${p.name} interface`}
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="object-cover object-top"
                      />
                    </div>
                  ) : (
                    <div className="grid aspect-[16/10] w-full place-items-center rounded-md bg-surface">
                      <span className="text-xl font-bold text-muted">{p.name}</span>
                    </div>
                  )}
                  <h3 className="mt-5 text-lg font-semibold text-text group-hover:text-link">
                    {p.name}
                  </h3>
                  <p className="mt-2 text-base text-muted">{p.tagline}</p>
                </Link>
              </div>
            </li>
          );
        })}
      </ul>

      <p className="mt-9">
        <Link href="/products" className="inline-flex min-h-[44px] items-center text-base font-semibold text-link hover:brightness-110">
          All nine products
        </Link>
      </p>
    </Section>
  );
}
