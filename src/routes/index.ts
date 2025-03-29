import { Router } from "express";
import userRouter from "./users.routes";
import admissionRouter from "./admission.routes";

const routes = Router();

routes.use("/user", userRouter);
routes.use("/admission", admissionRouter);
export default routes;
