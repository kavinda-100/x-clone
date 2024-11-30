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

const UserLikedPost = ({ _id, userId, postId }: SelectedUserPostType) => {
  const navigate = useNavigate();

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
            onClick={() => userClickHandler(userId?.userName || "")}
            className={"flex justify-start items-center gap-3 cursor-pointer"}
          >
            <Avatar>
              <AvatarImage
                src={userId?.profileImage}
                alt={`${userId?.userName || ""}${_id}${userId?._id}`}
              />
              <AvatarFallback>
                {userId?.userName ? userId.userName[0].toUpperCase() : ""}
              </AvatarFallback>
            </Avatar>
            <CardTitle className={"hover:underline"}>
              {userId?.userName}
            </CardTitle>
          </div>
          <p
            className={
              "text-muted-foreground text-sm text-pretty font-thin text-right"
            }
          >
            {formatDateToRelativeTime(
              postId?.createdAt || new Date().toISOString(),
            )}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <div
          className={"flex-col gap-2 mb-2"}
          onClick={() => postClickHandler(postId?._id || "")}
        >
          <h1 className={"text-md font-bold hover:opacity-55"}>
            {postId?.title}
          </h1>
          <p className={"font-light text-sm hover:opacity-55"}>
            {postId?.content}
          </p>
        </div>
        {postId?.image_url && (
          <IKImage
            className={
              "w-full h-auto max-h-[300px] lg:max-h-[400px] object-cover rounded-md"
            }
            src={postId.image_url}
            alt={postId?.title || ""}
            lqip={{ active: true }}
            loading={"lazy"}
          />
        )}
        {postId?.video_url && (
          <IKVideo
            src={postId.video_url}
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
          {postId?.likes || 0} <ThumbsUp className={"size-10"} />
        </Button>
        <Button
          variant={"ghost"}
          size={"lg"}
          className={"flex justify-start items-center"}
        >
          {postId?.comments || 0} <MessageSquareMore />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UserLikedPost;
