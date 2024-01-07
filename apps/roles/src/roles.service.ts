import { Injectable } from '@nestjs/common';
import * as Permissions from '@szikra-backend-nx/permissions';
import { PrismaService } from '@szikra-backend-nx/prisma';
import {
  CreateRoleDto,
  RoleWithPermissionsDto,
  UpdateRoleDto,
} from '@szikra-backend-nx/types';

@Injectable()
export class RolesService {
  constructor(private readonly prismaService: PrismaService) {}

  async getRoles(): Promise<RoleWithPermissionsDto[]> {
    return this.prismaService.role.findMany({
      include: { permissions: true },
    });
  }

  async getRole(id: string): Promise<RoleWithPermissionsDto | null> {
    return this.prismaService.role.findUnique({
      where: { id },
      include: { permissions: true },
    });
  }

  async createRole(role: CreateRoleDto): Promise<RoleWithPermissionsDto> {
    return this.prismaService.role.create({
      data: { ...role, global: true },
      include: { permissions: true },
    });
  }

  async updateRole(
    id: string,
    role: UpdateRoleDto,
  ): Promise<RoleWithPermissionsDto> {
    return this.prismaService.role.update({
      where: { id },
      data: role,
      include: { permissions: true },
    });
  }

  async deleteRole(id: string): Promise<RoleWithPermissionsDto> {
    return this.prismaService.role.delete({
      where: { id },
      include: { permissions: true },
    });
  }

  async assignPermissionToRole(
    id: string,
    permission: string,
  ): Promise<RoleWithPermissionsDto> {
    return this.prismaService.role.update({
      where: { id },
      data: {
        permissions: {
          create: {
            permission,
          },
        },
      },
      include: { permissions: true },
    });
  }

  async unassignPermissionFromRole(
    id: string,
    permission: string,
  ): Promise<RoleWithPermissionsDto> {
    return this.prismaService.role.update({
      where: { id },
      data: {
        permissions: {
          deleteMany: {
            permission,
          },
        },
      },
      include: { permissions: true },
    });
  }

  async assignUserToRole(
    id: string,
    userId: string,
  ): Promise<RoleWithPermissionsDto> {
    return this.prismaService.role.update({
      where: { id },
      data: {
        userRoles: {
          create: {
            userId,
          },
        },
      },
      include: { permissions: true },
    });
  }

  async unassignUserFromRole(
    id: string,
    userId: string,
  ): Promise<RoleWithPermissionsDto> {
    return this.prismaService.role.update({
      where: { id },
      data: {
        userRoles: {
          deleteMany: {
            userId,
          },
        },
      },
      include: { permissions: true },
    });
  }

  getAvailablePermissions(): string[] {
    return [
      Permissions.GlobalPermissions,
      Permissions.CommonPermissions,
      Permissions.CommunitiesPermissions,
      Permissions.MembersPermissions,
      Permissions.RolesPermissions,
      Permissions.UsersPermissions,
    ].reduce<string[]>((acc, curr) => [...acc, ...Object.values(curr)], []);
  }
}
