/*
  Warnings:

  - You are about to drop the column `hiredById` on the `jobs` table. All the data in the column will be lost.
  - You are about to drop the column `hiredUserId` on the `jobs` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `jobs` table. All the data in the column will be lost.
  - Added the required column `employeeId` to the `Jobs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employerId` to the `Jobs` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `jobs` DROP FOREIGN KEY `Jobs_hiredById_fkey`;

-- DropForeignKey
ALTER TABLE `jobs` DROP FOREIGN KEY `Jobs_hiredUserId_fkey`;

-- AlterTable
ALTER TABLE `jobs` DROP COLUMN `hiredById`,
    DROP COLUMN `hiredUserId`,
    DROP COLUMN `userId`,
    ADD COLUMN `closedByEmployee` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `closedByEmployer` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `employeeId` VARCHAR(191) NOT NULL,
    ADD COLUMN `employerId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Jobs` ADD CONSTRAINT `Jobs_employerId_fkey` FOREIGN KEY (`employerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Jobs` ADD CONSTRAINT `Jobs_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
