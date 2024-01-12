import {
  ClientOptions,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

import { ClientProxyOptions, ConfigService } from '../config.service';

export function createClientProxy(
  provide: string,
  configName: keyof ClientProxyOptions,
) {
  return {
    provide,
    useFactory: (configService: ConfigService) => {
      const serviceOptions: ClientOptions = {
        transport: Transport.TCP,
        options: configService.get(configName),
      };
      return ClientProxyFactory.create(serviceOptions);
    },
    inject: [ConfigService],
  };
}
