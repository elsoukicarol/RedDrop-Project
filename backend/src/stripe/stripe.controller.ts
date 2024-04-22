import {
  Body,
  Controller,
  Post,
  Req,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { StripeService } from "./stripe.service";
import { CreateFinancialTransactionDto } from "src/financial-transactions/dto/create-financial-transaction.dto";
import RequestWithUser from "src/Request/requestwithuser.interface";
@Controller("stripe")
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post("create-payment-intent")
async create(
  @Body("amount") amount: number,
  @Body("currency") currency: string,
  @Body("user_id") user_id: number, 
  @Body("charity_id") charity_id: number,
) {
  try {
    console.log("in controller: ", amount, " " ,currency);
    const paymentIntent = await this.stripeService.createPaymentIntent(
      amount,
      user_id,
      currency,
      charity_id,
    );

    return { clientSecret: paymentIntent.client_secret };
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw new HttpException(
      "Failed to create payment intent",
      HttpStatus.BAD_REQUEST
    );
  }
}
}
