import { Module } from '@nestjs/common';
import { PrismaModule } from '@szikra-backend-nx/prisma';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
