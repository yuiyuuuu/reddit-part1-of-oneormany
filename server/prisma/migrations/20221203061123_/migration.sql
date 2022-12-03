/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "visibility" AS ENUM ('public', 'restricted', 'private');

-- AlterTable
ALTER TABLE "Community" ADD COLUMN     "NSFW" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "visibility" "visibility" NOT NULL DEFAULT 'public';

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "karma" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
