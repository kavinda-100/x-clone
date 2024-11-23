import API from "./index";
import { handleAxiosError } from "./index";

type getAllPostType = {
  pageParam: number;
};
export const getAllPosts = async ({ pageParam }: getAllPostType) => {
  try {
    const response = await API.get(`/post/all?page=${pageParam}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const getAllPostsFollowing = async ({ pageParam }: getAllPostType) => {
  try {
    const response = await API.get(`/post/following?page=${pageParam}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const getSinglePost = async (postId: string) => {
  try {
    return await API.get(`/post/${postId}`);
  } catch (error) {
    handleAxiosError(error);
  }
};
