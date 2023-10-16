import asyncHandler from "express-async-handler";
import User from "../../models/user.model";

const protect = asyncHandler(async (req: any, res: any, next: any) => {
  //NEED TO IMPLEMENT ACTUAL PROTECT AFTER AUTH IS DONE
  const user = await User.findOne({ name: "vishrudh" });
  req.user = user;
  next();
});

export { protect };
