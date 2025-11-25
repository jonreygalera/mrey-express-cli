import mongoose, { Connection } from 'mongoose';
import { IDatabaseConfig, IDatabaseConnection, TDatabaseDriver } from './database/types/database.type';
import DatabaseConnection from './database/database.connection';
import MongooseDriver from './database/drivers/mongoose.driver';
import DatabaseDriverException from '../../app/exceptions/databaseDriver.exception';
import { databaseConfig } from '../../config';

export default class DatabaseCore {
  protected databaseConfig? : IDatabaseConfig;
  protected databaseConnection? : IDatabaseConnection;
  protected static instance: DatabaseCore;

  private constructor() {}

  public static getInstance(): DatabaseCore {
    if (!DatabaseCore.instance) {
      DatabaseCore.instance = new DatabaseCore();
      DatabaseCore.instance.databaseConfig = databaseConfig;
      DatabaseCore.instance.databaseConnection = databaseConfig['connection'][databaseConfig.driver];
    }
    return DatabaseCore.instance;
  }

  async createConnection() : Promise<Connection> {
    const connection = this.getConnection();
    const uri: string = connection.getUriConnection();

    try {
      await mongoose.connect(uri);
      console.log(`>> Database connected: ${connection.getHost()}`);
      return mongoose.connection;
    } catch (error) {
      console.error('>> Database connection error:', error);
      throw error;
    }
  }

  async closeConnection(): Promise<void> {
    try {
      await mongoose.disconnect();
      console.log('>> Database connection closed successfully');
    } catch (error) {
      console.error('>> Error closing the database connection:', error);
      throw error;
    }
  }

  getConnection() : DatabaseConnection {
    switch(this.getDatabaseDriver()) {
      case 'mongoose' as TDatabaseDriver : return new MongooseDriver();
      default: throw new DatabaseDriverException();
    }
  }

  getDatabaseDriver()
  {
    return this.databaseConfig?.driver;
  }
}