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
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard, Permissions } from '@szikra-backend-nx/auth-guard';
import { RolesPermissions } from '@szikra-backend-nx/permissions';
import {
  RolesCommunityMessagePatterns,
  ServiceNames,
} from '@szikra-backend-nx/service-constants';
import {
  AssignPermissionDto,
  AssignUserDto,
  CreateRoleDto,
  RoleWithPermissionsDto,
  UpdateRoleDto,
} from '@szikra-backend-nx/types';
import { firstValueFrom } from 'rxjs';

@ApiBearerAuth()
@ApiTags('roles-community')
@UseGuards(AuthGuard)
@Controller('community/:id/role')
export class RolesCommunityController {
  constructor(
    @Inject(ServiceNames.ROLES) private readonly rolesService: ClientProxy,
  ) {}

  @Permissions([RolesPermissions.READ])
  @Get()
  @ApiOkResponse({ type: RoleWithPermissionsDto, isArray: true })
  async getRoles(
    @Param('id') communityId: string,
  ): Promise<RoleWithPermissionsDto[]> {
    return firstValueFrom(
      this.rolesService.send<RoleWithPermissionsDto[]>(
        RolesCommunityMessagePatterns.GET_ROLES,
        communityId,
      ),
    );
  }

  @Permissions([RolesPermissions.READ])
  @Get(':roleId')
  @ApiOkResponse({ type: RoleWithPermissionsDto })
  async getRole(
    @Param('id') communityId: string,
    @Param('roleId') roleId: string,
  ): Promise<RoleWithPermissionsDto | null> {
    return firstValueFrom(
      this.rolesService.send<RoleWithPermissionsDto | null>(
        RolesCommunityMessagePatterns.GET_ROLE_BY_ID,
        { id: roleId, data: communityId },
      ),
    );
  }

  @Permissions([RolesPermissions.CREATE])
  @Post()
  @ApiOkResponse({ type: RoleWithPermissionsDto })
  async createRole(
    @Param('id') communityId: string,
    @Body() role: CreateRoleDto,
  ): Promise<RoleWithPermissionsDto> {
    return firstValueFrom(
      this.rolesService.send<RoleWithPermissionsDto>(
        RolesCommunityMessagePatterns.CREATE_ROLE,
        { id: communityId, data: role },
      ),
    );
  }

  @Permissions([RolesPermissions.UPDATE])
  @Patch(':roleId')
  @ApiOkResponse({ type: RoleWithPermissionsDto })
  async updateRole(
    @Param('id') communityId: string,
    @Param('roleId') roleId: string,
    @Body() role: UpdateRoleDto,
  ): Promise<RoleWithPermissionsDto> {
    return firstValueFrom(
      this.rolesService.send<RoleWithPermissionsDto>(
        RolesCommunityMessagePatterns.UPDATE_ROLE,
        {
          id: roleId,
          data: { role, communityId },
        },
      ),
    );
  }

  @Permissions([RolesPermissions.DELETE])
  @Delete(':roleId')
  @ApiOkResponse()
  async deleteRole(
    @Param('id') communityId: string,
    @Param('roleId') roleId: string,
  ): Promise<void> {
    this.rolesService.send(RolesCommunityMessagePatterns.DELETE_ROLE, {
      id: roleId,
      data: communityId,
    });
  }

  @Permissions([RolesPermissions.ASSIGN_PERMISSIONS])
  @Post(':roleId/permissions')
  @ApiOkResponse({ type: RoleWithPermissionsDto })
  async assignPermissionToRole(
    @Param('id') communityId: string,
    @Param('roleId') roleId: string,
    @Body() permission: AssignPermissionDto,
  ): Promise<RoleWithPermissionsDto> {
    return firstValueFrom<RoleWithPermissionsDto>(
      this.rolesService.send(RolesCommunityMessagePatterns.ASSIGN_PERMISSION, {
        id: roleId,
        data: { ...permission, communityId },
      }),
    );
  }

  @Permissions([RolesPermissions.UNASSIGN_PERMISSIONS])
  @Delete(':roleId/permissions')
  @ApiOkResponse({ type: RoleWithPermissionsDto })
  async unassignPermissionFromRole(
    @Param('id') communityId: string,
    @Param('roleId') roleId: string,
    @Body() permission: AssignPermissionDto,
  ): Promise<RoleWithPermissionsDto> {
    return firstValueFrom(
      this.rolesService.send<RoleWithPermissionsDto>(
        RolesCommunityMessagePatterns.UNASSIGN_PERMISSION,
        {
          id: roleId,
          data: { ...permission, communityId },
        },
      ),
    );
  }

  @Permissions([RolesPermissions.ASSIGN_USERS])
  @Post(':roleId/users')
  @ApiOkResponse({ type: RoleWithPermissionsDto })
  async assignUserToRole(
    @Param('id') communityId: string,
    @Param('roleId') roleId: string,
    @Body() user: AssignUserDto,
  ): Promise<RoleWithPermissionsDto> {
    return firstValueFrom(
      this.rolesService.send<RoleWithPermissionsDto>(
        RolesCommunityMessagePatterns.ASSIGN_USER,
        {
          id: roleId,
          data: { ...user, communityId },
        },
      ),
    );
  }

  @Permissions([RolesPermissions.UNASSIGN_USERS])
  @Delete(':roleId/users')
  @ApiOkResponse({ type: RoleWithPermissionsDto })
  async unassignUserFromRole(
    @Param('id') communityId: string,
    @Param('roleId') roleId: string,
    @Body() user: AssignUserDto,
  ): Promise<RoleWithPermissionsDto> {
    return firstValueFrom(
      this.rolesService.send<RoleWithPermissionsDto>(
        RolesCommunityMessagePatterns.UNASSIGN_USER,
        {
          id: roleId,
          data: { ...user, communityId },
        },
      ),
    );
  }
}
