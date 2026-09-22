import type { MetadataRoute } from "next";
import { publicEnv } from "@/lib/env";

export default function robots(): MetadataRoute.Robots {
  const base = publicEnv.siteUrl.replace(/\/$/, "");
  return {
    /* /scene-preview is a working contact sheet for the artwork, not a
       page anyone should land on from search. It already carries a noindex
       in its metadata; this covers crawlers that decide from robots.txt
       before fetching. /api is machine surface with nothing to index. */
    rules: [{ userAgent: "*", allow: "/", disallow: ["/scene-preview", "/api/"] }],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
