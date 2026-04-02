import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { PostService } from "./post.service";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";

// ** create a post
const createPost = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;
    const userId = req.user?.id as string;
    const result = await PostService.createPost(payload, userId);
    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        message: "Post created successfully",
        data: result,
    })
})

// ** get all posts
const getAllPosts = catchAsync(async (req: Request, res: Response) => {
    const result = await PostService.getAllPosts();
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: "Posts retrieved successfully",
        data: result,
    })
})


export const PostController = {
    createPost,
    getAllPosts
}