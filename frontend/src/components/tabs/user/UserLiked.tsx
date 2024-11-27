import { SelectedUserPostType } from "../../../types";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import PostSkeleton from "../../Skeletons/PostSkeleton";
import UserLikedPost from "./UserLikedPost";

type UserLikedProps = {
  posts: SelectedUserPostType[];
  status: "pending" | "error" | "success";
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  error: Error | any;
  fetchNextPage: () => void;
  message?: string;
};

const UserLiked = ({
  posts,
  status,
  error,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  message,
}: UserLikedProps) => {
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
      {
        // if no posts are found
        status === "success" && posts.length === 0 && (
          <div className={"w-full h-auto text-center"}>
            <p className={"text-muted-foreground"}>
              {message || "User has not posted anything yet."}
            </p>
          </div>
        )
      }
      {status === "error" && <p>{error.message}</p>}
      {status === "success" &&
        posts.map((post: SelectedUserPostType) => (
          <UserLikedPost
            key={post._id}
            _id={post._id}
            userId={post.userId}
            postId={post.postId}
          />
        ))}
      {isFetchingNextPage && (
        <div className={"w-full h-auto p-2"}>
          <PostSkeleton />
        </div>
      )}
      {hasNextPage && <div ref={ref} />}
    </div>
  );
};

export default UserLiked;
