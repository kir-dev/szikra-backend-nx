/*
  Warnings:

  - You are about to drop the column `role` on the `Membership` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Membership" DROP COLUMN "role",
ADD COLUMN     "position" TEXT;
