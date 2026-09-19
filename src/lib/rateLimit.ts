/**
 * Per-IP sliding window, in memory.
 *
 * Honest limitation: on serverless this is per-instance, so a determined
 * attacker spread across cold starts gets more than the quota. It stops the
 * ordinary case -- a script hammering the contact form -- which is what the
 * audit flagged (B-19). Move to Upstash or Vercel KV if abuse becomes real.
 */
type Hit = { count: number; resetAt: number };

const buckets = new Map<string, Hit>();

export function rateLimit(
  key: string,
  { limit = 5, windowMs = 10 * 60 * 1000 } = {}
): { ok: boolean; remaining: number; retryAfterSeconds: number } {
  const now = Date.now();
  const hit = buckets.get(key);

  if (!hit || now > hit.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1, retryAfterSeconds: 0 };
  }

  hit.count += 1;
  if (hit.count > limit) {
    return { ok: false, remaining: 0, retryAfterSeconds: Math.ceil((hit.resetAt - now) / 1000) };
  }
  return { ok: true, remaining: limit - hit.count, retryAfterSeconds: 0 };
}

/** Best-effort client IP behind Vercel's proxy. */
export function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}
