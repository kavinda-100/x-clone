import type { NextFunction, Response } from "express";

import {
  errorResponse,
  successResponse,
} from "../../lib/handellers/responceHandeller";
import UserModel from "./user.model";
import FollowersAndFollwingModel from "../followersAndFollwing/followersAndFollwing.model";
import mongoose from "mongoose";
import LikeUnlikeModel from "../post/LikeUnlike.model";

const limit = 10;

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

export const getUserFollowers = async (
  req: any,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userName = req.params.username;
    const user = await UserModel.findOne({ userName });
    if (!user) {
      errorResponse(res, 404, "User not found");
      return;
    }
    // Extract page and limit from query parameters, with default values
    const { page = 1 } = req.query;
    // Calculate the number of documents to skip based on the page and limit
    const skip = (Number(page) - 1) * Number(limit);

    const followers = await FollowersAndFollwingModel.find({
      following_user_id: user._id,
    })
      .populate("follower_user_id", "userName profileImage")
      .skip(skip)
      .limit(limit);

    successResponse(res, 200, "Followers fetched successfully", followers);
  } catch (e: any) {
    next(e);
  }
};

export const getUserFollowing = async (
  req: any,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userName = req.params.username;
    const user = await UserModel.findOne({ userName });
    if (!user) {
      errorResponse(res, 404, "User not found");
      return;
    }
    // Extract page and limit from query parameters, with default values
    const { page = 1 } = req.query;
    // Calculate the number of documents to skip based on the page and limit
    const skip = (Number(page) - 1) * Number(limit);

    const followings = await FollowersAndFollwingModel.find({
      follower_user_id: user._id,
    })
      .populate("following_user_id", "userName profileImage")
      .skip(skip)
      .limit(limit);

    successResponse(res, 200, "Followings fetched successfully", followings);
  } catch (e: any) {
    next(e);
  }
};

export const getUserLikedPosts = async (
  req: any,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userName = req.params.username;
    const user = await UserModel.findOne({ userName });
    if (!user) {
      errorResponse(res, 404, "User not found");
      return;
    }
    // Extract page and limit from query parameters, with default values
    const { page = 1 } = req.query;
    // Calculate the number of documents to skip based on the page and limit
    const skip = (Number(page) - 1) * Number(limit);

    const likedPosts = await LikeUnlikeModel.find({ userId: user._id })
      .populate("postId")
      .skip(skip)
      .limit(limit);

    successResponse(res, 200, "Liked posts fetched successfully", likedPosts);
  } catch (e) {
    next(e);
  }
};

export const getUserStats = async (
  req: any,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userName = req.params.username;
    const user = await UserModel.findOne({ userName });
    if (!user) {
      errorResponse(res, 404, "User not found");
      return;
    }

    const totalLikedPosts = await LikeUnlikeModel.countDocuments({
      userId: user._id,
    });

    const totalFollowings = await FollowersAndFollwingModel.countDocuments({
      follower_user_id: user._id,
    });

    const totalFollowers = await FollowersAndFollwingModel.countDocuments({
      following_user_id: user._id,
    });

    successResponse(res, 200, "User stats fetched successfully", {
      totalLikedPosts,
      totalFollowings,
      totalFollowers,
    });
  } catch (e) {
    next(e);
  }
};
