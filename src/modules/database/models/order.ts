import { Model } from 'objection';
import { ApiProperty } from '@nestjs/swagger';

import { User } from './user';
import { IOrder } from '../interfaces/order';
import { OrderProduct } from './orderProduct';

export class Order extends Model implements IOrder {
  @ApiProperty({ type: 'integer' })
  public id: number;
  @ApiProperty({ type: 'integer' })
  public userId: number;
  @ApiProperty({ type: 'float' })
  public amount: number;
  @ApiProperty({ type: 'string', format: 'date-time' })
  public createdDate: Date;
  @ApiProperty({ type: 'string', format: 'date-time' })
  public updatedDate: Date;

  public user: User;
  public orderProducts: OrderProduct[];

  public static get tableName(): string {
    return 'Order';
  }

  public static get relationMappings(): any {
    return {
      user: {
        relation: Model.HasOneRelation,
        modelClass: User,
        filter: (query: any) => query.select('id', 'firstName', 'lastName', 'email'),
        join: {
          from: 'User.id',
          to: 'Order.userId'
        }
      },
      orderProducts: {
        relation: Model.HasManyRelation,
        modelClass: OrderProduct,
        join: {
          from: 'Order.id',
          to: 'OrderProduct.orderId'
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
