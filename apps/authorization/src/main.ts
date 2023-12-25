import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AuthorizationModule } from './authorization.module';
import { ConfigService } from './config.service';

async function bootstrap() {
  const config = new ConfigService();
  const app = await NestFactory.create(AuthorizationModule);
  await app.listen(config.get('port'));
  Logger.log(
    `Gateway is running on: ${await app.getUrl()}`,
    AuthorizationModule.name,
  );
}
bootstrap();
