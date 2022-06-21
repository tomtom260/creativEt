/*
  Warnings:

  - The values [NOTIFICATION] on the enum `Notification_type` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `identifier` on the `verificationtoken` table. All the data in the column will be lost.
  - The required column `id` was added to the `VerificationToken` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE `_contenttotags` DROP FOREIGN KEY `_contenttotags_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_contenttotags` DROP FOREIGN KEY `_contenttotags_ibfk_2`;

-- DropForeignKey
ALTER TABLE `_roomtouser` DROP FOREIGN KEY `_roomtouser_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_roomtouser` DROP FOREIGN KEY `_roomtouser_ibfk_2`;

-- DropForeignKey
ALTER TABLE `account` DROP FOREIGN KEY `Account_userId_fkey`;

-- DropForeignKey
ALTER TABLE `boost` DROP FOREIGN KEY `Boost_contentId_fkey`;

-- DropForeignKey
ALTER TABLE `content` DROP FOREIGN KEY `Content_userId_fkey`;

-- DropForeignKey
ALTER TABLE `follow` DROP FOREIGN KEY `Follow_followerId_fkey`;

-- DropForeignKey
ALTER TABLE `follow` DROP FOREIGN KEY `Follow_followingId_fkey`;

-- DropForeignKey
ALTER TABLE `jobs` DROP FOREIGN KEY `Jobs_contentId_fkey`;

-- DropForeignKey
ALTER TABLE `jobs` DROP FOREIGN KEY `Jobs_employeeId_fkey`;

-- DropForeignKey
ALTER TABLE `jobs` DROP FOREIGN KEY `Jobs_employerId_fkey`;

-- DropForeignKey
ALTER TABLE `likes` DROP FOREIGN KEY `Likes_contentId_fkey`;

-- DropForeignKey
ALTER TABLE `likes` DROP FOREIGN KEY `Likes_userId_fkey`;

-- DropForeignKey
ALTER TABLE `message` DROP FOREIGN KEY `Message_roomId_fkey`;

-- DropForeignKey
ALTER TABLE `message` DROP FOREIGN KEY `Message_senderId_fkey`;

-- DropForeignKey
ALTER TABLE `moneytransaction` DROP FOREIGN KEY `MoneyTransaction_userId_fkey`;

-- DropForeignKey
ALTER TABLE `notification` DROP FOREIGN KEY `Notification_notifiedById_fkey`;

-- DropForeignKey
ALTER TABLE `notification` DROP FOREIGN KEY `Notification_userId_fkey`;

-- DropForeignKey
ALTER TABLE `profile` DROP FOREIGN KEY `Profile_userId_fkey`;

-- DropForeignKey
ALTER TABLE `ratings` DROP FOREIGN KEY `Ratings_jobsId_fkey`;

-- DropForeignKey
ALTER TABLE `ratings` DROP FOREIGN KEY `Ratings_userId_fkey`;

-- DropForeignKey
ALTER TABLE `session` DROP FOREIGN KEY `Session_userId_fkey`;

-- DropForeignKey
ALTER TABLE `transaction` DROP FOREIGN KEY `Transaction_buyerId_fkey`;

-- DropForeignKey
ALTER TABLE `transaction` DROP FOREIGN KEY `Transaction_contentId_fkey`;

-- DropForeignKey
ALTER TABLE `transaction` DROP FOREIGN KEY `Transaction_sellerId_fkey`;

-- DropForeignKey
ALTER TABLE `view` DROP FOREIGN KEY `View_contentId_fkey`;

-- DropForeignKey
ALTER TABLE `view` DROP FOREIGN KEY `View_userId_fkey`;

-- DropIndex
DROP INDEX `VerificationToken_identifier_token_key` ON `verificationtoken`;

-- AlterTable
ALTER TABLE `notification` MODIFY `type` ENUM('JOB', 'MESSAGE', 'FOLLOW', 'LIKE', 'BOUGHT') NOT NULL;

-- AlterTable
ALTER TABLE `verificationtoken` DROP COLUMN `identifier`,
    ADD COLUMN `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);
