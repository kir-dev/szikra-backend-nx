import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard, Permissions } from '@szikra-backend-nx/auth-guard';
import { UsersPermissions } from '@szikra-backend-nx/permissions';
import {
  ServiceNames,
  UsersMessagePatterns,
} from '@szikra-backend-nx/service-constants';
import { UpdateUserDto, UserDto, WithUser } from '@szikra-backend-nx/types';
import { firstValueFrom } from 'rxjs';

@ApiBearerAuth()
@ApiTags('users')
@UseGuards(AuthGuard)
@Controller('user')
export class UsersController {
  constructor(
    @Inject(ServiceNames.USERS) private readonly userService: ClientProxy,
  ) {}

  @Permissions([UsersPermissions.READ])
  @Get()
  @ApiOkResponse({ type: UserDto, isArray: true })
  getUsers(): Promise<UserDto[]> {
    return firstValueFrom(
      this.userService.send<UserDto[]>(UsersMessagePatterns.GET_USERS, {}),
    );
  }

  @Permissions([UsersPermissions.READ_SELF])
  @Get('me')
  @ApiOkResponse({ type: UserDto })
  async getMe(@Req() req: WithUser): Promise<UserDto> {
    return await firstValueFrom(
      this.userService.send<UserDto>(
        UsersMessagePatterns.GET_USER_BY_ID,
        req.user.userId,
      ),
    );
  }

  @Permissions([UsersPermissions.READ])
  @Get(':id')
  @ApiOkResponse({ type: UserDto })
  getUserById(@Param('id') id: string): Promise<UserDto> {
    return firstValueFrom(
      this.userService.send<UserDto>(UsersMessagePatterns.GET_USER_BY_ID, id),
    );
  }

  @Permissions([UsersPermissions.READ])
  @Get('role/:roleId')
  @ApiOkResponse({ type: UserDto, isArray: true })
  getUsersByRole(@Param('roleId') roleId: string): Promise<UserDto[]> {
    return firstValueFrom(
      this.userService.send<UserDto[]>(
        UsersMessagePatterns.GET_USERS_BY_ROLE,
        roleId,
      ),
    );
  }

  @Permissions([UsersPermissions.UPDATE])
  @Patch(':id')
  @ApiOkResponse({ type: UserDto })
  updateUser(
    @Param('id') id: string,
    @Body() data: UpdateUserDto,
  ): Promise<UserDto> {
    return firstValueFrom(
      this.userService.send<UserDto>(UsersMessagePatterns.UPDATE_USER, {
        id,
        data,
      }),
    );
  }

  @Permissions([UsersPermissions.DELETE])
  @Delete(':id')
  @ApiOkResponse()
  async deleteUser(@Param('id') id: string): Promise<void> {
    await firstValueFrom(
      this.userService.send<UserDto>(UsersMessagePatterns.DELETE_USER, id),
    );
  }
}
