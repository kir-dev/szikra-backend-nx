import { Injectable } from '@nestjs/common';
import { PrismaService } from '@szikra-backend-nx/prisma';
import {
  CreateMemberDto,
  MemberDto,
  MemberWithMembershipDto,
  UpdateMemberDto,
} from '@szikra-backend-nx/types';

@Injectable()
export class CommunityMemberService {
  constructor(private readonly prisma: PrismaService) {}

  async getMembersForCommunity(
    communityId: string,
  ): Promise<MemberWithMembershipDto[]> {
    return this.prisma.member.findMany({
      where: {
        memberships: {
          some: {
            communityId,
          },
        },
      },
      include: {
        memberships: {
          where: {
            communityId,
          },
        },
      },
    });
  }

  async getMembers(): Promise<MemberDto[]> {
    return this.prisma.member.findMany();
  }

  async getMemberById(communityId: string, id: string): Promise<MemberDto> {
    return this.prisma.member.findUnique({
      where: {
        id,
        memberships: {
          some: {
            communityId,
          },
        },
      },
    });
  }

  async assignMemberToCommunity(
    communityId: string,
    memberId: string,
  ): Promise<MemberDto> {
    return this.prisma.member.update({
      where: {
        id: memberId,
      },
      data: {
        memberships: {
          create: {
            communityId,
          },
        },
      },
    });
  }

  async unassignMemberFromCommunity(
    communityId: string,
    memberId: string,
  ): Promise<MemberDto> {
    return this.prisma.member.update({
      where: {
        id: memberId,
      },
      data: {
        memberships: {
          deleteMany: {
            communityId,
          },
        },
      },
    });
  }
}
