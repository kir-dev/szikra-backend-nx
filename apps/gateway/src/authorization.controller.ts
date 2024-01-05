import {
  Controller,
  Get,
  Inject,
  InternalServerErrorException,
  Query,
  Redirect,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  AuthorizationMessagePatterns,
  ServiceNames,
} from '@szikra-backend-nx/service-constants';
import { firstValueFrom } from 'rxjs';

import { ConfigService } from './config.service';

@ApiTags('authorization')
@Controller('auth')
export class AuthorizationController {
  constructor(
    @Inject(ServiceNames.AUTHORIZATION)
    private readonly authorizationService: ClientProxy,
    private readonly configService: ConfigService,
  ) {}

  @Get('login')
  @ApiOkResponse()
  @Redirect('', 302)
  async login() {
    const url = await firstValueFrom(
      this.authorizationService.send<string>(
        AuthorizationMessagePatterns.GET_LOGIN_URL,
        {},
      ),
    );
    if (!url) throw new InternalServerErrorException();
    return { url };
  }

  @Get('callback')
  @ApiOkResponse()
  @Redirect('', 302)
  async callback(@Query('code') code: string) {
    const token = await firstValueFrom(
      this.authorizationService.send<string>(
        AuthorizationMessagePatterns.HANDLE_CALLBACK,
        code,
      ),
    );
    if (!token) throw new InternalServerErrorException();
    const frontendUrl = this.configService.get('frontendUrl');
    return { url: `${frontendUrl}/?token=${token}` };
  }
}
