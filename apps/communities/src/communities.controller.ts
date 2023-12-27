import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CommunitiesMessagePatterns } from '@szikra-backend-nx/service-constants';
import { CreateCommunityDto, DtoWithId } from '@szikra-backend-nx/types';

import { CommunitiesService } from './communities.service';

@Controller()
export class CommunitiesController {
  constructor(private readonly communitiesService: CommunitiesService) {}

  @MessagePattern(CommunitiesMessagePatterns.GET_COMMUNITIES)
  getCommunities() {
    return this.communitiesService.getCommunities();
  }

  @MessagePattern(CommunitiesMessagePatterns.GET_COMMUNITY_BY_ID)
  getCommunity(id: string) {
    return this.communitiesService.getCommunity(id);
  }

  @MessagePattern(CommunitiesMessagePatterns.CREATE_COMMUNITY)
  createCommunity(data: CreateCommunityDto) {
    return this.communitiesService.createCommunity(data);
  }

  @MessagePattern(CommunitiesMessagePatterns.UPDATE_COMMUNITY)
  updateCommunity({ id, data }: DtoWithId<CreateCommunityDto>) {
    return this.communitiesService.updateCommunity(id, data);
  }

  @MessagePattern(CommunitiesMessagePatterns.DELETE_COMMUNITY)
  deleteCommunity(id: string) {
    return this.communitiesService.deleteCommunity(id);
  }

  @MessagePattern(CommunitiesMessagePatterns.ADD_MEMBER)
  addMember({ id, data }: DtoWithId<string>) {
    return this.communitiesService.addMember(id, data);
  }

  @MessagePattern(CommunitiesMessagePatterns.REMOVE_MEMBER)
  removeMember({ id, data }: DtoWithId<string>) {
    return this.communitiesService.removeMember(id, data);
  }
}
