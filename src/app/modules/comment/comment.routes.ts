import { Router } from "express";
import { CommentController } from "./comment.controller";
import authMiddleware from "../../../middlewares/authMiddleware";
import { Role } from "../../../generated/prisma/enums";
const router = Router();
router.post("/:postId", authMiddleware(Role.USER, Role.ADMIN), CommentController.createComment);
router.put("/:commentId", authMiddleware(Role.USER, Role.ADMIN), CommentController.updateComment);
router.delete("/:commentId", authMiddleware(Role.USER, Role.ADMIN), CommentController.deleteComment);


export const CommentRoutes = router;