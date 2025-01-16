import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import type { CreateRecurringDto } from './shared.dto';

export class UpdatePriceTierDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  flatAmount?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumberString()
  flatAmountDecimal?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  unitAmount?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumberString()
  unitAmountDecimal?: string;

  @ApiPropertyOptional()
  upTo: 'inf' | number;
}

export class UpdatePriceDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  currency: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @ApiPropertyOptional({
    description:
      'Describes how to compute the price per period. Either `per_unit` or `tiered`. `per_unit` indicates that the fixed amount (specified in `unit_amount` or `unit_amount_decimal`) will be charged per unit in `quantity` (for prices with `usage_type=licensed`), or per unit of total usage (for prices with `usage_type=metered`). `tiered` indicates that the unit pricing will be computed using a tiering strategy as defined using the `tiers` and `tiers_mode` attributes.',
    enum: ['per_unit', 'tiered'],
  })
  @IsOptional()
  @IsEnum(['per_unit', 'tiered'])
  billingScheme?: 'per_unit' | 'tiered';

  @ApiPropertyOptional({
    description:
      'A lookup key used to retrieve prices dynamically from a static string. This may be up to 200 characters.',
  })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  lookupKey?: string;

  @ApiPropertyOptional()
  metadata?: { [name: string]: string | number | null };

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  nickname?: string;

  @ApiPropertyOptional({
    description:
      'The recurring components of a price such as `interval` and `usage_type`.',
  })
  recurring?: CreateRecurringDto;

  @ApiPropertyOptional({
    description:
      'Specifies whether the price is considered inclusive of taxes or exclusive of taxes. One of `inclusive`, `exclusive`, or `unspecified`. Once specified as either `inclusive` or `exclusive`, it cannot be changed.',
    enum: ['exclusive', 'inclusive', 'unspecified'],
  })
  @IsOptional()
  @IsEnum(['exclusive', 'inclusive', 'unspecified'])
  taxBehavior?: 'exclusive' | 'inclusive' | 'unspecified';

  @ApiPropertyOptional({
    description:
      'Defines if the tiering price should be `graduated` or `volume` based. In `volume`-based tiering, the maximum quantity within a period determines the per unit price, in `graduated` tiering pricing can successively change as the quantity grows.',
    enum: ['graduated', 'volume'],
  })
  @IsOptional()
  @IsEnum(['graduated', 'volume'])
  tiersMode?: 'graduated' | 'volume';

  @ApiPropertyOptional({
    description:
      ' If set to true, will atomically remove the lookup key from the existing price, and assign it to this price.',
  })
  transferLookupKey?: boolean;
}
