import { Router } from "express";
import userRouter from "./users.routes";
import bedsRouter from "./beds.routes";

const routes = Router();

routes.use("/user", userRouter);
routes.use("/beds", bedsRouter)
export default routes;
