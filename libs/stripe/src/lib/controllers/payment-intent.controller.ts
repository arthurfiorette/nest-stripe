import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  BaseDataResponse,
  type CreatePaymentIntentDto,
  type PaymentIntentDto,
  PaymentIntentResponse,
} from '../dto';
import { StripeAuthGuard } from '../stripe-auth.guard';
import type { StripeService } from '../stripe.service';

@ApiBearerAuth()
@ApiTags('Stripe: Payment Intent')
@UseGuards(StripeAuthGuard)
@UsePipes(new ValidationPipe())
@Controller('stripe/payment-intent')
export class PaymentIntentController {
  constructor(private stripeService: StripeService) {}

  @ApiResponse({ type: PaymentIntentResponse })
  @Post('create')
  createPaymentIntent(
    @Body() dto: CreatePaymentIntentDto
  ): Promise<PaymentIntentResponse> {
    return this.stripeService.createPaymentIntent(dto);
  }

  @ApiResponse({ type: BaseDataResponse })
  @Get(':paymentIntentId')
  getPaymentIntentById(
    @Param('paymentIntentId') paymentIntentId: string
  ): Promise<BaseDataResponse<PaymentIntentDto>> {
    return this.stripeService.getPaymentIntentById(paymentIntentId);
  }
}
