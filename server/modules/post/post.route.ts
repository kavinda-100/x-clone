import express from "express";

import {
  getAllPosts,
  getFollowingPosts,
  getFollowingsPostsByUserName,
  createPost,
  deletePost,
  commentOnPost,
  getSinglePostByPostID,
  likeUnlikePost,
} from "./post.controller";
import authMiddleware from "../../middleware/authMiddleware";
import { zodValidation } from "../../middleware/zodValidation";
import { zodCommentSchema, zodPostSchema } from "../../shared/zod/post";

const router = express.Router();

// get all posts
// http://localhost:5000/api/post/all?page=1&limit=10
router.get("/all", authMiddleware, getAllPosts);
// get post of the following users
// http://localhost:5000/api/post/following/?page=1&limit=10
router.get("/following", authMiddleware, getFollowingPosts);
// get post of the following user by userName
// http://localhost:5000/api/post/following/:username?page=1&limit=10
router.get(
  "/following/:username",
  authMiddleware,
  getFollowingsPostsByUserName,
);
// get single post by post id
// http://localhost:5000/api/post/:post_id
router.get("/:post_id", authMiddleware, getSinglePostByPostID);
// create post
// http://localhost:5000/api/post/
router.post("/", authMiddleware, zodValidation(zodPostSchema), createPost);
// delete post
// http://localhost:5000/api/post/:post_id
router.delete("/:post_id", authMiddleware, deletePost);
// comment on post
// http://localhost:5000/api/post/comment
router.post(
  "/comment",
  authMiddleware,
  zodValidation(zodCommentSchema),
  commentOnPost,
);
// like/unlike post
// http://localhost:5000/api/post/like-unlike/:post_id
router.post("/like-unlike/:post_id", authMiddleware, likeUnlikePost);

export default router;
