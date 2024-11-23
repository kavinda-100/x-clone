import express from "express";
import { getMe, getRecommendUsers } from "./user.controller";
import authMiddleware from "../../middleware/authMiddleware";

const route = express.Router();

// get my self
// localhost:5000/api/v1/user/me
route.get("/me", authMiddleware, getMe);
// get recommended users
// localhost:5000/api/v1/user/recommend
route.get("/recommend", authMiddleware, getRecommendUsers);

export default route;
