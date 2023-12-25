import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { AuthGuard } from './auth.guard';
import { Roles } from './roles.decorator';

@Controller()
export class GatewayController {
  constructor(
    @Inject('MEMBER_SERVICE') private readonly memberService: ClientProxy,
  ) {}

  @UseGuards(AuthGuard)
  @Roles(['delete'])
  @Get('member')
  async getHello(): Promise<string> {
    return firstValueFrom(
      this.memberService.send<string>('member_get_hello', {}),
    );
  }

  @Get('health')
  async getHealth(): Promise<string> {
    return 'OK';
  }
}
