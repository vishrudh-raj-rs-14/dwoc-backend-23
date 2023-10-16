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
<<<<<<< HEAD
import orgRouter from "./routes/organisations/organisations.route";
import { notFoundErr, errorHandler } from "./middleware/errorHandler";
=======

import userRouter from "./routes/user/user.routes";
>>>>>>> 8c91899 (feat: Google Auth (#3))

connectDatabase(config.db);
const app = express();

// Neccessary Middlewares
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(
  cors({
    origin: ["http://localhost:3000", process.env.FRONTEND_URL as string],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

// Routes
<<<<<<< HEAD
app.use("/organisation", orgRouter);

app.use(notFoundErr);
app.use(errorHandler);
=======
app.use("/", userRouter);
>>>>>>> 8c91899 (feat: Google Auth (#3))

app.listen(config.port);
