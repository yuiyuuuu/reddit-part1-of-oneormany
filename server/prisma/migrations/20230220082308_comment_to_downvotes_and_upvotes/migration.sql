/*
  Warnings:

  - You are about to drop the `Like` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_commentId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_userId_fkey";

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "downvotes" TEXT[],
ADD COLUMN     "image" VARCHAR(1048576),
ADD COLUMN     "upvotes" TEXT[];

-- DropTable
DROP TABLE "Like";
