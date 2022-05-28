/*
  Warnings:

  - You are about to alter the column `type` on the `moneytransaction` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum("MoneyTransaction_type")`.

*/
-- AlterTable
ALTER TABLE `moneytransaction` ADD COLUMN `status` VARCHAR(191) NOT NULL DEFAULT 'Pending',
    MODIFY `type` ENUM('DEPOSIT', 'WITHDRAW') NOT NULL;
