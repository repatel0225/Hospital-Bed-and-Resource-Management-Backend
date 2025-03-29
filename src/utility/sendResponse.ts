import { Response } from "express";
import { IApiResponse } from "../interfaces/apiResponse";
import { MESSAGES } from "./constants";

// Function to send a standardized API response
export const sendResponse = (
  res: Response,
  code: number,
  message: string,
  data?: any
): Response<IApiResponse> => {
  return res.status(code).json({
    status: code >= 400 ? MESSAGES.MESSAGE_FAILURE : MESSAGES.MESSAGE_SUCCESS,
    message,
    data,
  });
};
