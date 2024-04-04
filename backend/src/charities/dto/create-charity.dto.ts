import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateCharityDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  charity_name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  description: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  picture: string;
}
