import {
  IsAlpha,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

/// Using validators
export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;

  @IsNotEmpty()
  @IsAlpha()
  first_name: string;

  @IsNotEmpty()
  last_name: string;

  @IsNotEmpty()
  blood_type: string;

  @IsNotEmpty()
  location: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(['Female', 'Male'])
  gender: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(['Donor', 'Receiver', 'Admin'])
  role: string;
}
