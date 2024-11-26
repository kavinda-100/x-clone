import { useInView } from "react-intersection-observer";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { followUnfollowUser } from "../../../api/users";
import { useEffect } from "react";
import UserFollowFollowingCardSkeleton from "../../Skeletons/UserFollowFollowingCardSkeleton";
import { Button } from "../../ui/button";
import UserFollowFollowingCard from "./UserFollowFollowingCard";
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

const UserFollowing = ({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  error,
  status,
  refetch,
}: UserFollowersProps) => {
  const { Following, selectedUser: user } = useSelectedUser();
  const { ref, inView } = useInView();
  const queryClient = useQueryClient();

  // console.log("UserFollowers", Followers);
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  // for follow unfollow
  const { mutate, isPending } = useMutation({
    mutationFn: async (following_user_id: string) =>
      followUnfollowUser(following_user_id),
    onSuccess: (data, variables) => {
      // console.log("data in follow", data);
      // console.log("variables in follow", variables);
      queryClient.invalidateQueries({
        queryKey: ["recommend-for-you", user.userName],
      });
      queryClient.invalidateQueries({
        queryKey: ["userFollowings", user.userName],
      });
      queryClient.invalidateQueries({
        queryKey: ["userFollowers", user.userName],
      });
      toast.success(data?.message || "successfully");
      // Remove the user from the Followers array in the global store
      useUserStore.getState().removeFollowing(variables);
    },
    onError: (error) => {
      console.log("error in follow", error);
      toast.error(error.message || "Something went wrong");
    },
  });

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
      {status === "success" && Following.length > 0 && (
        <div className={"w-full lg:w-10/12 lg:mx-auto h-auto"}>
          {Following.map((following) => (
            <UserFollowFollowingCard
              key={following.following_user_id._id}
              userId={following.following_user_id._id}
              userName={following.following_user_id.userName}
              profileImage={following.following_user_id.profileImage}
              buttonText={"Unfollow"}
              createdAt={following.createdAt}
              FollowUnfollow={() => mutate(following.following_user_id._id)}
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
      {status === "success" && Following.length === 0 && (
        <div>No followings found</div>
      )}
    </div>
  );
};

export default UserFollowing;
