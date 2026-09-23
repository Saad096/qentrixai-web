import { Container } from "@/components/ui/Container";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  path: "/privacy",
  description: "How QentrixAI handles personal information, project data, and communications.",
});

export default function PrivacyPage() {
  return (
    <section className="pt-16 md:pt-24 pb-24">
      <Container className="max-w-3xl">
        <h1 className=" text-4xl font-semibold tracking-tight text-text md:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-muted">Last updated: 16 May 2026</p>

        <div className="prose  mt-8 max-w-none text-muted">
          <h2 className=" text-xl font-semibold text-text">Overview</h2>
          <p>
            QentrixAI ("we", "us") provides AI engineering services and operates this
            website. This policy explains what information we collect, why, and how we handle
            it. We aim for plain language and minimum data collection.
          </p>

          <h2 className="mt-8  text-xl font-semibold text-text">Information we collect</h2>
          <ul className="list-disc pl-6 space-y-2 text-base leading-relaxed">
            <li>
              <strong>Contact form data:</strong> name, email, company, phone, budget range, service
              of interest, and the message you send us.
            </li>
            <li>
              <strong>Analytics:</strong> if enabled, privacy-respecting analytics (e.g. Plausible)
              records anonymous, aggregated page-view data with no cookies.
            </li>
            <li>
              <strong>Project data:</strong> when we engage on a project, we handle data covered by
              a written agreement (MSA / DPA). We don't reuse client data for other engagements.
            </li>
          </ul>

          <h2 className="mt-8  text-xl font-semibold text-text">How we use it</h2>
          <ul className="list-disc pl-6 space-y-2 text-base leading-relaxed">
            <li>To respond to your enquiry and follow up.</li>
            <li>To deliver the services agreed under a project contract.</li>
            <li>To improve the website (aggregated, anonymous analytics only).</li>
          </ul>

          <h2 className="mt-8  text-xl font-semibold text-text">Data sharing</h2>
          <p>
            We don't sell personal data. We use a small set of service providers (email, hosting,
            analytics) under appropriate data processing terms. For client engagements, sub-processors
            are listed in our DPA on request.
          </p>

          <h2 className="mt-8  text-xl font-semibold text-text">Your rights</h2>
          <p>
            You can request access, correction, or deletion of personal data we hold about you by
            emailing the contact below. We will respond within a reasonable timeframe.
          </p>

          <h2 className="mt-8  text-xl font-semibold text-text">Contact</h2>
          <p>
            For any privacy-related question, email{" "}
            <a className="text-link underline underline-offset-4" href="mailto:talk@qentrix-ai.com">
              talk@qentrix-ai.com
            </a>
            .
          </p>
        </div>
      </Container>
    </section>
  );
}
