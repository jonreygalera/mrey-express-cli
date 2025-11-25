import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export { default as appConfig } from './app.config';
export { default as databaseConfig } from './database.config';
export { default as corsConfig } from './cors.config';
export { default as rateLimiterConfig } from './rateLimiter.config';
export { default as sessionConfig } from './session.config';