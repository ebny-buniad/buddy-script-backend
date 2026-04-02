import { Router } from 'express';
import { commentReactionsController } from './commentReactions.controller';
import authMiddleware from '../../../middlewares/authMiddleware';
import { Role } from '../../../generated/prisma/enums';

const router = Router();

router.post('/:commentId', authMiddleware(Role.USER, Role.ADMIN), commentReactionsController.createCommentReaction);
router.delete('/:commentId', authMiddleware(Role.USER, Role.ADMIN), commentReactionsController.removeCommentReaction);



export const commentReactionsRoutes: Router = router;