/*
  Warnings:

  - You are about to drop the column `userId` on the `message` table. All the data in the column will be lost.
  - You are about to drop the column `senderId` on the `room` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `message` DROP COLUMN `userId`;

-- AlterTable
ALTER TABLE `room` DROP COLUMN `senderId`;
