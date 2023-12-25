import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthGuard, Roles } from '@szikra-backend-nx/auth-guard';
import { firstValueFrom } from 'rxjs';

@Controller()
export class GatewayController {
  constructor(
    @Inject('MEMBER_SERVICE') private readonly memberService: ClientProxy,
  ) {}

  @UseGuards(AuthGuard)
  @Roles(['read'])
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
