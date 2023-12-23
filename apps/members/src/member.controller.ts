import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { MemberService } from './member.service';

@Controller()
export class MemberController {
  constructor(private readonly appService: MemberService) {}

  @MessagePattern('member_get_hello')
  getHello(): string {
    return this.appService.getHello();
  }
}
