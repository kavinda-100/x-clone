import express from "express";
import {
  SignUp,
  SignIn,
  SignOut,
  ForgotPassword,
  askForPasswordResetPassword,
  UpdateUser,
} from "./auth.controller";

// other imports
import { zodValidation } from "../../middleware/zodValidation";

// zod schemas
import {
  zodResetPasswordSchema,
  zodSignInSchema,
  zodUpdateUserSchema,
  zodUserSchema,
} from "../../shared/zod/user";
import authMiddleware from "../../middleware/authMiddleware";

const route = express.Router();

route.post("/sign-up", zodValidation(zodUserSchema), SignUp);
route.post("/sign-in", zodValidation(zodSignInSchema), SignIn);
route.post("/sign-out", authMiddleware, SignOut);
route.get(
  "/ask-for-password-reset",
  authMiddleware,
  askForPasswordResetPassword,
);
route.patch(
  "/forgot-password/:token",
  authMiddleware,
  zodValidation(zodResetPasswordSchema),
  ForgotPassword,
);
route.patch(
  "/update-user",
  authMiddleware,
  zodValidation(zodUpdateUserSchema),
  UpdateUser,
);

export default route;
