import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CallbackDto {
  @ApiProperty({ example: '12345678' })
  @IsString()
  authorizationCode: string;
}

export type RequestUser = {
  userId: string;
  permissions: PermissionItem[];
};

export type PermissionItem = {
  permission: string;
} & ({ entityId: string } | { global: true });
