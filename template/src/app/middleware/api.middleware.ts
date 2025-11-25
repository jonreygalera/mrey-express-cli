import Middleware from "./middleware";
import express from 'express';
import cookieParser from "cookie-parser";
import compression from "compression";
import RateLimiterMiddleware from "./rateLimiter.middleware";

export default class ApiMiddleware extends Middleware
{
  handle(): any {
    return [
      express.json(),
      express.urlencoded({ extended: true }),
      cookieParser(),
      compression(),
      (new RateLimiterMiddleware(this.appKernel)).handle()
    ]
  }
}