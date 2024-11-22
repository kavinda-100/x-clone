import type { Response } from "express";

export const successResponse = (
  res: Response,
  statusCode: number,
  message: string,
  data?: any | null,
) => {
  return res.status(statusCode).json({
    message,
    data,
  });
};

export const errorResponse = (
  res: Response,
  statusCode: number,
  message: string,
  error?: any | null,
) => {
  return res.status(statusCode).json({
    message,
    error,
  });
};
