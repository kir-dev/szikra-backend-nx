import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { MembersMessagePatterns } from '@szikra-backend-nx/service-constants';

import { MemberService } from './member.service';

@Controller()
export class MemberController {
  constructor(private readonly appService: MemberService) {}

  @MessagePattern(MembersMessagePatterns.GET_MEMBERS)
  getMembers(): string {
    return this.appService.getHello();
  }
}
