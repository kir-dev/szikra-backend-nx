import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Role, RolePermission } from '@prisma/client';
import { GlobalPermissions } from '@szikra-backend-nx/permissions';
import { PrismaService } from '@szikra-backend-nx/prisma';
import { PermissionItem, RequestUser } from '@szikra-backend-nx/types';
import { google } from 'googleapis';

import { ConfigService } from './config.service';

@Injectable()
export class AuthorizationService {
  private readonly logger = new Logger(AuthorizationService.name);
  private readonly scopes = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
    'openid',
  ];

  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  getLoginUrl(): string {
    const oauth2Client = this.createOAuth2Client();
    return oauth2Client.generateAuthUrl({
      scope: this.scopes,
    });
  }

  private createOAuth2Client() {
    return new google.auth.OAuth2(
      this.configService.get('oauth2').clientId,
      this.configService.get('oauth2').clientSecret,
      this.configService.get('oauth2').redirectUri,
    );
  }

  async handleCallback(code: string): Promise<string> {
    const oauth2Client = this.createOAuth2Client();
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    const oauth2 = google.oauth2({
      auth: oauth2Client,
      version: 'v2',
    });
    const { data } = await oauth2.userinfo.get();
    const user = await this.findOrCreateUser(
      data.id,
      data.email,
      data.name,
      data.picture,
    );
    return this.createJwtToken(user.externalId);
  }

  async createJwtToken(externalId: string): Promise<string | null> {
    const userWithPermissions = await this.getUserWithPermissions(externalId);
    if (!userWithPermissions) return null;
    const permissions = this.mapRolesToPermissionItems(
      userWithPermissions.userRoles.map((userRole) => userRole.role),
    );
    if (this.isSysadmin(userWithPermissions.id)) {
      permissions.push({
        permission: GlobalPermissions.SUPERUSER,
        global: true,
      });
    }
    const payload: RequestUser = {
      userId: userWithPermissions.id,
      permissions,
    };
    return this.jwtService.signAsync(payload);
  }

  private async getUserWithPermissions(id: string) {
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

  private async findOrCreateUser(
    externalId: string,
    email: string,
    name: string,
    picture?: string,
  ) {
    const user = await this.prismaService.user.findUnique({
      where: { externalId },
    });
    if (user) {
      return this.prismaService.user.update({
        where: { id: user.id },
        data: { name, picture },
      });
    }
    return this.prismaService.user.create({
      data: {
        externalId,
        email,
        name,
        picture,
        member: {
          connect: {
            internalEmail: email,
          },
        },
      },
    });
  }

  private isSysadmin(userId: string) {
    return userId === this.configService.get('superuserId');
  }
}

type RoleWithPermissions = Role & {
  permissions: RolePermission[];
};
