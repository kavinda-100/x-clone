import type { Response, Request} from "express";
import bcryptjs from "bcryptjs";

import { successResponse, errorResponse } from "../../lib/handellers/responceHandeller";
import {zodSignInSchemaType, zodUserSchemaType} from "../../shared/zod/user";
import UserModel from "../user/user.model";
import {setCookie} from "../../lib/cookies";

export const SignUp = async (req: Request, res: Response) => {
    const data = req.body as zodUserSchemaType;
    try {
        // check if user already exists
        let isEmailInUse
        let isUserNameInUse
        await Promise.all([
            isEmailInUse = await UserModel.findOne({ email: data.email }),
            isUserNameInUse = await UserModel.findOne({ userName: data.userName }),
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
            coverImage: data.coverImage,
            bio: data.bio,
            location: data.location,
            socialLinks: data.socialLinks,
        });
        await newUser.save();

        // set the cookie
        setCookie(res, newUser._id.toString());

        // remove the password from the response
        const { password, ...user } = newUser.toObject();

        // send the response
        successResponse(res, 201, "User created successfully", user);

    }
    catch (e: Error | any) {
        console.log("error in sign up", e);
        errorResponse(res, 400, e.message);
        return
    }
}

export const SignIn = async (req: Request, res: Response) => {
    const bodyData = req.body as zodSignInSchemaType
    try {
        // check if user exists
        const user = await UserModel.findOne({ email: bodyData.email });
        if (!user) {
            errorResponse(res, 404, "user not found");
            return;
        }
        // check if the password is correct
        const isPasswordCorrect = await bcryptjs.compare(bodyData.password, user.password);
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
    }
    catch (e: Error | any) {
        console.log("error in sign in", e);
        errorResponse(res, 400, e.message);
        return
    }

}

export const SignOut = async (req: Request, res: Response) => {
    try {
        // clear the cookie
        res.clearCookie("access_token");
        // send the response
        successResponse(res, 200, "User signed out successfully");
    }
    catch (e: Error | any) {
        console.log("error in sign out", e);
        errorResponse(res, 400, e.message);
        return
    }
}
