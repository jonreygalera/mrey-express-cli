import { Request, Response } from "express";
import { getUserByEmail } from "../models/user/user.entity";
import { random } from "../../utils/str";
import { authentication, jwtAuthentication } from "../../utils/auth";
import { sessionConfig } from "../../config";

export const authLogin = async (req: Request, res: Response) => {
  try {
    const {
      email,
      password,
    } = req.body;

    if (!email || !password) {
      return res.sendStatus(400);
    }

    const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');

    if(!user) {
      return res.sendStatus(403);
    }

    const expectedHash = authentication(user.authentication.salt, password);

    if(user.authentication.password !== expectedHash) {
      return res.sendStatus(403);
    }


    user.authentication.sessionToken = jwtAuthentication(user.toJSON());

    await user.save();

    res.cookie(
      sessionConfig.key, 
      user.authentication.sessionToken, 
      { domain: sessionConfig.domain, path: sessionConfig.path }
    );

    res.status(200).json(user).end();
  } catch(error) {
    console.error(error);
    res.sendStatus(400);
  }
}