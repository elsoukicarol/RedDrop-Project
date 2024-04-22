import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
import { FinancialTransactionsModule } from 'src/financial-transactions/financial-transactions.module';

@Module({
  imports: [FinancialTransactionsModule], 
  controllers: [StripeController],
  providers: [StripeService],

})
export class StripeModule {}
