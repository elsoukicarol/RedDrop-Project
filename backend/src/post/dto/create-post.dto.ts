import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/user/entities/user.entity';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  blood_type: string;

  @IsString()
  @IsNotEmpty()
  quantity: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsNotEmpty()
  urgent: boolean;

  @IsNotEmpty()
  @IsString()
  @IsEnum(['Open', 'Closed'])
  status: string;

  user_id: User;
}
