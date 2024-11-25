import type { Request, Response } from "express";
import bcryptjs from "bcryptjs";

import {
  errorResponse,
  successResponse,
} from "../../lib/handellers/responceHandeller";
import {
  zodResetPasswordSchemaType,
  zodSignInSchemaType,
  zodUpdateUserSchemaType,
  zodUserSchemaType,
} from "../../shared/zod/user";
import UserModel from "../user/user.model";
import { setCookie } from "../../lib/cookies";
import VerificationModel from "../otherModels/verification.model";
import { generateMagicLink } from "../../lib";
import { imagekit } from "../../index";

export const SignUp = async (req: Request, res: Response) => {
  const data = req.body as zodUserSchemaType;
  try {
    // check if user already exists
    let isEmailInUse;
    let isUserNameInUse;
    await Promise.all([
      (isEmailInUse = await UserModel.findOne({ email: data.email })),
      (isUserNameInUse = await UserModel.findOne({ userName: data.userName })),
    ]);
    // if email is already in use
    if (isEmailInUse) {
      errorResponse(res, 400, "Email already in use");
      return;
    }
    // if username is already in use
    if (isUserNameInUse) {
      errorResponse(res, 400, "Username already in use");
      return;
    }
    // hash the password
    const hashedPassword = await bcryptjs.hash(data.password, 10);
    // create new user
    const newUser = new UserModel({
      email: data.email,
      password: hashedPassword,
      name: data.name,
      userName: data.userName,
      profileImage: data.profileImage,
      profileImageFileId: data.profileImageFileId,
      coverImage: data.coverImage,
      coverImageFileId: data.coverImageFileId,
      bio: data.bio,
      location: data.location,
      socialLinks: data.socialLinks,
      isEmailVerified: false,
    });
    await newUser.save();

    // set the cookie
    setCookie(res, newUser._id.toString());

    // remove the password from the response
    const { password, ...user } = newUser.toObject();

    // send the response
    successResponse(res, 201, "User created successfully", user);
  } catch (e: Error | any) {
    console.log("error in sign up", e);
    errorResponse(res, 400, e.message);
    return;
  }
};

export const SignIn = async (req: Request, res: Response) => {
  const bodyData = req.body as zodSignInSchemaType;
  try {
    // check if user exists
    const user = await UserModel.findOne({ email: bodyData.email });
    if (!user) {
      errorResponse(res, 404, "user not found");
      return;
    }
    // check if the password is correct
    const isPasswordCorrect = await bcryptjs.compare(
      bodyData.password,
      user.password,
    );
    if (!isPasswordCorrect) {
      errorResponse(res, 400, "Invalid credentials");
      return;
    }
    // set the cookie
    setCookie(res, user._id.toString());
    // remove the password from the response
    const { password, ...userData } = user.toObject();
    // send the response
    successResponse(res, 200, "User signed in successfully", userData);
  } catch (e: Error | any) {
    console.log("error in sign in", e);
    errorResponse(res, 400, e.message);
    return;
  }
};

export const SignOut = async (req: Request, res: Response) => {
  try {
    // clear the cookie
    res.clearCookie("access_token");
    // send the response
    successResponse(res, 200, "User signed out successfully");
  } catch (e: Error | any) {
    console.log("error in sign out", e);
    errorResponse(res, 400, e.message);
    return;
  }
};

export const askForPasswordResetPassword = async (req: any, res: Response) => {
  const ID = req.user.id;
  try {
    // check if user exists
    const user = await UserModel.findOne({ _id: ID });
    if (!user) {
      errorResponse(res, 404, "user not found");
      return;
    }
    // generate a token
    const token = generateMagicLink();
    // save the token in the database
    await VerificationModel.create({
      email: user.email,
      token,
    });
    //TODO: send the token to the user's email
    //TODO: sendEmail(data.email, "Password Reset", `Your password reset token is ${token}`);

    // send the response
    successResponse(res, 200, "Token sent successfully! Check your email");
  } catch (e: Error | any) {
    console.log("error in ask for password reset", e);
    errorResponse(res, 400, e.message);
    return;
  }
};

export const ForgotPassword = async (req: any, res: Response) => {
  const data = req.body as zodResetPasswordSchemaType;
  const { token } = req.params;
  const ID = req.user.id;
  try {
    // check if user exists
    const user = await UserModel.findOne({ email: data.email });
    if (!user) {
      errorResponse(res, 404, "user not found");
      return;
    }
    // check if the token is provided in the request
    if (!token) {
      errorResponse(res, 400, "Token is required");
      return;
    }
    // check if the person who requested the token is the same as the user
    if (ID !== user._id.toString()) {
      errorResponse(res, 400, "You are not authorized to reset this password");
      return;
    }
    // check if the token is valid
    const tokenData = await VerificationModel.findOne({
      email: data.email,
      token,
    });
    // if token is not found in the database
    if (!tokenData) {
      errorResponse(res, 400, "token not found");
      return;
    }
    // compare the token
    if (tokenData.token !== token) {
      errorResponse(res, 400, "Invalid token");
      return;
    }
    // check if the token is expired (in 1 hour)
    const tokenExpirationTime = new Date(
      tokenData.token_createdAt.getTime() + 3600 * 1000,
    );
    if (new Date() > tokenExpirationTime) {
      errorResponse(res, 400, "Token expired");
      return;
    }
    // check if the old password is correct
    const isOldPasswordCorrect = await bcryptjs.compare(
      data.old_password,
      user.password,
    );
    if (!isOldPasswordCorrect) {
      errorResponse(res, 400, "Old password is incorrect");
      return;
    }
    // hash the new password and update the password
    user.password = await bcryptjs.hash(data.new_password, 10);
    await user.save();

    // delete the token from the database
    await VerificationModel.deleteOne({ email: data.email, token });

    successResponse(res, 200, "Password updated successfully");
  } catch (e: Error | any) {
    console.log("error in forgot password", e);
    errorResponse(res, 400, e.message);
    return;
  }
};

export const UpdateUser = async (req: any, res: Response) => {
  const data = req.body as zodUpdateUserSchemaType;
  const ID = req.user.id;
  try {
    // check if user exists
    const user = await UserModel.findOne({ _id: ID });
    if (!user) {
      errorResponse(res, 404, "user not found");
      return;
    }
    // check if the email is already in use
    if (data.email && data.email !== user.email) {
      const isEmailInUse = await UserModel.findOne({ email: data.email });
      if (isEmailInUse) {
        errorResponse(res, 400, "Email already in use");
        return;
      }
    }
    // check if the username is already in use
    if (data.userName && data.userName !== user.userName) {
      const isUserNameInUse = await UserModel.findOne({
        userName: data.userName,
      });
      if (isUserNameInUse) {
        errorResponse(res, 400, "Username already in use");
        return;
      }
    }
    // hash the password if provided
    if (data.password) {
      if (data.password.length < 6) {
        errorResponse(res, 400, "Password must be at least 6 characters long");
        return;
      }
      user.password = await bcryptjs.hash(data.password, 10);
    }
    // delete the old profile image if a new one is provided
    if (
      data.profileImage &&
      data.profileImageFileId &&
      user.profileImageFileId
    ) {
      await imagekit.deleteFile(user.profileImageFileId);
      console.log("deleted old profile image");
    }
    // delete the old cover image if a new one is provided
    if (data.coverImage && data.coverImageFileId && user.coverImageFileId) {
      await imagekit.deleteFile(user.coverImageFileId);
      console.log("deleted old cover image");
    }
    // update the user
    const updatedUser = await UserModel.findByIdAndUpdate(
      ID,
      {
        $set: {
          name: data.name || user.name,
          userName: data.userName || user.userName,
          profileImage: data.profileImage || user.profileImage,
          profileImageFileId:
            data.profileImageFileId || user.profileImageFileId,
          coverImage: data.coverImage || user.coverImage,
          coverImageFileId: data.coverImageFileId || user.coverImageFileId,
          bio: data.bio || user.bio,
          location: data.location || user.location,
          socialLinks: data.socialLinks || user.socialLinks,
          password: data.password || user.password,
        },
      },
      { new: true },
    );
    // if user is not updated
    if (!updatedUser) {
      errorResponse(res, 400, "User not updated");
      return;
    }
    // remove the password from the response
    const { password, ...userData } = updatedUser?.toObject();
    // send the response
    successResponse(res, 200, "User updated successfully", userData);
  } catch (e: Error | any) {
    console.log("error in update user", e);
    errorResponse(res, 400, e.message);
    return;
  }
};
