import { corsConfig } from "../../config";
import Middleware from "./middleware";
import cors from 'cors';
import express from 'express';
import cookieParser from "cookie-parser";
import compression from "compression";

export default class ApiMiddleware extends Middleware
{
  handle(): any {
    return [
      express.json(),
      express.urlencoded({ extended: true }),
      cookieParser(),
      compression()
    ]
  }
}