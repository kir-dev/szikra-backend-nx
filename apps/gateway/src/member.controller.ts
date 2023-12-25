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
import { AuthGuard, Roles } from '@szikra-backend-nx/auth-guard';
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

  @Roles(['read'])
  @Get()
  getMembers(): Promise<Member[]> {
    return firstValueFrom(
      this.memberService.send<Member[]>(MembersMessagePatterns.GET_MEMBERS, {}),
    );
  }

  @Roles(['read'])
  @Get(':id')
  getMemberById(@Param('id') id: string): Promise<Member> {
    return firstValueFrom(
      this.memberService.send<Member>(
        MembersMessagePatterns.GET_MEMBER_BY_ID,
        id,
      ),
    );
  }

  @Roles(['create'])
  @Post()
  createMember(@Body() body: CreateMemberDto): Promise<Member> {
    return firstValueFrom(
      this.memberService.send<Member>(
        MembersMessagePatterns.CREATE_MEMBER,
        body,
      ),
    );
  }

  @Roles(['update'])
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

  @Roles(['delete'])
  @Delete(':id')
  async deleteMember(@Param('id') id: string): Promise<void> {
    await firstValueFrom(
      this.memberService.send<Member>(MembersMessagePatterns.DELETE_MEMBER, id),
    );
  }
}
