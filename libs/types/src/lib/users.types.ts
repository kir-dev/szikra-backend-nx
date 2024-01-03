import { ApiProperty } from '@nestjs/swagger';
import { User, UserRole } from '@prisma/client';
import { IsString } from 'class-validator';

import { RoleDto } from './roles.types';

export class UserDto implements User {
  @ApiProperty({ example: 'e3dc756a-0523-45bc-8a56-77e93ba71450' })
  id: string;

  @ApiProperty({ example: 'e3dc756a-0523-45bc-8a56-77e93ba71450' })
  externalId: string;

  @ApiProperty({ example: 'Simonyi Károly' })
  name: string;

  @ApiProperty({ example: 'karoly@simonyi.bme.hu' })
  email: string;

  @ApiProperty({ example: 'e3dc756a-0523-45bc-8a56-77e93ba71450' })
  memberId: string | null;

  @ApiProperty({ example: new Date() })
  createdAt: Date;

  @ApiProperty({ example: new Date() })
  updatedAt: Date;
}

export class UpdateUserDto
  implements
    Partial<Omit<UserDto, 'id' | 'createdAt' | 'updatedAt' | 'externalId'>>
{
  @ApiProperty({ example: 'Simonyi Károly' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'karoly@simonyi.bme.hu' })
  @IsString()
  email: string;
}

export class UserRoleDto implements UserRole {
  @ApiProperty({ example: 'e3dc756a-0523-45bc-8a56-77e93ba71450' })
  id: string;

  @ApiProperty({ example: 'e3dc756a-0523-45bc-8a56-77e93ba71450' })
  userId: string;

  @ApiProperty({ example: 'e3dc756a-0523-45bc-8a56-77e93ba71450' })
  roleId: string;

  @ApiProperty({ type: RoleDto })
  role: RoleDto;

  @ApiProperty({ example: new Date() })
  createdAt: Date;

  @ApiProperty({ example: new Date() })
  updatedAt: Date;
}

export class UserWithRolesDto extends UserDto {
  @ApiProperty({ type: UserRoleDto, isArray: true })
  userRoles: UserRoleDto[];
}
