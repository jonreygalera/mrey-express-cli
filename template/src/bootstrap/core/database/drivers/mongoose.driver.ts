import DatabaseConnection from "../database.connection";
import { IDatabaseConnection, TDatabaseDriver } from "../types/database.type";

export default class MongooseDriver extends DatabaseConnection {
  protected connectionDriver : TDatabaseDriver = 'mongoose';

  getUriConnection(): string {
    const connectionConfig : IDatabaseConnection = this.connectionConfig;
    const host = connectionConfig.host;
    const username = connectionConfig.username;
    const password = connectionConfig.password;
    const appName = connectionConfig.appName;
    const dbName = connectionConfig.dbName;
    
    return `mongodb+srv://${username}:${password}@${host}/${dbName}?appName=${appName}`;
  }
}