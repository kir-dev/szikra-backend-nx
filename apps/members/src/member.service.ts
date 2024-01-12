import { Injectable } from '@nestjs/common';
import { PrismaService } from '@szikra-backend-nx/prisma';
import {
  CreateMemberDto,
  MemberDto,
  MemberWithCommunityDto,
  UpdateMemberDto,
} from '@szikra-backend-nx/types';

@Injectable()
export class MemberService {
  constructor(private readonly prisma: PrismaService) {}

  async createMember(data: CreateMemberDto): Promise<MemberDto> {
    return this.prisma.member.create({
      data: {
        ...data,
        user: {
          connect: {
            email: data.internalEmail,
          },
        },
      },
    });
  }

  async getMembers(): Promise<MemberDto[]> {
    return this.prisma.member.findMany();
  }

  async getMemberById(id: string): Promise<MemberWithCommunityDto> {
    return this.prisma.member.findUnique({
      where: {
        id,
      },
      include: {
        memberships: {
          include: {
            community: true,
          },
        },
      },
    });
  }

  async updateMember(id: string, data: UpdateMemberDto): Promise<MemberDto> {
    return this.prisma.member.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteMember(id: string): Promise<MemberDto> {
    return this.prisma.member.delete({
      where: {
        id,
      },
    });
  }

  async getMemberByUserId(userId: string): Promise<MemberWithCommunityDto> {
    return this.prisma.member.findFirst({
      where: {
        user: {
          id: userId,
        },
      },
      include: {
        memberships: {
          include: {
            community: true,
          },
        },
      },
    });
  }
}
