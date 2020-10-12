import { Injectable } from '@nestjs/common';
import { Product } from 'modules/database/models/product';

@Injectable()
export class ProductService {
  public async getProducts(): Promise<Product[]> {
    return Product.query().select();
  }

  public async getProductById(id: number): Promise<Product> {
    return Product.query().findById(id);
  }
}
