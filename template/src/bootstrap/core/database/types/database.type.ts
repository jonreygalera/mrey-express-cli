
export type TDatabaseDriver = 'mongoose';

export interface IDatabaseConnection {
  driver: TDatabaseDriver;
  username: string;
  password: string;
  appName: string;
  dbName: string;
  host: string;
  port?: number | unknown;
}

export interface IDatabaseConfig {
  driver: TDatabaseDriver;
  connection: Record<TDatabaseDriver, IDatabaseConnection>
}