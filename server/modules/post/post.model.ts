import * as mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image_url: {
      type: String,
      required: false,
    },
    image_url_fileId: {
      type: String,
      required: false,
    },
    video_url: {
      type: String,
      required: false,
    },
    video_url_fileId: {
      type: String,
      required: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const PostModel = mongoose.model("Post", postSchema);

export default PostModel;
