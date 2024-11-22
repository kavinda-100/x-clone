import type { NextFunction, Response } from "express";

import {
  errorResponse,
  successResponse,
} from "../../lib/handellers/responceHandeller";
import UserModel from "./user.model";

export const getMe = async (req: any, res: Response, next: NextFunction) => {
  try {
    const ID = req.user.id;

    const user = await UserModel.findById({ _id: ID });
    if (!user) {
      errorResponse(res, 404, "User not found");
      return;
    }
    const { password, ...userData } = user.toObject();
    successResponse(res, 200, "User", userData);
  } catch (e: any) {
    next(e);
  }
};
