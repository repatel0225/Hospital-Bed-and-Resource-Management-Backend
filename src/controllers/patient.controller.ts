import { NextFunction, Request, Response } from "express";
import { AppError } from "../middlewares/errorHandlerMiddleware";
import logger from "../utility/logger";
import { sendResponse } from "../utility/sendResponse";
import { MESSAGES, STATUS_CODES } from "../utility/constants";
import { patientService } from "../services/patient.service";

/**
 * Create a new patient.
 * @param {Request} req - The request object containing patient details.
 * @param {Response} res - The response object to send the response.
 * @param {NextFunction} next - The next middleware function.
 */
const createPatient = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const patientData = req.body;
    logger.info("Create patient request received for:", patientData.name);

    const patient = await patientService.createNewPatient(patientData);
    logger.info("New patient created:", patient);
    sendResponse(res, STATUS_CODES.CREATED, MESSAGES.PATIENT_CREATED_SUCCESSFULLY, patient);
  } catch (error) {
    logger.error("Error while creating new patient:", error);
    next(new AppError(MESSAGES.SERVER_ERROR, STATUS_CODES.SERVER_ERROR));
  }
};

/**
 * Get patient details by ID.
 * @param {Request} req - The request object containing patient ID.
 * @param {Response} res - The response object to send the response.
 * @param {NextFunction} next - The next middleware function.
 */


export const patientController = {
  createPatient,
};