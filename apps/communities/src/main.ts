import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { CommunitiesModule } from './communities.module';
import { ConfigService } from './config.service';

async function bootstrap() {
  const config = new ConfigService();
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CommunitiesModule,
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
    `Module is listening on: ${config.get('host')}:${config.get('port')}`,
    CommunitiesModule.name,
  );
}
bootstrap();
