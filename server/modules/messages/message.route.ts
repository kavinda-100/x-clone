import express from "express";
import authMiddleware from "../../middleware/authMiddleware";
import { sendMessage, myFriends, getMessages } from "./message.controller";
import { zodValidation } from "../../middleware/zodValidation";
import { zodMessageSchema } from "../../shared/zod/messages";

const router = express.Router();

// for post/send a message
//http://localhost:5000/api/v1/message/
router.post("/", authMiddleware, zodValidation(zodMessageSchema), sendMessage);
// for get my friends
//http://localhost:5000/api/v1/message/myFriends
router.get("/myFriends", authMiddleware, myFriends);
// for get messages
//http://localhost:5000/api/v1/message/:friendId
router.get("/:friendId", authMiddleware, getMessages);

export default router;
