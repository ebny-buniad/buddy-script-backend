-- DropIndex
DROP INDEX "post_reactions_postId_idx";

-- DropIndex
DROP INDEX "post_reactions_userId_postId_key";

-- CreateIndex
CREATE INDEX "post_reactions_postId_userId_idx" ON "post_reactions"("postId", "userId");
