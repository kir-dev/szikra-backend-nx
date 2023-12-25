import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Member } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateMemberDto
  implements Omit<Member, 'id' | 'createdAt' | 'updatedAt'>
{
  @ApiProperty({ example: 'Károly' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Simonyi' })
  @IsString()
  lastName: string;

  @ApiProperty({ example: 'simonyi.karoly@simonyi.bme.hu' })
  @IsString()
  internalEmail: string;

  @ApiProperty({ example: 'karoly@simonyi.hu', nullable: true })
  @IsString()
  @IsOptional()
  externalEmail: string | null;

  @ApiProperty({ example: '+36301234567' })
  @IsString()
  phone: string;

  @ApiProperty({ example: 'Budapest', nullable: true })
  @IsString()
  @IsOptional()
  address: string | null;

  @ApiProperty({ example: 'Karcsi', nullable: true })
  @IsString()
  @IsOptional()
  nickName: string | null;

  @ApiProperty({ example: '1320', nullable: true })
  @IsString()
  @IsOptional()
  room: string | null;

  @ApiProperty({ example: $Enums.MemberStatus.ACTIVE })
  @IsEnum($Enums.MemberStatus)
  status: $Enums.MemberStatus;
}

export class UpdateMemberDto
  implements Partial<Omit<Member, 'id' | 'createdAt' | 'updatedAt'>>
{
  @ApiProperty({ example: 'Károly', nullable: true })
  @IsString()
  @IsOptional()
  firstName: string | undefined;

  @ApiProperty({ example: 'Simonyi', nullable: true })
  @IsString()
  @IsOptional()
  lastName: string | undefined;

  @ApiProperty({ example: 'simonyi.karoly@simonyi.bme.hu', nullable: true })
  @IsString()
  @IsOptional()
  internalEmail: string | undefined;

  @ApiProperty({ example: 'karoly@simonyi.hu', nullable: true })
  @IsString()
  @IsOptional()
  externalEmail: string | undefined;

  @ApiProperty({ example: '+36301234567', nullable: true })
  @IsString()
  @IsOptional()
  phone: string | undefined;

  @ApiProperty({ example: 'Budapest', nullable: true })
  @IsString()
  @IsOptional()
  address: string | undefined;

  @ApiProperty({ example: 'Karcsi', nullable: true })
  @IsString()
  @IsOptional()
  nickName: string | undefined;

  @ApiProperty({ example: '1320', nullable: true })
  @IsString()
  @IsOptional()
  room: string | undefined;

  @ApiProperty({ example: $Enums.MemberStatus.ACTIVE, nullable: true })
  @IsEnum($Enums.MemberStatus)
  @IsOptional()
  status: $Enums.MemberStatus | undefined;
}
