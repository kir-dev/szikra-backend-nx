import { Module } from '@nestjs/common';
import { PrismaModule } from '@szikra-backend-nx/prisma';

import { MemberController } from './member.controller';
import { MemberService } from './member.service';

@Module({
  imports: [PrismaModule],
  controllers: [MemberController],
  providers: [MemberService],
})
export class MemberModule {}
