import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Role, RolePermission } from '@prisma/client';
import { PrismaService } from '@szikra-backend-nx/prisma';
import {
  PermissionItem,
  RegisterDto,
  RequestUser,
} from '@szikra-backend-nx/types';

@Injectable()
export class AuthorizationService {
  private readonly logger = new Logger(AuthorizationService.name);
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async createJwtToken(externalId: string): Promise<string | null> {
    const userWithPermissions = await this.getUserWithPermissions(externalId);
    if (!userWithPermissions) return null;
    const permissions = this.mapRolesToPermissionItems(
      userWithPermissions.userRoles.map((userRole) => userRole.role),
    );
    const payload: RequestUser = {
      userId: userWithPermissions.id,
      permissions,
    };
    return this.jwtService.signAsync(payload);
  }

  async createUser(data: RegisterDto) {
    return this.prismaService.user.create({ data });
  }

  private getUserWithPermissions(id: string) {
    try {
      return this.prismaService.user.findUnique({
        where: { externalId: id },
        include: {
          userRoles: {
            include: {
              role: {
                include: { permissions: true },
              },
            },
          },
        },
      });
    } catch (e) {
      this.logger.error(e);
      return undefined;
    }
  }

  private mapRolesToPermissionItems(
    roles: RoleWithPermissions[],
  ): PermissionItem[] {
    const items: PermissionItem[] = [];
    roles.forEach((role) => {
      role.permissions.forEach((rolePermission) => {
        if (role.global) {
          items.push({
            permission: rolePermission.permission,
            global: true,
          });
        } else {
          items.push({
            permission: rolePermission.permission,
            entityId: role.communityId,
          });
        }
      });
    });
    return items;
  }
}

type RoleWithPermissions = Role & {
  permissions: RolePermission[];
};
