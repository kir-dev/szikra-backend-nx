import { Module } from '@nestjs/common';
import { PrismaModule } from '@szikra-backend-nx/prisma';

import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { RolesCommunityController } from './roles-community.controller';
import { RolesCommunityService } from './roles-community.service';

@Module({
  imports: [PrismaModule],
  controllers: [RolesController, RolesCommunityController],
  providers: [RolesService, RolesCommunityService],
})
export class RolesModule {}
