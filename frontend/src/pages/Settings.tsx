import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PostType } from "../types";
import { useEffect, useState } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  getUserByUsername,
  getUserFollowers,
  getUserFollowings,
  getUserLikedPosts,
  getUserStats,
} from "../api/users";
import UserBanner from "../components/UserBanner";
import { PlaceHolderImage } from "../static";
import UserFeed from "../components/tabs/user/UserFeed";
import UserSettings from "../components/tabs/settings/UserSettings";
import UserFollowers from "../components/tabs/user/UserFollowers";
import UserFollowing from "../components/tabs/user/UserFollowing";
import { useUserStore } from "../store/useUserStore";
import { useSelectedUser } from "../store/useSelectedUser";

const Settings = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const { user } = useUserStore();
  const {
    totalLikes,
    totalFollowers,
    totalFollowing,
    setSelectedUser,
    setTotalFollowers,
    setTotalFollowing,
    setTotalLikes,
    setFollowers,
    setFollowing,
    setUserLikedPosts,
    userLikedPosts,
  } = useSelectedUser();

  useEffect(() => {
    setSelectedUser(user);
  }, []);

  //TODO: for getting user stats
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
  }, [isSuccess]);

  //TODO: for getting posts
  const {
    data,
    status,
    isSuccess: isPostsSuccess,
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
      return lastPage?.data.length > 0 ? allPages.length + 1 : undefined;
    },
  });
  useEffect(() => {
    if (data && data.pages[0]?.data.posts) {
      setPosts(data.pages[0]?.data.posts);
    }
  }, [isPostsSuccess]);

  //TODO: for getting followers
  const {
    data: followers,
    status: followersStatus,
    isSuccess: followersIsSuccess,
    error: followersError,
    fetchNextPage: fetchNextPageFollowers,
    hasNextPage: hasNextPageFollowers,
    isFetchingNextPage: isFetchingNextPageFollowers,
    refetch: refetchFollowers,
  } = useInfiniteQuery({
    queryKey: ["userFollowers", user?.userName],
    queryFn: async ({ pageParam }) =>
      getUserFollowers({ userName: user?.userName, pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.data.length > 0 ? allPages.length + 1 : undefined;
    },
  });
  useEffect(() => {
    if (followersIsSuccess && followers?.pages[0]?.data) {
      setFollowers(followers?.pages[0]?.data);
    }
  }, [followersIsSuccess]);

  //TODO: for getting followings
  const {
    data: followings,
    status: followingsStatus,
    isSuccess: followingsIsSuccess,
    error: followingsError,
    fetchNextPage: fetchNextPageFollowings,
    hasNextPage: hasNextPageFollowings,
    isFetchingNextPage: isFetchingNextPageFollowings,
    refetch: refetchFollowings,
  } = useInfiniteQuery({
    queryKey: ["userFollowings", user?.userName],
    queryFn: async ({ pageParam }) =>
      getUserFollowings({ userName: user?.userName, pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.data.length > 0 ? allPages.length + 1 : undefined;
    },
  });
  useEffect(() => {
    if (followingsIsSuccess && followings?.pages[0]?.data) {
      setFollowing(followings?.pages[0]?.data);
    }
  }, [followingsIsSuccess]);

  //TODO: for getting liked posts
  const {
    data: likedPosts,
    status: likedStatus,
    isSuccess: likedIsSuccess,
    error: likedError,
    fetchNextPage: fetchNextPageLiked,
    hasNextPage: hasNextPageLiked,
    isFetchingNextPage: isFetchingNextPageLiked,
    refetch: refetchLiked,
  } = useInfiniteQuery({
    queryKey: ["userLikedPosts", user?.userName],
    queryFn: async ({ pageParam }) =>
      getUserLikedPosts({ userName: user?.userName, pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.data.length > 0 ? allPages.length + 1 : undefined;
    },
  });
  useEffect(() => {
    if (likedIsSuccess && likedPosts?.pages[0]?.data) {
      setUserLikedPosts(likedPosts?.pages[0]?.data);
    }
  }, [likedIsSuccess]);
  console.log("likedPosts", userLikedPosts);

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
          <UserFollowers
            userName={user?.userName || ""}
            fetchNextPage={fetchNextPageFollowers}
            hasNextPage={hasNextPageFollowers}
            isFetchingNextPage={isFetchingNextPageFollowers}
            error={followersError}
            refetch={refetchFollowers}
            status={followersStatus}
          />
        </TabsContent>
        <TabsContent value="following">
          <UserFollowing
            fetchNextPage={fetchNextPageFollowings}
            hasNextPage={hasNextPageFollowings}
            isFetchingNextPage={isFetchingNextPageFollowings}
            error={followingsError}
            refetch={refetchFollowings}
            status={followingsStatus}
          />
        </TabsContent>
        <TabsContent value="liked">
          <UserFeed
            posts={userLikedPosts}
            status={likedStatus}
            hasNextPage={hasNextPageLiked}
            isFetchingNextPage={isFetchingNextPageLiked}
            error={likedError}
            fetchNextPage={fetchNextPageLiked}
            message={"No liked posts found"}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
