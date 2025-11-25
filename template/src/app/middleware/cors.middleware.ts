import { corsConfig } from "../../config";
import Middleware from "./middleware";
import cors from 'cors';

export default class CorsMiddleware extends Middleware
{
  handle(): any {
    return cors(corsConfig);
  }
}