import { IOrder } from './order';
import { IProduct } from './product';

export interface IOrderProduct {
  id?: number;
  orderId: number;
  productId: number;
  createdDate?: Date;
  updatedDate?: Date;

  order: IOrder;
  product: IProduct;
}
