-- AlterTable
ALTER TABLE "Community" ALTER COLUMN "rules" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "body" DROP NOT NULL;
