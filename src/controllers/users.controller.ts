import { NextFunction, Request, Response } from "express";
import { AppError } from "../middlewares/errorHandlerMiddleware";
import logger from "../utility/logger";
import { compareHash, doHash } from "../utility/hash";
import { signInSchema, signUpSchema } from "../middlewares/validators";
import { sendResponse } from "../utility/sendResponse";
import { generateToken } from "../utility/generateToken";
import { MESSAGES, STATUS_CODES } from "../utility/constants";
import { userService } from "../services/users.service";

/**
 * Sign up a new user if they don't already exist.
 * @param {Request} req - The request object containing user details.
 * @param {Response} res - The response object to send the response.
 * @param {NextFunction} next - The next middleware function.
 */
const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password } = req.body;
  try {
    logger.info("Signup request received for email:", email);

    // Validate the request body against the sign-up schema
    const { error } = signUpSchema.validate(req.body);
    if (error) {
      logger.error("Validation error:", error.details[0].message);
      throw new AppError(error.details[0].message, STATUS_CODES.BAD_REQUEST);
    }

    // Check if the user already exists
    const existingUser = await userService.checkUserAlreadyExists(email);
    if (existingUser) {
      logger.info("User already exists:", email);
      sendResponse(
        res,
        STATUS_CODES.SUCCESS,
        MESSAGES.EMAIL_ALREADY_EXIST,
        existingUser
      );
      return;
    }

    // Hash the password and create a new user
    const hashedPassword = await doHash(password, 12);
    const newUser = await userService.createNewUser({
      ...req.body,
      password: hashedPassword,
    });
    logger.info("New user created:", newUser);
    sendResponse(res, STATUS_CODES.CREATED, MESSAGES.USER_CREATED, newUser);
  } catch (error) {
    console.log(error);
    logger.error("Error while creating new user:", error);
    next(new AppError(MESSAGES.SERVER_ERROR, STATUS_CODES.SERVER_ERROR));
  }
};

/**
 * Sign in an existing user by validating their credentials.
 * @param {Request} req - The request object containing login details.
 * @param {Response} res - The response object to send the response.
 * @param {NextFunction} next - The next middleware function.
 */
const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;
    logger.info("Sign-in request received for email:", email);

    // Validate the request body against the sign-in schema
    const { error } = signInSchema.validate(req.body);
    if (error) {
      logger.error("Validation error:", error.details[0].message);
      throw new AppError(error.details[0].message, STATUS_CODES.BAD_REQUEST);
    }

    // Check if the user exists and validate the password
    const userDetails = await userService.checkLoginUserDetails(req.body);
    if (!userDetails) {
      logger.warn("User does not exist:", email);
      return next(
        new AppError(MESSAGES.USER_DOES_NOT_EXIST, STATUS_CODES.NOT_FOUND)
      );
    }

    const isPasswordValid = await compareHash(password, userDetails.password);
    if (!isPasswordValid) {
      logger.warn("Invalid credentials for email:", email);
      return next(
        new AppError(MESSAGES.INVALID_CREDENTIALS, STATUS_CODES.UNAUTHORIZED)
      );
    }

    // Generate a token and send the response
    const token = generateToken(userDetails.email, userDetails.role);
    res.cookie("authorization", "Bearer " + token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });
    logger.info("Successfully logged in by:", userDetails.email);
    sendResponse(res, STATUS_CODES.SUCCESS, MESSAGES.LOGIN_SUCCESS, {
      token,
      userData: [userDetails],
    });
  } catch (error) {
    logger.error("Error while logging in:", error);
    next(new AppError(MESSAGES.SERVER_ERROR, STATUS_CODES.SERVER_ERROR));
  }
};

/**
 * Sign in an existing user by validating their credentials.
 * @param {Request} req - The request object containing login details.
 * @param {Response} res - The response object to send the response.
 * @param {NextFunction} next - The next middleware function.
 */
const signOut = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    sendResponse(
      res.clearCookie("authorization"),
      STATUS_CODES.SUCCESS,
      MESSAGES.LOGIN_OUT
    );
  } catch (error) {
    logger.error("Error while Logging Out:", error);
    next(new AppError(MESSAGES.SERVER_ERROR, STATUS_CODES.SERVER_ERROR));
  }
};

export const userController = {
  signUp,
  signIn,
  signOut,
};
