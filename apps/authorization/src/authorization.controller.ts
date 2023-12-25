import { Body, Controller, Get, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AuthorizationController {
  constructor(private readonly jwtService: JwtService) {}

  @Post('login')
  async login(@Body() body: { userId: string }): Promise<string> {
    return this.jwtService.sign({
      userId: body.userId,
      permissions: ['read', 'write'],
    });
  }

  @MessagePattern({ cmd: 'get_permissions' })
  async getPermissions(): Promise<{ permissions: string[] }> {
    return { permissions: ['read', 'write'] };
  }

  @Get('health')
  async getHealth(): Promise<string> {
    return 'OK';
  }
}
