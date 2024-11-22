import * as mongoose from "mongoose";

const likeUnlikeSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

const LikeUnlikeModel = mongoose.model("LikeUnlike", likeUnlikeSchema);

export default LikeUnlikeModel;
