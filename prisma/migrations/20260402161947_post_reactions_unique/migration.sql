/*
  Warnings:

  - A unique constraint covering the columns `[userId,postId]` on the table `post_reactions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "post_reactions_userId_postId_key" ON "post_reactions"("userId", "postId");
