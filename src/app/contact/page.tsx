import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Linkedin,
  Github,
  Instagram,
  Facebook,
  CalendarClock,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHeading } from "@/components/ui/PageHeading";
import { Button } from "@/components/ui/Button";
import { ContactForm } from "@/components/forms/ContactForm";
import { FaqCta } from "@/components/sections/FaqCta";
import { publicEnv, getBookingUrl } from "@/lib/env";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact",
  path: "/contact",
  description:
    "Talk to QentrixAI about your AI project. Book a strategy call, send a brief, or reach us on email or WhatsApp.",
});

export default function ContactPage() {
  const p = publicEnv.profile;
  const s = publicEnv.socials;
  const booking = getBookingUrl();

  return (
    <>
      <script
        id="ld-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Contact", path: "/contact" },
            ])
          ),
        }}
      />
      <section className="pt-16 md:pt-24 pb-12">
        <Container>
          <PageHeading
            eyebrow="Contact"
            title="Tell us about the problem. We'll tell you straight."
            lede="A 30-minute strategy call, a brief by email, or a quick WhatsApp ping, whichever fits how you work. We read every message and respond within one business day."
            art="index-contact"
          />
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="rounded-lg border border-[color:var(--color-border)] bg-surface p-6 md:p-8">
                <h2 className=" text-xl font-semibold text-text">Send a brief</h2>
                <p className="mt-1 text-sm text-muted">
                  Anything you can share helps: problem, timeline, stack constraints, success metric.
                </p>
                <div className="mt-6">
                  <ContactForm />
                </div>
              </div>
            </div>

            <aside className="lg:col-span-5 space-y-4">
              <div className="rounded-lg border border-[color:var(--color-border)] bg-surface p-6">
                <h3 className=" text-lg font-semibold text-text">Direct lines</h3>
                <ul className="mt-4 space-y-3 text-sm text-muted">
                  {/* The two that are links get a 44px box; the address
                      below them is not tappable and keeps its line box. */}
                  <li className="flex items-center gap-3">
                    <Mail className="size-4 shrink-0 text-muted" />
                    <a
                      href={`mailto:${p.email}`}
                      className="flex min-h-[44px] items-center hover:text-text"
                    >
                      {p.email}
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <Phone className="size-4 shrink-0 text-muted" />
                    <a
                      href={`tel:${p.phone}`}
                      className="flex min-h-[44px] items-center hover:text-text"
                    >
                      {p.phone}
                    </a>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin className="mt-0.5 size-4 text-muted" />
                    <span>{p.location}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock className="mt-0.5 size-4 text-muted" />
                    <span>Mon – Sat · 9:00 – 19:00 PKT</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border border-[color:var(--color-border)] bg-gradient-to-br from-brand/15 via-transparent to-accent/10 p-6">
                <h3 className=" text-lg font-semibold text-text">Skip the form</h3>
                <p className="mt-1 text-sm text-muted">
                  Book a 30-minute strategy call, or ping us on WhatsApp. Same response time.
                </p>
                <div className="mt-4 grid gap-2">
                  <Button href={booking} className="w-full">
                    <CalendarClock className="size-4" /> Book a strategy call
                  </Button>
                  {s.whatsapp && (
                    <Button href={s.whatsapp} variant="secondary" className="w-full">
                      <MessageCircle className="size-4" /> WhatsApp
                    </Button>
                  )}
                </div>
              </div>

              <div className="rounded-lg border border-[color:var(--color-border)] bg-surface p-6">
                <h3 className=" text-lg font-semibold text-text">Elsewhere</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {s.linkedin && (
                    <a
                      href={s.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[color:var(--color-border)] bg-surface px-4 text-sm text-text-2 hover:border-brand"
                    >
                      <Linkedin className="size-3.5" /> LinkedIn
                    </a>
                  )}
                  {s.github && (
                    <a
                      href={s.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[color:var(--color-border)] bg-surface px-4 text-sm text-text-2 hover:border-brand"
                    >
                      <Github className="size-3.5" /> GitHub
                    </a>
                  )}
                  {s.instagram && (
                    <a
                      href={s.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[color:var(--color-border)] bg-surface px-4 text-sm text-text-2 hover:border-brand"
                    >
                      <Instagram className="size-3.5" /> Instagram
                    </a>
                  )}
                  {s.facebook && (
                    <a
                      href={s.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[color:var(--color-border)] bg-surface px-4 text-sm text-text-2 hover:border-brand"
                    >
                      <Facebook className="size-3.5" /> Facebook
                    </a>
                  )}
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <FaqCta />
    </>
  );
}
