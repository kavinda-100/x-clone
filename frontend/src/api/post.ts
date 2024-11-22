import API from "./index";
import { handleAxiosError } from "./index";

type getAllPostType = {
  page: number | undefined;
  limit: number | undefined;
};
export const getAllPosts = async ({ page = 1, limit = 10 }: getAllPostType) => {
  try {
    return await API.get(`/post/all?page=${page}&limit=${limit}`);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const getAllPostsFollowing = async ({
  page = 1,
  limit = 10,
}: getAllPostType) => {
  try {
    return await API.get(`/post/following?page=${page}&limit=${limit}`);
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
