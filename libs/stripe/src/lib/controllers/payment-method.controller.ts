import {
  Body,
  Controller,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  type CreatePaymentMethodDto,
  CreatePaymentMethodResponse,
  type CustomerResponse,
} from '../dto';
import { StripeAuthGuard } from '../stripe-auth.guard';
import type { StripeService } from '../stripe.service';

@ApiBearerAuth()
@ApiTags('Stripe: Payment Method')
@UseGuards(StripeAuthGuard)
@UsePipes(new ValidationPipe())
@Controller('stripe/payment-method')
export class PaymentMethodController {
  constructor(private stripeService: StripeService) {}

  @ApiResponse({ type: CreatePaymentMethodResponse })
  @Post('create')
  createPaymentMethod(
    @Body() dto: CreatePaymentMethodDto
  ): Promise<CreatePaymentMethodResponse> {
    return this.stripeService.createPaymentMethod(dto);
  }

  @ApiTags('Stripe: Payment Method')
  @Post(':paymentMethodId/detach')
  detachPaymentMethod(
    @Param('paymentMethodId') paymentMethodId: string
  ): Promise<CustomerResponse> {
    return this.stripeService.detachPaymentMethod(paymentMethodId);
  }
}
