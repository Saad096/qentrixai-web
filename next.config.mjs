/** @type {import('next').NextConfig} */
const nextConfig = {
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
