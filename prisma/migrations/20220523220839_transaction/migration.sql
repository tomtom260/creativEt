-- DropForeignKey
ALTER TABLE `boost` DROP FOREIGN KEY `Boost_contentId_fkey`;

-- DropForeignKey
ALTER TABLE `transaction` DROP FOREIGN KEY `Transaction_contentId_fkey`;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_contentId_fkey` FOREIGN KEY (`contentId`) REFERENCES `Content`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Boost` ADD CONSTRAINT `Boost_contentId_fkey` FOREIGN KEY (`contentId`) REFERENCES `Content`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
