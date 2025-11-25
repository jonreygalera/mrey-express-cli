import env from '../utils/env';

interface IRateLimiterConfig {
  rateLimit?: number | undefined,
  windowTime?: number | undefined,
}

const rateLimiterConfig: IRateLimiterConfig = {
  rateLimit: Number(env('RATE_LIMIT', 5)),
  windowTime: Number(env('RATE_LIMIT_WINDOW_TIME', 60)) * 60 * 1000, // default 1hr
};

export default rateLimiterConfig;