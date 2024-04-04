// import { PartialType } from '@nestjs/mapped-types';
// import { CreatePostDto } from './create-post.dto';
import { IsOptional, IsString, MaxLength, IsBoolean } from 'class-validator';

export class UpdatePostDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  quantity?: string;

  @IsOptional()
  @IsBoolean()
  urgent?: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  status?: string;
}
