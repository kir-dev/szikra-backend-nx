import { Injectable } from '@nestjs/common';
import { Community } from '@prisma/client';
import { PrismaService } from '@szikra-backend-nx/prisma';
import {
  CreateCommunityDto,
  UpdateCommunityDto,
} from '@szikra-backend-nx/types';

@Injectable()
export class CommunitiesService {
  constructor(private readonly prismaService: PrismaService) {}
  getCommunities(): Promise<Community[]> {
    return this.prismaService.community.findMany();
  }

  getCommunity(id: string): Promise<Community | null> {
    return this.prismaService.community.findUnique({ where: { id } });
  }

  createCommunity(data: CreateCommunityDto): Promise<Community> {
    return this.prismaService.community.create({ data });
  }

  updateCommunity(id: string, data: UpdateCommunityDto): Promise<Community> {
    return this.prismaService.community.update({ where: { id }, data });
  }

  addMember(id: string, userId: string): Promise<Community> {
    return this.prismaService.community.update({
      where: { id },
      data: {
        memberships: {
          create: { memberId: userId },
        },
      },
    });
  }

  removeMember(id: string, userId: string): Promise<Community> {
    return this.prismaService.community.update({
      where: { id },
      data: {
        memberships: {
          deleteMany: { memberId: userId },
        },
      },
    });
  }

  deleteCommunity(id: string): Promise<Community> {
    return this.prismaService.community.delete({ where: { id } });
  }
}
