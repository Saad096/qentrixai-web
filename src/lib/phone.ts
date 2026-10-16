/**
 * Phone numbers, stored once and displayed properly.
 *
 * The site stored "+13026653382" and printed it exactly like that, which is
 * how a database holds a number, not how a person reads one. E.164 is the
 * right storage and the right value for `tel:` and for JSON-LD; it is the
 * wrong thing to put in front of a buyer.
 *
 * So: one canonical E.164 string per number, and these helpers decide what
 * each context gets. `format` groups it, `tel` strips it back down.
 *
 * Grouping is per dialling plan rather than a generic every-three-digits
 * rule, because the groups carry meaning -- 302 is a Delaware area code and
 * 319 is a Pakistani mobile prefix, and breaking either in the wrong place
 * makes a correct number look like a typo.
 */

/** National-number group sizes, by country calling code. */
const PLANS: Record<string, number[]> = {
  /* NANP: area code, exchange, line. */
  "1": [3, 3, 4],
  /* Pakistan mobile: 3-digit operator prefix, then 7 digits. */
  "92": [3, 3, 4],
  "44": [4, 6],
  "91": [5, 5],
  "971": [2, 3, 4],
};

/** Digits only, with the leading +. What `tel:` and schema.org want. */
export function telHref(input: string) {
  const digits = input.replace(/\D/g, "");
  return `tel:+${digits}`;
}

/** `https://wa.me/<digits>` — wa.me takes no +, no spaces. */
export function whatsappHref(input: string) {
  /* Already a link (a legacy env value, say): leave it alone. */
  if (/^https?:\/\//i.test(input)) return input;
  const digits = input.replace(/\D/g, "");
  return digits ? `https://wa.me/${digits}` : "";
}

/**
 * "+13026653382" -> "+1 302 665 3382".
 *
 * An unknown country code still gets split off from the rest rather than
 * returned untouched, so a number we have no plan for is at least readable.
 */
export function formatPhone(input: string) {
  const digits = input.replace(/\D/g, "");
  if (!digits) return "";

  /* Longest matching calling code wins: "1" must not shadow "91". */
  const code = Object.keys(PLANS)
    .filter((c) => digits.startsWith(c))
    .sort((a, b) => b.length - a.length)[0];

  if (!code) return `+${digits}`;

  const rest = digits.slice(code.length);
  const groups: string[] = [];
  let at = 0;
  for (const size of PLANS[code]) {
    if (at >= rest.length) break;
    groups.push(rest.slice(at, at + size));
    at += size;
  }
  /* Anything the plan did not account for (a longer number than expected)
     is kept rather than silently dropped. */
  if (at < rest.length) groups.push(rest.slice(at));

  return `+${code} ${groups.join(" ")}`;
}
