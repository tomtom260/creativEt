-- CreateTable
CREATE TABLE `View` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `contentId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `count` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `View_contentId_userId_key`(`contentId`, `userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

