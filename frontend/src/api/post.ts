import API from "./index";
import { handleAxiosError } from "./index";
import { z } from "zod";
import { formSchema } from "../form/CratePostForm";

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

export const createPost = async (data: z.infer<typeof formSchema>) => {
  try {
    return await API.post(`/post`, data);
  } catch (error) {
    handleAxiosError(error);
  }
};
