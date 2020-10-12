import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';

import { Product } from 'modules/database/models/product';
import { AuthRequired } from 'modules/common/guards/token';
import { ProductService } from '../services/product.service';

@ApiTags('Product')
@Controller('/product')
@AuthRequired()
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('list')
  public productsList(): Promise<Product[]> {
    return this.productService.getProducts();
  }

  @Get(':id')
  public getProductById(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return this.productService.getProductById(id);
  }
}
