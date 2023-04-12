-- CreateTable
CREATE TABLE "_history" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_history_AB_unique" ON "_history"("A", "B");

-- CreateIndex
CREATE INDEX "_history_B_index" ON "_history"("B");

-- AddForeignKey
ALTER TABLE "_history" ADD CONSTRAINT "_history_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_history" ADD CONSTRAINT "_history_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
