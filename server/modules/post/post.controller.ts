import type {Response, Request} from "express";

import {zodCommentSchemaType, zodPostSchemaType} from "../../shared/zod/post";
import {errorResponse, successResponse} from "../../lib/handellers/responceHandeller";
import PostModel from "./post.model";
import CommentModel from "./comment.model";
import UserModel from "../user/user.model";
import followersAndFollwingModel from "../followersAndFollwing/followersAndFollwing.model";

// get all posts (for you section)
export const getAllPosts = async (req: Request, res: Response) => {
    // Extract page and limit from query parameters, with default values
    const { page = 1, limit = 10 } = req.query;
    // Calculate the number of documents to skip based on the page and limit
    const skip = (Number(page) - 1) * Number(limit);

    try {
        // Fetch posts from the database with pagination and sorting by creation date in descending order
        const posts = await PostModel.find().skip(skip).limit(Number(limit)).sort({ createdAt: -1 });
        // Send a success response with the fetched posts
        successResponse(res, 200, "all posts", posts);
    } catch (e: Error | any) {
        // Log the error and send an error response
        console.log("error in get all posts", e);
        errorResponse(res, 400, e.message);
        return;
    }
}

// get post all posts of the following(i am following) all users (for the following section)
export const getFollowingPosts = async (req: any, res: Response) => {
    const userId = req.user.id
    // Extract page and limit from query parameters, with default values
    const { page = 1, limit = 10 } = req.query;
    // Calculate the number of documents to skip based on the page and limit
    const skip = (Number(page) - 1) * Number(limit);
    try {
        // fetch the following users
        const following = await followersAndFollwingModel.find({ follower_user_id: userId })
        if (!following || following.length === 0) {
            errorResponse(res, 404, "following not found");
            return
        }
        // Fetch posts of the following users concurrently
        const posts = await Promise.all(
            following.map(async (follow) => {
                // add await if function not working.
                return PostModel.find({userId: follow.following_user_id}).skip(skip).limit(Number(limit)).sort({ createdAt: -1 });

            })
        );
        // Flatten the array of posts
        const flattenedPosts = posts.flat();
        /**
         * The line const flattenedPosts = posts.flat(); is used to flatten an array of arrays into a single array.
         * In this context, posts is an array where each element is itself an array of posts fetched for each following user.
         * The flat() method combines all these nested arrays into one single array containing all the posts.
         *
         * const posts = [
         *     [post1, post2], // posts from following user 1
         *     [post3],        // posts from following user 2
         *     [post4, post5]  // posts from following user 3
         * ];
         *
         * const flattenedPosts = posts.flat();
         * flattenedPosts will be [post1, post2, post3, post4, post5]
         * */

        // send response
        successResponse(res, 200, "following posts", flattenedPosts);
    }
    catch (e: Error | any) {
        console.log("error in get following posts", e);
        errorResponse(res, 400, e.message);
        return
    }
}

// get post of the following user by userName
export const getFollowingsPostsByUserName = async (req: Request, res: Response) => {
    const userName = req.params.user_name
    // Extract page and limit from query parameters, with default values
    const { page = 1, limit = 10 } = req.query;
    // Calculate the number of documents to skip based on the page and limit
    const skip = (Number(page) - 1) * Number(limit);
    try {
        // fetch user id
        const user = await UserModel.findOne({ user_name: userName })
        if (!user) {
            errorResponse(res, 404, "user not found");
            return
        }
        // fetch posts of the following users
        const posts = await PostModel.find({ userId: user._id }).skip(skip).limit(Number(limit)).sort({ createdAt: -1 });
        // send response
        successResponse(res, 200, "following posts", posts);
    }
    catch (e: Error | any) {
        console.log("error in get following posts", e);
        errorResponse(res, 400, e.message);
        return
    }
}

// create post
export const createPost = async (req: Request, res: Response) => {
    const data = req.body as zodPostSchemaType

    try {
        //TODO: upload image to cloudinary (data.image_url)
        const uploadedImage = "" // image url
        // create post
        const newPost = new PostModel({
            title: data.title,
            content: data.content,
            image_url: uploadedImage,
            userId: data.userId,
        })
        // save post
        const savedPost = await newPost.save()
        // send response
        successResponse(res, 201,"post created", savedPost);
    }
    catch (e: Error | any) {
        console.log("error in create post", e);
        errorResponse(res, 400, e.message);
        return
    }
}

// delete post
export const deletePost = async (req: any, res: Response) => {
    const postId = req.params.post_id
    const userId = req.user.id
    try {
        // check id postId is provided
        if (!postId) {
            errorResponse(res, 400, "post id is required");
            return
        }
        // check if post exists
        const post = await PostModel.findById(postId)
        if (!post) {
            errorResponse(res, 404, "post not found");
            return
        }
        // check if user is the owner of the post
        if (post.userId.toString() !== userId) {
            errorResponse(res, 403, "you are not allowed to delete this post");
            return
        }
        // delete post
        const deletedPost = await PostModel.findByIdAndDelete(postId)
        if (!deletedPost) {
            errorResponse(res, 404, "post not found");
            return
        }
        // send response
        successResponse(res, 200, "post deleted", deletedPost);
    }
    catch (e: Error | any) {
        console.log("error in delete post", e);
        errorResponse(res, 400, e.message);
        return
    }
}

//comment on post
export const commentOnPost = async (req: Request, res: Response) => {
    const data = req.body as zodCommentSchemaType
    try {
        const newComment = new CommentModel({
            comment: data.comment,
            userId: data.userId,
            postId: data.postId,
        })
        const savedComment = await newComment.save()
        successResponse(res, 201, "comment created", savedComment);
    }
    catch (e: Error | any) {
        console.log("error in create comment", e);
        errorResponse(res, 400, e.message);
        return
    }
}