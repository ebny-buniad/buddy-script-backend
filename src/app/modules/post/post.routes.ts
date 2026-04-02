import { Router } from "express";
import { PostController } from "./post.controller";
import authMiddleware from "../../../middlewares/authMiddleware";
import { Role } from "../../../generated/prisma/enums";
const router = Router();

router.post("/", authMiddleware(Role.USER, Role.ADMIN), PostController.createPost);
router.get("/", PostController.getAllPosts);

export const PostRoutes: Router = router;