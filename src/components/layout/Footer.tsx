import Link from "next/link";
import { Mail, ArrowUpRight, Linkedin, Github, Instagram, Facebook } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Container } from "@/components/ui/Container";
import { PRIMARY_CTA } from "@/data/navigation";
import { services } from "@/data/services";
import { industries } from "@/data/industries";
import { company, offices } from "@/data/company";
import { publicEnv } from "@/lib/env";

/**
 * Footer, on the reference's structure: a brand column with the positioning
 * line and the two ways to make contact, then link columns, then the office
 * block, then the legal row.
 *
 * Navy in both themes, which is how the reference does it: the site is
 * light and the footer is the one deep band that closes it.
 *
 * What is deliberately NOT carried across from the reference: its two office
 * addresses. QentrixAI has two as of 2026-09-22, both supplied by the owner;
 * the earlier note here said it had one and that inventing a US HQ would be a
 * lie a buyer can check) and its "Reviewed on Clutch 5.0" badge (we have no
 * Clutch rating, and a fabricated review score is the worst thing on a page
 * whose whole argument is that the proof is real).
 */
const COLUMNS = [
  {
    title: "Build",
    links: services
      .filter((s) => s.group === "Build")
      .slice(0, 6)
      .map((s) => ({ label: s.title, href: `/services/${s.slug}` })),
  },
  {
    title: "Deploy and operate",
    links: services
      .filter((s) => s.group === "Deploy and operate")
      .map((s) => ({ label: s.title, href: `/services/${s.slug}` })),
  },
  {
    title: "Industries",
    // Every one of these used to point at /#industries -- six labels, one
    // destination. They have their own pages now.
    links: [
      ...industries.slice(0, 5).map((i) => ({ label: i.name, href: `/industries/${i.slug}` })),
      { label: "All industries", href: "/industries" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "How we work", href: "/about" },
      { label: "Case studies", href: "/case-studies" },
      { label: "Products", href: "/products" },
      { label: "Insights", href: "/blogs" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

const SOCIALS = [
  { label: "LinkedIn", href: publicEnv.socials.linkedin, Icon: Linkedin },
  { label: "GitHub", href: publicEnv.socials.github, Icon: Github },
  { label: "Instagram", href: publicEnv.socials.instagram, Icon: Instagram },
  { label: "Facebook", href: publicEnv.socials.facebook, Icon: Facebook },
].filter((s) => s.href);

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer-deep border-t border-[color:var(--color-border)]">
      <Container width="footer">
        {/* Brand block above the columns, not beside them. Sharing the row
            left the four link columns about 300px each, and every label here
            is a sentence rather than a word, so they kept wrapping to two
            lines however the split was tuned. Full width, four columns, and
            they fit on one line each.

            Centred, and the positioning line runs the width of the footer
            rather than being capped at 46ch on the left: at full width a
            left-pinned block with the whole footer empty beside it was the
            one thing in here that did not line up with anything. The two
            ways to make contact sit under it as a centred pair. */}
        <div className="py-14 text-center md:py-16">
          <div className="flex justify-center">
            <Logo />
          </div>
          <p className="mx-auto mt-5 max-w-[70ch] text-base text-muted">{company.mission}</p>

          <ul className="mt-7 flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-8">
              <li>
                <a
                  href={`mailto:${publicEnv.profile.email}`}
                  className="inline-flex min-h-[44px] items-center gap-3 rounded-full px-3 text-base text-text-2 transition-[background-color,color,box-shadow] hover:bg-surface hover:text-text hover:shadow-1"
                >
                  <span
                    aria-hidden="true"
                    className="grid size-8 shrink-0 place-items-center rounded-md bg-surface ring-1 ring-[color:var(--color-border)]"
                  >
                    <Mail className="size-4" />
                  </span>
                  {publicEnv.profile.email}
                </a>
              </li>
              <li>
                <Link
                  href={PRIMARY_CTA.href}
                  className="inline-flex min-h-[44px] items-center gap-3 rounded-full px-3 text-base font-semibold text-text transition-[background-color,box-shadow] hover:bg-surface hover:shadow-1"
                >
                  <span
                    aria-hidden="true"
                    className="grid size-8 shrink-0 place-items-center rounded-md bg-surface ring-1 ring-[color:var(--color-border)]"
                  >
                    <ArrowUpRight className="size-4" />
                  </span>
                  {PRIMARY_CTA.label}
                </Link>
              </li>
            </ul>

          {/* text-left, because the brand block above is centred and the
              centring was cascading down here: the column headings sat in
              the middle of columns whose links were left-aligned under
              them. */}
          <div className="mt-14 grid grid-cols-2 gap-x-10 gap-y-8 text-left lg:grid-cols-4">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <h2 className="text-xs font-semibold uppercase tracking-[0.1em] text-text">
                  {col.title}
                </h2>
                <ul className="mt-3">
                  {col.links.map((link) => (
                    <li key={col.title + link.label}>
                      <Link
                        href={link.href}
                        className="-mx-2.5 flex min-h-[44px] items-center rounded-md px-2.5 py-1.5 text-base leading-snug text-text-2 transition-[background-color,color,box-shadow] hover:bg-surface hover:text-text hover:shadow-1"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Same four-column grid and same gutter as the link block above, so
            the two rows line up rather than each finding its own rhythm. */}
        <div className="grid grid-cols-2 gap-x-10 gap-y-8 border-t border-[color:var(--color-border)] py-10 lg:grid-cols-4">
          {offices.map((o) => (
            <div key={o.city}>
              <h2 className="text-xs font-semibold uppercase tracking-[0.1em] text-text">
                {o.kind}
              </h2>
              <address className="mt-2 not-italic text-base text-text-2">
                {o.lines.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </address>
            </div>
          ))}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.1em] text-text">Hours</h2>
            <p className="mt-2 text-base text-text-2">{company.hours}</p>
          </div>
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.1em] text-text">Talk to us</h2>
            <p className="mt-2 text-base text-text-2">
              {/* min-h rather than a bare line box. These were 26px tall,
                  which is a thumb-sized miss on a phone. */}
              <a
                href={`mailto:${publicEnv.profile.email}`}
                className="-mx-2.5 flex min-h-[44px] items-center rounded-md px-2.5 transition-[background-color,color,box-shadow] hover:bg-surface hover:text-text hover:shadow-1"
              >
                {publicEnv.profile.email}
              </a>
              <a
                href={`tel:${publicEnv.profile.phone}`}
                className="-mx-2.5 flex min-h-[44px] items-center rounded-md px-2.5 transition-[background-color,color,box-shadow] hover:bg-surface hover:text-text hover:shadow-1"
              >
                {publicEnv.profile.phone}
              </a>
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-5 border-t border-[color:var(--color-border)] py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex flex-wrap items-center gap-x-6 gap-y-1 text-xs text-text-2">
            <span>{year} QentrixAI. All rights reserved.</span>
            <Link href="/privacy" className="inline-flex min-h-[44px] items-center hover:text-text">
              Privacy
            </Link>
            <Link href="/terms" className="inline-flex min-h-[44px] items-center hover:text-text">
              Terms
            </Link>
          </p>

          <ul className="flex items-center gap-2">
            {SOCIALS.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid size-11 place-items-center rounded-full text-muted ring-1 ring-[color:var(--color-border)] transition-colors hover:text-text"
                >
                  <Icon className="size-[18px]" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
