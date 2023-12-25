import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  AuthorizationMessagePatterns,
  ServiceNames,
} from '@szikra-backend-nx/service-constants';
import { LoginDto } from '@szikra-backend-nx/types';
import { firstValueFrom } from 'rxjs';

@Controller()
export class GatewayController {
  constructor(
    @Inject(ServiceNames.AUTHORIZATION)
    private readonly authorizationService: ClientProxy,
  ) {}

  @Post('login')
  async login(@Body() body: LoginDto): Promise<string> {
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
