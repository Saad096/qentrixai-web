import type { MetadataRoute } from "next";
import { publicEnv } from "@/lib/env";

export default function robots(): MetadataRoute.Robots {
  const base = publicEnv.siteUrl.replace(/\/$/, "");
  return {
    /* /api is machine surface with nothing to index.
       The /scene-preview disallow is gone with the route: it was a working
       contact sheet for the artwork and was deleted in the cleanup, and a
       robots rule naming a route that 404s is just noise a crawler has to
       parse. */
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
