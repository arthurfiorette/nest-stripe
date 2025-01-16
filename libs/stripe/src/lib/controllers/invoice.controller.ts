import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  BaseDataResponse,
  type BaseSearchInvoiceDto,
  type InvoiceDto,
  type InvoiceFinalizeInvoiceDto,
  type InvoicePreviewDto,
  InvoicePreviewResponse,
  type InvoiceVoidInvoiceDto,
} from '../dto';
import type { CreateInvoiceDto } from '../dto/create-invoice.dto';
import { StripeAuthGuard } from '../stripe-auth.guard';
import type { StripeService } from '../stripe.service';

@ApiBearerAuth()
@ApiTags('Stripe: Invoice')
@UseGuards(StripeAuthGuard)
@UsePipes(new ValidationPipe())
@Controller('stripe/invoice')
export class InvoiceController {
  constructor(private stripeService: StripeService) {}

  @ApiResponse({ type: BaseDataResponse<InvoiceDto> })
  @Get(':invoiceId')
  getInvoiceById(
    @Param('invoiceId') invoiceId: string
  ): Promise<BaseDataResponse<InvoiceDto>> {
    return this.stripeService.getInvoiceById(invoiceId);
  }

  @ApiResponse({ type: BaseDataResponse<InvoiceDto[]> })
  @Get('search/invoices')
  searchInvoices(
    @Query() params: BaseSearchInvoiceDto
  ): Promise<BaseDataResponse<InvoiceDto[]>> {
    return this.stripeService.searchInvoices(params);
  }

  @ApiResponse({ type: InvoicePreviewResponse })
  @Post('retrieve-upcoming')
  retrieveUpcomingInvoice(
    @Body() dto: InvoicePreviewDto
  ): Promise<InvoicePreviewResponse> {
    return this.stripeService.upcomingInvoicePreview(dto);
  }

  @ApiResponse({ type: BaseDataResponse<InvoiceDto> })
  @Post('')
  createInvoice(
    @Body() dto: CreateInvoiceDto
  ): Promise<BaseDataResponse<InvoiceDto>> {
    return this.stripeService.createInvoice(dto);
  }

  @ApiResponse({ type: BaseDataResponse<InvoiceDto> })
  @Patch(':invoiceId/void')
  voidInvoice(
    @Param('invoiceId') invoiceId: string,
    @Body() dto: InvoiceVoidInvoiceDto
  ): Promise<BaseDataResponse<InvoiceDto>> {
    return this.stripeService.voidInvoice(invoiceId, dto);
  }

  @ApiResponse({ type: BaseDataResponse<InvoiceDto> })
  @Patch(':invoiceId/finalize')
  finalizeInvoice(
    @Param('invoiceId') invoiceId: string,
    @Body() dto: InvoiceFinalizeInvoiceDto
  ): Promise<BaseDataResponse<InvoiceDto>> {
    return this.stripeService.finalizeInvoice(invoiceId, dto);
  }

  @ApiResponse({ type: BaseDataResponse<InvoiceDto> })
  @Patch(':invoiceId/send')
  sendInvoice(
    @Param('invoiceId') invoiceId: string
  ): Promise<BaseDataResponse<InvoiceDto>> {
    return this.stripeService.sendInvoice(invoiceId);
  }
}
