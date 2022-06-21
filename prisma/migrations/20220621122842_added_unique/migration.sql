/*
  Warnings:

  - A unique constraint covering the columns `[contentId]` on the table `Report` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Report_contentId_key` ON `Report`(`contentId`);
