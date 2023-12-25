import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: '12345678' })
  @IsString()
  userId: string;
}

export type RequestUser = {
  userId: string;
  permissions: string[];
};
