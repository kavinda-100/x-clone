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
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  cn,
  formatDateToRelativeTime,
  formatNumber,
  generateRandomNumber,
} from "../lib/utils";
import { Button } from "./ui/button";
import { Bookmark, Heart, MessageCircle, Repeat2, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { IKImage, IKVideo } from "imagekitio-react";
import { Input } from "./ui/input";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllLikesByPostId,
  likeUnlikePost,
  postComment,
  deletePost,
} from "../api/post";
import { toast } from "sonner";
import { useUserStore } from "../store/useUserStore";
import { useEffect, useState } from "react";

type AllLikesByPostIdType = {
  _id: string;
  postId: string;
  userId: string;
};

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
  const [allLikes, setAllLikes] = useState<AllLikesByPostIdType[]>([]);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const { user } = useUserStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const postClickHandler = (postId: string) => {
    navigate(`/post/${postId}`);
  };

  const userClickHandler = (username: string) => {
    navigate(`/user/${username}`);
  };

  //TODO: get all likes by post id
  const { data, isSuccess, isError, error } = useQuery({
    queryKey: ["allLikes", postId],
    queryFn: async () => getAllLikesByPostId(postId || ""),
  });
  // console.log("all likes", data?.data);
  useEffect(() => {
    if (isSuccess) {
      setAllLikes(data?.data);
    }
    if (isError) {
      setAllLikes([]);
    }
  }, [isSuccess, data]);
  if (isError) {
    toast.error("Error getting likes");
    console.log("error getting likes", error);
  }

  //TODO: mutation for adding comment
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

  //TODO: mutation for liking post
  const { mutate: likePost, isPending: isLikePostPending } = useMutation({
    mutationFn: async (postId: string) => likeUnlikePost(postId),
    onSuccess: (data) => {
      console.log("post liked", data);
      toast.success(data?.message || "success");
      queryClient.invalidateQueries({ queryKey: ["allLikes", postId] });
    },
    onError: (error) => {
      console.log("error liking post", error);
      toast.error(error.message || "Error liking post");
    },
  });

  //TODO: mutation for deleting post
  const { mutate: deletePostMutate } = useMutation({
    mutationFn: async (postId: string) => deletePost(postId),
    onSuccess: () => {
      console.log("post deleted");
      toast.success("Post deleted");
      queryClient.invalidateQueries({
        queryKey: ["userByUserName", user?.userName],
      });
      queryClient.invalidateQueries({
        queryKey: ["for-you"],
      });
    },
    onError: (error) => {
      console.log("error deleting post", error);
      toast.error(error.message || "Error deleting post");
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
            <CardTitle className={"hover:underline truncate"}>
              {userName}
            </CardTitle>
          </div>
          <div className={"flex justify-center items-center gap-2"}>
            <p
              className={
                "text-muted-foreground text-sm text-pretty font-thin text-right"
              }
            >
              {formatDateToRelativeTime(createdAt)}
            </p>
            {userId === user?._id && (
              <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
                <DialogTrigger>
                  <Trash className={"size-4 lg:size-5 text-red-600"} />
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      Are you sure, You want to delete this post?
                    </DialogTitle>
                  </DialogHeader>
                  <div className={"w-full mt-2 flex justify-end"}>
                    <Button
                      onClick={() => {
                        deletePostMutate(postId);
                        setDeleteOpen(false);
                      }}
                      variant={"destructive"}
                    >
                      Yes, Delete
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
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
      <ScrollArea>
        <CardFooter className={"flex flex-row justify-evenly items-center"}>
          {/* like area */}
          <Button
            variant={"ghost"}
            size={"lg"}
            className={"flex justify-start items-center"}
            onClick={() => likePost(postId)}
            disabled={isLikePostPending}
          >
            <Heart
              className={cn("size-5 lg:size-10", {
                "text-red-500 font-bold": allLikes.some(
                  (like) => like.userId === user?._id,
                ),
              })}
            />
            <p
              className={cn("text-pretty text-sm", {
                "text-red-500 font-bold": allLikes.some(
                  (like) => like.userId === user?._id,
                ),
              })}
            >
              {formatNumber(likes)}
            </p>
          </Button>
          {/* bookMark area */}
          <Button
            variant={"ghost"}
            size={"lg"}
            className={"flex justify-start"}
          >
            <Bookmark className={"size-5 lg:size-10"} />
            <p className={"text-sm"}>{formatNumber(generateRandomNumber())}</p>
          </Button>
          {/* comment area */}
          <Dialog>
            <DialogTrigger>
              <Button
                variant={"ghost"}
                size={"lg"}
                className={"flex justify-start items-center"}
              >
                <MessageCircle className={"size-5 lg:size-10"} />
                <p className={"text-sm"}>{formatNumber(comments)}</p>
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
                <Button
                  onClick={() => handleComment(postId)}
                  className={"mt-3"}
                >
                  {isPending ? "Adding comment..." : "Add Comment"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          {/*  repeat area */}
          <Button
            variant={"ghost"}
            size={"lg"}
            className={"flex justify-start"}
          >
            <Repeat2 className={"size-5 lg:size-10"} />
            <p className={"text-sm"}>{formatNumber(generateRandomNumber())}</p>
          </Button>
          {/* scroll bar */}
          <ScrollBar orientation={"horizontal"} />
        </CardFooter>
      </ScrollArea>
    </Card>
  );
};

export default Post;
