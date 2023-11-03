import express from "express";
const userRouter = express.Router();

import { googleOauthHandler } from "../../controller/auth/googleAuthHandler";
import { getGoogleOauthURL } from "../../controller/auth/googleAuthUrl.controller";
import {
  getUserData,
  protect,
  getProfile,
  updateProfile,
  register,
  generateMockUsers,
} from "../../controller/user/user.controller";

userRouter.get("/mock", generateMockUsers);
userRouter.get("/:userId", protect, getUserData);
userRouter.get("/profile/:userId", generateMockUsers);

userRouter.put("/register/:userId", protect, register);
userRouter.put("/profile/:userId", protect, updateProfile);

userRouter.get("/getGoogleOauthURL", getGoogleOauthURL);
userRouter.get("/sessions/oauth/google", googleOauthHandler);

export default userRouter;
