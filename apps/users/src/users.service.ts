import { Injectable } from '@nestjs/common';
import { PrismaService } from '@szikra-backend-nx/prisma';
import {
  UpdateUserDto,
  UserDto,
  UserWithRolesDto,
} from '@szikra-backend-nx/types';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUsers(): Promise<UserDto[]> {
    return this.prismaService.user.findMany();
  }

  async getUserById(id: string): Promise<UserWithRolesDto> {
    return this.prismaService.user.findUnique({
      where: { id },
      include: { userRoles: { include: { role: true } } },
    });
  }

  async getUsersByCommunityRole(
    communityId: string,
    roleId: string,
  ): Promise<UserWithRolesDto[]> {
    return this.prismaService.user.findMany({
      where: {
        userRoles: {
          some: {
            role: { id: roleId, communityId },
          },
        },
      },
      include: { userRoles: { include: { role: true } } },
    });
  }

  async getUsersByRole(roleId: string): Promise<UserDto[]> {
    return this.prismaService.user.findMany({
      where: { userRoles: { some: { roleId } } },
    });
  }

  async updateUser(id: string, data: UpdateUserDto): Promise<UserDto> {
    return this.prismaService.user.update({ where: { id }, data });
  }

  async deleteUser(id: string): Promise<UserDto> {
    return this.prismaService.user.delete({ where: { id } });
  }
}
