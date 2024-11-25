import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PostType } from "../types";
import { useEffect, useState } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getUserByUsername, getUserStats } from "../api/users";
import UserBanner from "../components/UserBanner";
import { PlaceHolderImage } from "../static";
import UserFeed from "../components/tabs/user/UserFeed";
import UserSettings from "../components/tabs/settings/UserSettings";
import UserFollowers from "../components/tabs/user/UserFollowers";
import UserFollowing from "../components/tabs/user/UserFollowing";
import UserLiked from "../components/tabs/user/UserLiked";
import { useUserStore } from "../store/useUserStore";

const Settings = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const {
    user,
    totalLikes,
    totalFollowers,
    totalFollowing,
    setTotalFollowers,
    setTotalFollowing,
    setTotalLikes,
  } = useUserStore();

  const {
    data: stats,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["userStats", user?.userName],
    queryFn: async () => getUserStats(user?.userName || ""),
  });
  console.log("stats", stats?.data);
  useEffect(() => {
    if (!isLoading && !isError && isSuccess) {
      setTotalFollowers(stats?.data.totalFollowers);
      setTotalFollowing(stats?.data.totalFollowings);
      setTotalLikes(stats?.data.totalLikes);
    }
  }, []);

  const {
    data,
    status,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["userByUserName", user?.userName],
    queryFn: async ({ pageParam }) =>
      getUserByUsername({ userName: user?.userName || "", pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      // console.log("lastPage", lastPage);
      // console.log("allPages", allPages);
      return lastPage?.data.length > 0 ? allPages.length + 1 : undefined;
    },
  });

  // console.log("posts", posts);
  // console.log("user", user);
  useEffect(() => {
    // get the user data from the first page and set it to the state
    // I dont want user data to be set here because it will override the user data from the store
    // if (data && data.pages[0]?.data.user) {
    //   setUser(data.pages[0]?.data.user);
    // }

    // get the posts from the first page and set it to the state
    if (data && data.pages[0]?.data.posts) {
      setPosts(data.pages[0]?.data.posts);
    }
  }, []);

  return (
    <div className={"w-full h-auto p-2"}>
      <UserBanner
        profileImage={user?.profileImage || PlaceHolderImage.profileImage}
        coverImage={user?.coverImage || PlaceHolderImage.coverImage}
        isSettingsPage={true}
        userName={user?.userName || ""}
        email={user?.email || ""}
        bio={user?.bio || ""}
        createdAt={user?.createdAt || ""}
        totalFollowers={totalFollowers}
        totalFollowing={totalFollowing}
        totalLikes={totalLikes}
      />
      <Tabs defaultValue="setting" className="w-full mt-3">
        <TabsList className={"w-full"}>
          <TabsTrigger value="setting" className={"w-full"}>
            Settings
          </TabsTrigger>
          <TabsTrigger value="feed" className={"w-full"}>
            Feed
          </TabsTrigger>
          <TabsTrigger value="followers" className={"w-full"}>
            Followers
          </TabsTrigger>
          <TabsTrigger value="following" className={"w-full"}>
            Following
          </TabsTrigger>
          <TabsTrigger value="liked" className={"w-full"}>
            Liked
          </TabsTrigger>
        </TabsList>
        <TabsContent value="setting">
          <UserSettings />
        </TabsContent>
        <TabsContent value="feed">
          <UserFeed
            posts={posts}
            status={status}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            error={error}
            fetchNextPage={fetchNextPage}
          />
        </TabsContent>
        <TabsContent value="followers">
          <UserFollowers />
        </TabsContent>
        <TabsContent value="following">
          <UserFollowing />
        </TabsContent>
        <TabsContent value="liked">
          <UserLiked />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
