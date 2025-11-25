import { databaseConfig } from "../../../config";
import { IDatabaseConnection, TDatabaseDriver } from "./types/database.type";

export default abstract class DatabaseConnection {
  
  protected connectionConfig : IDatabaseConnection;
  protected connectionDriver : TDatabaseDriver = 'mongoose';

  constructor() {
    this.connectionConfig = databaseConfig.connection[this.connectionDriver];
  }

  getConfig() : IDatabaseConnection {
    return this.connectionConfig;
  }

  getHost() : string {
    return this.connectionConfig.host;
  }

  getPort() : number|unknown {
    return this.connectionConfig.port;
  }

  abstract getUriConnection() : string;

}