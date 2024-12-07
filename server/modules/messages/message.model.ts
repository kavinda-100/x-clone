import mongoose from "mongoose";
import { zodMessageSchemaType } from "../../shared/zod/messages";

const messageSchema = new mongoose.Schema<zodMessageSchemaType>(
  {
    message: { type: String },
    image_url: { type: String },
    image_url_fileId: { type: String },
    sender_id: { type: String, required: true },
    receiver_id: { type: String, required: true },
  },
  { timestamps: true },
);

const MessageModel = mongoose.model("Message", messageSchema);

export default MessageModel;
