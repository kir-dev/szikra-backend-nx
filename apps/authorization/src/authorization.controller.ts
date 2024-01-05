import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthorizationMessagePatterns } from '@szikra-backend-nx/service-constants';

import { AuthorizationService } from './authorization.service';

@Controller()
export class AuthorizationController {
  constructor(private readonly authorizationService: AuthorizationService) {}

  @MessagePattern(AuthorizationMessagePatterns.GET_LOGIN_URL)
  login(): string {
    return this.authorizationService.getLoginUrl();
  }

  @MessagePattern(AuthorizationMessagePatterns.HANDLE_CALLBACK)
  async handleCallback(code: string): Promise<string> {
    return this.authorizationService.handleCallback(code);
  }

  @Get('health')
  async getHealth(): Promise<string> {
    return 'OK';
  }
}
