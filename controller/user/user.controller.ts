import asyncHandler from "express-async-handler";
import User from "../../models/user.model";
import { generateMockUserData } from "../../utils/faker";

const protect = asyncHandler(async (req: any, res: any, next: any) => {
  //NEED TO IMPLEMENT ACTUAL PROTECT AFTER AUTH IS DONE
  const user = await User.findOne({ name: "vishrudh" }).lean();
  req.user = user;
  next();
});

const getUserData = asyncHandler(async (req: any, res: any, next: any) => {
  const user = await User.findById(req.params.userId);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  return res.json({
    name: user.name,
    githubHandle: user.githubHandle,
  });
});

const register = asyncHandler(async (req: any, res: any, next: any) => {
  const user = await User.findById(req.params.userId);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  if (
    !req.body.githubHandle ||
    !req.body.college ||
    !req.body.phone ||
    !req.body.address ||
    !req.body.tshirtSize ||
    !req.body.isOrg
  ) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }
  const newUser = await User.findByIdAndUpdate(
    req.params.userId,
    {
      githubHandle: req.body.githubHandle,
      college: req.body.college,
      phone: req.body.phone,
      isOrg: req.body.isOrg,
      address: req.body.address,
      tshirtSize: req.body.tshirtSize,
      isFilled: true,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  return res.json(newUser);
});

const getProfile = asyncHandler(async (req: any, res: any, next: any) => {
  const user = await User.findById(req.params.userId);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  return res.json({
    name: user.name,
    email: user.email,
    githubHandle: user.githubHandle,
    isOrg: user.isOrg,
    isFilled: user.isFilled,
    college: user.college,
    phone: user.phone,
    address: user.address,
    tshirtSize: user.tshirtSize,
    isAdmin: user.isAdmin,
  });
});

const updateProfile = asyncHandler(async (req: any, res: any, next: any) => {
  const user = await User.findById(req.params.userId);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  const newUser = await User.findByIdAndUpdate(
    req.params.userId,
    {
      college: req.body.college,
      phone: req.body.phone,
      address: req.body.address,
      tshirtSize: req.body.tshirtSize,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  return res.json(newUser);
});

const generateMockUsers = asyncHandler(
  async (req: any, res: any, next: any) => {
    console.log("here");
    await generateMockUserData();
    return res.json({
      status: "success",
    });
  }
);

export {
  protect,
  getUserData,
  getProfile,
  updateProfile,
  register,
  generateMockUsers,
};
