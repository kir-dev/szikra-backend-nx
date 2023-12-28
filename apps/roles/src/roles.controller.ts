import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { RolesMessagePatterns } from '@szikra-backend-nx/service-constants';
import {
  AssignPermissionDto,
  AssignUserDto,
  CreateRoleDto,
  DtoWithId,
  RoleWithPermissionsDto,
  UpdateRoleDto,
} from '@szikra-backend-nx/types';

import { RolesService } from './roles.service';

@Controller()
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @MessagePattern(RolesMessagePatterns.GET_ROLES)
  getRoles(): Promise<RoleWithPermissionsDto[]> {
    return this.rolesService.getRoles();
  }

  @MessagePattern(RolesMessagePatterns.GET_ROLE_BY_ID)
  getRole(id: string): Promise<RoleWithPermissionsDto | null> {
    return this.rolesService.getRole(id);
  }

  @MessagePattern(RolesMessagePatterns.CREATE_ROLE)
  createRole(role: CreateRoleDto): Promise<RoleWithPermissionsDto> {
    return this.rolesService.createRole(role);
  }

  @MessagePattern(RolesMessagePatterns.UPDATE_ROLE)
  updateRole({
    id,
    data,
  }: DtoWithId<UpdateRoleDto>): Promise<RoleWithPermissionsDto> {
    return this.rolesService.updateRole(id, data);
  }

  @MessagePattern(RolesMessagePatterns.DELETE_ROLE)
  deleteRole(id: string): Promise<RoleWithPermissionsDto> {
    return this.rolesService.deleteRole(id);
  }

  @MessagePattern(RolesMessagePatterns.ASSIGN_PERMISSION)
  assignPermissionToRole({
    id,
    data: { permission },
  }: DtoWithId<AssignPermissionDto>): Promise<RoleWithPermissionsDto> {
    return this.rolesService.assignPermissionToRole(id, permission);
  }

  @MessagePattern(RolesMessagePatterns.UNASSIGN_PERMISSION)
  unassignPermissionFromRole({
    id,
    data: { permission },
  }: DtoWithId<AssignPermissionDto>): Promise<RoleWithPermissionsDto> {
    return this.rolesService.unassignPermissionFromRole(id, permission);
  }

  @MessagePattern(RolesMessagePatterns.ASSIGN_USER)
  assignUserToRole({
    id,
    data: { userId },
  }: DtoWithId<AssignUserDto>): Promise<RoleWithPermissionsDto> {
    return this.rolesService.assignUserToRole(id, userId);
  }

  @MessagePattern(RolesMessagePatterns.UNASSIGN_USER)
  unassignUserFromRole({
    id,
    data: { userId },
  }: DtoWithId<AssignUserDto>): Promise<RoleWithPermissionsDto> {
    return this.rolesService.unassignUserFromRole(id, userId);
  }
}
