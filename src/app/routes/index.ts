import { Router } from "express";
import { PostRoutes } from "../modules/post/post.routes";
const router = Router();
router.use("/posts", PostRoutes)


export const IndexRoutes = router;