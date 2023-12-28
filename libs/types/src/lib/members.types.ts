import { ApiProperty } from '@nestjs/swagger';
import { Member } from '@prisma/client';
import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';

enum MemberStatus {
  NEWBIE = 'NEWBIE',
  ACTIVE = 'ACTIVE',
  PASSIVE = 'PASSIVE',
  DELETED = 'DELETED',
  ARCHIVED = 'ARCHIVED',
  RETIRED = 'RETIRED',
}

export class MemberDto implements Member {
  @ApiProperty({ example: 'e3dc756a-0523-45bc-8a56-77e93ba71450' })
  @IsString()
  id: string;

  @ApiProperty({ example: 'Károly' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Simonyi' })
  @IsString()
  lastName: string;

  @ApiProperty({ example: 'Karcsi', required: false })
  @IsString()
  @IsOptional()
  nickName: string | null;

  @ApiProperty({ example: 'karoly@simonyi,bme.hu' })
  @IsString()
  internalEmail: string;

  @ApiProperty({ example: 'karoly@simonyi.hu', required: false })
  @IsString()
  @IsOptional()
  externalEmail: string | null;

  @ApiProperty({ example: 'Budapest', required: false })
  @IsString()
  @IsOptional()
  address: string | null;

  @ApiProperty({ example: '+36301234567', required: false })
  @IsString()
  @IsOptional()
  phone: string | null;

  @ApiProperty({ example: '1320', required: false })
  @IsString()
  @IsOptional()
  room: string | null;

  @ApiProperty({ example: MemberStatus.ACTIVE })
  status: keyof typeof MemberStatus;

  @ApiProperty({ example: new Date() })
  @IsDate()
  createdAt: Date;

  @ApiProperty({ example: new Date() })
  @IsDate()
  updatedAt: Date;
}

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

  @ApiProperty({
    example: 'karoly@simonyi.hu',
    required: false,
  })
  @IsString()
  @IsOptional()
  externalEmail: string | null;

  @ApiProperty({ example: '+36301234567' })
  @IsString()
  phone: string;

  @ApiProperty({ example: 'Budapest', required: false })
  @IsString()
  @IsOptional()
  address: string | null;

  @ApiProperty({ example: 'Karcsi', required: false })
  @IsString()
  @IsOptional()
  nickName: string | null;

  @ApiProperty({ example: '1320', required: false })
  @IsString()
  @IsOptional()
  room: string | null;

  @ApiProperty({ example: MemberStatus.ACTIVE })
  @IsEnum(MemberStatus)
  status: keyof typeof MemberStatus;
}

export class UpdateMemberDto
  implements Partial<Omit<Member, 'id' | 'createdAt' | 'updatedAt'>>
{
  @ApiProperty({ example: 'Károly', required: false })
  @IsString()
  @IsOptional()
  firstName: string | undefined;

  @ApiProperty({ example: 'Simonyi', required: false })
  @IsString()
  @IsOptional()
  lastName: string | undefined;

  @ApiProperty({ example: 'simonyi.karoly@simonyi.bme.hu', required: false })
  @IsString()
  @IsOptional()
  internalEmail: string | undefined;

  @ApiProperty({ example: 'karoly@simonyi.hu', required: false })
  @IsString()
  @IsOptional()
  externalEmail: string | undefined;

  @ApiProperty({ example: '+36301234567', required: false })
  @IsString()
  @IsOptional()
  phone: string | undefined;

  @ApiProperty({ example: 'Budapest', required: false })
  @IsString()
  @IsOptional()
  address: string | undefined;

  @ApiProperty({ example: 'Karcsi', required: false })
  @IsString()
  @IsOptional()
  nickName: string | undefined;

  @ApiProperty({ example: '1320', required: false })
  @IsString()
  @IsOptional()
  room: string | undefined;

  @ApiProperty({ example: MemberStatus.ACTIVE, required: false })
  @IsOptional()
  status: keyof typeof MemberStatus | undefined;
}
