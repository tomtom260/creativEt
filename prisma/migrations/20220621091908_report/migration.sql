-- DropIndex
DROP INDEX `Account_userId_fkey` ON `account`;

-- DropIndex
DROP INDEX `Content_userId_fkey` ON `content`;

-- DropIndex
DROP INDEX `Follow_followingId_fkey` ON `follow`;

-- DropIndex
DROP INDEX `Jobs_employeeId_fkey` ON `jobs`;

-- DropIndex
DROP INDEX `Jobs_employerId_fkey` ON `jobs`;

-- DropIndex
DROP INDEX `Likes_contentId_fkey` ON `likes`;

-- DropIndex
DROP INDEX `Message_roomId_fkey` ON `message`;

-- DropIndex
DROP INDEX `Message_senderId_fkey` ON `message`;

-- DropIndex
DROP INDEX `MoneyTransaction_userId_fkey` ON `moneytransaction`;

-- DropIndex
DROP INDEX `Notification_notifiedById_fkey` ON `notification`;

-- DropIndex
DROP INDEX `Notification_userId_fkey` ON `notification`;

-- DropIndex
DROP INDEX `Ratings_jobsId_fkey` ON `ratings`;

-- DropIndex
DROP INDEX `Ratings_userId_fkey` ON `ratings`;

-- DropIndex
DROP INDEX `Session_userId_fkey` ON `session`;

-- DropIndex
DROP INDEX `Transaction_buyerId_fkey` ON `transaction`;

-- DropIndex
DROP INDEX `Transaction_sellerId_fkey` ON `transaction`;

-- DropIndex
DROP INDEX `View_contentId_fkey` ON `view`;

-- DropIndex
DROP INDEX `View_userId_fkey` ON `view`;

-- AlterTable
ALTER TABLE `content` ADD COLUMN `deleted` BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE `Report` (
    `id` VARCHAR(191) NOT NULL,
    `reporterId` VARCHAR(191) NOT NULL,
    `contentId` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `resolved` ENUM('PENDING', 'REMOVED', 'ALLOWED') NOT NULL DEFAULT 'PENDING',
    `reportedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
