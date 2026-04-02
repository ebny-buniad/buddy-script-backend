import { Router } from "express";
import { PostController } from "./post.controller";
import authMiddleware from "../../../middlewares/authMiddleware";
import { Role } from "../../../generated/prisma/enums";
const router = Router();

router.post("/", authMiddleware(Role.USER, Role.ADMIN), PostController.createPost);
router.get("/", PostController.getAllPosts);
router.put("/:id", authMiddleware(Role.USER, Role.ADMIN), PostController.updatePost);
router.delete("/:id", authMiddleware(Role.USER, Role.ADMIN), PostController.deletePost);

export const PostRoutes: Router = router;