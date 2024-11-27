import { SelectedUserPostType } from "../../../types";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { formatDateToRelativeTime } from "../../../lib/utils";
import { IKImage, IKVideo } from "imagekitio-react";
import { Button } from "../../ui/button";
import { MessageSquareMore, ThumbsUp } from "lucide-react";

const UserLikedPost = ({
  _id,
  userId,
  postId: {
    _id: postId,
    title,
    content,
    image_url,
    video_url,
    userId: { _id: postUserId, userName, profileImage },
    likes,
    comments,
    createdAt: postCreatedAt,
  },
}: SelectedUserPostType) => {
  const navigate = useNavigate();
  console.log(postUserId, postCreatedAt, postId);

  const postClickHandler = (postId: string) => {
    navigate(`/post/${postId}`);
  };

  const userClickHandler = (username: string) => {
    navigate(`/user/${username}`);
  };
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
                alt={`${userName}${_id}${userId}`}
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
            {formatDateToRelativeTime(postCreatedAt)}
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
          // <img
          //   className={"w-full h-auto max-h-[400px] object-cover rounded-md"}
          //   src={image_url}
          //   alt={title}
          // />
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
          // <video
          //   src={video_url}
          //   controls
          //   className={"w-full h-auto max-h-[400px] object-cover rounded-md"}
          // />
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

export default UserLikedPost;
