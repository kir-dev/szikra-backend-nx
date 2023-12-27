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
import { ApiBearerAuth } from '@nestjs/swagger';
import { Community } from '@prisma/client';
import { AuthGuard, Permissions } from '@szikra-backend-nx/auth-guard';
import { CommunitiesPermissions } from '@szikra-backend-nx/permissions';
import {
  CommunitiesMessagePatterns,
  ServiceNames,
} from '@szikra-backend-nx/service-constants';
import {
  CreateCommunityDto,
  UpdateCommunityDto,
} from '@szikra-backend-nx/types';
import { firstValueFrom } from 'rxjs';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('community')
export class CommunitiesController {
  constructor(
    @Inject(ServiceNames.COMMUNITIES)
    private readonly communitiesService: ClientProxy,
  ) {}

  @Permissions([CommunitiesPermissions.READ])
  @Get()
  getCommunities(): Promise<Community[]> {
    return firstValueFrom(
      this.communitiesService.send<Community[]>(
        CommunitiesMessagePatterns.GET_COMMUNITIES,
        {},
      ),
    );
  }

  @Permissions([CommunitiesPermissions.READ])
  @Get(':id')
  getCommunityById(@Param('id') id: string): Promise<Community> {
    return firstValueFrom(
      this.communitiesService.send<Community>(
        CommunitiesMessagePatterns.GET_COMMUNITY_BY_ID,
        id,
      ),
    );
  }

  @Permissions([CommunitiesPermissions.CREATE])
  @Post()
  createCommunity(@Body() body: CreateCommunityDto): Promise<Community> {
    return firstValueFrom(
      this.communitiesService.send<Community>(
        CommunitiesMessagePatterns.CREATE_COMMUNITY,
        body,
      ),
    );
  }

  @Permissions([CommunitiesPermissions.UPDATE])
  @Patch(':id')
  updateCommunity(
    @Param('id') id: string,
    @Body() body: UpdateCommunityDto,
  ): Promise<Community> {
    return firstValueFrom(
      this.communitiesService.send<Community>(
        CommunitiesMessagePatterns.UPDATE_COMMUNITY,
        {
          id,
          data: body,
        },
      ),
    );
  }

  @Permissions([CommunitiesPermissions.DELETE])
  @Permissions(['delete'])
  @Delete(':id')
  async deleteCommunity(@Param('id') id: string): Promise<void> {
    await firstValueFrom(
      this.communitiesService.send<Community>(
        CommunitiesMessagePatterns.DELETE_COMMUNITY,
        id,
      ),
    );
  }
}
