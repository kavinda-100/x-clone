import FollowersAndFollwingModel from "./followersAndFollwing.model";
import type { Response } from "express";
import {
  errorResponse,
  successResponse,
} from "../../lib/handellers/responceHandeller";

export const followUnfollow = async (req: any, res: Response) => {
  const userId = req.user.id;
  try {
    const { following_user_id } = req.body;
    // if the following_user_id is not provided
    if (!following_user_id) {
      errorResponse(res, 400, "following_user_id is required");
      return;
    }
    // Check if the user is trying to follow himself
    if (userId === following_user_id) {
      errorResponse(res, 400, "You can't follow yourself");
      return;
    }
    // Check if the user is already following the user
    const follow = await FollowersAndFollwingModel.findOne({
      following_user_id,
      follower_user_id: userId,
    });
    if (follow) {
      await FollowersAndFollwingModel.findByIdAndDelete(follow._id);
      successResponse(res, 200, "Unfollowed successfully");
      return;
    } else {
      await FollowersAndFollwingModel.create({
        following_user_id,
        follower_user_id: userId,
      });
      successResponse(res, 200, "Followed successfully");
      return;
    }
  } catch (error) {
    errorResponse(res, 500, "Something went wrong", error);
    return;
  }
};
