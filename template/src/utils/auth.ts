import crypto from 'crypto';
import { appConfig, sessionConfig } from '../config';
import { Request } from 'express';
import { getUserBySessionToken } from '../app/models/user/user.entity';
import jwt from 'jsonwebtoken';

export const authentication = (salt: string, password: string) => {
  return crypto.createHmac('sha256', [salt, password].join('/'))
    .update(appConfig.key)
    .digest('hex');
}

export const jwtAuthentication = (payload: any) => {
  return jwt.sign(payload, sessionConfig.key);
}

export const authUser = async (req: Request) => {
  const sessionToken = req.cookies[sessionConfig.key];
  
  if (!sessionToken) {
    return null;
  }

  try {
    const decoded = jwt.verify(sessionToken, sessionConfig.key);
    
    if (!decoded || typeof decoded !== 'object') {
      return null;
    }

    const user = await getUserBySessionToken(sessionToken);
    
    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    console.error('>> JWT verification error:', error);
    return null;
  }
}