/*
  Warnings:

  - Added the required column `notifiedById` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `notification` ADD COLUMN `notifiedById` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_notifiedById_fkey` FOREIGN KEY (`notifiedById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
