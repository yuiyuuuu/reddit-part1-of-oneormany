/*
  Warnings:

  - A unique constraint covering the columns `[communityNameFormat]` on the table `Community` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Community" ADD COLUMN     "communityNameFormat" VARCHAR(102),
ADD COLUMN     "iconImage" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Community_communityNameFormat_key" ON "Community"("communityNameFormat");
