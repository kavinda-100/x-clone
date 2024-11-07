import * as mongoose from "mongoose";

const followersAndFollwingSchema = new mongoose.Schema({
    following_user_id: {
    type: mongoose.Schema.Types.ObjectId, //e.g:- id of the person who I am following
    ref: "User",
    required: true,
  },
    follower_user_id: {
    type: mongoose.Schema.Types.ObjectId, //e.g:- my id
    ref: "User",
    required: true,
  },
}, { timestamps: true });

const FollowersAndFollwingModel = mongoose.model("FollowersAndFollwing", followersAndFollwingSchema);

export default FollowersAndFollwingModel;

/**
 * Following: This refers to the users that you have chosen to follow.
 *            When you follow someone, you subscribe to their updates, posts, or activities.
 *            In your database schema, this is represented by the followingId, which is your ID.
 *
 * Follower: This refers to the users who have chosen to follow you.
 *           These users subscribe to your updates, posts, or activities.
 *           In your database schema, this is represented by the followerId,
 *           which is the ID of the person who is following you.
 * */