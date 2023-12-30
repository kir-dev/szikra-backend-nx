import { ApiProperty } from '@nestjs/swagger';
import { Role, RolePermission } from '@prisma/client';
import { GlobalPermissions } from '@szikra-backend-nx/permissions';
import { IsBoolean, IsDate, IsOptional, IsString } from 'class-validator';

export class RoleDto implements Role {
  @ApiProperty({ example: 'e3dc756a-0523-45bc-8a56-77e93ba71450' })
  @IsString()
  id: string;

  @ApiProperty({ example: 'Admin' })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'e3dc756a-0523-45bc-8a56-77e93ba71450',
    required: false,
  })
  @IsString()
  @IsOptional()
  communityId: string | null;

  @ApiProperty({ example: false })
  @IsBoolean()
  global: boolean;

  @ApiProperty({ example: new Date() })
  @IsDate()
  createdAt: Date;

  @ApiProperty({ example: new Date() })
  @IsDate()
  updatedAt: Date;
}

export class PermissionDto implements RolePermission {
  @ApiProperty({ example: 'e3dc756a-0523-45bc-8a56-77e93ba71450' })
  @IsString()
  id: string;

  @ApiProperty({ example: GlobalPermissions.SUPERUSER })
  @IsString()
  permission: string;

  @ApiProperty({ example: 'e3dc756a-0523-45bc-8a56-77e93ba71450' })
  @IsString()
  roleId: string;

  @ApiProperty({ example: new Date() })
  @IsDate()
  createdAt: Date;

  @ApiProperty({ example: new Date() })
  @IsDate()
  updatedAt: Date;
}

export class RoleWithPermissionsDto extends RoleDto {
  @ApiProperty({ type: [PermissionDto] })
  permissions: PermissionDto[];
}

export class CreateRoleDto
  implements
    Omit<Role, 'id' | 'createdAt' | 'updatedAt' | 'communityId' | 'global'>
{
  @ApiProperty({ example: 'Admin' })
  @IsString()
  name: string;
}

export class UpdateRoleDto implements CreateRoleDto {
  @ApiProperty({ example: 'Admin' })
  @IsString()
  name: string;
}

export class AssignPermissionDto {
  @ApiProperty({ example: GlobalPermissions.SUPERUSER })
  @IsString()
  permission: string;
}

export class AssignUserDto {
  @ApiProperty({ example: 'e3dc756a-0523-45bc-8a56-77e93ba71450' })
  @IsString()
  userId: string;
}
