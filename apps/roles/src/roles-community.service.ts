import { Injectable } from '@nestjs/common';
import { PrismaService } from '@szikra-backend-nx/prisma';
import {
  CreateRoleDto,
  RoleWithPermissionsDto,
  UpdateRoleDto,
} from '@szikra-backend-nx/types';

@Injectable()
export class RolesCommunityService {
  constructor(private readonly prismaService: PrismaService) {}

  async getRoles(communityId: string): Promise<RoleWithPermissionsDto[]> {
    return this.prismaService.role.findMany({
      where: { communityId },
      include: { permissions: true },
    });
  }

  async getRole(
    id: string,
    communityId: string,
  ): Promise<RoleWithPermissionsDto | null> {
    return this.prismaService.role.findUnique({
      where: { id, communityId },
      include: { permissions: true },
    });
  }

  async createRole(
    communityId: string,
    role: CreateRoleDto,
  ): Promise<RoleWithPermissionsDto> {
    return this.prismaService.role.create({
      data: { ...role, communityId, global: false },
      include: { permissions: true },
    });
  }

  async updateRole(
    id: string,
    communityId: string,
    role: UpdateRoleDto,
  ): Promise<RoleWithPermissionsDto> {
    return this.prismaService.role.update({
      where: { id, communityId },
      data: role,
      include: { permissions: true },
    });
  }

  async deleteRole(
    id: string,
    communityId: string,
  ): Promise<RoleWithPermissionsDto> {
    return this.prismaService.role.delete({
      where: { id, communityId },
      include: { permissions: true },
    });
  }

  async assignPermissionToRole(
    id: string,
    communityId: string,
    permission: string,
  ): Promise<RoleWithPermissionsDto> {
    return this.prismaService.role.update({
      where: { id, communityId },
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
    communityId: string,
    permission: string,
  ): Promise<RoleWithPermissionsDto> {
    return this.prismaService.role.update({
      where: { id, communityId },
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
    communityId: string,
    userId: string,
  ): Promise<RoleWithPermissionsDto> {
    return this.prismaService.role.update({
      where: { id, communityId },
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
    communityId: string,
    userId: string,
  ): Promise<RoleWithPermissionsDto> {
    return this.prismaService.role.update({
      where: { id, communityId },
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
}
