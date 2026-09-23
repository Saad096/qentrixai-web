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

/**
 * Google renders roughly 60 characters of a title and 160 of a description,
 * and cuts the rest mid-word. Most of our descriptions come from data
 * fields written to be read on the page -- an industry `intro` is three
 * sentences, an article `excerpt` is two -- so they arrive here well over
 * the limit. Measured before this: 330 characters on one industry page.
 *
 * Clamping centrally means every one of the seventy-odd routes is covered
 * and a new data field cannot quietly reintroduce the problem. It trims at
 * a word boundary, never mid-word, and only when it has to.
 */
function clamp(text: string, max: number): string {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  const at = cut.lastIndexOf(" ");
  return (at > max * 0.6 ? cut.slice(0, at) : cut).replace(/[ ,;:.\u2014-]+$/, "") + "\u2026";
}

export function buildMetadata({
  title,
  description = defaultDescription,
  path = "/",
  image,
  keywords,
  type = "website",
  publishedTime,
}: SeoInput = {}): Metadata {
  /* The brand suffix is dropped when the page title already fills the
     budget on its own. A title cut to "...Operational Workflows | Qentri"
     is worse than one with no suffix at all. */
  const bare = title ?? `${publicEnv.siteName} \u2014 AI systems that survive production`;
  const withBrand = title ? `${title} | ${publicEnv.siteName}` : bare;
  const fullTitle = clamp(withBrand.length <= 60 ? withBrand : bare, 60);
  const url = abs(path);
  /* Every route points at the generated card explicitly.
     Omitting `images` was supposed to let Next's opengraph-image.tsx file
     convention fill it in, and on the home page it does. It does not
     inherit into any route that exports its own `openGraph` object, which
     is all of them -- measured: 1 of 12 routes shipped an og:image. Naming
     it here is one line and cannot silently stop working. */
  const card = image ?? abs("/opengraph-image");
  const desc = clamp(description, 158);

  return {
    metadataBase: new URL(base()),
    title: fullTitle,
    description: desc,
    keywords: keywords ?? defaultKeywords,
    alternates: { canonical: url },
    authors: [{ name: publicEnv.siteName, url: base() }],
    creator: publicEnv.siteName,
    publisher: publicEnv.siteName,
    openGraph: {
      type,
      url,
      title: fullTitle,
      description: desc,
      siteName: publicEnv.siteName,
      images: [{ url: card, width: 1200, height: 630, alt: fullTitle }],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
      images: [card],
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
        { url: "/logo/icon-32.png?v=5", type: "image/png", sizes: "32x32" },
        { url: "/logo/icon-512.png?v=5", type: "image/png", sizes: "512x512" },
      ],
      shortcut: "/logo/icon-32.png?v=5",
      apple: "/logo/icon-180.png?v=5",
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
    /* The registered office is the legal address and belongs here; the
       engineering hub is a place of business and goes in `location`. Both
       are real -- see offices[] in data/company.ts. */
    address: {
      "@type": "PostalAddress",
      streetAddress: "2810 N Church St, STE 89718",
      addressLocality: "Wilmington",
      addressRegion: "DE",
      postalCode: "19802",
      addressCountry: "US",
    },
    location: {
      "@type": "Place",
      name: "QentrixAI engineering hub",
      address: {
        "@type": "PostalAddress",
        streetAddress: "COLABS, 22-N, Block N, Phase 2, Johar Town",
        addressLocality: "Lahore",
        addressCountry: "PK",
      },
    },
    sameAs: [
      publicEnv.socials.linkedin,
      publicEnv.socials.instagram,
      publicEnv.socials.facebook,
      publicEnv.socials.github,
    ].filter(
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

/**
 * Marks an index page as the collection it is. Without this a crawler sees
 * /services as a page containing twenty-one links and has to infer the
 * relationship; with it, the set and its order are stated.
 *
 * `url` is absolute because ItemList entries are resolved independently of
 * the page they sit on.
 */
export function itemListJsonLd(
  name: string,
  items: { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: items.length,
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      url: abs(it.path),
    })),
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
