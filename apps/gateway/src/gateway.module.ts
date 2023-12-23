import { Module } from '@nestjs/common';
import {
  ClientOptions,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

import { ConfigService } from './config.service';
import { GatewayController } from './gateway.controller';

@Module({
  imports: [],
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
  ],
})
export class GatewayModule {}
