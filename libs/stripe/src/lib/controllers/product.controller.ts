import {
  Body,
  Controller,
  Delete,
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
  type CreateProductDto,
  type ListRequestParamsDto,
  type ProductDto,
  ProductResponse,
  type UpdateProductDto,
} from '../dto';
import { StripeAuthGuard } from '../stripe-auth.guard';
import type { StripeService } from '../stripe.service';

@ApiBearerAuth()
@ApiTags('Stripe: Product')
@UseGuards(StripeAuthGuard)
@UsePipes(new ValidationPipe())
@Controller('stripe/product')
export class ProductController {
  constructor(private stripeService: StripeService) {}

  @ApiResponse({ type: ProductResponse })
  @Post('create')
  createProduct(@Body() dto: CreateProductDto): Promise<ProductResponse> {
    return this.stripeService.createProduct(dto);
  }

  @ApiResponse({ type: ProductResponse })
  @Post(':productId/update')
  updateProduct(
    @Param('productId') productId: string,
    @Body() dto: UpdateProductDto
  ): Promise<ProductResponse> {
    return this.stripeService.updateProduct(productId, dto);
  }

  @ApiResponse({ type: ProductResponse })
  @Delete(':productId/delete')
  deleteProduct(
    @Param('productId') productId: string
  ): Promise<ProductResponse> {
    return this.stripeService.deleteProduct(productId);
  }

  @ApiResponse({ type: BaseDataResponse })
  @Get('')
  productList(
    @Query() params?: ListRequestParamsDto
  ): Promise<BaseDataResponse<ProductDto[]>> {
    return this.stripeService.getProductList(params);
  }

  @ApiResponse({ type: BaseDataResponse<ProductDto> })
  @ApiTags('Stripe: Product')
  @Get(':productId')
  productById(
    @Param('productId') productId: string
  ): Promise<BaseDataResponse<ProductDto>> {
    return this.stripeService.getProductById(productId);
  }
}
