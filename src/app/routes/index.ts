import { Router } from "express";
import { PostRoutes } from "../modules/post/post.routes";
import { CommentRoutes } from "../modules/comment/comment.routes";
import { commentReactionsRoutes } from "../modules/commentReactions/commentReactions.routes";
const router = Router();
router.use("/posts", PostRoutes)
router.use("/comments", CommentRoutes)
router.use("/comment-reactions", commentReactionsRoutes)


export const IndexRoutes = router;