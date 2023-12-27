import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: '12345678' })
  @IsString()
  userId: string;
}

export class RegisterDto {
  @ApiProperty({ example: 'Example Name' })
  @IsString()
  name: string;

  @ApiProperty({ example: '12345678' })
  @IsString()
  externalId: string;

  @ApiProperty({ example: 'name@example.com' })
  @IsString()
  @IsEmail()
  email: string;
}

export type RequestUser = {
  userId: string;
  permissions: PermissionItem[];
};

export type PermissionItem = {
  permission: string;
} & ({ entityId: string } | { global: true });
