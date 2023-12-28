import {
  Body,
  Controller,
  Inject,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOkResponse } from '@nestjs/swagger';
import {
  AuthorizationMessagePatterns,
  ServiceNames,
} from '@szikra-backend-nx/service-constants';
import { LoginDto } from '@szikra-backend-nx/types';
import { firstValueFrom } from 'rxjs';

@Controller('auth')
export class AuthorizationController {
  constructor(
    @Inject(ServiceNames.AUTHORIZATION)
    private readonly authorizationService: ClientProxy,
  ) {}

  @Post('login')
  @ApiOkResponse({ type: String })
  async login(@Body() body: LoginDto): Promise<string> {
    const token = await firstValueFrom(
      this.authorizationService.send<string | null>(
        AuthorizationMessagePatterns.LOGIN,
        body,
      ),
    );
    if (!token) throw new UnauthorizedException();
    return token;
  }
}
