import { model, Schema } from "mongoose";
import { IUser } from "../interfaces/users";

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['provider', 'doctor'],
      required: true,
    },
    contactNo: {
      type: Number,
      required: true,
    },
  }
);

export const User = model<IUser>("users", userSchema);