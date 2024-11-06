import jwt from 'jsonwebtoken';
import type { Response } from 'express';
import "dotenv/config"

// set the cookie in the response
export const setCookie = (res: Response, id: string) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: '7d',
  });

  res.cookie('access_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
  });
};
