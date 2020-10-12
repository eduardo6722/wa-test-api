import { Model } from 'objection';
import { ApiProperty } from '@nestjs/swagger';

import { Order } from './order';
import { Product } from './product';

import { IOrderProduct } from '../interfaces/orderProduct';

export class OrderProduct extends Model implements IOrderProduct {
  @ApiProperty({ type: 'integer' })
  public id: number;
  @ApiProperty({ type: 'integer' })
  public orderId: number;
  @ApiProperty({ type: 'integer' })
  public productId: number;
  @ApiProperty({ type: 'string', format: 'date-time' })
  public createdDate: Date;
  @ApiProperty({ type: 'string', format: 'date-time' })
  public updatedDate: Date;

  public order: Order;
  public product: Product;

  public static get tableName(): string {
    return 'OrderProduct';
  }

  public static get relationMappings(): any {
    return {
      order: {
        relation: Model.BelongsToOneRelation,
        modelClass: Order,
        join: {
          from: 'Order.id',
          to: 'OrderProduct.orderId'
        }
      },
      product: {
        relation: Model.BelongsToOneRelation,
        modelClass: Product,
        join: {
          from: 'Product.id',
          to: 'OrderProduct.productId'
        }
      }
    };
  }

  public $beforeInsert(): void {
    this.createdDate = this.updatedDate = new Date();
  }

  public $beforeUpdate(): void {
    this.updatedDate = new Date();
  }
}
