import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Member } from '@prisma/client';
import { MembersMessagePatterns } from '@szikra-backend-nx/service-constants';
import {
  CreateMemberDto,
  DtoWithId,
  UpdateMemberDto,
} from '@szikra-backend-nx/types';

import { MemberService } from './member.service';

@Controller()
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @MessagePattern(MembersMessagePatterns.GET_MEMBERS)
  getMembers(): Promise<Member[]> {
    return this.memberService.getMembers();
  }

  @MessagePattern(MembersMessagePatterns.GET_MEMBER_BY_ID)
  getMemberById(id: string): Promise<Member> {
    return this.memberService.getMemberById(id);
  }

  @MessagePattern(MembersMessagePatterns.CREATE_MEMBER)
  createMember(data: CreateMemberDto): Promise<Member> {
    return this.memberService.createMember(data);
  }

  @MessagePattern(MembersMessagePatterns.UPDATE_MEMBER)
  updateMember({ id, data }: DtoWithId<UpdateMemberDto>): Promise<Member> {
    return this.memberService.updateMember(id, data);
  }

  @MessagePattern(MembersMessagePatterns.DELETE_MEMBER)
  deleteMember(id: string): Promise<Member> {
    return this.memberService.deleteMember(id);
  }
}
