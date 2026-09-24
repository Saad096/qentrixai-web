import type { MetadataRoute } from "next";
import { publicEnv } from "@/lib/env";

export default function robots(): MetadataRoute.Robots {
  const base = publicEnv.siteUrl.replace(/\/$/, "");
  return {
    rules: [
      /* Search engines: allowed, and the reason the sitemap exists.
         /api is machine surface with nothing to index. */
      { userAgent: "*", allow: "/", disallow: ["/api/"] },

      /* AI crawlers, split by what they are for -- owner's decision
         2026-09-24, revised from "block everything".

         The distinction matters because the two jobs are done by different
         agents. A training crawler takes the corpus. A search or
         user-initiated crawler fetches a page because someone asked an
         assistant about it, and cites the source. Blocking both is what
         makes a company invisible in the place buyers increasingly start.

         So: bulk harvesters are disallowed, the ones that put us in an
         answer with a link are allowed. That is also the position
         /services/aeo-and-geo sells, so the site now matches its own
         advice.

         All of it is honour-system. A scraper that ignores robots.txt is
         unaffected -- verified by fetching this site with curl after these
         rules went live and getting the full page. Enforcement is the
         Vercel Bot Protection challenge, not this file. */
      ...[
        // Bulk training corpora and harvesters.
        "GPTBot",
        "ClaudeBot",
        "anthropic-ai",
        "Claude-Web",
        "CCBot",
        "Bytespider",
        "meta-externalagent",
        "FacebookBot",
        "Amazonbot",
        "Applebot-Extended",
        "cohere-ai",
        "cohere-training-data-crawler",
        "Diffbot",
        "omgili",
        "omgilibot",
        "ImagesiftBot",
        "img2dataset",
        "Timpibot",
        "Webzio-Extended",
        "VelenPublicWebCrawler",
        // Scraping-as-a-service and SEO harvesters.
        "Scrapy",
        "magpie-crawler",
        "DataForSeoBot",
        "AwarioRssBot",
        "AwarioSmartBot",
        "peer39_crawler",
        "TurnitinBot",
        "SemrushBot-OCOB",
        "PetalBot",
      ].map((userAgent) => ({ userAgent, disallow: "/" })),

      /* Allowed on purpose: these are how an assistant answers "what is
         QentrixAI" with a link back here. Named explicitly rather than left
         to the wildcard, so a future edit cannot sweep them up by accident.

         Google-Extended is in here because it governs Gemini grounding as
         well as training -- blocking it removes us from Gemini answers.
         That is the one entry with a real trade attached. */
      ...[
        "OAI-SearchBot",     // ChatGPT search index
        "ChatGPT-User",      // a user asked ChatGPT about a page
        "Claude-User",       // a user asked Claude about a page
        "Claude-SearchBot",  // Claude search index
        "PerplexityBot",     // Perplexity index
        "Perplexity-User",   // a user asked Perplexity
        "MistralAI-User",    // a user asked Le Chat
        "YouBot",
        "Google-Extended",   // Gemini grounding, and training with it
      ].map((userAgent) => ({ userAgent, allow: "/", disallow: ["/api/"] })),
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
