import {
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard, Permissions } from '@szikra-backend-nx/auth-guard';
import { MembersPermissions } from '@szikra-backend-nx/permissions';
import {
  MembersMessagePatterns,
  ServiceNames,
} from '@szikra-backend-nx/service-constants';
import { MemberDto, MemberWithMembershipDto } from '@szikra-backend-nx/types';
import { firstValueFrom } from 'rxjs';

@ApiBearerAuth()
@ApiTags('community-members')
@UseGuards(AuthGuard)
@Controller('community/:id/member')
export class CommunityMemberController {
  constructor(
    @Inject(ServiceNames.MEMBERS) private readonly memberService: ClientProxy,
  ) {}

  @Permissions([MembersPermissions.READ])
  @Get('all')
  @ApiOkResponse({ type: MemberDto, isArray: true })
  getMembers(@Param('id') _: string): Promise<MemberDto[]> {
    return firstValueFrom(
      this.memberService.send<MemberDto[]>(
        MembersMessagePatterns.GET_MEMBERS,
        {},
      ),
    );
  }

  @Permissions([MembersPermissions.READ])
  @Get()
  @ApiOkResponse({ type: MemberWithMembershipDto, isArray: true })
  getMembersForCommunity(
    @Param('id') communityId: string,
  ): Promise<MemberWithMembershipDto[]> {
    return firstValueFrom(
      this.memberService.send<MemberWithMembershipDto[]>(
        MembersMessagePatterns.GET_COMMUNITY_MEMBERS,
        communityId,
      ),
    );
  }

  @Permissions([MembersPermissions.READ])
  @Get(':memberId')
  @ApiOkResponse({ type: MemberDto })
  getMemberById(
    @Param('id') communityId: string,
    @Param('memberId') memberId: string,
  ): Promise<MemberDto> {
    return firstValueFrom(
      this.memberService.send<MemberDto>(
        MembersMessagePatterns.GET_COMMUNITY_MEMBER_BY_ID,
        { id: memberId, data: communityId },
      ),
    );
  }

  @Permissions([MembersPermissions.ASSIGN_TO_COMMUNITY])
  @Post('assign/:memberId')
  @ApiOkResponse({ type: MemberDto })
  assignMemberToCommunity(
    @Param('id') communityId: string,
    @Param('memberId') memberId: string,
  ): Promise<MemberDto> {
    return firstValueFrom(
      this.memberService.send<MemberDto>(
        MembersMessagePatterns.ASSIGN_MEMBER_TO_COMMUNITY,
        { id: memberId, data: communityId },
      ),
    );
  }

  @Permissions([MembersPermissions.UNASSIGN_FROM_COMMUNITY])
  @Delete('unassign/:memberId')
  @ApiOkResponse({ type: MemberDto })
  unassignMemberFromCommunity(
    @Param('id') communityId: string,
    @Param('memberId') memberId: string,
  ): Promise<MemberDto> {
    return firstValueFrom(
      this.memberService.send<MemberDto>(
        MembersMessagePatterns.UNASSIGN_MEMBER_FROM_COMMUNITY,
        { id: memberId, data: communityId },
      ),
    );
  }
}
