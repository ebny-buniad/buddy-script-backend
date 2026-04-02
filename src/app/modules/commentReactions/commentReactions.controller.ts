import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";
import { commentReactionsService } from "./commentReactions.service";

// ** create comment like
const createCommentReaction = catchAsync(async (req: Request, res: Response) => {
    const { commentId } = req.params;
    const payload = req.body;
    const userId = req.user?.id as string;
    const commentReaction = await commentReactionsService.createCommentReaction(commentId as string, userId, payload);
    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        message: "Comment reaction created successfully",
        data: commentReaction
    })
})

// ** remove comment reaction
const removeCommentReaction = catchAsync(async (req: Request, res: Response) => {
    const { commentId } = req.params;
    const userId = req.user?.id as string;
    const commentReaction = await commentReactionsService.removeCommentReaction(commentId as string, userId);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: "Comment reaction removed successfully",
        data: commentReaction
    })
})


export const commentReactionsController = {
    createCommentReaction,
    removeCommentReaction
}