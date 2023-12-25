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
import {
  AuthorizationMessagePatterns,
  MembersMessagePatterns,
  ServiceNames,
} from '@szikra-backend-nx/service-constants';
import { firstValueFrom } from 'rxjs';

@Controller()
export class GatewayController {
  constructor(
    @Inject(ServiceNames.MEMBERS) private readonly memberService: ClientProxy,
    @Inject(ServiceNames.AUTHORIZATION)
    private readonly authorizationService: ClientProxy,
  ) {}

  @UseGuards(AuthGuard)
  @Roles(['read'])
  @Get('member')
  async getHello(@Req() req: Request & { user: unknown }): Promise<string> {
    return firstValueFrom(
      this.memberService.send<string>(
        MembersMessagePatterns.GET_MEMBERS,
        req.user,
      ),
    );
  }

  @Post('login')
  async login(@Body() body: unknown): Promise<string> {
    return firstValueFrom(
      this.authorizationService.send<string>(
        AuthorizationMessagePatterns.LOGIN,
        body,
      ),
    );
  }

  @Get('health')
  async getHealth(): Promise<string> {
    return 'OK';
  }
}
