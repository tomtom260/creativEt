/*
  Warnings:

  - You are about to alter the column `status` on the `moneytransaction` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum("MoneyTransaction_status")`.

*/
-- AlterTable
ALTER TABLE `moneytransaction` MODIFY `status` ENUM('PENDING', 'SUCCESS', 'CANCELED') NOT NULL DEFAULT 'PENDING';
