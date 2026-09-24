import type { MetadataRoute } from "next";
import { publicEnv } from "@/lib/env";

export default function robots(): MetadataRoute.Robots {
  const base = publicEnv.siteUrl.replace(/\/$/, "");
  return {
    rules: [
      /* Search engines: allowed, and the reason the sitemap exists.
         /api is machine surface with nothing to index. */
      { userAgent: "*", allow: "/", disallow: ["/api/"] },

      /* AI crawlers: disallowed on the owner's instruction, 2026-09-24.
         Everything below is honour-system -- robots.txt is a request, not a
         control. A crawler that ignores it is unaffected, and nothing here
         stops a person, an extension or an agent driving a real browser,
         because by then the page has already been delivered.

         This is a deliberate trade the owner made with the consequence
         stated: the citation crawlers are in this list too, so the site is
         also opting out of being cited in ChatGPT, Perplexity and Gemini
         answers -- which is the visibility /services/aeo-and-geo sells.
         Removing OAI-SearchBot, ChatGPT-User and PerplexityBot from this
         list is the one-line change that buys that back while keeping the
         training crawlers out. */
      ...[
        // OpenAI
        "GPTBot",            // training
        "OAI-SearchBot",     // citation in ChatGPT answers
        "ChatGPT-User",      // live fetch when a user asks about a page
        // Anthropic
        "ClaudeBot",
        "anthropic-ai",
        "Claude-Web",
        "Claude-User",
        "Claude-SearchBot",
        // Google (Google-Extended governs Gemini training only; Googlebot
        // is untouched above, so Search is unaffected)
        "Google-Extended",
        // Perplexity
        "PerplexityBot",
        "Perplexity-User",
        // Meta
        "meta-externalagent",
        "FacebookBot",
        // Common Crawl -- the corpus most other models are trained from
        "CCBot",
        // ByteDance, Amazon, Apple, Cohere, Mistral, Diffbot, Omgili
        "Bytespider",
        "Amazonbot",
        "Applebot-Extended",
        "cohere-ai",
        "cohere-training-data-crawler",
        "MistralAI-User",
        "Diffbot",
        "omgili",
        "omgilibot",
        // Scraping-as-a-service
        "Scrapy",
        "magpie-crawler",
        "DataForSeoBot",
        "AwarioRssBot",
        "AwarioSmartBot",
        "ImagesiftBot",
        "img2dataset",
        "peer39_crawler",
        "TurnitinBot",
        "Timpibot",
        "VelenPublicWebCrawler",
        "Webzio-Extended",
        "YouBot",
        "SemrushBot-OCOB",
        "PetalBot",
      ].map((userAgent) => ({ userAgent, disallow: "/" })),
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
