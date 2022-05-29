-- CreateTable
CREATE TABLE `Jobs` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `price` INTEGER NOT NULL,
    `status` ENUM('IN_PROGRESS', 'SUCCESS', 'CANCELED') NOT NULL DEFAULT 'IN_PROGRESS',
    `dueIn` DATETIME(3) NOT NULL,
    `hiredById` VARCHAR(191) NOT NULL,
    `hiredUserId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Jobs` ADD CONSTRAINT `Jobs_hiredById_fkey` FOREIGN KEY (`hiredById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Jobs` ADD CONSTRAINT `Jobs_hiredUserId_fkey` FOREIGN KEY (`hiredUserId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
