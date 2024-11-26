import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { capitalizeFirstLetter, formatJoinDate } from "../../../lib/utils";
import { Button } from "../../ui/button";
import { Card } from "../../ui/card";

type UserFollowersProps = {
  userId: string;
  userName: string;
  profileImage: string;
  buttonText: string;
  createdAt: string;
  FollowUnfollow: (_id: string) => void;
  isPending: boolean;
};

const UserFollowFollowingCard = ({
  userId,
  userName,
  profileImage,
  buttonText,
  createdAt,
  FollowUnfollow,
  isPending,
}: UserFollowersProps) => {
  return (
    <Card className={"w-full p-4 mb-2"}>
      <div className={"flex justify-between items-center gap-3"}>
        <div className={"flex justify-start items-center gap-2"}>
          <Avatar>
            <AvatarImage src={profileImage} />
            <AvatarFallback>{userName[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className={"flex-col gap-2"}>
            <p className={"text-muted-foreground text-pretty font-medium"}>
              {capitalizeFirstLetter(userName)}
            </p>
            <p className={"text-pretty text-sm text-muted-foreground"}>
              {formatJoinDate(createdAt)}
            </p>
          </div>
        </div>
        <Button
          onClick={() => FollowUnfollow(userId)}
          className={"mt-2"}
          disabled={isPending}
        >
          {buttonText}
        </Button>
      </div>
    </Card>
  );
};

export default UserFollowFollowingCard;
