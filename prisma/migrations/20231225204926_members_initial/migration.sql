-- CreateEnum
CREATE TYPE "MemberStatus" AS ENUM ('NEWBIE', 'ACTIVE', 'PASSIVE', 'DELETED', 'ARCHIVED', 'RETIRED');

-- CreateTable
CREATE TABLE "Member" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "nickName" TEXT,
    "internalEmail" TEXT NOT NULL,
    "externalEmail" TEXT,
    "phone" TEXT,
    "address" TEXT,
    "room" TEXT,
    "status" "MemberStatus" NOT NULL DEFAULT 'NEWBIE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Member_internalEmail_key" ON "Member"("internalEmail");
