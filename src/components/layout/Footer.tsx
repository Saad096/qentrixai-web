import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Container } from "@/components/ui/Container";
import { footerSections, PRIMARY_CTA } from "@/data/navigation";
import { publicEnv } from "@/lib/env";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[color:var(--color-border)]">
      <Container>
        <div className="grid gap-12 py-16 md:grid-cols-12 md:py-20">
          <div className="md:col-span-5">
            <Logo />
            <p className="mt-5 max-w-[38ch] text-base text-muted">
              An AI product studio in Lahore, working across 12 time zones.
            </p>
            <div className="mt-6 flex flex-col gap-1 font-mono text-xs text-muted">
              <a href={`mailto:${publicEnv.profile.email}`} className="inline-flex min-h-[44px] items-center hover:text-text">
                {publicEnv.profile.email}
              </a>
              <a href={`tel:${publicEnv.profile.phone}`} className="inline-flex min-h-[44px] items-center hover:text-text">
                {publicEnv.profile.phone}
              </a>
              <span className="inline-flex min-h-[44px] items-center">Mon to Sat, 9:00-19:00 PKT</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 md:col-span-7 md:grid-cols-3">
            {footerSections.map((group) => (
              <div key={group.title}>
                <h2 className="text-sm font-semibold text-text">{group.title}</h2>
                <ul className="mt-3">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="inline-flex min-h-[44px] items-center text-base text-muted hover:text-text"
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

        <div className="flex flex-col gap-4 border-t border-[color:var(--color-border)] py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs text-muted">
            {year} QentrixAI. All rights reserved.
          </p>
          <Link
            href={PRIMARY_CTA.href}
            className="inline-flex min-h-[44px] items-center text-base font-semibold text-link hover:brightness-110"
          >
            {PRIMARY_CTA.label}
          </Link>
        </div>
      </Container>
    </footer>
  );
}
