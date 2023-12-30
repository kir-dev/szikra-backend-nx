import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { ConfigService } from './config.service';
import { GatewayModule } from './gateway.module';

async function bootstrap() {
  const config = new ConfigService();
  const app = await NestFactory.create(GatewayModule);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  const swaggerConfig = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('SZIKRA Gateway')
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(config.get('port'));

  Logger.log(
    `Gateway is running on: ${await app.getUrl()}`,
    GatewayModule.name,
  );
}
bootstrap();
