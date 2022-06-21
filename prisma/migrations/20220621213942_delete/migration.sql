/*
  Warnings:

  - You are about to drop the column `jobsId` on the `ratings` table. All the data in the column will be lost.
  - Added the required column `value` to the `Ratings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ratings` DROP COLUMN `jobsId`,
    ADD COLUMN `value` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `deleted` BOOLEAN NOT NULL DEFAULT false;
