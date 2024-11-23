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
