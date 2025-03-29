import Patient from "../models/patientModel"; // Import the Patient model
import { IPatient } from "../models/patientModel";

async function getPatientByEmail(email: string): Promise<IPatient | null> {
  try {
    const patient = await Patient.findOne({ email });
    return patient;
  } catch (error) {
    // Handle the error appropriately, perhaps logging it
    console.error("Error fetching patient by email:", error);
    return null; // Or throw the error, depending on your error handling strategy
  }
}

async function createNewPatient(patientData: any): Promise<IPatient> {
  return Patient.create(patientData);
}

export const patientService = {
  getPatientByEmail,
  createNewPatient,
};