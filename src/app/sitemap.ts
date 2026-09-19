import type { MetadataRoute } from "next";
import { publicEnv } from "@/lib/env";
import { blogs } from "@/data/blogs";
import { services } from "@/data/services";
import { products } from "@/data/products";
import { caseStudies } from "@/data/caseStudies";

/**
 * The old sitemap listed 11 static routes and the blog. It omitted /team and
 * every detail page -- 29 pages of written content that were never rendered.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = publicEnv.siteUrl.replace(/\/$/, "");
  const now = new Date();

  const statics: MetadataRoute.Sitemap = [
    "",
    "/services",
    "/products",
    "/case-studies",
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
    ...blogs.map((b) => ({
      url: `${base}/blogs/${b.slug}`,
      lastModified: new Date(b.date),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
