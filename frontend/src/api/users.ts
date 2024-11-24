import API from "./index";
import { handleAxiosError } from "./index";

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

export const sendProfileImage = async (profileImage: string) => {
  try {
    const response = await API.patch("/auth/update-user", { profileImage });
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const sendCoverImage = async (coverImage: string) => {
  try {
    const response = await API.patch("/auth/update-user", { coverImage });
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};
