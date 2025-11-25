import env from '../utils/env';

interface ISessionConfig {
  key: string;
  domain: string;
  path: string;
  expireIn: number;
}

const sessionConfig: ISessionConfig = {
  key: env('SESSION_KEY', 'MREY-EXPRESS-AUTH'),
  domain: env('SESSION_DOMAIN', 'localhost'),
  path: env('SESSION_PATH', '/'),
  expireIn: env('SESSION_EXPIRES_IN', 3600),
};

export default sessionConfig;