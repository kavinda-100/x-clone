import { commentType } from "../types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { formatDateToRelativeTime } from "../lib/utils";

const Comments = ({
  comment,
  createdAt,
  userId: { userName, profileImage, _id: userId },
  _id: commentId,
  postId,
  updatedAt,
}: commentType) => {
  console.log("comment data ", postId, updatedAt);
  return (
    <Card className={"w-full my-1"}>
      <CardHeader>
        <div className={"flex justify-between items-center"}>
          <div
            className={"flex justify-start items-center gap-3 cursor-pointer"}
          >
            <Avatar>
              <AvatarImage
                src={profileImage}
                alt={`${userName}${commentId}${userId}`}
              />
              <AvatarFallback>{userName[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <CardTitle className={"hover:underline"}>@{userName}</CardTitle>
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
        <p className={"text-pretty text-muted-foreground"}>{comment}</p>
      </CardContent>
    </Card>
  );
};

export default Comments;
