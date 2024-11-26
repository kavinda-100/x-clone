import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllPostsFollowing } from "../../api/post";
import Post from "../Post";
import { PostType } from "../../types";
import PostSkeleton from "../Skeletons/PostSkeleton";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const Following = () => {
  const { ref, inView } = useInView();

  const {
    data,
    status,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["following"],
    queryFn: async ({ pageParam }) => getAllPostsFollowing({ pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      // console.log("lastPage", lastPage);
      // console.log("allPages", allPages);
      return lastPage?.data.length > 0 ? allPages.length + 1 : undefined;
    },
  });
  // TODO: This is how map function should be used in "infiniteQuery" its a map function inside a map function
  // TODO: console.log(data?.pages.map((page) => page?.data?.data.map((post: PostType) => post.title)));

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <div className={"w-full h-auto p-2"}>
      {status === "pending" && (
        <div className={"w-full h-auto p-2"}>
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </div>
      )}
      {status === "error" && <p>{error.message}</p>}
      {status === "success" &&
        data?.pages.map((page) =>
          page?.data.map((post: PostType) => (
            <Post
              key={post._id}
              _id={post._id}
              title={post.title}
              content={post.content}
              image_url={post.image_url}
              video_url={post.video_url}
              likes={post.likes}
              comments={post.comments}
              createdAt={post.createdAt}
              userId={post.userId}
            />
          )),
        )}
      {isFetchingNextPage && (
        <div className={"w-full h-auto p-2"}>
          <PostSkeleton />
        </div>
      )}
      {hasNextPage && <div ref={ref} />}
    </div>
  );
};

export default Following;
