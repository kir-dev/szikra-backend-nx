import { ApiProperty } from '@nestjs/swagger';
import { Community } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCommunityDto
  implements Omit<Community, 'id' | 'createdAt' | 'updatedAt'>
{
  @ApiProperty({ example: 'Simonyi Károly Szakkollégium' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'info@simonyi.bme.hu' })
  @IsString()
  @IsEmail()
  @IsOptional()
  email: string | null;

  @ApiProperty({ example: 'Lorem ipsum dolor sit amet.' })
  @IsString()
  @IsOptional()
  description: string | null;

  @ApiProperty({ example: '1320' })
  @IsString()
  @IsOptional()
  room: string | null;
}

export class UpdateCommunityDto
  implements Partial<Omit<Community, 'id' | 'createdAt' | 'updatedAt'>>
{
  @ApiProperty({ example: 'Simonyi Károly Szakkollégium' })
  @IsString()
  @IsOptional()
  name: string | undefined;

  @ApiProperty({ example: 'info@simonyi.bme.hu' })
  @IsString()
  @IsEmail()
  @IsOptional()
  email: string | undefined;

  @ApiProperty({ example: 'Lorem ipsum dolor sit amet.' })
  @IsString()
  @IsOptional()
  description: string | undefined;

  @ApiProperty({ example: '1320' })
  @IsString()
  @IsOptional()
  room: string | undefined;
}
