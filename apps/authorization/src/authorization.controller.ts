import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthorizationMessagePatterns } from '@szikra-backend-nx/service-constants';
import { LoginDto, RegisterDto } from '@szikra-backend-nx/types';

import { AuthorizationService } from './authorization.service';

@Controller()
export class AuthorizationController {
  constructor(private readonly authorizationService: AuthorizationService) {}

  @MessagePattern(AuthorizationMessagePatterns.LOGIN)
  async login(data: LoginDto): Promise<string | null> {
    return this.authorizationService.createJwtToken(data.userId);
  }

  @MessagePattern(AuthorizationMessagePatterns.REGISTER)
  async register(data: RegisterDto): Promise<string | null> {
    const user = await this.authorizationService.createUser(data);
    return this.authorizationService.createJwtToken(user.id);
  }

  @Get('health')
  async getHealth(): Promise<string> {
    return 'OK';
  }
}
