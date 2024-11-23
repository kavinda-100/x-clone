import type { NextFunction, Response } from "express";

import {
  errorResponse,
  successResponse,
} from "../../lib/handellers/responceHandeller";
import UserModel from "./user.model";
import FollowersAndFollwingModel from "../followersAndFollwing/followersAndFollwing.model";
import mongoose from "mongoose";

export const getMe = async (req: any, res: Response, next: NextFunction) => {
  try {
    const ID = req.user.id;

    const user = await UserModel.findById({ _id: ID });
    if (!user) {
      errorResponse(res, 404, "User not found");
      return;
    }
    const { password, ...userData } = user.toObject();
    successResponse(res, 200, "User", userData);
  } catch (e: any) {
    next(e);
  }
};

// get all users to follow, limit 5 and randomly
// but not myself and not the users I follow
export const getRecommendUsers = async (
  req: any,
  res: Response,
  next: NextFunction,
) => {
  const ID = new mongoose.Types.ObjectId(req.user.id);

  try {
    // Fetch random 5 users excluding yourself
    const recommendedUsers = await UserModel.aggregate([
      { $match: { _id: { $ne: ID } } }, // Exclude yourself
      { $sample: { size: 5 } }, // Randomly select 5 users
    ]);

    // Fetch the list of users you are following
    const following = await FollowersAndFollwingModel.find({
      follower_user_id: ID,
    }).populate("following_user_id", "userName profileImage");

    const followingUsers = following.map((f) => f.following_user_id);

    successResponse(res, 200, "Recommended users", {
      recommendedUsers,
      followingUsers,
    });
  } catch (e: any) {
    next(e);
  }
};
