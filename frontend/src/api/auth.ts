import API from "./index";
import { handleAxiosError } from "./index";
import { z } from "zod";
import { zodSignInSchema } from "../../../server/shared/zod/user";

export const getMe = async () => {
  try {
    return await API.get("/user/me");
  } catch (error) {
    handleAxiosError(error);
  }
};

export const SignInMethod = async (data: z.infer<typeof zodSignInSchema>) => {
  try {
    return await API.post("/auth/sign-in", data);
  } catch (error) {
    console.log("error in sign in", error);
    handleAxiosError(error);
  }
};

export const SignUpMethod = async (data: z.infer<typeof zodSignInSchema>) => {
  try {
    return await API.post("/auth/sign-up", data);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const SignOutMethod = async () => {
  try {
    return await API.post("/auth/sign-out");
  } catch (error) {
    handleAxiosError(error);
  }
};
