import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthorizationController } from './authorization.controller';
import { ConfigService } from './config.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'secret',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthorizationController],
  providers: [ConfigService],
})
export class AuthorizationModule {}
