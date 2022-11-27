-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_communityId_fkey";

-- AlterTable
ALTER TABLE "Community" ADD COLUMN     "allowimagesandvideo" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "allowlink" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "allowpoll" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "allowtalk" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "image" BYTEA;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community"("id") ON DELETE CASCADE ON UPDATE CASCADE;
