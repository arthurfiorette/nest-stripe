import {
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CheckoutSessionResponse, type CreateCheckoutSessionDto } from '../dto';
import { StripeAuthGuard } from '../stripe-auth.guard';
import type { StripeService } from '../stripe.service';

@ApiBearerAuth()
@ApiTags('Stripe: Checkout Session')
@UseGuards(StripeAuthGuard)
@UsePipes(new ValidationPipe())
@Controller('stripe/checkout-session')
export class CheckoutSessionController {
  constructor(private stripeService: StripeService) {}

  @ApiResponse({ type: CheckoutSessionResponse })
  @Post('create')
  createCheckoutSession(
    @Body() dto: CreateCheckoutSessionDto
  ): Promise<CheckoutSessionResponse> {
    return this.stripeService.createCheckoutSession(dto);
  }
}
