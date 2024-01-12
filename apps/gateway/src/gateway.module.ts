import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ServiceNames } from '@szikra-backend-nx/service-constants';

import { AuthorizationController } from './authorization.controller';
import { CommunitiesController } from './community.controller';
import { CommunityMemberController } from './community-member.controller';
import { CommunityUserController } from './community-user.controller';
import { ConfigService } from './config.service';
import { GatewayController } from './gateway.controller';
import { MemberController } from './member.controller';
import { RolesController } from './roles.controller';
import { RolesCommunityController } from './roles-community.controller';
import { UsersController } from './user.controller';
import { createClientProxy } from './utils/create-client-proxy';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secret',
    }),
  ],
  controllers: [
    GatewayController,
    AuthorizationController,
    MemberController,
    CommunityMemberController,
    CommunitiesController,
    CommunityUserController,
    RolesController,
    RolesCommunityController,
    UsersController,
  ],
  providers: [
    ConfigService,
    createClientProxy(ServiceNames.MEMBERS, 'memberService'),
    createClientProxy(ServiceNames.AUTHORIZATION, 'authorizationService'),
    createClientProxy(ServiceNames.COMMUNITIES, 'communityService'),
    createClientProxy(ServiceNames.ROLES, 'roleService'),
    createClientProxy(ServiceNames.USERS, 'userService'),
  ],
})
export class GatewayModule {}
