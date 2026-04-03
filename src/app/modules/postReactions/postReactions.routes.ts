import { Router } from "express";
import { PostReactionsController } from "./postReactions.controller";
import authMiddleware from "../../../middlewares/authMiddleware";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post("/:postId", authMiddleware(Role.USER, Role.ADMIN), PostReactionsController.createPostReaction);
router.delete("/:postId", authMiddleware(Role.USER, Role.ADMIN), PostReactionsController.removePostReaction);

export const PostReactionsRoutes: Router = router;