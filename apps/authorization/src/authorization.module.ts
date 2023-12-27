import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '@szikra-backend-nx/prisma';

import { AuthorizationController } from './authorization.controller';
import { AuthorizationService } from './authorization.service';
import { ConfigService } from './config.service';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      global: true,
      secret: 'secret',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthorizationController],
  providers: [ConfigService, AuthorizationService],
})
export class AuthorizationModule {}
