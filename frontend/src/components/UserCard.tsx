import { UserType } from "@shared/types";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { followUnfollowUser } from "../api/users";
import { toast } from "sonner";

type UserCardProps = {
  user: UserType;
  followingUsers: UserType[];
};

const UserCard = ({ user, followingUsers }: UserCardProps) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (id: string) => followUnfollowUser(id),
    onSuccess: (data) => {
      console.log("data in follow", data);
      queryClient.invalidateQueries({ queryKey: ["recommend-for-you"] });
      toast.success(data?.message || "successfully");
    },
    onError: (error) => {
      console.log("error in follow", error);
      toast.error(error.message || "Something went wrong");
    },
  });

  return (
    <div
      key={user._id}
      className={
        "flex justify-between items-center gap-2 p-3 border rounded-md cursor-pointer hover:opacity-70 w-full"
      }
    >
      <div className={"flex justify-start items-center gap-3"}>
        <Avatar>
          <AvatarImage
            src={user.profileImage}
            alt={`${user._id}-${user.userName}`}
          />
          <AvatarFallback>{user.userName[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className={"flex-col gap-2"}>
          <p className={"text-sm font-light"}>{user.userName}</p>
          <p className={"text-sm font-normal"}>
            @{user.userName.split(" ").join("").toLowerCase()}
          </p>
        </div>
      </div>
      <Button
        onClick={() => mutate(user._id)}
        disabled={isPending}
        variant={
          followingUsers.find((u: UserType) => u._id === user._id)
            ? "outline"
            : "default"
        }
      >
        {followingUsers.find((u: UserType) => u._id === user._id)
          ? "Unfollow"
          : "Follow"}
      </Button>
    </div>
  );
};

export default UserCard;
