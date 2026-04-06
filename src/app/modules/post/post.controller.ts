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
});

// ** get all post by ID
const getPostById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await PostService.getPostById(id as string);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: "Post retrieved successfully",
        data: result,
    });
});

// ** get user posts
const getUserPosts = catchAsync(async (req: Request, res: Response) => {
    const  id  = req.user?.id;
    const result = await PostService.getUserPosts(id as string);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: "User posts retrieved successfully",
        data: result,
    });
});

// ** update a post
const updatePost = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;
    const userId = req.user?.id as string;
    const result = await PostService.updatePost(id as string, payload, userId);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: "Post updated successfully",
        data: result,
    })
})

// ** update a post
const updatePostPrivacy = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;
    const userId = req.user?.id as string;
    const result = await PostService.updatePost(id as string, payload, userId);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: "Post privacy updated",
        data: result,
    })
})

// ** delete a post
const deletePost = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.user?.id as string;
    const result = await PostService.deletePost(id as string, userId);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: "Post deleted successfully",
        data: result,
    })
})


export const PostController = {
    createPost,
    getAllPosts,
    getPostById,
    getUserPosts,
    updatePost,
    updatePostPrivacy,
    deletePost
}