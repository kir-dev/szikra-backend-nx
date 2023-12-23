import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { ConfigService } from './config.service';
import { GatewayModule } from './gateway.module';

async function bootstrap() {
  const config = new ConfigService();
  const app = await NestFactory.create(GatewayModule);
  await app.listen(config.get('port'));
  Logger.log(
    `Gateway is running on: ${await app.getUrl()}`,
    GatewayModule.name,
  );
}
bootstrap();
