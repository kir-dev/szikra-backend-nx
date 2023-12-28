import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { RolesCommunityMessagePatterns } from '@szikra-backend-nx/service-constants';
import {
  AssignPermissionDto,
  AssignUserDto,
  CreateRoleDto,
  DtoWithId,
  RoleWithPermissionsDto,
  UpdateRoleDto,
} from '@szikra-backend-nx/types';

import { RolesCommunityService } from './roles-community.service';

@Controller()
export class RolesCommunityController {
  constructor(private readonly rolesService: RolesCommunityService) {}

  @MessagePattern(RolesCommunityMessagePatterns.GET_ROLES)
  getRoles(communityId: string): Promise<RoleWithPermissionsDto[]> {
    return this.rolesService.getRoles(communityId);
  }

  @MessagePattern(RolesCommunityMessagePatterns.GET_ROLE_BY_ID)
  getRole({
    id,
    data: communityId,
  }: DtoWithId<string>): Promise<RoleWithPermissionsDto | null> {
    return this.rolesService.getRole(id, communityId);
  }

  @MessagePattern(RolesCommunityMessagePatterns.CREATE_ROLE)
  createRole({
    id: communityId,
    data,
  }: DtoWithId<CreateRoleDto>): Promise<RoleWithPermissionsDto> {
    return this.rolesService.createRole(communityId, data);
  }

  @MessagePattern(RolesCommunityMessagePatterns.UPDATE_ROLE)
  updateRole({
    id,
    data: { role, communityId },
  }: DtoWithId<{
    role: UpdateRoleDto;
    communityId: string;
  }>): Promise<RoleWithPermissionsDto> {
    return this.rolesService.updateRole(id, communityId, role);
  }

  @MessagePattern(RolesCommunityMessagePatterns.DELETE_ROLE)
  deleteRole({
    id,
    data: communityId,
  }: DtoWithId<string>): Promise<RoleWithPermissionsDto> {
    return this.rolesService.deleteRole(id, communityId);
  }

  @MessagePattern(RolesCommunityMessagePatterns.ASSIGN_PERMISSION)
  assignPermissionToRole({
    id,
    data: { permission, communityId },
  }: DtoWithId<
    AssignPermissionDto & {
      communityId: string;
    }
  >): Promise<RoleWithPermissionsDto> {
    return this.rolesService.assignPermissionToRole(
      id,
      communityId,
      permission,
    );
  }

  @MessagePattern(RolesCommunityMessagePatterns.UNASSIGN_PERMISSION)
  unassignPermissionFromRole({
    id,
    data: { permission, communityId },
  }: DtoWithId<
    AssignPermissionDto & {
      communityId: string;
    }
  >): Promise<RoleWithPermissionsDto> {
    return this.rolesService.unassignPermissionFromRole(
      id,
      communityId,
      permission,
    );
  }

  @MessagePattern(RolesCommunityMessagePatterns.ASSIGN_USER)
  assignUserToRole({
    id,
    data: { userId, communityId },
  }: DtoWithId<
    AssignUserDto & {
      communityId: string;
    }
  >): Promise<RoleWithPermissionsDto> {
    return this.rolesService.assignUserToRole(id, communityId, userId);
  }

  @MessagePattern(RolesCommunityMessagePatterns.UNASSIGN_USER)
  unassignUserFromRole({
    id,
    data: { userId, communityId },
  }: DtoWithId<
    AssignUserDto & {
      communityId: string;
    }
  >): Promise<RoleWithPermissionsDto> {
    return this.rolesService.unassignUserFromRole(id, communityId, userId);
  }
}
