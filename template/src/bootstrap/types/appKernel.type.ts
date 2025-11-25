import { Express } from 'express';
import DatabaseCore from '../core/database.core';

export default interface IAppKernel {
  appExpress: Express;
  database: DatabaseCore
}