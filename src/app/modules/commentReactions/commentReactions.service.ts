import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { prisma } from "../../lib/prisma";
import { ICommentReaction } from "./reactType.interface";

// ** create comment reaction
const createCommentReaction = async (commentId: string, userId: string, payload: ICommentReaction) => {

    // Check if the user has already reacted to the comment
    const existingReaction = await prisma.commentReactions.findFirst({
        where: {
            commentId,
            userId
        }
    });

    if (existingReaction) {
        throw new AppError(
            StatusCodes.BAD_REQUEST,
            "You have already reacted to this comment"
        );
    }

    const createReaction = await prisma.commentReactions.create({
        data: {
            commentId,
            userId,
            type: payload.type
        },
    });
    return createReaction;
}

// Remove comment reaction
const removeCommentReaction = async (commentId: string, userId: string) => {
    const deletedReaction = await prisma.commentReactions.delete({
        where: {
            id: commentId,
            userId: userId
        }
    });
    return deletedReaction;
};

export const commentReactionsService = {
    createCommentReaction,
    removeCommentReaction
};