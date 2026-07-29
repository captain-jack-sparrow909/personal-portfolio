type RateLimitEntry = {
  count: number;
  resetAt: number;
};

export type RateLimitResult = {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetAt: number;
};

export interface RateLimiter {
  check(key: string): RateLimitResult;
}

class MemoryRateLimiter implements RateLimiter {
  private readonly entries = new Map<string, RateLimitEntry>();

  constructor(
    private readonly limit: number,
    private readonly windowMs: number,
  ) {}

  check(key: string): RateLimitResult {
    const now = Date.now();
    const existing = this.entries.get(key);

    if (!existing || existing.resetAt <= now) {
      const resetAt = now + this.windowMs;
      this.entries.set(key, { count: 1, resetAt });
      this.prune(now);

      return {
        allowed: true,
        limit: this.limit,
        remaining: this.limit - 1,
        resetAt,
      };
    }

    existing.count += 1;

    return {
      allowed: existing.count <= this.limit,
      limit: this.limit,
      remaining: Math.max(0, this.limit - existing.count),
      resetAt: existing.resetAt,
    };
  }

  private prune(now: number) {
    if (this.entries.size < 500) return;

    for (const [key, entry] of this.entries) {
      if (entry.resetAt <= now) this.entries.delete(key);
    }
  }
}

const rateLimitGlobal = globalThis as typeof globalThis & {
  contactRateLimiter?: RateLimiter;
};

function positiveInteger(value: string | undefined, fallback: number) {
  const parsed = Number(value);
  return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : fallback;
}

export const contactRateLimiter =
  rateLimitGlobal.contactRateLimiter ??
  new MemoryRateLimiter(
    positiveInteger(process.env.CONTACT_RATE_LIMIT_MAX, 5),
    positiveInteger(process.env.CONTACT_RATE_LIMIT_WINDOW_MS, 10 * 60 * 1000),
  );

if (process.env.NODE_ENV !== "production") {
  rateLimitGlobal.contactRateLimiter = contactRateLimiter;
}
