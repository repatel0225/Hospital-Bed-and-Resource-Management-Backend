import { NextFunction, Request, Response } from "express";
import { MESSAGES, STATUS_CODES } from "../utility/constants";
import logger from "../utility/logger";
import { sendResponse } from "../utility/sendResponse";

// Custom error class extending the built-in Error class
export class AppError extends Error {
  public code: number;
  constructor(message: string, code: number) {
    super(message);
    this.code = code;
  }
}

// Error handling middleware function
export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const error: AppError =
    err instanceof AppError
      ? err
      : new AppError(MESSAGES.SERVER_ERROR, STATUS_CODES.SERVER_ERROR);

  const statusCode = error.code;
  const message = error.message || MESSAGES.SERVER_ERROR;
  logger.error(`[${req.method}] ${req.url} -${statusCode} - ${message}`);
  sendResponse(res, statusCode, message);
};
