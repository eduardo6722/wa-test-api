import { Injectable, NotFoundException } from '@nestjs/common';
import { IProduct } from 'modules/database/interfaces/product';
import { IResponseMessage } from 'modules/database/interfaces/responseMessage';
import { Order } from 'modules/database/models/order';
import { OrderProduct } from 'modules/database/models/orderProduct';
import { User } from 'modules/database/models/user';
import { OrderRepository } from '../repositories/order.repository';

@Injectable()
export class OrderService {
  constructor(private orderRepository: OrderRepository) {}

  public async insert(user: User, productIds: number[]): Promise<IResponseMessage> {
    const orderProducts: OrderProduct[] = [];

    const products = await this.orderRepository.getProductsByIds(productIds);

    if (!products.length) {
      throw new NotFoundException('Products not found');
    }

    products.forEach(product => {
      const orderProduct = new OrderProduct();

      orderProduct.productId = product.id;

      orderProducts.push(orderProduct);
    });

    const order = new Order();
    order.userId = user.id;
    order.amount = products.reduce((acc, item) => (acc += Number(item.price)), 0);
    order.$beforeInsert();

    return this.orderRepository.insert(order, orderProducts);
  }

  public async get(userId: number): Promise<Order[]> {
    return this.orderRepository.get(userId);
  }
}
