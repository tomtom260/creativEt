-- CreateTable
CREATE TABLE `Notification` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `type` ENUM('NOTIFICATION', 'JOB') NOT NULL,
    `jobsId` VARCHAR(191) NULL,
    `seen` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_jobsId_fkey` FOREIGN KEY (`jobsId`) REFERENCES `Jobs`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
