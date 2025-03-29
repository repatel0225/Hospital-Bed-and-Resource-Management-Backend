import { Router } from "express";
import { patientController } from "../controllers/patient.controller";

const admissionRouter = Router();

// Define the routes for patient admission
admissionRouter.post("/", patientController.createPatient);

export default admissionRouter;