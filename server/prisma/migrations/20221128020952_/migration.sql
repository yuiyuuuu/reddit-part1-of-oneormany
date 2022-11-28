/*
  Warnings:

  - You are about to alter the column `image` on the `Post` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(1048576)`.

*/
-- AlterTable
ALTER TABLE "Community" ALTER COLUMN "image" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "image" SET DATA TYPE VARCHAR(1048576);
