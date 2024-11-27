import { useMutation, useQueryClient } from "@tanstack/react-query";
import { followUnfollowUser } from "../../../api/users";
import { useEffect } from "react";
import { Button } from "../../ui/button";
import UserFollowFollowingCard from "./UserFollowFollowingCard";
import { useInView } from "react-intersection-observer";
import UserFollowFollowingCardSkeleton from "../../Skeletons/UserFollowFollowingCardSkeleton";
import { toast } from "sonner";
import { useSelectedUser } from "../../../store/useSelectedUser";

type UserFollowersProps = {
  status: "pending" | "error" | "success";
  error: any;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  refetch: () => void;
};
const UserFollowers = ({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  error,
  status,
  refetch,
}: UserFollowersProps) => {
  const { Followers, Following, selectedUser: user } = useSelectedUser();
  const { ref, inView } = useInView();
  const queryClient = useQueryClient();

  console.log("UserFollowers", Followers);
  console.log("UserFollowing", Following);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  // for follow unfollow
  const { mutate, isPending } = useMutation({
    mutationFn: async (following_user_id: string) =>
      followUnfollowUser(following_user_id),
    onSuccess: (data) => {
      // console.log("data in follow", data);
      queryClient.invalidateQueries({
        queryKey: ["recommend-for-you", user?.userName],
      });
      queryClient.invalidateQueries({
        queryKey: ["userFollowers", user?.userName],
      });
      queryClient.invalidateQueries({
        queryKey: ["userFollowings", user?.userName],
      });
      toast.success(data?.message || "successfully");
    },
    onError: (error) => {
      console.log("error in follow", error);
      toast.error(error.message || "Something went wrong");
    },
  });

  // Function to check if the user is followed
  const isUserFollowed = (userId: string) => {
    return Following.some(
      (following) => following.following_user_id._id === userId,
    );
  };

  return (
    <div className={"w-full h-auto p-2"}>
      {status === "pending" && (
        <div className={"w-10/12 mx-auto h-auto gap-2"}>
          <UserFollowFollowingCardSkeleton />
          <UserFollowFollowingCardSkeleton />
          <UserFollowFollowingCardSkeleton />
          <UserFollowFollowingCardSkeleton />
          <UserFollowFollowingCardSkeleton />
        </div>
      )}
      {status === "error" && (
        <div className={"w-full p-3 border shadow rounded"}>
          Error: {error.message}
          <Button onClick={() => refetch()} variant={"secondary"}>
            Retry
          </Button>
        </div>
      )}
      {status === "success" && Followers.length > 0 && (
        <div className={"w-full lg:w-10/12 lg:mx-auto h-auto"}>
          {Followers.map((follower) => (
            <UserFollowFollowingCard
              key={follower.follower_user_id._id}
              userId={follower.follower_user_id._id}
              userName={follower.follower_user_id.userName}
              profileImage={follower.follower_user_id.profileImage}
              buttonText={
                isUserFollowed(follower.follower_user_id._id)
                  ? "Following"
                  : "Follow Back"
              }
              createdAt={follower.createdAt}
              FollowUnfollow={() => mutate(follower.follower_user_id._id)}
              isPending={isPending}
            />
          ))}
          {isFetchingNextPage && (
            <div className={"w-full h-auto p-2"}>
              <UserFollowFollowingCardSkeleton />
            </div>
          )}
          {hasNextPage && <div ref={ref} />}
        </div>
      )}
      {status === "success" && Followers.length === 0 && (
        <div>No followers found</div>
      )}
    </div>
  );
};

export default UserFollowers;
