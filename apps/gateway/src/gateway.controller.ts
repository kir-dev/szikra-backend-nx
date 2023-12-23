import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller()
export class GatewayController {
  constructor(
    @Inject('MEMBER_SERVICE') private readonly memberService: ClientProxy,
  ) {}

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
