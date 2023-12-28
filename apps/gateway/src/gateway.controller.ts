import { Controller, Get } from '@nestjs/common';

@Controller()
export class GatewayController {
  @Get('health')
  async getHealth(): Promise<string> {
    return 'OK';
  }
}
