import asyncHandler from "express-async-handler";
import User from "../../models/user.model";
import { X509Certificate } from "crypto";

const getLeaderboard = asyncHandler(async (req: any, res: any) => {
  const page = req.query.page || 1;
  const limit = 5;
  let curUser = req.user;
  let users = await User.find({ score: { $ne: 0 } })
    .sort({ score: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();

  const leaderboard = users
    .map((ele, i: number) => {
      if (String(curUser._id) == String(ele._id)) {
        curUser = { ...curUser, rank: i + 1 };
      }
      return { ...ele, rank: i + 1 };
    })
    .filter((ele: any, i: number) => {
      return String(ele._id) != String(curUser._id);
    });

  return res.status(201).json({
    status: "success",
    count: users.length,
    currentUser: curUser,
    leaderboard: leaderboard,
    page: page,
  });
});

export { getLeaderboard };
