import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { AuthGuard, Permissions } from '@szikra-backend-nx/auth-guard';
import { MembersPermissions } from '@szikra-backend-nx/permissions';
import {
  MembersMessagePatterns,
  ServiceNames,
} from '@szikra-backend-nx/service-constants';
import {
  CreateMemberDto,
  MemberDto,
  UpdateMemberDto,
} from '@szikra-backend-nx/types';
import { firstValueFrom } from 'rxjs';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('member')
export class MemberController {
  constructor(
    @Inject(ServiceNames.MEMBERS) private readonly memberService: ClientProxy,
  ) {}

  @Permissions([MembersPermissions.READ])
  @Get()
  @ApiOkResponse({ type: MemberDto, isArray: true })
  getMembers(): Promise<MemberDto[]> {
    return firstValueFrom(
      this.memberService.send<MemberDto[]>(
        MembersMessagePatterns.GET_MEMBERS,
        {},
      ),
    );
  }

  @Permissions([MembersPermissions.READ])
  @Get(':id')
  @ApiOkResponse({ type: MemberDto })
  getMemberById(@Param('id') id: string): Promise<MemberDto> {
    return firstValueFrom(
      this.memberService.send<MemberDto>(
        MembersMessagePatterns.GET_MEMBER_BY_ID,
        id,
      ),
    );
  }

  @Permissions([MembersPermissions.CREATE])
  @Post()
  @ApiOkResponse({ type: MemberDto })
  createMember(@Body() body: CreateMemberDto): Promise<MemberDto> {
    return firstValueFrom(
      this.memberService.send<MemberDto>(
        MembersMessagePatterns.CREATE_MEMBER,
        body,
      ),
    );
  }

  @Permissions([MembersPermissions.UPDATE])
  @Patch(':id')
  @ApiOkResponse({ type: MemberDto })
  updateMember(
    @Param('id') id: string,
    @Body() body: UpdateMemberDto,
  ): Promise<MemberDto> {
    return firstValueFrom(
      this.memberService.send<MemberDto>(MembersMessagePatterns.UPDATE_MEMBER, {
        id,
        data: body,
      }),
    );
  }

  @Permissions([MembersPermissions.DELETE])
  @Delete(':id')
  @ApiOkResponse()
  async deleteMember(@Param('id') id: string): Promise<void> {
    await firstValueFrom(
      this.memberService.send<MemberDto>(
        MembersMessagePatterns.DELETE_MEMBER,
        id,
      ),
    );
  }
}
