import { Injectable } from "@nestjs/common";
import Stripe from "stripe";
import { ConfigService } from "@nestjs/config";
import { FinancialTransactionsService } from "src/financial-transactions/financial-transactions.service"; // Adjust the path as needed
import { CreateFinancialTransactionDto } from "src/financial-transactions/dto/create-financial-transaction.dto"; // Adjust the path as needed

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(
    private configService: ConfigService,
    private readonly financialTransactionsService: FinancialTransactionsService // Inject FinancialTransactionsService
  ) {
    const stripeApiKey = this.configService.get("STRIPE_SECRET_KEY");
    if (!stripeApiKey) {
      throw new Error("Stripe API key not found in environment variables.");
    }
    this.stripe = new Stripe(stripeApiKey, {
      apiVersion: "2024-04-10",
    });
  }

  async createPaymentIntent(
    amount: number,
    user_id: number,
    currency: string,
    charity_id:number,
  ): Promise<Stripe.PaymentIntent> {
    try {
      console.log(amount, currency);
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount,
        currency,
      });
      console.log(paymentIntent);
      const charityPayment = await this.financialTransactionsService.create(
        amount, currency,
        user_id,
        charity_id,
      );
      await this.financialTransactionsService.save(charityPayment);
      console.log(charityPayment);
      return paymentIntent;
    } catch (error) {
      console.log(error);
      throw new Error(`Failed to create payment intent: ${error.message}`);
    }
  }
}
