/*
  Warnings:

  - The required column `id` was added to the `Profile` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE `account` ADD COLUMN `password` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `profile` ADD COLUMN `id` VARCHAR(191) NOT NULL;
