import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  BaseDataResponse,
  type CreatePriceDto,
  type ListRequestParamsDto,
  type PriceDto,
  PriceResponse,
  type UpdatePriceDto,
} from '../dto';
import { StripeAuthGuard } from '../stripe-auth.guard';
import type { StripeService } from '../stripe.service';

@ApiBearerAuth()
@ApiTags('Stripe: Price')
@UseGuards(StripeAuthGuard)
@UsePipes(new ValidationPipe())
@Controller('stripe/price')
export class PriceController {
  constructor(private stripeService: StripeService) {}

  @ApiResponse({ type: PriceResponse })
  @Post('create')
  createPrice(@Body() dto: CreatePriceDto): Promise<PriceResponse> {
    return this.stripeService.createPrice(dto);
  }

  @ApiResponse({ type: PriceResponse })
  @Post(':priceId/update')
  updatePrice(
    @Param('priceId') priceId: string,
    @Body() dto: UpdatePriceDto
  ): Promise<PriceResponse> {
    return this.stripeService.updatePrice(priceId, dto);
  }

  @ApiResponse({ type: BaseDataResponse })
  @Get('')
  priceList(
    @Query() params?: ListRequestParamsDto
  ): Promise<BaseDataResponse<PriceDto[]>> {
    return this.stripeService.getPriceList(undefined, params);
  }

  @ApiResponse({ type: BaseDataResponse<PriceDto> })
  @Get(':priceId')
  priceById(
    @Param('priceId') priceId: string
  ): Promise<BaseDataResponse<PriceDto>> {
    return this.stripeService.getPriceById(priceId);
  }
}
