import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthGuard, Roles } from '@szikra-backend-nx/auth-guard';
import { firstValueFrom } from 'rxjs';

@Controller()
export class GatewayController {
  constructor(
    @Inject('MEMBER_SERVICE') private readonly memberService: ClientProxy,
    @Inject('AUTHORIZATION_SERVICE')
    private readonly authorizationService: ClientProxy,
  ) {}

  @UseGuards(AuthGuard)
  @Roles(['read'])
  @Get('member')
  async getHello(@Req() req: Request & { user: unknown }): Promise<string> {
    console.log(req.user);
    return firstValueFrom(
      this.memberService.send<string>('member_get_hello', req.user),
    );
  }

  @Post('login')
  async login(@Body() body: unknown): Promise<string> {
    return firstValueFrom(
      this.authorizationService.send<string>('authorization_login', body),
    );
  }

  @Get('health')
  async getHealth(): Promise<string> {
    return 'OK';
  }
}
