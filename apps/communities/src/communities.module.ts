import { Module } from '@nestjs/common';
import { PrismaModule } from '@szikra-backend-nx/prisma';

import { CommunitiesController } from './communities.controller';
import { CommunitiesService } from './communities.service';

@Module({
  imports: [PrismaModule],
  controllers: [CommunitiesController],
  providers: [CommunitiesService],
})
export class CommunitiesModule {}
