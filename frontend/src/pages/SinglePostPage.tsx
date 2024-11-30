import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getSinglePost } from "../api/post";
import PostSkeleton from "../components/Skeletons/PostSkeleton";
import { commentType, PostType } from "../types";
import Post from "../components/Post";
import Comments from "../components/Comments";
import { useEffect, useState } from "react";

const SinglePostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState<PostType>({
    _id: "",
    title: "",
    content: "",
    image_url: "",
    video_url: "",
    likes: 0,
    comments: 0,
    createdAt: new Date().toISOString(),
    user: {
      _id: "",
      userName: "",
      profileImage: "",
    },
  });
  const [comments, setComments] = useState<commentType[]>([]);

  const { data, isSuccess, isLoading, isError, error } = useQuery({
    queryKey: ["user", postId],
    queryFn: () => getSinglePost(postId || ""),
  });
  // console.log("single post data ", data);
  useEffect(() => {
    if (data?.data) {
      setPost(data.data.post);
      setComments(data.data.comments);
    }
  }, [isSuccess]);

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
          user={post.user}
        />
      )}
      <div className={"my-3"}>
        <p className={"text-muted-foreground font-bold"}>Comments</p>
      </div>
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
