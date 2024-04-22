import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateFinancialTransactionDto {
  @IsNotEmpty()
  user_id: number;

  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  currency: string;

  @IsNotEmpty()
  charity_id: number;
}
