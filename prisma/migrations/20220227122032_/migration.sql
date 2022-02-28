/*
  Warnings:

  - You are about to drop the `userdetails` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `userdetails` DROP FOREIGN KEY `UserDetails_userId_fkey`;

-- DropTable
DROP TABLE `userdetails`;

-- CreateTable
CREATE TABLE `Profile` (
    `location` VARCHAR(191) NULL,
    `username` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Profile_userId_key`(`userId`),
    PRIMARY KEY (`username`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Profile` ADD CONSTRAINT `Profile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
