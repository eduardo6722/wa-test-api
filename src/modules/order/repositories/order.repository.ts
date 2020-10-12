import { Injectable } from '@nestjs/common';
import { IResponseMessage } from 'modules/database/interfaces/responseMessage';

import { Order } from 'modules/database/models/order';
import { Product } from 'modules/database/models/product';
import { OrderProduct } from 'modules/database/models/orderProduct';

@Injectable()
export class OrderRepository {
  public async insert(order: Order, orderProducts: OrderProduct[]): Promise<IResponseMessage> {
    let savedOrderIds = [] as any;

    await Order.transaction(async trx => {
      savedOrderIds = await trx('Order')
        .insert(order)
        .returning('id');

      for await (const orderProduct of orderProducts) {
        orderProduct.orderId = savedOrderIds[0];
        orderProduct.$beforeInsert();
        await trx('OrderProduct').insert(orderProduct);
      }
    });

    return {
      message: 'Operation Success!'
    };
  }

  public async get(userId: number): Promise<Order[]> {
    const result = await Order.query()
      .select('*')
      .from('Order')
      .where('userId', userId);

    for await (const item of result) {
      item.orderProducts = await OrderProduct.query().where('OrderProduct.orderId', item.id);

      for await (const element of item.orderProducts) {
        element.product = await Product.query()
          .where('id', element.productId)
          .first();
      }
    }

    return result;
  }

  public async getProductsByIds(productsByIds: number[]): Promise<Product[]> {
    return Product.query().findByIds(productsByIds);
  }
}
