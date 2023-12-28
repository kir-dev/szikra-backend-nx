import { ApiProperty } from '@nestjs/swagger';
import { Community } from '@prisma/client';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CommunityDto implements Community {
  @ApiProperty({ example: 'e3dc756a-0523-45bc-8a56-77e93ba71450' })
  @IsString()
  id: string;

  @ApiProperty({ example: 'Simonyi Károly Szakkollégium' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Lorem ipsum dolor sit amet.', required: false })
  @IsString()
  @IsOptional()
  description: string | null;

  @ApiProperty({ example: 'community@simonyi.bme.hu', required: false })
  @IsString()
  @IsEmail()
  @IsOptional()
  email: string | null;

  @ApiProperty({ example: '1320', required: false })
  @IsString()
  @IsOptional()
  room: string | null;

  @ApiProperty({ example: new Date() })
  @IsDate()
  createdAt: Date;

  @ApiProperty({ example: new Date() })
  @IsDate()
  updatedAt: Date;
}

export class CreateCommunityDto
  implements Omit<Community, 'id' | 'createdAt' | 'updatedAt'>
{
  @ApiProperty({ example: 'Simonyi Károly Szakkollégium' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'info@simonyi.bme.hu', required: false })
  @IsString()
  @IsEmail()
  @IsOptional()
  email: string | null;

  @ApiProperty({ example: 'Lorem ipsum dolor sit amet.', required: false })
  @IsString()
  @IsOptional()
  description: string | null;

  @ApiProperty({ example: '1320', required: false })
  @IsString()
  @IsOptional()
  room: string | null;
}

export class UpdateCommunityDto
  implements Partial<Omit<Community, 'id' | 'createdAt' | 'updatedAt'>>
{
  @ApiProperty({ example: 'Simonyi Károly Szakkollégium', required: false })
  @IsString()
  @IsOptional()
  name: string | undefined;

  @ApiProperty({ example: 'info@simonyi.bme.hu', required: false })
  @IsString()
  @IsEmail()
  @IsOptional()
  email: string | undefined;

  @ApiProperty({ example: 'Lorem ipsum dolor sit amet.', required: false })
  @IsString()
  @IsOptional()
  description: string | undefined;

  @ApiProperty({ example: '1320', required: false })
  @IsString()
  @IsOptional()
  room: string | undefined;
}
