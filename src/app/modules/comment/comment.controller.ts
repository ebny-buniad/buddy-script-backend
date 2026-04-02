import { StatusCodes } from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { CommentService } from "./comment.service";

// ** Create a comment

const createComment = catchAsync(async (req, res) => {
    const { postId } = req.params;
    const userId = req.user?.id as string;
    const payload = req.body;
    const result = await CommentService.createComment(payload, postId as string, userId);
    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        message: "Comment created successfully",
        data: result,
    })
})

// ** update a comment
const updateComment = catchAsync(async (req, res) => {
    const { commentId } = req.params;
    const payload = req.body;
    const result = await CommentService.updateComment(commentId as string, payload);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: "Comment updated successfully",
        data: result,
    })
})

// ** delete a comment
const deleteComment = catchAsync(async (req, res) => {
    const { commentId } = req.params;
    const userId = req.user?.id as string;
    const result = await CommentService.deleteComment(commentId as string, userId);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: "Comment deleted successfully",
        data: result,
    })
})


export const CommentController = {
    createComment,
    updateComment,
    deleteComment
}