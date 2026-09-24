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
            or licensed to it. Don&rsquo;t reuse it without permission.
          </p>

          {/* The enforceable part. A scraper cannot be stopped at the wire --
              anything a browser renders has already been delivered -- so the
              remedy for a copied site is contractual and legal, and that
              requires the prohibition to be stated rather than implied. */}
          <h2 className="mt-8  text-xl font-semibold text-text">
            Automated access, scraping and AI training
          </h2>
          <p>
            You may not use automated means to copy this Site. That includes crawlers, scrapers,
            browser extensions, headless browsers and AI agents, whether operated by you or on
            your behalf. Specifically, and without our prior written permission, you may not:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5">
            <li>
              Extract, copy or store the Site&rsquo;s text, images, illustrations, layout, styling
              or source in bulk, by any automated method.
            </li>
            <li>
              Use the Site&rsquo;s content as training data, fine-tuning data, or retrieval corpus
              for a machine-learning model.
            </li>
            <li>
              Reproduce the Site&rsquo;s design, structure or copy to create a derivative or
              substantially similar website, including by giving this Site to a generative tool
              and asking it to build something that resembles it.
            </li>
            <li>
              Circumvent our <a className="text-link underline underline-offset-4" href="/robots.txt">robots.txt</a>,
              rate limits or other access controls.
            </li>
          </ul>
          <p className="mt-4">
            Our robots.txt disallows AI and scraping crawlers. Accessing the Site by an automated
            means it disallows is unauthorised access under these Terms, regardless of whether the
            request was technically permitted. Our case studies, product descriptions and written
            research are original work; copying them is copyright infringement, and we will pursue
            it.
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
