/*
  Warnings:

  - Made the column `emailVerified` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `emailVerified` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
