import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { products } from "@/data/products";
import { PRIMARY_CTA } from "@/data/navigation";
import { buildMetadata, productJsonLd, breadcrumbJsonLd } from "@/lib/seo";

type Params = { slug: string };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const p = products.find((x) => x.slug === slug);
  if (!p) return buildMetadata({ title: "Product not found", path: `/products/${slug}` });
  return buildMetadata({ title: p.name, description: p.tagline, path: `/products/${p.slug}` });
}

export default async function ProductDetail({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const shots = product.coverMode === "dark" ? [] : [product.cover, ...product.gallery].filter(Boolean);

  return (
    <>
      <script id="ld-product"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            productJsonLd({
              name: product.name,
              tagline: product.tagline,
              slug: product.slug,
              image: shots[0],
            })
          ),
        }}
      />
      <script id="ld-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Products", path: "/products" },
              { name: product.name, path: `/products/${product.slug}` },
            ])
          ),
        }}
      />

      <section className="py-16 md:py-24">
        <Container>
          <Link
            href="/products"
            className="inline-flex min-h-[44px] items-center font-mono text-xs text-muted hover:text-text"
          >
            Products
          </Link>
          <h1 className="mt-3 text-3xl font-bold text-text">{product.name}</h1>
          <p className="mt-4 max-w-measure text-md text-muted">{product.tagline}</p>
          <p className="mt-5 font-mono text-xs text-muted">
            {product.category} — {product.status}
          </p>

          {shots[0] && (
            <Image
              src={shots[0]}
              alt={`${product.name} interface`}
              width={1851}
              height={966}
              priority
              sizes="(min-width: 1280px) 1200px, 100vw"
              className="mt-11 w-full rounded-lg object-cover"
            />
          )}
        </Container>
      </section>

      <Section heading="What it does" className="rule">
        <div className="mt-6 max-w-measure space-y-5 text-md text-muted">
          <p>{product.problem}</p>
          <p>{product.solution}</p>
          <p>{product.novelty}</p>
        </div>
      </Section>

      <Section heading="What is in it" className="rule">
        <ul className="mt-8 grid max-w-measure gap-px">
          {product.features.map((f) => (
            <li key={f} className="border-t border-[color:var(--color-border)] py-4 text-base text-text">
              {f}
            </li>
          ))}
        </ul>
      </Section>

      <Section heading="Who it is for" className="rule">
        <ul className="mt-6 flex flex-wrap gap-2">
          {product.targetUsers.map((u) => (
            <li
              key={u}
              className="rounded-full border border-[color:var(--color-border)] px-3.5 py-1.5 font-mono text-xs text-muted"
            >
              {u}
            </li>
          ))}
        </ul>
        <p className="mt-10 font-mono text-xs text-muted">Under the hood</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {product.techStack.map((t) => (
            <li
              key={t}
              className="rounded-full border border-[color:var(--color-border)] px-3.5 py-1.5 font-mono text-xs text-muted"
            >
              {t}
            </li>
          ))}
        </ul>
      </Section>

      {shots.length > 1 && (
        <Section heading="Screens" className="rule">
          <ul className="mt-9 grid gap-8 md:grid-cols-2">
            {shots.slice(1).map((src, i) => (
              <li key={src}>
                <Image
                  src={src}
                  alt={`${product.name} screen ${i + 2}`}
                  width={1851}
                  height={966}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="w-full rounded-md object-cover"
                />
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section heading="Want something like this?" className="rule">
        <p className="mt-5 max-w-measure text-md text-muted">
          Most of these started as a client problem. If one of them is close to yours, the call is
          the fastest way to find out how close.
        </p>
        <div className="mt-8">
          <Button href={PRIMARY_CTA.href} size="lg">
            {PRIMARY_CTA.label}
          </Button>
        </div>
      </Section>
    </>
  );
}
