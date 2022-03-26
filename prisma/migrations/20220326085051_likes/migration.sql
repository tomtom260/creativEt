/*
  Warnings:

  - You are about to drop the column `LikedAt` on the `likes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `likes` DROP COLUMN `LikedAt`,
    ADD COLUMN `likedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
