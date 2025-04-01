import express, { Application } from "express";
import routes from "./src/routes";
import connectDB from "./src/config/db";
import { errorHandler } from "./src/middlewares/errorHandlerMiddleware";
import { env_config } from "./src/config/environment";

 
const app: Application = express();
const cors = require("cors");
app.use(express.json());
 
const PORT = env_config.port;
const corsOpts = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type"],
};
 
app.use(cors(corsOpts));
app.use("/api", routes);
app.use(errorHandler);
 
app.listen(PORT, () => {
  connectDB();
});