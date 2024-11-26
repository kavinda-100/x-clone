import { UserType } from "@shared/types";
import { useQuery } from "@tanstack/react-query";
import { getRecommendUsers } from "../api/users";
import RecomendedUserScelleton from "./Skeletons/RecomendedUserScelleton";
import UserCard from "./UserCard";

const RightSideBar = () => {
  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: ["recommend-for-you"],
    queryFn: getRecommendUsers,
  });
  // console.log(data?.data.recommendedUsers);
  // console.log(data?.data.followingUsers);

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
                    <UserCard
                      user={user}
                      followingUsers={data?.data.followingUsers}
                    />
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
