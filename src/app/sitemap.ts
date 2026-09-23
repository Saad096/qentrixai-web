import type { MetadataRoute } from "next";
import { publicEnv } from "@/lib/env";
import { blogs } from "@/data/blogs";
import { services } from "@/data/services";
import { products } from "@/data/products";
import { caseStudies } from "@/data/caseStudies";
import { industries } from "@/data/industries";

/**
 * The old sitemap listed 11 static routes and the blog. It omitted every
 * detail page -- 29 pages of written content that were never rendered.
 *
 * Diffing the built route list against this one is the check worth
 * repeating whenever a route is added: a page missing from here is a page
 * that only gets found by following a link to it.
 *
 * /team is the one built route deliberately left out. It is a redirect to
 * the home page -- the member profiles are hidden on purpose -- so listing
 * it would offer a crawler a URL that never resolves to its own content,
 * and it would compete with / for the same title and description. It was
 * briefly added here on the strength of that route diff alone, which is
 * the mistake this note exists to prevent: check what a route does before
 * listing it, not just that it exists.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = publicEnv.siteUrl.replace(/\/$/, "");
  const now = new Date();

  const statics: MetadataRoute.Sitemap = [
    "",
    "/services",
    "/products",
    "/case-studies",
    "/industries",
    "/about",
    "/blogs",
    "/careers",
    "/contact",
    "/book",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const detail = (prefix: string, slugs: string[], priority: number): MetadataRoute.Sitemap =>
    slugs.map((slug) => ({
      url: `${base}${prefix}/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority,
    }));

  return [
    ...statics,
    ...detail("/services", services.map((s) => s.slug), 0.6),
    ...detail("/case-studies", caseStudies.map((c) => c.slug), 0.6),
    ...detail("/products", products.map((p) => p.slug), 0.6),
    ...detail("/industries", industries.map((i) => i.slug), 0.6),
    ...blogs.map((b) => ({
      url: `${base}/blogs/${b.slug}`,
      lastModified: new Date(b.date),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
