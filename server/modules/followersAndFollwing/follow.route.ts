import express from "express";
import { followUnfollow } from "./follow.controller";
import authMiddleware from "../../middleware/authMiddleware";

const router = express.Router();

// Route to follow or unfollow a user
// localhost:5000/api/v1/follow/follow-unfollow
router.post("/follow-unfollow", authMiddleware, followUnfollow);

export default router;
