import { CorsOptions } from "cors";
import env from "../utils/env";

const corsConfig : CorsOptions = {
  origin: env('CORS_ORIGIN', '*')
};

export default corsConfig;