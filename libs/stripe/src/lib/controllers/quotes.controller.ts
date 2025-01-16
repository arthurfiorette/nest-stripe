import {
  Body,
  Controller,
  Param,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { type SaveQuoteDto, SaveQuoteResponse } from '../dto';
import { StripeAuthGuard } from '../stripe-auth.guard';
import type { StripeService } from '../stripe.service';

@ApiBearerAuth()
@ApiTags('Stripe: Quote')
@UseGuards(StripeAuthGuard)
@UsePipes(new ValidationPipe())
@Controller('stripe/quote')
export class QuotesController {
  constructor(private stripeService: StripeService) {}

  @ApiResponse({ type: SaveQuoteResponse })
  @Post('create')
  createQuote(@Body() dto: SaveQuoteDto): Promise<SaveQuoteResponse> {
    return this.stripeService.createQuote(dto);
  }

  @ApiResponse({ type: SaveQuoteResponse })
  @ApiTags('Stripe: Quote')
  @Post(':quoteId/update')
  updateQuote(
    @Param('quoteId') quoteId: string,
    @Body() dto: SaveQuoteDto
  ): Promise<SaveQuoteResponse> {
    return this.stripeService.updateQuote(quoteId, dto);
  }

  @ApiResponse({ type: SaveQuoteResponse })
  @ApiTags('Stripe: Quote')
  @Post(':quoteId/accept')
  acceptQuote(@Param('quoteId') quoteId: string): Promise<SaveQuoteResponse> {
    return this.stripeService.acceptQuote(quoteId);
  }

  @ApiResponse({ type: SaveQuoteResponse })
  @ApiTags('Stripe: Quote')
  @Post(':quoteId/cancel')
  cancelQuote(@Param('quoteId') quoteId: string): Promise<SaveQuoteResponse> {
    return this.stripeService.cancelQuote(quoteId);
  }

  @ApiResponse({ type: SaveQuoteResponse })
  @ApiTags('Stripe: Quote')
  @ApiQuery({
    name: 'expiredAt',
    type: 'number',
    required: false,
  })
  @Post(':quoteId/finalize')
  finalizeQuote(
    @Param('quoteId') quoteId: string,
    @Query('expiredAt') expiredAt?: number
  ): Promise<SaveQuoteResponse> {
    return this.stripeService.finalizeQuote(quoteId, expiredAt);
  }
}
