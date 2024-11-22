import { PostType } from "../types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { formatDateToRelativeTime } from "../lib/utils";
import { Button } from "./ui/button";
import { MessageSquareMore, ThumbsUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Post = ({
  _id,
  title,
  content,
  image_url,
  video_url,
  likes,
  comments,
  createdAt,
  userId: { _id: userId, userName, profileImage },
}: PostType) => {
  const navigate = useNavigate();

  const postClickHandler = (postId: string) => {
    navigate(`/post/${postId}`);
  };

  const userClickHandler = () => {};

  return (
    <Card className={"w-full mb-1 cursor-pointer"}>
      <CardHeader>
        <div className={"flex justify-between items-center"}>
          <div
            onClick={() => userClickHandler}
            className={"flex justify-start items-center gap-3 cursor-pointer"}
          >
            <Avatar>
              <AvatarImage
                src={profileImage}
                alt={`${userName}${_id}${userId}`}
              />
              <AvatarFallback>{userName[0].toUpperCase()}</AvatarFallback>
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
          onClick={() => postClickHandler(_id)}
        >
          <h1 className={"text-md font-bold hover:opacity-55"}>{title}</h1>
          <p className={"font-light text-sm hover:opacity-55"}>{content}</p>
        </div>
        {image_url && (
          <img
            className={"w-full h-auto max-h-[400px] object-cover rounded-md"}
            src={image_url}
            alt={title}
          />
        )}
        {video_url && (
          <video
            src={video_url}
            controls
            className={"w-full h-auto max-h-[400px] object-cover rounded-md"}
          />
        )}
      </CardContent>
      <CardFooter className={"flex justify-evenly items-center"}>
        <Button
          variant={"ghost"}
          size={"lg"}
          className={"flex justify-start items-center"}
        >
          {likes} <ThumbsUp className={"size-10"} />
        </Button>
        <Button
          variant={"ghost"}
          size={"lg"}
          className={"flex justify-start items-center"}
        >
          {comments} <MessageSquareMore />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Post;
