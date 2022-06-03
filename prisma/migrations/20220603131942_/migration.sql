/*
  Warnings:

  - You are about to drop the column `jobsId` on the `notification` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[contentId]` on the table `Jobs` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `notification` DROP FOREIGN KEY `Notification_jobsId_fkey`;

-- AlterTable
ALTER TABLE `jobs` ADD COLUMN `contentId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `notification` DROP COLUMN `jobsId`;

-- CreateIndex
CREATE UNIQUE INDEX `Jobs_contentId_key` ON `Jobs`(`contentId`);

-- AddForeignKey
ALTER TABLE `Jobs` ADD CONSTRAINT `Jobs_contentId_fkey` FOREIGN KEY (`contentId`) REFERENCES `Content`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
