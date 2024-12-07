import type { Request, Response } from "express";
import { zodMessageSchemaType } from "../../shared/zod/messages";
import {
  errorResponse,
  successResponse,
} from "../../lib/handellers/responceHandeller";
import MessageModel from "./message.model";
import FollowersAndFollwingModel from "../followersAndFollwing/followersAndFollwing.model";
import UserModel from "../user/user.model";
import mongoose from "mongoose";

export const sendMessage = async (req: Request, res: Response) => {
  const data = req.body as zodMessageSchemaType;

  try {
    const message = await MessageModel.create({
      message: data.message,
      image_url: data.image_url,
      image_url_fileId: data.image_url_fileId,
      sender_id: data.sender_id,
      receiver_id: data.receiver_id,
    });
    await message.save();

    //TODO: send message to receiver using socket.io

    successResponse(res, 200, "Message sent successfully", message);
  } catch (e: Error | any) {
    console.log("Error in sendMessage", e);
    errorResponse(res, 400, e.message);
    return;
  }
};

export const getMessages = async (req: any, res: Response) => {
  const myId = new mongoose.Types.ObjectId(req.user.id);
  const friendId = new mongoose.Types.ObjectId(req.params.friendId);

  try {
    const messages = await MessageModel.find({
      $or: [
        { sender_id: myId, receiver_id: friendId },
        { sender_id: friendId, receiver_id: myId },
      ],
    }).sort({ createdAt: 1 }); // Sort messages by creation time

    successResponse(res, 200, "Messages retrieved successfully", messages);
  } catch (e: Error | any) {
    console.log("Error in getMessages", e);
    errorResponse(res, 400, e.message);
    return;
  }
};

export const myFriends = async (req: any, res: Response) => {
  const myId = new mongoose.Types.ObjectId(req.user.id);

  try {
    const myFriends = await FollowersAndFollwingModel.aggregate([
      {
        $match: {
          following_user_id: myId,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "follower_user_id",
          foreignField: "_id",
          as: "follower_user",
        },
      },
      {
        $unwind: "$follower_user",
      },
      {
        $project: {
          _id: "$follower_user._id",
          userName: "$follower_user.userName",
          email: "$follower_user.email",
          profileImage: "$follower_user.profileImage",
        },
      },
      {
        $match: {
          _id: { $ne: myId },
        },
      },
      {
        $group: {
          _id: "$_id",
          userName: { $first: "$userName" },
          email: { $first: "$email" },
          profileImage: { $first: "$profileImage" },
        },
      },
    ]);

    successResponse(res, 200, "My friends", myFriends);
  } catch (e: Error | any) {
    console.log("Error in myFriends", e);
    errorResponse(res, 400, e.message);
    return;
  }
};
