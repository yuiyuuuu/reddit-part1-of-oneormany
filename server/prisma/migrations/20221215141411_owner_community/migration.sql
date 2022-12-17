/*
  Warnings:

  - You are about to alter the column `name` on the `Community` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - A unique constraint covering the columns `[name]` on the table `Community` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "BannerSize" AS ENUM ('small', 'medium', 'large');

-- AlterTable
ALTER TABLE "Community" ADD COLUMN     "communityBannerSize" "BannerSize" NOT NULL DEFAULT 'small',
ADD COLUMN     "owner" TEXT,
ADD COLUMN     "themeBaseColor" TEXT NOT NULL DEFAULT 'rgb(51, 168, 255)',
ALTER COLUMN "name" SET DATA TYPE VARCHAR(100);

-- CreateIndex
CREATE UNIQUE INDEX "Community_name_key" ON "Community"("name");
