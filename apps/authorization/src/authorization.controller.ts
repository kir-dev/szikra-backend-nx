import { Controller, Get } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MessagePattern } from '@nestjs/microservices';
import { CommunitiesPermissions } from '@szikra-backend-nx/permissions';
import { AuthorizationMessagePatterns } from '@szikra-backend-nx/service-constants';
import { LoginDto, RequestUser } from '@szikra-backend-nx/types';

@Controller()
export class AuthorizationController {
  constructor(private readonly jwtService: JwtService) {}

  @MessagePattern(AuthorizationMessagePatterns.LOGIN)
  async login(data: LoginDto): Promise<string> {
    const payload: RequestUser = {
      userId: data.userId,
      permissions: [
        {
          permission: CommunitiesPermissions.READ,
          global: true,
        },
      ],
    };
    return this.jwtService.sign(payload);
  }

  @Get('health')
  async getHealth(): Promise<string> {
    return 'OK';
  }
}
