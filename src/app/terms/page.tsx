import { Container } from "@/components/ui/Container";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Terms of Service",
  path: "/terms",
  description: "The terms governing your use of the QentrixAI website, including acceptable use, intellectual property and limitation of liability."
});

export default function TermsPage() {
  return (
    <section className="pt-16 md:pt-24 pb-24">
      <Container className="max-w-3xl">
        <h1 className=" text-4xl font-semibold tracking-tight text-text md:text-5xl">
          Terms of Service
        </h1>
        <p className="mt-3 text-sm text-muted">Last updated: 16 May 2026</p>

        <div className="prose  mt-8 max-w-none text-muted">
          <h2 className=" text-xl font-semibold text-text">Use of this site</h2>
          <p>
            This website ("Site") is provided by QentrixAI for informational purposes. Content
            is provided "as is" without warranties of any kind. By using the Site you agree to
            these Terms.
          </p>

          <h2 className="mt-8  text-xl font-semibold text-text">Engagements</h2>
          <p>
            Anything on this Site is marketing content, not a contract. Project engagements are
            governed by a separate written agreement signed by both parties (typically an MSA and
            an SOW).
          </p>

          <h2 className="mt-8  text-xl font-semibold text-text">Intellectual property</h2>
          <p>
            All Site content, including text, design, code, and graphics, is owned by QentrixAI
            or licensed to it. Don't reuse it without permission.
          </p>

          <h2 className="mt-8  text-xl font-semibold text-text">Third-party links</h2>
          <p>
            We link to third-party tools (calendar, social platforms, payment processors). Those
            services have their own terms; we're not responsible for their content.
          </p>

          <h2 className="mt-8  text-xl font-semibold text-text">Limitation of liability</h2>
          <p>
            To the maximum extent allowed by law, QentrixAI is not liable for indirect,
            incidental, or consequential damages arising from your use of the Site.
          </p>

          <h2 className="mt-8  text-xl font-semibold text-text">Changes</h2>
          <p>
            We may update these Terms over time. Material changes will be flagged at the top of
            this page.
          </p>

          <h2 className="mt-8  text-xl font-semibold text-text">Contact</h2>
          <p>
            Questions about these Terms? Email{" "}
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
