import express from "express";

import { getAllPosts, getFollowingPosts, getFollowingsPostsByUserName, createPost, deletePost, commentOnPost} from "./post.controller";

const router = express.Router();

// get all posts
router.get("/all", getAllPosts);
// get post of the following users
// http://localhost:5000/api/post/following/?page=1&limit=10
router.get("/following", getFollowingPosts);
// get post of the following user by userName
// http://localhost:5000/api/post/following/:username?page=1&limit=10
router.get("/following/:username", getFollowingsPostsByUserName);
// create post
router.post("/", createPost);
// delete post
router.delete("/:post_id", deletePost);
// comment on post
router.post("/comment", commentOnPost);


export default router;