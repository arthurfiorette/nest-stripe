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
import type Stripe from 'stripe';
import {
  BaseDataResponse,
  type CreateUsageRecordDto,
  CreateUsageRecordResponse,
  type ListRequestParamsDto,
} from '../dto';
import { StripeAuthGuard } from '../stripe-auth.guard';
import type { StripeService } from '../stripe.service';

@ApiBearerAuth()
@ApiTags('Stripe: Usage Record')
@UseGuards(StripeAuthGuard)
@UsePipes(new ValidationPipe())
@Controller('stripe/usage-record')
export class UsageRecordController {
  constructor(private stripeService: StripeService) {}

  @ApiResponse({ type: CreateUsageRecordResponse })
  @Post('create/:subscriptionItemId')
  createUsageRecord(
    @Param('subscriptionItemId') subscriptionItemId: string,
    @Body() dto: CreateUsageRecordDto
  ): Promise<CreateUsageRecordResponse> {
    return this.stripeService.createUsageRecord(subscriptionItemId, dto);
  }

  @ApiResponse({ type: BaseDataResponse })
  @Get(':subscriptionItemId/usage-record-summaries')
  listUsageRecordSummaries(
    @Param('subscriptionItemId') subscriptionItemId: string,
    @Query() params?: ListRequestParamsDto
  ): Promise<BaseDataResponse<Stripe.UsageRecordSummary[]>> {
    return this.stripeService.listUsageRecordSummaries(
      subscriptionItemId,
      params
    );
  }
}
