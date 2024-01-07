export enum MembersMessagePatterns {
  GET_MEMBERS = 'members.get',
  GET_COMMUNITY_MEMBERS = 'members.get_for_community',
  GET_MEMBER_BY_ID = 'members.get_by_id',
  GET_COMMUNITY_MEMBER_BY_ID = 'members.get_for_community_by_id',
  ASSIGN_MEMBER_TO_COMMUNITY = 'members.assign_to_community',
  UNASSIGN_MEMBER_FROM_COMMUNITY = 'members.unassign_from_community',
  CREATE_MEMBER = 'members.create',
  UPDATE_MEMBER = 'members.update',
  DELETE_MEMBER = 'members.delete',
}
