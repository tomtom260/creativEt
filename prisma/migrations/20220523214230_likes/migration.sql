-- DropForeignKey
ALTER TABLE `likes` DROP FOREIGN KEY `Likes_contentId_fkey`;

-- DropForeignKey
ALTER TABLE `likes` DROP FOREIGN KEY `Likes_userId_fkey`;

-- AddForeignKey
ALTER TABLE `Likes` ADD CONSTRAINT `Likes_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Likes` ADD CONSTRAINT `Likes_contentId_fkey` FOREIGN KEY (`contentId`) REFERENCES `Content`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
