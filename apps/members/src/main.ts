import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { ConfigService } from './config.service';
import { MemberModule } from './member.module';

async function bootstrap() {
  const config = new ConfigService();
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    MemberModule,
    {
      transport: Transport.TCP,
      options: {
        host: config.get('host'),
        port: config.get('port'),
      },
    },
  );
  await app.listen();
  Logger.log(
    `Member module is listening on: ${config.get('host')}:${config.get(
      'port',
    )}`,
    MemberModule.name,
  );
}
bootstrap();
