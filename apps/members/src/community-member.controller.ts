import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { MembersMessagePatterns } from '@szikra-backend-nx/service-constants';
import {
  CreateMemberDto,
  DtoWithId,
  MemberDto,
  MemberWithMembershipDto,
  UpdateMemberDto,
} from '@szikra-backend-nx/types';

import { CommunityMemberService } from './community-member.service';
import { MemberService } from './member.service';

@Controller()
export class CommunityMemberController {
  constructor(private readonly memberService: CommunityMemberService) {}

  @MessagePattern(MembersMessagePatterns.GET_COMMUNITY_MEMBERS)
  getMembersForCommunity(
    communityId: string,
  ): Promise<MemberWithMembershipDto[]> {
    return this.memberService.getMembersForCommunity(communityId);
  }

  @MessagePattern(MembersMessagePatterns.GET_COMMUNITY_MEMBER_BY_ID)
  getMemberById({
    id,
    data: communityId,
  }: DtoWithId<string>): Promise<MemberDto> {
    return this.memberService.getMemberById(communityId, id);
  }

  @MessagePattern(MembersMessagePatterns.ASSIGN_MEMBER_TO_COMMUNITY)
  assignMemberToCommunity({
    id,
    data: communityId,
  }: DtoWithId<string>): Promise<MemberDto> {
    return this.memberService.assignMemberToCommunity(communityId, id);
  }

  @MessagePattern(MembersMessagePatterns.UNASSIGN_MEMBER_FROM_COMMUNITY)
  unassignMemberFromCommunity({
    id,
    data: communityId,
  }: DtoWithId<string>): Promise<MemberDto> {
    return this.memberService.unassignMemberFromCommunity(communityId, id);
  }
}
