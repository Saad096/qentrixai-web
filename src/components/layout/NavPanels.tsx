"use client";

/**
 * The contents of each nav dropdown.
 *
 * The owner asked for every tab to behave like the services one. The
 * interaction is shared (NavMenu); what differs is what each panel is for:
 *
 *   What we build   21 capabilities in four groups, plus the promoted one
 *   Case studies    the six, by the technique each demonstrates
 *   Solutions       the products we operate, plus the industries they serve
 *   How we work     the five phases, and the artifact each hands over
 *   Insights        the most recent writing
 *
 * Every panel ends with the route the tab would have gone to on its own, so
 * making the trigger a button never costs anyone the hub page.
 */
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { NavMenu, NavColumn } from "./NavMenu";
import { services, SERVICE_GROUPS } from "@/data/services";
import { caseStudies } from "@/data/caseStudies";
import { products } from "@/data/products";
import { industries } from "@/data/industries";
import { phases } from "@/data/company";
import { blogs } from "@/data/blogs";

const itemClass =
  "flex min-h-[40px] items-center rounded-sm text-base font-medium text-text transition-colors hover:text-link";
const footClass =
  "inline-flex min-h-[44px] items-center text-base font-semibold text-link underline-offset-4 hover:underline";

function PanelFoot({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-6 flex flex-wrap items-center gap-x-8 border-t border-[color:var(--color-border)] pt-4">
      {children}
    </div>
  );
}

export function ServicesMenu({ active }: { active: boolean }) {
  return (
    <NavMenu id="menu-services" label="What we build" active={active} width="w-[min(94vw,980px)]">
      <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
        {SERVICE_GROUPS.map((group) => (
          <NavColumn key={group} title={group}>
            {services
              .filter((s) => s.group === group)
              .map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className={itemClass}>
                    {s.title}
                  </Link>
                </li>
              ))}
          </NavColumn>
        ))}
      </div>

      {/* Sovereign AI was one line in a list of twenty-one, which is not
          where the market is. It gets the promoted slot. */}
      <Link
        href="/services/sovereign-ai"
        className="mt-7 flex flex-col gap-1.5 rounded-md bg-brand p-5 text-on-brand transition-[filter] hover:brightness-110 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
      >
        <span>
          <span className="flex items-center gap-2.5">
            <ShieldCheck aria-hidden="true" className="size-[18px]" />
            <span className="text-md font-bold">Sovereign and private AI</span>
          </span>
          <span className="mt-1.5 block text-base">
            Open-weight models air-gapped on your servers, in your own cloud account, or at the
            edge. Inference stays inside your boundary, not just storage.
          </span>
        </span>
        <span className="shrink-0 whitespace-nowrap font-mono text-xs">{"Read more →"}</span>
      </Link>

      <PanelFoot>
        <Link href="/services" className={footClass}>
          {`View all ${services.length} capabilities →`}
        </Link>
        <Link href="/industries" className={footClass}>
          {"Browse by industry →"}
        </Link>
      </PanelFoot>
    </NavMenu>
  );
}

export function CaseStudiesMenu({ active }: { active: boolean }) {
  return (
    <NavMenu id="menu-cases" label="Case studies" active={active} width="w-[min(94vw,720px)]">
      <ul className="grid gap-x-8 gap-y-1 sm:grid-cols-2">
        {caseStudies.map((c) => (
          <li key={c.slug}>
            <Link href={`/case-studies/${c.slug}`} className="block rounded-sm py-2">
              <span className="block text-xs font-semibold uppercase tracking-[0.08em] text-link">
                {c.category}
              </span>
              <span className="mt-0.5 block text-base font-medium text-text">{c.title}</span>
            </Link>
          </li>
        ))}
      </ul>
      <PanelFoot>
        <Link href="/case-studies" className={footClass}>
          {`All ${caseStudies.length} case studies →`}
        </Link>
      </PanelFoot>
    </NavMenu>
  );
}

export function SolutionsMenu({ active }: { active: boolean }) {
  return (
    <NavMenu id="menu-solutions" label="Solutions" active={active} width="w-[min(94vw,860px)]">
      <div className="grid gap-x-8 gap-y-7 sm:grid-cols-3">
        <NavColumn title="Products we run">
          {products.slice(0, 6).map((p) => (
            <li key={p.slug}>
              <Link href={`/products/${p.slug}`} className={itemClass}>
                {p.name}
              </Link>
            </li>
          ))}
        </NavColumn>
        <NavColumn title="Also ours">
          {products.slice(6).map((p) => (
            <li key={p.slug}>
              <Link href={`/products/${p.slug}`} className={itemClass}>
                {p.name}
              </Link>
            </li>
          ))}
        </NavColumn>
        <NavColumn title="By industry">
          {industries.slice(0, 6).map((i) => (
            <li key={i.slug}>
              <Link href={`/industries/${i.slug}`} className={itemClass}>
                {i.name}
              </Link>
            </li>
          ))}
        </NavColumn>
      </div>
      <PanelFoot>
        <Link href="/products" className={footClass}>
          {`All ${products.length} products →`}
        </Link>
        <Link href="/industries" className={footClass}>
          {`All ${industries.length} industries →`}
        </Link>
      </PanelFoot>
    </NavMenu>
  );
}

export function HowWeWorkMenu({ active }: { active: boolean }) {
  return (
    <NavMenu id="menu-how" label="How we work" active={active} width="w-[min(94vw,820px)]">
      <ol className="grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
        {phases.map((p) => (
          <li key={p.step}>
            <Link href="/about#how-we-work" className="block rounded-sm py-1">
              <span className="text-xs font-semibold uppercase tracking-[0.08em] text-link">
                {p.step}
              </span>
              <span className="mt-0.5 block text-base font-medium text-text">{p.title}</span>
              <span className="mt-0.5 block text-base text-text-2">You own {p.artifact}</span>
            </Link>
          </li>
        ))}
      </ol>
      <PanelFoot>
        <Link href="/about" className={footClass}>
          {"How we work →"}
        </Link>
        <Link href="/careers" className={footClass}>
          {"Careers →"}
        </Link>
        <Link href="/contact" className={footClass}>
          {"Contact →"}
        </Link>
      </PanelFoot>
    </NavMenu>
  );
}

export function InsightsMenu({ active }: { active: boolean }) {
  const recent = [...blogs]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 6);
  return (
    <NavMenu id="menu-insights" label="Insights" active={active} width="w-[min(94vw,720px)]">
      <ul className="grid gap-x-8 gap-y-1 sm:grid-cols-2">
        {recent.map((b) => (
          <li key={b.slug}>
            <Link href={`/blogs/${b.slug}`} className="block rounded-sm py-2">
              <span className="block text-xs font-semibold uppercase tracking-[0.08em] text-link">
                {b.category}
              </span>
              <span className="mt-0.5 block text-base font-medium text-text">{b.title}</span>
            </Link>
          </li>
        ))}
      </ul>
      <PanelFoot>
        <Link href="/blogs" className={footClass}>
          {`All ${blogs.length} articles →`}
        </Link>
      </PanelFoot>
    </NavMenu>
  );
}

/** Maps a nav href to its panel, so Header stays a layout file. */
export const NAV_MENUS: Record<string, (p: { active: boolean }) => React.ReactElement> = {
  "/services": ServicesMenu,
  "/case-studies": CaseStudiesMenu,
  "/products": SolutionsMenu,
  "/about": HowWeWorkMenu,
  "/blogs": InsightsMenu,
};
