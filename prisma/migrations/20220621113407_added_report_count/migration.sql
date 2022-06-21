/*
  Warnings:

  - Added the required column `reportCount` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `report` ADD COLUMN `reportCount` INTEGER NOT NULL;
