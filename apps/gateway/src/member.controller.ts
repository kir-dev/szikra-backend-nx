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
import { ApiBearerAuth } from '@nestjs/swagger';
import { Member } from '@prisma/client';
import { AuthGuard, Permissions } from '@szikra-backend-nx/auth-guard';
import { MembersPermissions } from '@szikra-backend-nx/permissions';
import {
  MembersMessagePatterns,
  ServiceNames,
} from '@szikra-backend-nx/service-constants';
import { CreateMemberDto, UpdateMemberDto } from '@szikra-backend-nx/types';
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
  getMembers(): Promise<Member[]> {
    return firstValueFrom(
      this.memberService.send<Member[]>(MembersMessagePatterns.GET_MEMBERS, {}),
    );
  }

  @Permissions([MembersPermissions.READ])
  @Get(':id')
  getMemberById(@Param('id') id: string): Promise<Member> {
    return firstValueFrom(
      this.memberService.send<Member>(
        MembersMessagePatterns.GET_MEMBER_BY_ID,
        id,
      ),
    );
  }

  @Permissions([MembersPermissions.CREATE])
  @Post()
  createMember(@Body() body: CreateMemberDto): Promise<Member> {
    return firstValueFrom(
      this.memberService.send<Member>(
        MembersMessagePatterns.CREATE_MEMBER,
        body,
      ),
    );
  }

  @Permissions([MembersPermissions.UPDATE])
  @Patch(':id')
  updateMember(
    @Param('id') id: string,
    @Body() body: UpdateMemberDto,
  ): Promise<Member> {
    return firstValueFrom(
      this.memberService.send<Member>(MembersMessagePatterns.UPDATE_MEMBER, {
        id,
        data: body,
      }),
    );
  }

  @Permissions([MembersPermissions.DELETE])
  @Delete(':id')
  async deleteMember(@Param('id') id: string): Promise<void> {
    await firstValueFrom(
      this.memberService.send<Member>(MembersMessagePatterns.DELETE_MEMBER, id),
    );
  }
}
