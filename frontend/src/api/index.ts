import axios from "axios";

const API = axios.create({
  baseURL: "/api/v1",
  withCredentials: true,
});

export default API;

export const handleAxiosError = (error: unknown) => {
  if (axios.isAxiosError(error) && error.response?.data?.error) {
    throw new Error(error.response.data.error);
  } else if (axios.isAxiosError(error) && error.response?.data?.message) {
    throw new Error(error.response.data.message);
  } else {
    throw new Error("An unexpected error occurred");
  }
};
