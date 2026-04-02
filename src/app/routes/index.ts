import { Router } from "express";
import { PostRoutes } from "../modules/post/post.routes";
import { CommentRoutes } from "../modules/comment/comment.routes";
const router = Router();
router.use("/posts", PostRoutes)
router.use("/comments", CommentRoutes)


export const IndexRoutes = router;