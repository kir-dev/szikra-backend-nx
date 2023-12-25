import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import {
  ClientOptions,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

import { ConfigService } from './config.service';
import { GatewayController } from './gateway.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secret',
    }),
  ],
  controllers: [GatewayController],
  providers: [
    ConfigService,
    {
      provide: 'MEMBER_SERVICE',
      useFactory: (configService: ConfigService) => {
        const memberServiceOptions: ClientOptions = {
          transport: Transport.TCP,
          options: {
            host: configService.get('memberService').host,
            port: configService.get('memberService').port,
          },
        };
        return ClientProxyFactory.create(memberServiceOptions);
      },
      inject: [ConfigService],
    },
    {
      provide: 'AUTHORIZATION_SERVICE',
      useFactory: (configService: ConfigService) => {
        const authorizationServiceOptions: ClientOptions = {
          transport: Transport.TCP,
          options: {
            host: configService.get('authorizationService').host,
            port: configService.get('authorizationService').port,
          },
        };
        return ClientProxyFactory.create(authorizationServiceOptions);
      },
      inject: [ConfigService],
    },
  ],
})
export class GatewayModule {}
