import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import {
  ClientOptions,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { ServiceNames } from '@szikra-backend-nx/service-constants';

import { AuthorizationController } from './authorization.controller';
import { CommunitiesController } from './community.controller';
import { ConfigService } from './config.service';
import { GatewayController } from './gateway.controller';
import { MemberController } from './member.controller';
import { RolesController } from './roles.controller';
import { RolesCommunityController } from './roles-community.controller';

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
    CommunitiesController,
    RolesController,
    RolesCommunityController,
  ],
  providers: [
    ConfigService,
    {
      provide: ServiceNames.MEMBERS,
      useFactory: (configService: ConfigService) => {
        const memberServiceOptions: ClientOptions = {
          transport: Transport.TCP,
          options: configService.get('memberService'),
        };
        return ClientProxyFactory.create(memberServiceOptions);
      },
      inject: [ConfigService],
    },
    {
      provide: ServiceNames.AUTHORIZATION,
      useFactory: (configService: ConfigService) => {
        const authorizationServiceOptions: ClientOptions = {
          transport: Transport.TCP,
          options: configService.get('authorizationService'),
        };
        return ClientProxyFactory.create(authorizationServiceOptions);
      },
      inject: [ConfigService],
    },
    {
      provide: ServiceNames.COMMUNITIES,
      useFactory: (configService: ConfigService) => {
        const communityServiceOptions: ClientOptions = {
          transport: Transport.TCP,
          options: {
            host: configService.get('communityService').host,
            port: configService.get('communityService').port,
          },
        };
        return ClientProxyFactory.create(communityServiceOptions);
      },
      inject: [ConfigService],
    },
    {
      provide: ServiceNames.ROLES,
      useFactory: (configService: ConfigService) => {
        const rolesServiceOptions: ClientOptions = {
          transport: Transport.TCP,
          options: {
            host: configService.get('roleService').host,
            port: configService.get('roleService').port,
          },
        };
        return ClientProxyFactory.create(rolesServiceOptions);
      },
      inject: [ConfigService],
    },
  ],
})
export class GatewayModule {}
