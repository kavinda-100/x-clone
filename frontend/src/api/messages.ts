import API from "./index";
import { handleAxiosError } from "./index";

export const getMessages = async (friendId: string) => {
  try {
    const response = await API.get(`/message/${friendId}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const sendMessage = async (data: any) => {
  try {
    const response = await API.post("/message", data);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const getMyFriends = async () => {
  try {
    const response = await API.get("/message/myFriends");
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};
