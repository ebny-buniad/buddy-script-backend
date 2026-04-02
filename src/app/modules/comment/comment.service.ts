import { prisma } from "../../lib/prisma";
import { ICreateComment } from "./comment.interface";

// ** Create a comment
const createComment = async (payload: ICreateComment, postId: string, userId: string) => {
    const comment = await prisma.comment.create({
        data: {
            ...payload,
            postId,
            userId
        }
    })
    return comment;
}

// ** update a comment
const updateComment = async (commentId: string, payload: ICreateComment) => {
    const comment = await prisma.comment.update({
        where: {
            id: commentId
        },
        data: payload
    })
    return comment;
}

// ** delete a comment
const deleteComment = async (commentId: string, userId: string) => {
    const comment = await prisma.comment.delete({
        where: {
            id: commentId,
            userId
        }
    })
    return comment;
}


export const CommentService = {
    createComment,
    updateComment,
    deleteComment
}