import Link from "next/link";
import { Mail, ArrowUpRight, Linkedin, Github, Instagram, Facebook } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Container } from "@/components/ui/Container";
import { PRIMARY_CTA } from "@/data/navigation";
import { services } from "@/data/services";
import { industries } from "@/data/industries";
import { company } from "@/data/company";
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
 * addresses (QentrixAI has one, in Lahore, and inventing a US HQ would be a
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
      <Container>
        <div className="grid gap-12 py-16 md:py-20 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-5 max-w-[40ch] text-base text-muted">{company.mission}</p>

            <ul className="mt-7 space-y-1">
              <li>
                <a
                  href={`mailto:${publicEnv.profile.email}`}
                  className="inline-flex min-h-[44px] items-center gap-3 text-base text-text-2 transition-colors hover:text-link"
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
                  className="inline-flex min-h-[44px] items-center gap-3 text-base font-semibold text-text hover:text-link"
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
          </div>

          <div className="grid grid-cols-2 gap-8 lg:col-span-8 lg:grid-cols-4">
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
                        className="flex min-h-[40px] items-center text-base text-text-2 transition-colors hover:text-link"
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

        <div className="grid gap-8 border-t border-[color:var(--color-border)] py-10 sm:grid-cols-2">
          <div>
            <h2 className="text-base font-semibold text-text">Engineering hub, Lahore</h2>
            <p className="mt-1 text-base text-text-2">
              {publicEnv.profile.location} ·{" "}
              <a href={`tel:${publicEnv.profile.phone}`} className="hover:text-link">
                {publicEnv.profile.phone}
              </a>
            </p>
          </div>
          <div>
            <h2 className="text-base font-semibold text-text">Hours</h2>
            <p className="mt-1 text-base text-text-2">{company.hours}</p>
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
