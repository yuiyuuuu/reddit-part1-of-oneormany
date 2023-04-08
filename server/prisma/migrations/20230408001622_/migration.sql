/*
  Warnings:

  - You are about to drop the column `downvotes` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `upvotes` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `downvotes` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `upvotes` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "downvotes",
DROP COLUMN "upvotes";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "downvotes",
DROP COLUMN "upvotes";

-- CreateTable
CREATE TABLE "_upvotes-posts" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_downvotes-posts" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_upvotes-comment" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_downvotes-comment" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_upvotes-posts_AB_unique" ON "_upvotes-posts"("A", "B");

-- CreateIndex
CREATE INDEX "_upvotes-posts_B_index" ON "_upvotes-posts"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_downvotes-posts_AB_unique" ON "_downvotes-posts"("A", "B");

-- CreateIndex
CREATE INDEX "_downvotes-posts_B_index" ON "_downvotes-posts"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_upvotes-comment_AB_unique" ON "_upvotes-comment"("A", "B");

-- CreateIndex
CREATE INDEX "_upvotes-comment_B_index" ON "_upvotes-comment"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_downvotes-comment_AB_unique" ON "_downvotes-comment"("A", "B");

-- CreateIndex
CREATE INDEX "_downvotes-comment_B_index" ON "_downvotes-comment"("B");

-- AddForeignKey
ALTER TABLE "_upvotes-posts" ADD CONSTRAINT "_upvotes-posts_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_upvotes-posts" ADD CONSTRAINT "_upvotes-posts_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_downvotes-posts" ADD CONSTRAINT "_downvotes-posts_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_downvotes-posts" ADD CONSTRAINT "_downvotes-posts_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_upvotes-comment" ADD CONSTRAINT "_upvotes-comment_A_fkey" FOREIGN KEY ("A") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_upvotes-comment" ADD CONSTRAINT "_upvotes-comment_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_downvotes-comment" ADD CONSTRAINT "_downvotes-comment_A_fkey" FOREIGN KEY ("A") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_downvotes-comment" ADD CONSTRAINT "_downvotes-comment_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
