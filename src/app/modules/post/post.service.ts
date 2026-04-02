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


export const PostService = {
    createPost,
    getAllPosts
}