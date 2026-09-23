/**
 * Kiln (2026-09 revamp). Five items ordered by the buyer's journey rather
 * than the org chart: what do you do, has it worked, can you prove you
 * operate software, what is it like to buy from you, do you know your stuff.
 *
 * The nav CTA wording is identical to the hero and footer CTA. The old site
 * had three different primary CTAs pointing at two destinations.
 */
export type NavItem = { label: string; href: string };

export const primaryNav: NavItem[] = [
  { label: "What we build", href: "/services" },
  { label: "Case studies", href: "/case-studies" },
  { label: "Solutions", href: "/products" },
  { label: "How we work", href: "/about" },
  { label: "Insights", href: "/blogs" },
];

export const PRIMARY_CTA = { label: "Book a strategy call", href: "/book" } as const;

export const footerSections: { title: string; links: NavItem[] }[] = [
  {
    title: "Company",
    links: [
      { label: "How we work", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Case studies", href: "/case-studies" },
    ],
  },
  {
    title: "Work",
    links: [
      { label: "What we build", href: "/services" },
      { label: "Products", href: "/products" },
      { label: "Insights", href: "/blogs" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy policy", href: "/privacy" },
      { label: "Terms of service", href: "/terms" },
    ],
  },
];
