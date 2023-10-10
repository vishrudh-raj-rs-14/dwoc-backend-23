import express from "express";
const userRouter = express.Router();

import { demoController } from "../../controller/demo/demo.controllers";

userRouter.get("/demo", demoController);

export default userRouter;
