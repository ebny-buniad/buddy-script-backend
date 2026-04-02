import { Privacy } from "../../../generated/prisma/enums"
import { prisma } from "../../lib/prisma"
import { ICreatePost } from "./post.interface"

// ** create a post
const createPost = async (payload: ICreatePost, userId: string) => {
    console.log(payload)
    const post = await prisma.post.create({
        data: {
            ...payload,
            userId
        }
    })
    return post;
}

// ** get all posts
const getAllPosts = async () => {
    const posts = await prisma.post.findMany({
        where: {
            privacy: Privacy.PUBLIC
        },
        include: {
            user: {
                select: {
                    name: true,
                    image: true,
                }
            },
            postLikes: {
                select: {
                    userId: true,
                }
            },
            postDislikes: {
                select: {
                    userId: true,
                }
            },
            comments: true,
            _count: {
                select: {
                    postLikes: true,
                    postDislikes: true,
                    comments: true,
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    })
    return posts;
}

// ** update a post
const updatePost = async (id: string, payload: Partial<ICreatePost>, userId: string) => {
    const post = await prisma.post.update({
        where: {
            id,
            userId
        },
        data: payload
    })
    return post;
}

// ** delete a post
const deletePost = async (id: string, userId: string) => {
    const post = await prisma.post.delete({
        where: {
            id,
            userId
        }
    })
    return post;
}


export const PostService = {
    createPost,
    getAllPosts,
    updatePost,
    deletePost
}