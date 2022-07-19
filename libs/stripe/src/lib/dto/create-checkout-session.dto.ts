import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { PaymentItemDto } from './payment-item.dto';

export class CreateCheckoutSessionDto {
  @ApiProperty({ type: PaymentItemDto, isArray: true })
  @IsNotEmpty()
  items: PaymentItemDto[];
  @ApiProperty()
  metadata?: { [name: string]: string | number | null };
}