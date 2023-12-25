import { Controller, Get } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MessagePattern } from '@nestjs/microservices';
import { AuthorizationMessagePatterns } from '@szikra-backend-nx/service-constants';

@Controller()
export class AuthorizationController {
  constructor(private readonly jwtService: JwtService) {}

  @MessagePattern(AuthorizationMessagePatterns.LOGIN)
  async login(data: { userId: string }): Promise<string> {
    return this.jwtService.sign({
      userId: data.userId,
      permissions: ['read', 'write'],
    });
  }

  @Get('health')
  async getHealth(): Promise<string> {
    return 'OK';
  }
}
