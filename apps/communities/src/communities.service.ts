import { Injectable } from '@nestjs/common';
import { PrismaService } from '@szikra-backend-nx/prisma';
import {
  CommunityDto,
  CreateCommunityDto,
  UpdateCommunityDto,
} from '@szikra-backend-nx/types';

@Injectable()
export class CommunitiesService {
  constructor(private readonly prismaService: PrismaService) {}
  getCommunities(): Promise<CommunityDto[]> {
    return this.prismaService.community.findMany();
  }

  getCommunity(id: string): Promise<CommunityDto | null> {
    return this.prismaService.community.findUnique({ where: { id } });
  }

  createCommunity(data: CreateCommunityDto): Promise<CommunityDto> {
    return this.prismaService.community.create({ data });
  }

  updateCommunity(id: string, data: UpdateCommunityDto): Promise<CommunityDto> {
    return this.prismaService.community.update({ where: { id }, data });
  }

  addMember(id: string, userId: string): Promise<CommunityDto> {
    return this.prismaService.community.update({
      where: { id },
      data: {
        memberships: {
          create: { memberId: userId },
        },
      },
    });
  }

  removeMember(id: string, userId: string): Promise<CommunityDto> {
    return this.prismaService.community.update({
      where: { id },
      data: {
        memberships: {
          deleteMany: { memberId: userId },
        },
      },
    });
  }

  deleteCommunity(id: string): Promise<CommunityDto> {
    return this.prismaService.community.delete({ where: { id } });
  }
}
