-- DropForeignKey
ALTER TABLE `message` DROP FOREIGN KEY `Message_roomId_fkey`;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `Room`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
