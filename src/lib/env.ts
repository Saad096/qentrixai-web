/**
 * Public, browser-safe env helpers. All values originate from NEXT_PUBLIC_* env
 * variables so they can be inlined at build time. Missing values fall back to
 * sensible defaults so the UI never breaks.
 */

const pick = (v: string | undefined, fallback = "") => (v && v.trim().length > 0 ? v : fallback);

export const publicEnv = {
  // The apex host 308-redirects to www, so the canonical must be www or every
  // canonical points at a redirect (audit B-06). Vercel env must match this.
  siteUrl: pick(process.env.NEXT_PUBLIC_SITE_URL, "https://www.qentrix-ai.com"),
  siteName: pick(process.env.NEXT_PUBLIC_SITE_NAME, "QentrixAI"),

  profile: {
    name: pick(process.env.NEXT_PUBLIC_PROFILE_NAME, "Saad Alam"),
    role: pick(
      process.env.NEXT_PUBLIC_PROFILE_ROLE,
      "AI & Data Science Consultant | GenAI & Agentic AI Specialist"
    ),
    tagline: pick(
      process.env.NEXT_PUBLIC_PROFILE_TAGLINE,
      "AI systems that make it to production"
    ),
    email: pick(process.env.NEXT_PUBLIC_PROFILE_EMAIL, "talk@qentrix-ai.com"),
    phone: pick(process.env.NEXT_PUBLIC_PROFILE_PHONE, "+923196828506"),
    location: pick(process.env.NEXT_PUBLIC_PROFILE_LOCATION, "Lahore, Pakistan"),
    availability: pick(
      process.env.NEXT_PUBLIC_PROFILE_AVAILABILITY,
      "Open for Projects, Ideas & Remote Positions"
    ),
    resumeUrl: pick(process.env.NEXT_PUBLIC_PROFILE_RESUME_URL, "/api/resume"),
  },

  socials: {
    linkedin: pick(
      process.env.NEXT_PUBLIC_PROFILE_LINKEDIN,
      "https://www.linkedin.com/company/qentrixai"
    ),
    upwork: pick(
      process.env.NEXT_PUBLIC_PROFILE_UPWORK,
      "https://www.upwork.com/freelancers/~016509a74d546ffb23"
    ),
    fiverr: pick(process.env.NEXT_PUBLIC_PROFILE_FIVERR, "https://www.fiverr.com/saadalam340"),
    freelancer: pick(
      process.env.NEXT_PUBLIC_PROFILE_FREELANCER,
      "https://www.freelancer.com/u/SaadAlam106"
    ),
    github: pick(process.env.NEXT_PUBLIC_PROFILE_GITHUB, "https://github.com/Saad096"),
    whatsapp: pick(process.env.NEXT_PUBLIC_PROFILE_WHATSAPP, "https://wa.me/923196828506"),
    instagram: pick(
      process.env.NEXT_PUBLIC_PROFILE_INSTAGRAM,
      "https://www.instagram.com/saadalam9657"
    ),
  },

  team: {
    shahidLinkedIn: pick(process.env.NEXT_PUBLIC_TEAM_SHAHID_LINKEDIN, ""),
    saadLinkedIn: pick(
      process.env.NEXT_PUBLIC_TEAM_SAAD_LINKEDIN,
      "https://www.linkedin.com/in/saad-alam-b9a304217/"
    ),
    shafaatLinkedIn: pick(process.env.NEXT_PUBLIC_TEAM_SHAFAAT_LINKEDIN, ""),
    mawraLinkedIn: pick(process.env.NEXT_PUBLIC_TEAM_MAWRA_LINKEDIN, ""),
  },

  analytics: {
    plausibleDomain: pick(process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN, ""),
    gaId: pick(process.env.NEXT_PUBLIC_GA_ID, ""),
  },
};

/**
 * Booking is handled in-house — every "Book a call" CTA points here.
 */
export function getBookingUrl(): string {
  return "/book";
}

export type PublicEnv = typeof publicEnv;
