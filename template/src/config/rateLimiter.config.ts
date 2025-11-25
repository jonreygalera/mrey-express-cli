import env from '../utils/env';

interface IRateLimiterConfig {
  rateLimit?: number | undefined,
  windowMs?: number | undefined,
}

const rateLimiterConfig: IRateLimiterConfig = {
  rateLimit: Number(env('RATE_LIMIT', 5)),
  windowMs: Number(env('RATE_LIMIT_WINDOW_MS', 60)) * 60 * 1000, // default 1hr
};

export default rateLimiterConfig;