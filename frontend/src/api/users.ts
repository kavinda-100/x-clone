import API from "./index";
import { handleAxiosError } from "./index";
import { z } from "zod";
import { zodUserSchemaForFrontEnd } from "../zod/user";
import { ImagesUploadType } from "../types";

export const getRecommendUsers = async () => {
  try {
    const response = await API.get("/user/recommend");
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const followUnfollowUser = async (following_user_id: string) => {
  try {
    const response = await API.post(`/follow/follow-unfollow`, {
      following_user_id,
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

type GetUserByUsernameResponse = {
  userName: string;
  pageParam: number;
};

export const getUserByUsername = async ({
  pageParam,
  userName,
}: GetUserByUsernameResponse) => {
  try {
    const response = await API.get(
      `/post/following/${userName}?page=${pageParam}`,
    );
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const sendProfileImage = async ({
  ImageUrl,
  ImageFileId,
}: ImagesUploadType) => {
  try {
    const response = await API.patch("/auth/update-user", {
      profileImage: ImageUrl,
      profileImageFileId: ImageFileId,
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const sendCoverImage = async ({
  ImageUrl,
  ImageFileId,
}: ImagesUploadType) => {
  try {
    const response = await API.patch("/auth/update-user", {
      coverImage: ImageUrl,
      coverImageFileId: ImageFileId,
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const updateUser = async (
  data: z.infer<typeof zodUserSchemaForFrontEnd>,
) => {
  try {
    const response = await API.patch("/auth/update-user", data);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const getUserStats = async (username: string) => {
  try {
    const response = await API.get(`/user/stats/${username}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const getUserFollowers = async ({
  userName,
  pageParam,
}: GetUserByUsernameResponse) => {
  try {
    const response = await API.get(
      `/user/followers/${userName}?page=${pageParam}`,
    );
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const getUserFollowings = async ({
  userName,
  pageParam,
}: GetUserByUsernameResponse) => {
  try {
    const response = await API.get(
      `/user/following/${userName}?page=${pageParam}`,
    );
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const getUserLikedPosts = async ({
  userName,
  pageParam,
}: GetUserByUsernameResponse) => {
  try {
    const response = await API.get(`/user/liked/${userName}?page=${pageParam}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const searchUsers = async (search: string) => {
  try {
    const response = await API.get(`/user/search?search=${search}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};
