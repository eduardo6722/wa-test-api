import { Model } from 'objection';
import { ApiProperty } from '@nestjs/swagger';

import { IProduct } from '../interfaces/product';

export class Product extends Model implements IProduct {
  @ApiProperty({ type: 'integer' })
  public id: number;
  @ApiProperty({ type: 'string' })
  public description: string;
  @ApiProperty({ type: 'integer' })
  public stock: number;
  @ApiProperty({ type: 'float' })
  public price: number;
  @ApiProperty({ type: 'string', format: 'date-time' })
  public createdDate: Date;
  @ApiProperty({ type: 'string', format: 'date-time' })
  public updatedDate: Date;

  public static get tableName(): string {
    return 'Product';
  }

  public $beforeInsert(): void {
    this.createdDate = this.updatedDate = new Date();
  }

  public $beforeUpdate(): void {
    this.updatedDate = new Date();
  }
}
