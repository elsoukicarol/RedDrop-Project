import { Module } from "@nestjs/common";
import { FinancialTransactionsService } from "./financial-transactions.service";
import { FinancialTransactionsController } from "./financial-transactions.controller";
import { FinancialTransaction } from "./entities/financial-transaction.entity";
import { AuthModule } from "src/auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/user/entities/user.entity";
import { Charity } from "src/charities/entities/charity.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([FinancialTransaction, User, Charity]),
    AuthModule,
  ],
  controllers: [FinancialTransactionsController],
  providers: [FinancialTransactionsService],
  exports: [FinancialTransactionsService],
})
export class FinancialTransactionsModule {}
