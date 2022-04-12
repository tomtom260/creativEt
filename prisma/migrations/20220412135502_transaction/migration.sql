/*
  Warnings:

  - A unique constraint covering the columns `[contentId,buyerId]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Transaction_contentId_buyerId_key` ON `Transaction`(`contentId`, `buyerId`);
