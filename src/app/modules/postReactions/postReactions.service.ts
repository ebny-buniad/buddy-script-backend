import { ReactionType } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma"

interface ICreatePostReaction {
    reaction: ReactionType
}

// ** create a post reaction
const createPostReaction = async (payload: ICreatePostReaction, userId: string, postId: string) => {
    const postReaction = await prisma.postReactions.create({
        data: {
            postId: postId,
            userId: userId,
            reaction: payload?.reaction
        }
    })
    return postReaction;
}

// remove a post reaction
const removePostReaction = async (userId: string, postId: string) => {
    const postReaction = await prisma.postReactions.delete({
        where: {
            userId_postId: {
                userId,
                postId
            }
        }
    })
    return postReaction;
}


export const PostReactionsService = {
    createPostReaction,
    removePostReaction
}