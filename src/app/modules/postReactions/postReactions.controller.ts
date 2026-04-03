import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { StatusCodes } from "http-status-codes";
import sendResponse from "../../../shared/sendResponse";
import { PostReactionsService } from "./postReactions.service";

// ** create a post reaction
const createPostReaction = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;
    const userId = req.user?.id as string;
    const postId = req.params.postId as string;
    const postReaction = await PostReactionsService.createPostReaction(payload, userId, postId);
    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        message: "Post reaction created successfully",
        data: postReaction
    })
})


// remove a post reaction
const removePostReaction = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user?.id as string;
    const postId = req.params.postId as string;
    const postReaction = await PostReactionsService.removePostReaction(userId, postId);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: "Post reaction removed successfully",
        data: postReaction
    })
})


export const PostReactionsController = {
    createPostReaction,
    removePostReaction
}