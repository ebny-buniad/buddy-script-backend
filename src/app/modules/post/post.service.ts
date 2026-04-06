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
            postReactions: {
                include: {
                    user: {
                        select: {
                            name: true,
                            image: true,
                        }
                    }
                },

            },
            comments: {
                include: {
                    user: {
                        select: {
                            name: true,
                            image: true
                        }
                    },
                    commentReactions: {
                        include: {
                            user: {
                                select: {
                                    name: true,
                                    image: true,
                                }
                            }
                        }
                    },
                    _count: {
                        select: {
                            commentReactions: true,
                        }
                    }
                },
                orderBy: {
                    createdAt: "asc"
                }
            },
            _count: {
                select: {
                    comments: true,
                    postReactions: true,
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

// Update post privecy
const updatePrivacy = async (id: string, userId: string, privacy: Privacy) => {
    const result = await prisma.post.update({
        where: {
            id,
            userId
        },
        data: {
            privacy: privacy
        }
    });

    return result;
};

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
    updatePrivacy,
    deletePost
}