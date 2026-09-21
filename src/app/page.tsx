import { Hero } from "@/components/sections/Hero";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { TheGap } from "@/components/sections/TheGap";
import { WhatWeBuild } from "@/components/sections/WhatWeBuild";
import { Sovereign } from "@/components/sections/Sovereign";
import { InferenceEconomics } from "@/components/sections/InferenceEconomics";
import { ProductsRow } from "@/components/sections/ProductsRow";
import { HowWeWork } from "@/components/sections/HowWeWork";
import { Industries } from "@/components/sections/Industries";
import { WhyUs } from "@/components/sections/WhyUs";
import { InsightsRow } from "@/components/sections/InsightsRow";
import { FaqCta } from "@/components/sections/FaqCta";
import { buildMetadata, faqJsonLd } from "@/lib/seo";
import { faqs } from "@/data/faqs";

export const metadata = buildMetadata({ path: "/" });

/**
 * Ten sections, down from seventeen. Order is the buyer's order: claim and
 * proof, then evidence, then the problem, then the offer.
 */
export default function HomePage() {
  return (
    <>
      <script id="ld-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }}
      />
      <Hero />
      <SelectedWork />
      <TheGap />
      <WhatWeBuild />
      <Sovereign />
      <InferenceEconomics />
      <ProductsRow />
      <HowWeWork />
      <Industries />
      <WhyUs />
      <InsightsRow />
      <FaqCta />
    </>
  );
}
