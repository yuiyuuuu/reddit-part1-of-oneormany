-- AlterTable
ALTER TABLE "User" ADD COLUMN     "parentId" TEXT;

-- CreateTable
CREATE TABLE "_Follower" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Follower_AB_unique" ON "_Follower"("A", "B");

-- CreateIndex
CREATE INDEX "_Follower_B_index" ON "_Follower"("B");

-- AddForeignKey
ALTER TABLE "_Follower" ADD CONSTRAINT "_Follower_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Follower" ADD CONSTRAINT "_Follower_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
