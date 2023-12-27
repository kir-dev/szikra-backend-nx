/*
  Warnings:

  - You are about to drop the column `externalId` on the `Member` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Member_externalId_key";

-- AlterTable
ALTER TABLE "Member" DROP COLUMN "externalId";
