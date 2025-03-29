import jwt from "jsonwebtoken";
import { SECRET_KEY } from "./constants";

// Generate new token and set details in cookie
export const generateToken = (email: string, designation: string) => {
  const token = jwt.sign({ email, designation }, SECRET_KEY, {
    expiresIn: "20d",
  });

  return token;
};
