import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getSinglePost } from "../api/post";
import PostSkeleton from "../components/Skeletons/PostSkeleton";
import { commentType, PostType } from "../types";
import Post from "../components/Post";
import Comments from "../components/Comments";

const SinglePostPage = () => {
  const { postId } = useParams();

  const { data, isSuccess, isLoading, isError, error } = useQuery({
    queryKey: ["user", postId],
    queryFn: () => getSinglePost(postId || ""),
  });
  console.log("single post data ", data);
  const post: PostType = data?.data?.data?.post;
  const comments: commentType[] = data?.data?.data?.comments;

  return (
    <div className={"w-full h-auto p-2"}>
      {isLoading && (
        <div className={"w-full h-auto p-2"}>
          <PostSkeleton />
        </div>
      )}
      {isError && <p>{error.message}</p>}
      {isSuccess && (
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
      )}
      {comments && comments.length === 0 && (
        <div>
          {/*TODO: add comment box here */}
          <p className={"text-muted-foreground text-center"}>No comments yet</p>
        </div>
      )}
      {comments &&
        comments.length > 0 &&
        comments.map((comment) => (
          <Comments
            _id={comment._id}
            comment={comment.comment}
            postId={comment.postId}
            createdAt={comment.createdAt}
            updatedAt={comment.updatedAt}
            userId={comment.userId}
          />
        ))}
    </div>
  );
};

export default SinglePostPage;
