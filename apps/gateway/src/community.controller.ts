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
import { AuthGuard, Roles } from '@szikra-backend-nx/auth-guard';
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

  @Roles(['read'])
  @Get()
  getCommunities(): Promise<Community[]> {
    return firstValueFrom(
      this.communitiesService.send<Community[]>(
        CommunitiesMessagePatterns.GET_COMMUNITIES,
        {},
      ),
    );
  }

  @Roles(['read'])
  @Get(':id')
  getCommunityById(@Param('id') id: string): Promise<Community> {
    return firstValueFrom(
      this.communitiesService.send<Community>(
        CommunitiesMessagePatterns.GET_COMMUNITY_BY_ID,
        id,
      ),
    );
  }

  @Roles(['create'])
  @Post()
  createCommunity(@Body() body: CreateCommunityDto): Promise<Community> {
    return firstValueFrom(
      this.communitiesService.send<Community>(
        CommunitiesMessagePatterns.CREATE_COMMUNITY,
        body,
      ),
    );
  }

  @Roles(['update'])
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

  @Roles(['delete'])
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
