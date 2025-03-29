import { Router } from "express";
import { userController } from "../controllers/users.controller";

const userRouter = Router();

// Define the routes for user authentication
userRouter.post("/", userController.signIn);
userRouter.post("/register", userController.signUp);
userRouter.post("/signout", userController.signOut);

export default userRouter;