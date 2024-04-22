import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from "@nestjs/common";
import { FinancialTransactionsService } from "./financial-transactions.service";
import { CreateFinancialTransactionDto } from "./dto/create-financial-transaction.dto";
import { UpdateFinancialTransactionDto } from "./dto/update-financial-transaction.dto";
import { FinancialTransaction } from "./entities/financial-transaction.entity";
import { AuthGuard } from "@nestjs/passport";
import RequestWithUser from "src/Request/requestwithuser.interface";

@Controller("financial-transactions")
export class FinancialTransactionsController {
  constructor(
    private readonly financialTransactionsService: FinancialTransactionsService
  ) {}

  @Post("/create")
  @UseGuards(AuthGuard("jwt"))
  async create(
    @Body("amount") amount: number,
    @Body("currency") currency: string,
    @Body("user_id") user_id: number, 
    @Body("charity_id") charity_id: number,
    @Req() request: RequestWithUser
  ): Promise<{ message: FinancialTransaction }> {
    try {
      const transaction = await this.financialTransactionsService.create(
        amount,
        currency,
        user_id,
        charity_id
      );
      return { message: transaction };
    } catch (error) {
      return error.message;
    }
  }

  @Get("user-transactions")
  @UseGuards(AuthGuard("jwt"))
  async getTransactionsByUserId(
    @Req() request: RequestWithUser,
  ): Promise<FinancialTransaction[]> {
    try {
      return await this.financialTransactionsService.getTransactionsByUserId(
        request.user.userId
      );
    } catch (error) {
      console.log(request.user.userId);
      console.log(error.message);
      return error.message;
    }
  }
  @Get()
  findAll() {
    return this.financialTransactionsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.financialTransactionsService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateFinancialTransactionDto: UpdateFinancialTransactionDto
  ) {
    return this.financialTransactionsService.update(
      +id,
      updateFinancialTransactionDto
    );
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.financialTransactionsService.remove(+id);
  }
}
