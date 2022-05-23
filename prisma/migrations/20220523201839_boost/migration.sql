/*
  Warnings:

  - You are about to drop the column `count` on the `view` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `view` DROP FOREIGN KEY `View_contentId_fkey`;

-- AlterTable
ALTER TABLE `view` DROP COLUMN `count`;

-- CreateTable
CREATE TABLE `Boost` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `contentId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Boost_contentId_key`(`contentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `View` ADD CONSTRAINT `View_contentId_fkey` FOREIGN KEY (`contentId`) REFERENCES `Content`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Boost` ADD CONSTRAINT `Boost_contentId_fkey` FOREIGN KEY (`contentId`) REFERENCES `Content`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
