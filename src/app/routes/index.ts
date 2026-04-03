import { Router } from "express";
import { PostRoutes } from "../modules/post/post.routes";
import { CommentRoutes } from "../modules/comment/comment.routes";
import { commentReactionsRoutes } from "../modules/commentReactions/commentReactions.routes";
import { PostReactionsRoutes } from "../modules/postReactions/postReactions.routes";
const router = Router();
router.use("/posts", PostRoutes)
router.use("/comments", CommentRoutes)
router.use("/comment-reactions", commentReactionsRoutes)
router.use("/post-reactions", PostReactionsRoutes)


export const IndexRoutes = router;