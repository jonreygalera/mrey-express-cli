import { NextFunction, Request, Response } from "express";
import IAppKernel from "../../bootstrap/types/appKernel.type";

export default abstract class Middleware {
  constructor(public appKernel: IAppKernel) {}
  
  abstract handle(request?: Request, response?: Response, next?: NextFunction) : any;
}