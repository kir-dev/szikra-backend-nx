export enum RolesMessagePatterns {
  GET_ROLES = 'roles.get',
  GET_ROLE_BY_ID = 'roles.get_by_id',
  CREATE_ROLE = 'roles.create',
  UPDATE_ROLE = 'roles.update',
  DELETE_ROLE = 'roles.delete',
  ASSIGN_PERMISSION = 'roles.assign_permission',
  UNASSIGN_PERMISSION = 'roles.unassign_permission',
  ASSIGN_USER = 'roles.assign_user',
  UNASSIGN_USER = 'roles.unassign_user',
  GET_PERMISSIONS = 'roles.get_permissions',
}

export enum RolesCommunityMessagePatterns {
  GET_ROLES = 'roles.community.get',
  GET_ROLE_BY_ID = 'roles.community.get_by_id',
  CREATE_ROLE = 'roles.community.create',
  UPDATE_ROLE = 'roles.community.update',
  DELETE_ROLE = 'roles.community.delete',
  ASSIGN_PERMISSION = 'roles.community.assign_permission',
  UNASSIGN_PERMISSION = 'roles.community.unassign_permission',
  ASSIGN_USER = 'roles.community.assign_user',
  UNASSIGN_USER = 'roles.community.unassign_user',
}
