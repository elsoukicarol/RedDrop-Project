import { PartialType } from '@nestjs/mapped-types';
import { CreateCharityDto } from './create-charity.dto';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateCharityDto extends PartialType(CreateCharityDto) {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  charity_name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  picture?: string;
}
