import { NextFunction, Request, Response } from "express";
import Middleware from "./middleware";
import { merge } from "lodash";
import { authUser } from "../../utils/auth";

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authenticatedUser = await authUser(req);
    if(!authenticatedUser) {
      return res.sendStatus(403);
    }
    merge(req, { auth: authenticatedUser});
    return next();
  } catch (error) {
    console.error('>> Authentication error:', error);
    return res.sendStatus(500);
  }
}

export default class AuthMiddleware extends Middleware {

  handle() : any {
    return isAuthenticated;
  }

}