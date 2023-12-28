import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CommunitiesMessagePatterns } from '@szikra-backend-nx/service-constants';
import {
  CommunityDto,
  CreateCommunityDto,
  DtoWithId,
} from '@szikra-backend-nx/types';

import { CommunitiesService } from './communities.service';

@Controller()
export class CommunitiesController {
  constructor(private readonly communitiesService: CommunitiesService) {}

  @MessagePattern(CommunitiesMessagePatterns.GET_COMMUNITIES)
  getCommunities(): Promise<CommunityDto[]> {
    return this.communitiesService.getCommunities();
  }

  @MessagePattern(CommunitiesMessagePatterns.GET_COMMUNITY_BY_ID)
  getCommunity(id: string): Promise<CommunityDto> {
    return this.communitiesService.getCommunity(id);
  }

  @MessagePattern(CommunitiesMessagePatterns.CREATE_COMMUNITY)
  createCommunity(data: CreateCommunityDto): Promise<CommunityDto> {
    return this.communitiesService.createCommunity(data);
  }

  @MessagePattern(CommunitiesMessagePatterns.UPDATE_COMMUNITY)
  updateCommunity({
    id,
    data,
  }: DtoWithId<CreateCommunityDto>): Promise<CommunityDto> {
    return this.communitiesService.updateCommunity(id, data);
  }

  @MessagePattern(CommunitiesMessagePatterns.DELETE_COMMUNITY)
  deleteCommunity(id: string): Promise<CommunityDto> {
    return this.communitiesService.deleteCommunity(id);
  }

  @MessagePattern(CommunitiesMessagePatterns.ADD_MEMBER)
  addMember({ id, data }: DtoWithId<string>): Promise<CommunityDto> {
    return this.communitiesService.addMember(id, data);
  }

  @MessagePattern(CommunitiesMessagePatterns.REMOVE_MEMBER)
  removeMember({ id, data }: DtoWithId<string>): Promise<CommunityDto> {
    return this.communitiesService.removeMember(id, data);
  }
}
