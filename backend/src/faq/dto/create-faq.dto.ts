import { IsNotEmpty, IsString } from "class-validator";

export class createFaqDto {
  @IsNotEmpty()
  @IsString()
  question: string;
  
  @IsNotEmpty()
  @IsString()
  answer: string;
}
