import { Module } from '@nestjs/common';
import { PrismaModule } from '@szikra-backend-nx/prisma';

import { CommunityMemberController } from './community-member.controller';
import { CommunityMemberService } from './community-member.service';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';

@Module({
  imports: [PrismaModule],
  controllers: [MemberController, CommunityMemberController],
  providers: [MemberService, CommunityMemberService],
})
export class MemberModule {}
