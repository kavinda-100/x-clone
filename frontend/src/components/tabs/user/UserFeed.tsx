import { PostType } from "../../../types";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import PostSkeleton from "../../scelletons/PostSkeleton";
import Post from "../../Post";

type UserFeedProps = {
  posts: PostType[];
  status: "pending" | "error" | "success";
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  error: Error | any;
  fetchNextPage: () => void;
};

const UserFeed = ({
  posts,
  status,
  error,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: UserFeedProps) => {
  const { ref, inView } = useInView();

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
        posts.map((post: PostType) => (
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
        ))}
      {
        // if no posts are found
        status === "success" && posts.length === 0 && (
          <div className={"w-full h-auto text-center"}>
            <p className={"text-muted-foreground"}>
              User has not posted anything yet
            </p>
          </div>
        )
      }
      {isFetchingNextPage && (
        <div className={"w-full h-auto p-2"}>
          <PostSkeleton />
        </div>
      )}
      {hasNextPage && <div ref={ref} />}
    </div>
  );
};

export default UserFeed;
