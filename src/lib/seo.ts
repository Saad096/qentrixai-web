import type { Metadata } from "next";
import { publicEnv } from "./env";

/**
 * Kiln (2026-09 revamp). Titles are outcome-shaped, never `<Noun> | QentrixAI`.
 * Structured data covers Organization, WebSite, Service, FAQPage, Article,
 * Product and BreadcrumbList — the previous site emitted Organization alone.
 */

const defaultDescription =
  "QentrixAI is an AI product studio. We design, build and run agentic systems, retrieval pipelines and voice AI, then hand over the repo, the eval harness and the runbook.";

export const defaultKeywords = [
  "AI product studio",
  "agentic AI development",
  "RAG development company",
  "voice AI development",
  "LLM application development",
  "AI MVP development",
  "MLOps and LLM observability",
  "computer vision development",
  "edge AI development",
  "responsible AI consulting",
  "AI consulting Pakistan",
  "QentrixAI",
];

const base = () => publicEnv.siteUrl.replace(/\/$/, "");
const abs = (path = "/") => `${base()}${path.startsWith("/") ? path : `/${path}`}`;

type SeoInput = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  keywords?: string[];
  type?: "website" | "article";
  publishedTime?: string;
};

export function buildMetadata({
  title,
  description = defaultDescription,
  path = "/",
  image,
  keywords,
  type = "website",
  publishedTime,
}: SeoInput = {}): Metadata {
  const fullTitle = title
    ? `${title} | ${publicEnv.siteName}`
    : `${publicEnv.siteName} — AI systems that survive production`;
  const url = abs(path);
  // When no image is passed we deliberately omit `images` so Next's
  // opengraph-image.tsx file convention supplies the generated card. The old
  // site hard-coded /og.png here, and that file 404'd in production.

  return {
    metadataBase: new URL(base()),
    title: fullTitle,
    description,
    keywords: keywords ?? defaultKeywords,
    alternates: { canonical: url },
    authors: [{ name: publicEnv.siteName, url: base() }],
    creator: publicEnv.siteName,
    publisher: publicEnv.siteName,
    openGraph: {
      type,
      url,
      title: fullTitle,
      description,
      siteName: publicEnv.siteName,
      ...(image ? { images: [{ url: image, width: 1200, height: 630, alt: fullTitle }] } : {}),
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      ...(image ? { images: [image] } : {}),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
    // Favicons are referenced by URL, so they bypass next/image and ship at
    // whatever size the file is. All three pointed at the 512px 84KB master,
    // which every page then downloaded in full for a 32px slot. Sized files
    // instead: 1KB, 6KB and 25KB.
    icons: {
      icon: [
        { url: "/logo/icon-32.png?v=4", type: "image/png", sizes: "32x32" },
        { url: "/logo/icon-512.png?v=4", type: "image/png", sizes: "512x512" },
      ],
      shortcut: "/logo/icon-32.png?v=4",
      apple: "/logo/icon-180.png?v=4",
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${base()}/#organization`,
    name: publicEnv.siteName,
    url: base(),
    logo: `${base()}/logo/qentrix-mark.png`,
    description: defaultDescription,
    foundingDate: "2024",
    email: publicEnv.profile.email,
    telephone: publicEnv.profile.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lahore",
      addressCountry: "PK",
    },
    sameAs: [publicEnv.socials.linkedin, publicEnv.socials.github, publicEnv.socials.upwork].filter(
      Boolean
    ),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${base()}/#website`,
    url: base(),
    name: publicEnv.siteName,
    description: defaultDescription,
    publisher: { "@id": `${base()}/#organization` },
  };
}

export function serviceJsonLd(s: { title: string; description: string; slug: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    description: s.description,
    url: abs(`/services/${s.slug}`),
    provider: { "@id": `${base()}/#organization` },
    areaServed: "Worldwide",
  };
}

export function productJsonLd(p: { name: string; tagline: string; slug: string; image?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: p.name,
    description: p.tagline,
    url: abs(`/products/${p.slug}`),
    applicationCategory: "BusinessApplication",
    ...(p.image ? { image: abs(p.image) } : {}),
    publisher: { "@id": `${base()}/#organization` },
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function articleJsonLd(a: {
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  author: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.excerpt,
    url: abs(`/blogs/${a.slug}`),
    datePublished: a.date,
    dateModified: a.date,
    author: { "@type": "Person", name: a.author },
    publisher: { "@id": `${base()}/#organization` },
    ...(a.image ? { image: abs(a.image) } : {}),
    mainEntityOfPage: { "@type": "WebPage", "@id": abs(`/blogs/${a.slug}`) },
  };
}

export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: abs(t.path),
    })),
  };
}
