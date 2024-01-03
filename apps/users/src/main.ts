import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { ConfigService } from './config.service';
import { UsersModule } from './users.module';

async function bootstrap() {
  const config = new ConfigService();
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UsersModule,
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
    UsersModule.name,
  );
}
bootstrap();
