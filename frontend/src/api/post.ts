import API from "./index";
import { handleAxiosError } from "./index";
import { z } from "zod";
import { formSchema } from "../form/CratePostForm";
import { postCommentType } from "../types";

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
    const response = await API.get(`/post/${postId}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createPost = async (data: z.infer<typeof formSchema>) => {
  try {
    const response = await API.post(`/post`, data);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const postComment = async (data: postCommentType) => {
  try {
    const response = await API.post(`/post/comment`, data);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const deletePost = async (postId: string) => {
  try {
    const response = await API.delete(`/post/${postId}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const likeUnlikePost = async (postId: string) => {
  try {
    const response = await API.post(`/post/like-unlike/${postId}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const getAllLikesByPostId = async (postId: string) => {
  try {
    const response = await API.get(`/post/likes/${postId}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};
