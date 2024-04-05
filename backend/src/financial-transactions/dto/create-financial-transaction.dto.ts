import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateFinancialTransactionDto {
  @IsString()
  @IsNotEmpty()
  user_id: number;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  charity_id: number;
}
