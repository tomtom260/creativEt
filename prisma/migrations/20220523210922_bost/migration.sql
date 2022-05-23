-- DropForeignKey
ALTER TABLE `boost` DROP FOREIGN KEY `Boost_contentId_fkey`;

-- AddForeignKey
ALTER TABLE `Boost` ADD CONSTRAINT `Boost_contentId_fkey` FOREIGN KEY (`contentId`) REFERENCES `Content`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
