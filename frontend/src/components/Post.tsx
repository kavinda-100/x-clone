import { postCommentType, PostType } from "../types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { formatDateToRelativeTime } from "../lib/utils";
import { Button } from "./ui/button";
import { MessageSquareMore, ThumbsUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { IKImage, IKVideo } from "imagekitio-react";
import { Input } from "./ui/input";
import { useMutation } from "@tanstack/react-query";
import { likeUnlikePost, postComment } from "../api/post";
import { toast } from "sonner";
import { useUserStore } from "../store/useUserStore";
import { useState } from "react";

const Post = ({
  _id: postId,
  title,
  content,
  image_url,
  video_url,
  likes,
  comments,
  createdAt,
  user: { _id: userId, userName, profileImage } = {
    _id: "",
    userName: "",
    profileImage: "",
  },
}: PostType) => {
  const [newComment, setNewComment] = useState("");
  const { user } = useUserStore();
  const navigate = useNavigate();

  const postClickHandler = (postId: string) => {
    navigate(`/post/${postId}`);
  };

  const userClickHandler = (username: string) => {
    navigate(`/user/${username}`);
  };

  // mutation for adding comment
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: postCommentType) => postComment(data),
    onSuccess: () => {
      console.log("comment added");
      toast.success("Comment added");
    },
    onError: (error) => {
      console.log("error adding comment", error);
      toast.error(error.message || "Error adding comment");
    },
  });

  const handleComment = (postId: string) => {
    const data: postCommentType = {
      comment: newComment,
      postId,
      userId: user?._id || "",
    };
    if (data.userId === undefined || data.postId === undefined) {
      toast.error("Please login to comment or refresh the page");
      return;
    }
    if (
      data.comment === "" ||
      data.comment === undefined ||
      data.comment.length === 0
    ) {
      toast.error("Please add a comment");
      return;
    }
    mutate(data);
  };

  // mutation for liking post
  const { mutate: likePost, isPending: isLikePostPending } = useMutation({
    mutationFn: async (postId: string) => likeUnlikePost(postId),
    onSuccess: (data) => {
      console.log("post liked", data);
      toast.success(data?.message || "success");
    },
    onError: (error) => {
      console.log("error liking post", error);
      toast.error(error.message || "Error liking post");
    },
  });

  return (
    <Card className={"w-full mb-1 cursor-pointer"}>
      <CardHeader>
        <div className={"flex justify-between items-center"}>
          <div
            onClick={() => userClickHandler(userName)}
            className={"flex justify-start items-center gap-3 cursor-pointer"}
          >
            <Avatar>
              <AvatarImage
                src={profileImage}
                alt={`${userName}${postId}${userId}`}
              />
              <AvatarFallback>
                {userName ? userName[0].toUpperCase() : ""}
              </AvatarFallback>
            </Avatar>
            <CardTitle className={"hover:underline"}>{userName}</CardTitle>
          </div>
          <p
            className={
              "text-muted-foreground text-sm text-pretty font-thin text-right"
            }
          >
            {formatDateToRelativeTime(createdAt)}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <div
          className={"flex-col gap-2 mb-2"}
          onClick={() => postClickHandler(postId)}
        >
          <h1 className={"text-md font-bold hover:opacity-55"}>{title}</h1>
          <p className={"font-light text-sm hover:opacity-55"}>{content}</p>
        </div>
        {image_url && (
          <IKImage
            className={
              "w-full h-auto max-h-[300px] lg:max-h-[400px] object-cover rounded-md"
            }
            src={image_url}
            alt={title}
            lqip={{ active: true }}
            loading={"lazy"}
          />
        )}
        {video_url && (
          <IKVideo
            src={video_url}
            controls={true}
            className={
              "w-full h-auto max-h-[300px] lg:max-h-[400px] object-cover rounded-md"
            }
          />
        )}
      </CardContent>
      <CardFooter className={"flex justify-evenly items-center"}>
        <Button
          variant={"ghost"}
          size={"lg"}
          className={"flex justify-start items-center"}
          onClick={() => likePost(postId)}
          disabled={isLikePostPending}
        >
          {likes} <ThumbsUp className={"size-10"} />
        </Button>
        {/* comment area */}
        <Dialog>
          <DialogTrigger>
            <Button
              variant={"ghost"}
              size={"lg"}
              className={"flex justify-start items-center"}
            >
              {comments} <MessageSquareMore />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add a comment</DialogTitle>
            </DialogHeader>
            <div className={"w-full flex-col gap-3"}>
              <Input
                onChange={(e) => setNewComment(e.target.value)}
                placeholder={"Type comment here..."}
              />
              <Button onClick={() => handleComment(postId)} className={"mt-3"}>
                {isPending ? "Adding comment..." : "Add Comment"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default Post;
