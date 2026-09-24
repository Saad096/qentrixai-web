/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * `next dev` and `next build` both write to `.next`, so running a build
   * while the VS Code dev task is up leaves a mixed tree: prerendered HTML
   * from one, static assets from the other. The symptom is brutal and quiet
   * -- the stylesheet 404s and every page renders completely unstyled while
   * the build still reports success.
   *
   * Production verification therefore builds and serves under its own
   * directory:  NEXT_DIST_DIR=.next-prod npm run build
   */
  distDir: process.env.NEXT_DIST_DIR || ".next",
  // The site runs on Vercel, where "standalone" is ignored and, worse, it
  // moves the server build under .next/standalone so `next start` cannot find
  // it locally. The Docker path opts in explicitly instead.
  output: process.env.NEXT_OUTPUT === "standalone" ? "standalone" : undefined,
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // Every asset is local. The old config allowed hostname "**", which lets
    // any origin be proxied through our image optimiser (audit C-05).
  },
  poweredByHeader: false,

  /**
   * Headers that actually do something against copying.
   *
   * None of this stops a scraper -- by the time a header is read the page has
   * been delivered. What it does stop is the cheap attacks that do not need a
   * scraper at all:
   *
   *   frame-ancestors  someone embedding qentrix-ai.com in an iframe on their
   *                    own domain and passing it off as their site, or
   *                    overlaying it to harvest clicks. This is the one
   *                    "lookalike site" vector a header genuinely closes.
   *   nosniff          a response being reinterpreted as a script.
   *   Referrer-Policy  our URLs leaking into other sites' analytics.
   *
   * X-Frame-Options is the legacy twin of frame-ancestors and is kept for
   * older engines that ignore CSP.
   */
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: "frame-ancestors 'none'" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Robots-Tag", value: "noai, noimageai" },
        ],
      },
    ];
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
