import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type Stripe from 'stripe';
import { BaseDto } from '../base.dto';
import type { PlanDto } from './plan.dto';
import type { PriceDto } from './price.dto';

export class SubscriptionItemDto extends BaseDto {
  @ApiProperty()
  billingThresholds: Stripe.SubscriptionItem.BillingThresholds | null;

  @ApiProperty()
  plan: PlanDto;

  @ApiProperty()
  price: PriceDto;

  @ApiPropertyOptional()
  quantity?: number;

  @ApiProperty()
  subscription: string;

  @ApiProperty()
  taxRates: Array<Stripe.TaxRate> | null;
}
