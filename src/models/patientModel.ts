import mongoose, { Schema, Document } from 'mongoose';

export interface IPatient extends Document {
  name: string;
  email: string; // Add email field
  contactNo: number;
  age: number;
  admissionDate: Date;
  condition: string;
  dischargeDate?: Date;
  isDischarged: boolean;
  bedStatus: boolean;
  consent: boolean;
  inventoryStatus: boolean;
}

const PatientSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // Add email field with unique constraint
  contactNo: { type: Number, required: true },
  age: { type: Number, required: true },
  admissionDate: { type: Date, required: true },
  condition: { type: String, required: true },
  dischargeDate: { type: Date },
  isDischarged: { type: Boolean, required: true },
  bedStatus: { type: Boolean, required: true },
  consent: { type: Boolean, required: true },
  inventoryStatus: { type: Boolean, required: true },
});

export default mongoose.model<IPatient>('Patient', PatientSchema);