import rateLimit from "express-rate-limit";
import Middleware from "./middleware";
import { rateLimiterConfig } from "../../config";

const LIMIT = rateLimiterConfig.rateLimit;
const WINDOW_MS = rateLimiterConfig.windowTime;

export default class RateLimiterMiddleware extends Middleware
{
  handle(): any {
    return rateLimit({
      windowMs: WINDOW_MS,
      limit: LIMIT, 
      standardHeaders: 'draft-8',
      legacyHeaders: false,
      message: () => {
        return {
          output: `You've already reached the limit of ${LIMIT}. Please come back after an hour.`
        };
      }
    })
  }
}