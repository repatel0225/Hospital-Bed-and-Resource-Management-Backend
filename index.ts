import express, { Application } from "express";
import routes from "./src/routes";
import { connectToDB } from "./src/config/db";
import { errorHandler } from "./src/middlewares/errorHandlerMiddleware";

const app: Application = express();
const cors = require("cors");
app.use(express.json());

const PORT: number = 8080;
const corsOpts = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOpts));
app.use("/api/v1", routes);
app.use(errorHandler);

app.listen(PORT, () => {
  connectToDB();
});
