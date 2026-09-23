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
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
