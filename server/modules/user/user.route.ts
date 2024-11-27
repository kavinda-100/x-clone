import express from "express";
import {
  getMe,
  getRecommendUsers,
  getUserFollowers,
  getUserFollowing,
  getUserLikedPosts,
  getUserStats,
  searchUsers,
} from "./user.controller";
import authMiddleware from "../../middleware/authMiddleware";

const route = express.Router();

// get my self
// localhost:5000/api/v1/user/me
route.get("/me", authMiddleware, getMe);
// get recommended users
// localhost:5000/api/v1/user/recommend
route.get("/recommend", authMiddleware, getRecommendUsers);
// get user followers
// localhost:5000/api/v1/user/followers/:username?page=1
route.get("/followers/:username", authMiddleware, getUserFollowers);
// get user following
// localhost:5000/api/v1/user/following/:username?page=1
route.get("/following/:username", authMiddleware, getUserFollowing);
// get user liked posts
// localhost:5000/api/v1/user/liked/:username?page=1
route.get("/liked/:username", authMiddleware, getUserLikedPosts);
// get user stats
// localhost:5000/api/v1/user/stats/:username
route.get("/stats/:username", authMiddleware, getUserStats);
// search users
// localhost:5000/api/v1/user/search?search=abc
route.get("/search", authMiddleware, searchUsers);

export default route;
