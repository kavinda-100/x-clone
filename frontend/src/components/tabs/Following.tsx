import { useQuery } from "@tanstack/react-query";
import { getAllPostsFollowing } from "../../api/post";
import Post from "../Post";
import { PostType } from "../../types";
import PostSkeleton from "../scelletons/PostSkeleton";

const Following = () => {
  const { data, isLoading, isSuccess, isError, error } = useQuery({
    queryKey: ["following"],
    queryFn: async () => getAllPostsFollowing({ page: 1, limit: 10 }),
  });
  console.log(data);

  return (
    <div className={"w-full h-auto p-2"}>
      {isLoading && (
        <div className={"w-full h-auto p-2"}>
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </div>
      )}
      {isError && <p>{error.message}</p>}
      {isSuccess &&
        data?.data?.data.map((post: PostType) => (
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
    </div>
  );
};

export default Following;
