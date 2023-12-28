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
  RolesMessagePatterns,
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
@ApiTags('roles')
@UseGuards(AuthGuard)
@Controller('role')
export class RolesController {
  constructor(
    @Inject(ServiceNames.ROLES) private readonly rolesService: ClientProxy,
  ) {}

  @Permissions([RolesPermissions.READ])
  @Get()
  @ApiOkResponse({ type: RoleWithPermissionsDto, isArray: true })
  async getRoles(): Promise<RoleWithPermissionsDto[]> {
    return firstValueFrom(
      this.rolesService.send<RoleWithPermissionsDto[]>(
        RolesMessagePatterns.GET_ROLES,
        {},
      ),
    );
  }

  @Permissions([RolesPermissions.READ])
  @Get(':roleId')
  @ApiOkResponse({ type: RoleWithPermissionsDto })
  async getRole(
    @Param('roleId') roleId: string,
  ): Promise<RoleWithPermissionsDto | null> {
    return firstValueFrom(
      this.rolesService.send<RoleWithPermissionsDto | null>(
        RolesMessagePatterns.GET_ROLE_BY_ID,
        roleId,
      ),
    );
  }

  @Permissions([RolesPermissions.CREATE])
  @Post()
  @ApiOkResponse({ type: RoleWithPermissionsDto })
  async createRole(
    @Body() role: CreateRoleDto,
  ): Promise<RoleWithPermissionsDto> {
    return firstValueFrom(
      this.rolesService.send<RoleWithPermissionsDto>(
        RolesMessagePatterns.CREATE_ROLE,
        role,
      ),
    );
  }

  @Permissions([RolesPermissions.UPDATE])
  @Patch(':roleId')
  @ApiOkResponse({ type: RoleWithPermissionsDto })
  async updateRole(
    @Param('roleId') roleId: string,
    @Body() role: UpdateRoleDto,
  ): Promise<RoleWithPermissionsDto> {
    return firstValueFrom(
      this.rolesService.send<RoleWithPermissionsDto>(
        RolesMessagePatterns.UPDATE_ROLE,
        {
          id: roleId,
          data: role,
        },
      ),
    );
  }

  @Permissions([RolesPermissions.DELETE])
  @Delete(':roleId')
  @ApiOkResponse()
  async deleteRole(@Param('roleId') roleId: string): Promise<void> {
    this.rolesService.send(RolesMessagePatterns.DELETE_ROLE, roleId);
  }

  @Permissions([RolesPermissions.ASSIGN_PERMISSIONS])
  @Post(':roleId/permissions')
  @ApiOkResponse({ type: RoleWithPermissionsDto })
  async assignPermissionToRole(
    @Param('roleId') roleId: string,
    @Body() data: AssignPermissionDto,
  ): Promise<RoleWithPermissionsDto> {
    return firstValueFrom<RoleWithPermissionsDto>(
      this.rolesService.send(RolesMessagePatterns.ASSIGN_PERMISSION, {
        id: roleId,
        data,
      }),
    );
  }

  @Permissions([RolesPermissions.UNASSIGN_PERMISSIONS])
  @Delete(':roleId/permissions')
  @ApiOkResponse({ type: RoleWithPermissionsDto })
  async unassignPermissionFromRole(
    @Param('roleId') roleId: string,
    @Body() data: AssignPermissionDto,
  ): Promise<RoleWithPermissionsDto> {
    return firstValueFrom(
      this.rolesService.send<RoleWithPermissionsDto>(
        RolesMessagePatterns.UNASSIGN_PERMISSION,
        {
          id: roleId,
          data,
        },
      ),
    );
  }

  @Permissions([RolesPermissions.ASSIGN_USERS])
  @Post(':roleId/users')
  @ApiOkResponse({ type: RoleWithPermissionsDto })
  async assignUserToRole(
    @Param('roleId') roleId: string,
    @Body() data: AssignUserDto,
  ): Promise<RoleWithPermissionsDto> {
    return firstValueFrom(
      this.rolesService.send<RoleWithPermissionsDto>(
        RolesMessagePatterns.ASSIGN_USER,
        {
          id: roleId,
          data,
        },
      ),
    );
  }

  @Permissions([RolesPermissions.UNASSIGN_USERS])
  @Delete(':roleId/users')
  @ApiOkResponse({ type: RoleWithPermissionsDto })
  async unassignUserFromRole(
    @Param('roleId') roleId: string,
    @Body() data: AssignUserDto,
  ): Promise<RoleWithPermissionsDto> {
    return firstValueFrom(
      this.rolesService.send<RoleWithPermissionsDto>(
        RolesMessagePatterns.UNASSIGN_USER,
        {
          id: roleId,
          data,
        },
      ),
    );
  }
}
