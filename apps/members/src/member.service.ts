import { Injectable } from '@nestjs/common';

@Injectable()
export class MemberService {
  getHello(): string {
    return 'Hello World!';
  }
}
