import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UsersMessagePatterns } from '@szikra-backend-nx/service-constants';
import {
  DtoWithId,
  UpdateUserDto,
  UserDto,
  UserWithRolesDto,
} from '@szikra-backend-nx/types';

import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern(UsersMessagePatterns.GET_USERS)
  getUsers(): Promise<UserDto[]> {
    return this.usersService.getUsers();
  }

  @MessagePattern(UsersMessagePatterns.GET_USER_BY_ID)
  getUserById(id: string): Promise<UserWithRolesDto> {
    return this.usersService.getUserById(id);
  }

  @MessagePattern(UsersMessagePatterns.GET_USERS_BY_ROLE)
  getUsersByRole(roleId: string): Promise<UserDto[]> {
    return this.usersService.getUsersByRole(roleId);
  }

  @MessagePattern(UsersMessagePatterns.UPDATE_USER)
  updateUser({ id, data }: DtoWithId<UpdateUserDto>): Promise<UserDto> {
    return this.usersService.updateUser(id, data);
  }

  @MessagePattern(UsersMessagePatterns.DELETE_USER)
  deleteUser(id: string): Promise<UserDto> {
    return this.usersService.deleteUser(id);
  }
}
