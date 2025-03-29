import { NextFunction, Response, Request } from "express";
import { SECRET_KEY } from "../utility/constants";

const jwt = require("jsonwebtoken");

// Middleware to verify the token
export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers["authorization"];

  if (!token) {
    res.status(403).json({ message: "No token provided" });
  }

  jwt.verify(token, SECRET_KEY, (err: any) => {
    if (err) {
      res.status(500).json({ message: "Failed to authenticate token" });
    }

    // If everything is good, proceeding to call the controller
    next();
  });
}
