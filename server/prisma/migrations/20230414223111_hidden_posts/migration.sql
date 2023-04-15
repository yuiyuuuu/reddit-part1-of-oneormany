-- CreateTable
CREATE TABLE "_hiddenPosts" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_hiddenPosts_AB_unique" ON "_hiddenPosts"("A", "B");

-- CreateIndex
CREATE INDEX "_hiddenPosts_B_index" ON "_hiddenPosts"("B");

-- AddForeignKey
ALTER TABLE "_hiddenPosts" ADD CONSTRAINT "_hiddenPosts_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_hiddenPosts" ADD CONSTRAINT "_hiddenPosts_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
