import { useParams } from "react-router-dom";
import UserBanner from "../components/UserBanner";
import { PlaceHolderImage } from "../static";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  getUserByUsername,
  getUserFollowers,
  getUserFollowings,
  getUserLikedPosts,
  getUserStats,
} from "../api/users";
import { PostType } from "../types";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserFeed from "../components/tabs/user/UserFeed";
import UserFollowers from "../components/tabs/user/UserFollowers";
import UserFollowing from "../components/tabs/user/UserFollowing";
import { useSelectedUser } from "../store/useSelectedUser";
import UserLiked from "../components/tabs/user/UserLiked";

const User = () => {
  const { username } = useParams();
  const {
    selectedUser,
    totalFollowers,
    totalFollowing,
    totalLikes,
    userLikedPosts,
    setSelectedUser,
    setFollowers,
    setFollowing,
    setUserLikedPosts,
    setTotalFollowers,
    setTotalFollowing,
    setTotalLikes,
  } = useSelectedUser();
  const [posts, setPosts] = useState<PostType[]>([]);

  //TODO: for getting selectedUser stats
  const {
    data: stats,
    isLoading,
    isError,
    isSuccess: statsSuccess,
  } = useQuery({
    queryKey: ["userStats", username],
    queryFn: async () => getUserStats(username || ""),
  });
  // console.log("stats", stats?.data);
  useEffect(() => {
    if (!isLoading && !isError && statsSuccess) {
      setTotalFollowers(stats?.data.totalFollowers);
      setTotalFollowing(stats?.data.totalFollowings);
      setTotalLikes(stats?.data.totalLikes);
    }
  }, [statsSuccess]);

  //TODO: for getting user data and posts
  const {
    data,
    status,
    isSuccess,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["userByUserName", username],
    queryFn: async ({ pageParam }) =>
      getUserByUsername({ userName: username || "", pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      // console.log("lastPage", lastPage);
      // console.log("allPages", allPages);
      return lastPage?.data.length > 0 ? allPages.length + 1 : undefined;
    },
  });
  //TODO: This is how map function should be used in "infiniteQuery" its a map function inside a map function
  // console.log("data", data);
  // console.log(
  //   data?.pages.map((page) =>
  //     page?.data?.posts.map((post: PostType) => post.title),
  //   ),
  // );

  useEffect(() => {
    // get the user data from the first page and set it to the state
    if (data && data.pages[0]?.data.user) {
      setSelectedUser(data.pages[0]?.data.user);
    }

    // get the posts from the first page and set it to the state
    if (data && data.pages[0]?.data.posts) {
      setPosts(data.pages[0]?.data.posts);
    }
  }, [isSuccess]);

  //TODO: getting selected user followers
  const {
    data: followers,
    status: followersStatus,
    isSuccess: followersSuccess,
    error: followersError,
    fetchNextPage: fetchNextPageFollowers,
    hasNextPage: hasNextPageFollowers,
    isFetchingNextPage: isFetchingNextPageFollowers,
    refetch: refetchFollowers,
  } = useInfiniteQuery({
    queryKey: ["userFollowers", username],
    queryFn: async ({ pageParam }) =>
      getUserFollowers({ userName: username || "", pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.data.length > 0 ? allPages.length + 1 : undefined;
    },
  });
  useEffect(() => {
    if (followersSuccess && followers?.pages[0]?.data) {
      setFollowers(followers?.pages[0]?.data);
    }
  }, [followersSuccess]);

  //TODO: getting selected user followings
  const {
    data: followings,
    status: followingsStatus,
    isSuccess: followingsSuccess,
    error: followingsError,
    fetchNextPage: fetchNextPageFollowings,
    hasNextPage: hasNextPageFollowings,
    isFetchingNextPage: isFetchingNextPageFollowings,
    refetch: refetchFollowings,
  } = useInfiniteQuery({
    queryKey: ["userFollowings", username],
    queryFn: async ({ pageParam }) =>
      getUserFollowings({ userName: username || "", pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.data.length > 0 ? allPages.length + 1 : undefined;
    },
  });
  useEffect(() => {
    if (followingsSuccess && followings?.pages[0]?.data) {
      setFollowing(followings?.pages[0]?.data);
    }
  }, [followingsSuccess]);

  //TODO: getting selected user liked posts
  const {
    data: likedPosts,
    status: likedPostsStatus,
    isSuccess: likedPostsSuccess,
    error: likedPostsError,
    fetchNextPage: fetchNextPageLikedPosts,
    hasNextPage: hasNextPageLikedPosts,
    isFetchingNextPage: isFetchingNextPageLikedPosts,
  } = useInfiniteQuery({
    queryKey: ["userLikedPosts", username],
    queryFn: async ({ pageParam }) =>
      getUserLikedPosts({ userName: username || "", pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.data.length > 0 ? allPages.length + 1 : undefined;
    },
  });
  useEffect(() => {
    if (likedPostsSuccess && likedPosts?.pages[0]?.data) {
      setUserLikedPosts(likedPosts?.pages[0]?.data);
    }
  }, [likedPostsSuccess]);
  console.log("likedPosts", likedPosts?.pages[0]?.data);
  console.log("likedPosts from store", userLikedPosts);

  return (
    <div className={"w-full h-auto p-2"}>
      <UserBanner
        profileImage={
          selectedUser?.profileImage || PlaceHolderImage.profileImage
        }
        coverImage={selectedUser?.coverImage || PlaceHolderImage.coverImage}
        isSettingsPage={false}
        userName={selectedUser?.userName || ""}
        email={selectedUser?.email || ""}
        bio={selectedUser?.bio || ""}
        createdAt={selectedUser?.createdAt || ""}
        totalFollowers={totalFollowers}
        totalFollowing={totalFollowing}
        totalLikes={totalLikes}
      />

      <Tabs defaultValue="feed" className="w-full mt-3">
        <TabsList className={"w-full"}>
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
            status={followersStatus}
            hasNextPage={hasNextPageFollowers}
            isFetchingNextPage={isFetchingNextPageFollowers}
            error={followersError}
            fetchNextPage={fetchNextPageFollowers}
            refetch={refetchFollowers}
          />
        </TabsContent>
        <TabsContent value="following">
          <UserFollowing
            status={followingsStatus}
            hasNextPage={hasNextPageFollowings}
            isFetchingNextPage={isFetchingNextPageFollowings}
            error={followingsError}
            fetchNextPage={fetchNextPageFollowings}
            refetch={refetchFollowings}
          />
        </TabsContent>
        <TabsContent value="liked">
          <UserLiked
            posts={userLikedPosts}
            status={likedPostsStatus}
            hasNextPage={hasNextPageLikedPosts}
            isFetchingNextPage={isFetchingNextPageLikedPosts}
            error={likedPostsError}
            fetchNextPage={fetchNextPageLikedPosts}
            message={`No Liked posts found for ${username}`}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default User;
