import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type Stripe from 'stripe';
import { BaseDto } from '../base.dto';
import type { RecurringDto } from '../shared.dto';
import type { ProductDto } from './product.dto';

export class PriceTierDto {
  @ApiProperty()
  flatAmount: number | null;

  @ApiProperty()
  flatAmountDecimal: string | null;

  @ApiProperty()
  unitAmount: number | null;

  @ApiProperty()
  unitAmountDecimal: string | null;

  @ApiProperty()
  upTo: number | null;
}

export class PriceDto extends BaseDto {
  @ApiProperty({ enum: ['per_unit', 'tiered'] })
  billingScheme: 'per_unit' | 'tiered';

  @ApiProperty()
  currency: string;

  @ApiProperty()
  lookupKey: string | null;

  @ApiProperty()
  nickname: string | null;

  @ApiProperty()
  product: string | ProductDto;

  @ApiProperty()
  recurring: RecurringDto | null;

  @ApiProperty({ enum: ['exclusive', 'inclusive', 'unspecified'] })
  taxBehavior: 'exclusive' | 'inclusive' | 'unspecified' | null;

  @ApiPropertyOptional({ isArray: true, type: PriceTierDto })
  tiers?: Array<PriceTierDto>;

  @ApiProperty({ enum: ['graduated', 'volume'] })
  tiersMode: 'graduated' | 'volume' | null;

  @ApiProperty()
  transformQuantity: Stripe.Price.TransformQuantity | null;

  @ApiProperty({ enum: ['one_tim', 'recurring'] })
  type: 'one_time' | 'recurring' | null;

  @ApiProperty()
  unitAmount: number | null;

  @ApiProperty()
  unitAmountDecimal: string | null;
}
