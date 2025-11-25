import crypto from 'crypto';

export const random = () => crypto.randomBytes(128).toString('base64');

export const isBlank = (str: string | null | undefined): boolean => {
  return !str || str.trim().length === 0;
};
