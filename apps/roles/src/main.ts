import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { ConfigService } from './config.service';
import { RolesModule } from './roles.module';

async function bootstrap() {
  const config = new ConfigService();
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    RolesModule,
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
    RolesModule.name,
  );
}
bootstrap();
