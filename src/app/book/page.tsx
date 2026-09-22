import { Mail, Phone, MapPin, Clock, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHeading } from "@/components/ui/PageHeading";
import { BookingCalendar } from "@/components/booking/BookingCalendar";
import { publicEnv } from "@/lib/env";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Book a strategy call",
  path: "/book",
  description:
    "Book a free 30-minute strategy call with QentrixAI. Pick a date and time, tell us what you're building, and we'll confirm by email.",
});

export default function BookPage() {
  const p = publicEnv.profile;
  const s = publicEnv.socials;

  return (
    <>
      <section className="pt-16 md:pt-24 pb-12">
        <Container>
          <PageHeading
            eyebrow="Book a call"
            title="Pick a slot. We'll take it from there."
            lede="A free 30-minute strategy call. No pitch deck, no pressure. Bring a goal, leave with a candid architecture and a realistic timeline."
            art="index-book"
          />
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="rounded-lg border border-[color:var(--color-border)] bg-surface p-6 md:p-8">
                <h2 className=" text-xl font-semibold text-text">Choose a date & time</h2>
                <p className="mt-1 text-sm text-muted">
                  All times shown in Pakistan Standard Time (PKT). We'll confirm the meeting link by email.
                </p>
                <div className="mt-6">
                  <BookingCalendar />
                </div>
              </div>
            </div>

            <aside className="lg:col-span-4 space-y-4">
              <div className="rounded-lg border border-[color:var(--color-border)] bg-surface p-6">
                <h3 className=" text-lg font-semibold text-text">Direct lines</h3>
                <ul className="mt-4 space-y-3 text-sm text-muted">
                  <li className="flex items-start gap-3">
                    <Mail className="mt-0.5 size-4 text-muted" />
                    <a href={`mailto:${p.email}`} className="hover:text-text">
                      {p.email}
                    </a>
                  </li>
                  <li className="flex items-start gap-3">
                    <Phone className="mt-0.5 size-4 text-muted" />
                    <a href={`tel:${p.phone}`} className="hover:text-text">
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
                <h3 className=" text-lg font-semibold text-text">Prefer to skip the calendar?</h3>
                <p className="mt-1 text-sm text-muted">
                  Send a brief instead, or ping us on WhatsApp. Same response time.
                </p>
                <div className="mt-4 grid gap-2">
                  {s.whatsapp && (
                    <a
                      href={s.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand to-brand px-5 py-2.5 text-sm font-medium text-white  transition-all hover:scale-[1.02] hover:brightness-110"
                    >
                      <MessageCircle className="size-4" /> WhatsApp us
                    </a>
                  )}
                  <a
                    href="/contact"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[color:var(--color-border)] bg-surface px-5 py-2.5 text-sm font-medium text-text transition-colors hover:bg-surface"
                  >
                    Send a brief instead
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
