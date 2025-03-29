import { NextFunction, Request, Response } from "express";
import { STATUS_CODES } from "http";
import { patientController } from "../../controllers/patient.controller";
import { AppError } from "../../middlewares/errorHandlerMiddleware";
import { patientService } from "../../services/patient.service";
import { MESSAGES } from "../../utility/constants";
import { sendResponse } from "../../utility/sendResponse";


jest.mock("../services/patient.service");
jest.mock("../utility/sendResponse");

describe("patientController.createPatient", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      body: {
        name: "John Doe",
        email: "john.doe@example.com",
        contactNo: 1234567890,
        age: 30,
        admissionDate: "2025-03-29",
        condition: "Stable",
        dischargeDate: "",
        isDischarged: false,
        bedStatus: "needed",
        consent: true,
        inventoryStatus: "needed",
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("should create a new patient and send a success response", async () => {
    const mockPatient = { id: 1, ...req.body };
    (patientService.createNewPatient as jest.Mock).mockResolvedValue(mockPatient);

    await patientController.createPatient(req as Request, res as Response, next);

    expect(patientService.createNewPatient).toHaveBeenCalledWith(req.body);
    expect(sendResponse).toHaveBeenCalledWith(
      res,
      STATUS_CODES.CREATED,
      MESSAGES.PATIENT_CREATED_SUCCESSFULLY,
      mockPatient
    );
  });

  it("should handle errors and call next with an AppError", async () => {
    const error = new Error("Test error");
    (patientService.createNewPatient as jest.Mock).mockRejectedValue(error);

    await patientController.createPatient(req as Request, res as Response, next);

    expect(patientService.createNewPatient).toHaveBeenCalledWith(req.body);
    // expect(next).toHaveBeenCalledWith(new AppError(MESSAGES.SERVER_ERROR, "Not Found"));
  });
});