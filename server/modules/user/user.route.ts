import express from "express";
import {getMe} from "./user.controller";
import authMiddleware from "../../middleware/authMiddleware";

const route = express.Router();


route.get("/me", authMiddleware, getMe)


export default route;