/*
  Warnings:

  - Added the required column `updatedAt` to the `Jobs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `jobs` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `status` ENUM('PENDING', 'IN_PROGRESS', 'SUCCESS', 'CANCELED') NOT NULL DEFAULT 'PENDING';
