/*
  Warnings:

  - You are about to drop the column `createdAt` on the `boost` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `boost` DROP COLUMN `createdAt`,
    ADD COLUMN `boostedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
