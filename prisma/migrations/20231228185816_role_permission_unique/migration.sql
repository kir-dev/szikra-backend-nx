/*
  Warnings:

  - A unique constraint covering the columns `[permission,roleId]` on the table `RolePermission` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "RolePermission_permission_roleId_key" ON "RolePermission"("permission", "roleId");
