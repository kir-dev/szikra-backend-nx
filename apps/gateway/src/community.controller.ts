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
import { CommunitiesPermissions } from '@szikra-backend-nx/permissions';
import {
  CommunitiesMessagePatterns,
  ServiceNames,
} from '@szikra-backend-nx/service-constants';
import {
  CommunityDto,
  CreateCommunityDto,
  UpdateCommunityDto,
} from '@szikra-backend-nx/types';
import { firstValueFrom } from 'rxjs';

@ApiBearerAuth()
@ApiTags('communities')
@UseGuards(AuthGuard)
@Controller('community')
export class CommunitiesController {
  constructor(
    @Inject(ServiceNames.COMMUNITIES)
    private readonly communitiesService: ClientProxy,
  ) {}

  @Permissions([CommunitiesPermissions.READ])
  @Get()
  @ApiOkResponse({ type: CommunityDto, isArray: true })
  getCommunities(): Promise<CommunityDto[]> {
    return firstValueFrom(
      this.communitiesService.send<CommunityDto[]>(
        CommunitiesMessagePatterns.GET_COMMUNITIES,
        {},
      ),
    );
  }

  @Permissions([CommunitiesPermissions.READ])
  @Get(':id')
  @ApiOkResponse({ type: CommunityDto })
  getCommunityById(@Param('id') id: string): Promise<CommunityDto> {
    return firstValueFrom(
      this.communitiesService.send<CommunityDto>(
        CommunitiesMessagePatterns.GET_COMMUNITY_BY_ID,
        id,
      ),
    );
  }

  @Permissions([CommunitiesPermissions.CREATE])
  @Post()
  @ApiOkResponse({ type: CommunityDto })
  createCommunity(@Body() body: CreateCommunityDto): Promise<CommunityDto> {
    return firstValueFrom(
      this.communitiesService.send<CommunityDto>(
        CommunitiesMessagePatterns.CREATE_COMMUNITY,
        body,
      ),
    );
  }

  @Permissions([CommunitiesPermissions.UPDATE])
  @Patch(':id')
  @ApiOkResponse({ type: CommunityDto })
  updateCommunity(
    @Param('id') id: string,
    @Body() body: UpdateCommunityDto,
  ): Promise<CommunityDto> {
    return firstValueFrom(
      this.communitiesService.send<CommunityDto>(
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
  @ApiOkResponse()
  async deleteCommunity(@Param('id') id: string): Promise<void> {
    await firstValueFrom(
      this.communitiesService.send<CommunityDto>(
        CommunitiesMessagePatterns.DELETE_COMMUNITY,
        id,
      ),
    );
  }
}
