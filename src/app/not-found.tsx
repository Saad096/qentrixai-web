import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

/**
 * The old 404 said "That route hasn't been wired up yet" -- developer voice
 * on a customer-facing page. An empty screen is an invitation to act.
 */
export default function NotFound() {
  const links = [
    { label: "Case studies", href: "/case-studies" },
    { label: "Products", href: "/products" },
    { label: "What we build", href: "/services" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <section className="py-24 md:py-32">
      <Container>
        <p className="font-mono text-xs text-muted">404</p>
        <h1 className="mt-4 max-w-[18ch] text-3xl font-bold text-text">
          That page has moved or never existed.
        </h1>
        <p className="mt-5 max-w-measure text-md text-muted">Here is where most people are heading.</p>

        <ul className="mt-9 max-w-measure">
          {links.map((l) => (
            <li key={l.href} className="border-t border-[color:var(--color-border)]">
              <Link
                href={l.href}
                className="flex min-h-[60px] items-center text-md text-text hover:text-link"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <Button href="/">Back to the homepage</Button>
        </div>
      </Container>
    </section>
  );
}
