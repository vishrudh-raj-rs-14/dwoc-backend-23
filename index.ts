import express from "express";
import dotenv from "dotenv";
dotenv.config({
  path: __dirname.replace("build", ".env"),
});
import connectDatabase from "./utils/connectDatabase";
import config from "./config/config";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import demoRouter from "./routes/demo/demo.routes";

connectDatabase(config.db);
const app = express();

// Neccessary Middlewares
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(
  cors({
    origin: ["http://localhost:3000", process.env.FRONTEND_URL as string],
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms"),
);

// Routes
app.use("/demo", demoRouter);

app.listen(config.port);
