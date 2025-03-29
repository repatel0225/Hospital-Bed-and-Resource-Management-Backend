import { NextFunction, Request, Response } from "express";
import {
  MESSAGES,
  SOMETHING_WENT_WRONG,
  STATUS_CODES,
} from "../../utility/constants";
import { employeeMock } from "../mock/mock";
import { employeeController } from "../../controllers/users.controller";
import { Employee } from "../../models/users.model";
import { AppError } from "../../middlewares/errorHandlerMiddleware";

jest.mock("../../models/employees.model");

describe("when employeeController runs", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;
  let send: jest.Mock;
  let status: jest.Mock;

  beforeEach(() => {
    next = jest.fn();
    send = jest.fn();
    status = jest.fn().mockReturnValue({ send });
    req = {};
    res = { status };
  });

  it("should create a new employee successfully", async () => {
    req.body = employeeMock;

    (Employee.create as jest.Mock).mockResolvedValue(employeeMock);
    await employeeController.createNewEmployee(
      req as Request,
      res as Response,
      next as NextFunction
    );

    expect(status).toHaveBeenCalledWith(201);
  });

  it("should return error if required fields are missing", async () => {
    req.body = { name: "testuser" };
    const error = new Error(SOMETHING_WENT_WRONG);

    (Employee.create as jest.Mock).mockRejectedValue(error);
    await employeeController.createNewEmployee(
      req as Request,
      res as Response,
      next as NextFunction
    );

    expect(next).toHaveBeenCalledWith(
      new AppError(MESSAGES.SERVER_ERROR, STATUS_CODES.SERVER_ERROR)
    );
  });

  it("should check logged in user credentials", async () => {
    req.query = { email: "testuser@gmail.com", password: "12345" };

    (Employee.find as jest.Mock).mockResolvedValue([employeeMock]);
    await employeeController.checkLoggedInUserDetails(
      req as Request,
      res as Response,
      next as NextFunction
    );

    expect(status).toHaveBeenCalledWith(200);
  });

  it("should return false if user does not exist", async () => {
    req.query = { email: "atchaya@gmail.com", password: "12345" };

    (Employee.find as jest.Mock).mockResolvedValue([]);
    await employeeController.checkLoggedInUserDetails(
      req as Request,
      res as Response,
      next as NextFunction
    );

    expect(status).toHaveBeenCalledWith(200);
  });

  it("should return error while checking if users exists", async () => {
    req.query = { email: "testuser@gmail.com", password: "12345" };

    (Employee.find as jest.Mock).mockRejectedValue(SOMETHING_WENT_WRONG);
    await employeeController.checkLoggedInUserDetails(
      req as Request,
      res as Response,
      next as NextFunction
    );

    expect(next).toHaveBeenCalledWith(
      new AppError(MESSAGES.SERVER_ERROR, STATUS_CODES.SERVER_ERROR)
    );
  });
});
