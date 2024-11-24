import { useParams } from "react-router-dom";
import UserBanner from "../components/UserBanner";
import { PlaceHolderImage } from "../static";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getUserByUsername } from "../api/users";
import { PostType } from "../types";
import { useEffect, useState } from "react";
import { UserType } from "@shared/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserFeed from "../components/tabs/user/UserFeed";
import UserFollowers from "../components/tabs/user/UserFollowers";
import UserFollowing from "../components/tabs/user/UserFollowing";
import UserLiked from "../components/tabs/user/UserLiked";

const User = () => {
  const { username } = useParams();
  const [user, setUser] = useState<UserType | null>(null);
  const [posts, setPosts] = useState<PostType[]>([]);

  const {
    data,
    status,
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
      setUser(data.pages[0]?.data.user);
    }

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
        isSettingsPage={false}
      />
      <div className={"text-center"}>
        <h1 className={"text-md font-bold text-muted-foreground"}>
          {username || ""}
        </h1>
        <p className={"text-sm text-muted-foreground"}>{user?.email || ""}</p>
      </div>

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

export default User;
