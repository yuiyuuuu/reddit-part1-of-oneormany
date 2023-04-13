-- CreateTable
CREATE TABLE "_savedComments" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_savedComments_AB_unique" ON "_savedComments"("A", "B");

-- CreateIndex
CREATE INDEX "_savedComments_B_index" ON "_savedComments"("B");

-- AddForeignKey
ALTER TABLE "_savedComments" ADD CONSTRAINT "_savedComments_A_fkey" FOREIGN KEY ("A") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_savedComments" ADD CONSTRAINT "_savedComments_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
