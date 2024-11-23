import { UserType } from "@shared/types";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { followUnfollowUser, getRecommendUsers } from "../api/users";
import RecomendedUserScelleton from "./scelletons/RecomendedUserScelleton";
import { toast } from "sonner";

const RightSideBar = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: ["recommend-for-you"],
    queryFn: getRecommendUsers,
  });
  // console.log(data?.data.recommendedUsers);
  // console.log(data?.data.followingUsers);

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
    <>
      {/*desktop sidebar */}
      <aside className={"hidden min-w-[300px] lg:flex my-2"}>
        <div className={"flex flex-col gap-3 w-full"}>
          <div className={"flex flex-col gap-2"}>
            <h1 className={"font-semibold"}>You Might Like</h1>
            {/* if error */}
            {isError && (
              <p className={"text-sm text-red-600 text-pretty"}>
                Something went wrong. Please Refresh the site.
              </p>
            )}
            {/* if loading */}
            {isLoading && (
              <div className={"w-full space-y-2"}>
                {Array.from({ length: 5 }).map((_, index) => {
                  return <RecomendedUserScelleton key={index} />;
                })}
              </div>
            )}
            {/* if success */}
            <div className={"w-full space-y-2"}>
              {isSuccess &&
                data?.data.recommendedUsers.map((user: UserType) => {
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
                          <AvatarFallback>
                            {user.userName[0].toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className={"flex-col gap-2"}>
                          <p className={"text-sm font-light"}>
                            {user.userName}
                          </p>
                          <p className={"text-sm font-normal"}>
                            @{user.userName.split(" ").join("").toLowerCase()}
                          </p>
                        </div>
                      </div>
                      <Button
                        onClick={() => mutate(user._id)}
                        disabled={isPending}
                        variant={
                          data?.data.followingUsers.find(
                            (u: UserType) => u._id === user._id,
                          )
                            ? "outline"
                            : "default"
                        }
                      >
                        {data?.data.followingUsers.find(
                          (u: UserType) => u._id === user._id,
                        )
                          ? "Unfollow"
                          : "Follow"}
                      </Button>
                    </div>
                  );
                })}
            </div>
            {/* if no one to follow */}
            {isSuccess && data?.data.length === 0 && (
              <p className={"text-sm text-muted-foreground text-pretty"}>
                No one to follow
              </p>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default RightSideBar;
