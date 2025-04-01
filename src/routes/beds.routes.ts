import { Router } from "express";
import { getAllBeds } from "../controllers/beds.controller";

const bedsRouter = Router();

bedsRouter.get("/", getAllBeds);

export default bedsRouter;