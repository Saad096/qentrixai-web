/**
 * Kiln (2026-09 revamp). Schibsted Grotesk carries display and text; DM Mono
 * is reserved for numbers, identifiers and machine strings.
 *
 * Dropped from the previous layout: Lenis smooth scroll, GSAP ScrollTrigger
 * and the magnetic cursor. All three shipped on every page and cost ~1.1s of
 * blocking time on mobile; none of them sold anything.
 */
import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, DM_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { buildMetadata, organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { publicEnv } from "@/lib/env";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

export const metadata: Metadata = buildMetadata();

export const viewport: Viewport = {
  // Aurora. These were still the Kiln values, so the browser chrome did not
  // match the page it framed.
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#E3E1D8" },
    { media: "(prefers-color-scheme: dark)", color: "#1A1A1C" },
  ],
  width: "device-width",
  initialScale: 1,
};

/**
 * Applies the stored theme before hydration. Dark is the default, so the
 * bootstrap only ever adds `.light` — a failure leaves the page on the
 * default rather than flashing.
 */
const themeBootstrap = `(function(){try{var t=localStorage.getItem("qx-theme");if(t!=="light"&&t!=="dark"){t="light";}document.documentElement.classList.toggle("light",t==="light");}catch(e){document.documentElement.classList.add("light");}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const plausible = publicEnv.analytics.plausibleDomain;
  const gaId = publicEnv.analytics.gaId;

  return (
    <html lang="en" className={`light ${jakarta.variable} ${dmMono.variable}`} suppressHydrationWarning>
      <body className="min-h-screen font-sans antialiased" suppressHydrationWarning>
        <Script id="theme-bootstrap" strategy="beforeInteractive">
          {themeBootstrap}
        </Script>
        <script id="ld-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        <script id="ld-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }}
        />
        {plausible && (
          <Script
            defer
            data-domain={plausible}
            src="https://plausible.io/js/script.js"
            strategy="afterInteractive"
          />
        )}
        {gaId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`}
            </Script>
          </>
        )}

        <a
          href="#main"
          className="sr-only rounded-sm bg-brand px-4 py-3 focus:min-h-[44px] focus:items-center text-sm font-semibold text-on-brand focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100]"
        >
          Skip to content
        </a>

        <Header />
        <main id="main">{children}</main>
        <Footer />
        <ScrollReveal />
      </body>
    </html>
  );
}
