/*
  Warnings:

  - You are about to drop the column `karma` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "karma",
ADD COLUMN     "commentKarma" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "displayName" TEXT,
ADD COLUMN     "postKarma" INTEGER NOT NULL DEFAULT 0;
