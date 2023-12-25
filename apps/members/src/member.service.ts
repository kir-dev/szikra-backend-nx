import { Injectable } from '@nestjs/common';
import { Member } from '@prisma/client';
import { PrismaService } from '@szikra-backend-nx/prisma';
import { CreateMemberDto, UpdateMemberDto } from '@szikra-backend-nx/types';

@Injectable()
export class MemberService {
  constructor(private readonly prisma: PrismaService) {}

  async createMember(data: CreateMemberDto): Promise<Member> {
    return this.prisma.member.create({
      data,
    });
  }

  async getMembers(): Promise<Member[]> {
    return this.prisma.member.findMany();
  }

  async getMemberById(id: string): Promise<Member> {
    return this.prisma.member.findUnique({
      where: {
        id,
      },
    });
  }

  async updateMember(id: string, data: UpdateMemberDto): Promise<Member> {
    return this.prisma.member.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteMember(id: string): Promise<Member> {
    return this.prisma.member.delete({
      where: {
        id,
      },
    });
  }
}
