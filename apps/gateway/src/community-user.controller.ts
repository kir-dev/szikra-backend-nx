import { Controller, Get, Inject, Param, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard, Permissions } from '@szikra-backend-nx/auth-guard';
import { UsersPermissions } from '@szikra-backend-nx/permissions';
import {
  ServiceNames,
  UsersMessagePatterns,
} from '@szikra-backend-nx/service-constants';
import { UserDto } from '@szikra-backend-nx/types';
import { firstValueFrom } from 'rxjs';

@ApiBearerAuth()
@ApiTags('users-community')
@UseGuards(AuthGuard)
@Controller('community/:id/user')
export class CommunityUserController {
  constructor(
    @Inject(ServiceNames.USERS) private readonly userService: ClientProxy,
  ) {}

  @Permissions([UsersPermissions.READ])
  @Get()
  @ApiOkResponse({ type: UserDto, isArray: true })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getUsers(@Param('id') _: string): Promise<UserDto[]> {
    return firstValueFrom(
      this.userService.send<UserDto[]>(UsersMessagePatterns.GET_USERS, {}),
    );
  }

  @Permissions([UsersPermissions.READ])
  @Get('role/:roleId')
  @ApiOkResponse({ type: UserDto, isArray: true })
  getUsersByRole(
    @Param('id') communityId: string,
    @Param('roleId') roleId: string,
  ): Promise<UserDto[]> {
    return firstValueFrom(
      this.userService.send<UserDto[]>(
        UsersMessagePatterns.GET_USERS_BY_COMMUNITY_ROLE,
        {
          id: communityId,
          data: roleId,
        },
      ),
    );
  }
}
