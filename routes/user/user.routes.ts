import express from "express";
const userRouter = express.Router();

import { googleOauthHandler } from "../../controller/auth/googleAuthHandler";
import { getGoogleOauthURL } from "../../controller/auth/googleAuthUrl.controller";

userRouter.get("/getGoogleOauthURL", getGoogleOauthURL);
userRouter.get("/sessions/oauth/google", googleOauthHandler);

export default userRouter;
