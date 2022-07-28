import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { PaymentItemDto } from './payment-item.dto';

export class CreateCheckoutSessionDto {
  @ApiProperty({ type: PaymentItemDto, isArray: true })
  @IsNotEmpty()
  items: PaymentItemDto[];
  @ApiPropertyOptional()
  metadata?: { [name: string]: string | number | null };
  @ApiPropertyOptional({
    enum: ['payment', 'setup', 'subscription'],
    default: 'payment'
  })
  mode: 'payment' | 'setup' | 'subscription';
  @ApiPropertyOptional()
  currency?: string;
  @ApiPropertyOptional()
  customer?: string;
}
