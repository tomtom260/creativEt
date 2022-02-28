/*
  Warnings:

  - The primary key for the `profile` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `profile` DROP PRIMARY KEY,
    ADD PRIMARY KEY (`id`);
